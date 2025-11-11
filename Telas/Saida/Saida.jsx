import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Picker } from 'react-native';
import { getFirestore, query, where, collection, getDocs, updateDoc, doc, getDoc, addDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';

const db = getFirestore();

export default function Saida(props) {

  const [placa, setPlacas] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [valorCalculado, setValorCalculado] = useState(null);

  const calcularValor = async () => {
    if (!placa || !horaSaida) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const estacionamentoRef = collection(db, 'entradas');
      const q = query(estacionamentoRef, where('placa', '==', placa));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Erro, Nenhum veículo encontrado com essa placa');
        return;
      }

      const entradaDoc = querySnapshot.docs[0];
      const entradaData = entradaDoc.data();
      const horaEntrada = entradaData.horaEntrada;

      const valorHoraDoc = await getDoc(doc(db, 'configuracao', 'valorHora'));

      if (!valorHoraDoc.exists()) {
        Alert.alert('Erro, Nenhum valor de hora foi definido');
      }

      const valorHora = valorHoraDoc.data().valor;

      const entrada = new Date(`1970-01-01T${horaEntrada}:00`);
      const saida = new Date(`1970-01-01T${horaSaida}:00`);

      if (saida <= entrada) {
        Alert.alert('Erro', 'A hora de saída deve ser maior que a de entrada.');
        return;
      }

      const diferencaHoras = (saida - entrada) / (1000 * 60 * 60);
      const total = (diferencaHoras * valorHora).toFixed(2);
      setValorCalculado(total);

      await addDoc(collection(db, 'saidas'), {
        placa,
        horaEntrada,
        horaSaida,
        valorCobrado: parseFloat(total),
        data: new Date(),
      });

      Alert.alert(`Sucesso, valor calculado: R$ ${total}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro, Não foi possível calcular o valor');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Registrar Saída</Text>

      <TextInput
        placeholder='Placa do carro'
        value={placa}
        onChangeText={setPlacas}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16, }}
      />

      <TextInput
        placeholder='Hora de saída (ex: 10:23)'
        value={horaSaida}
        onChangeText={setHoraSaida}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16, }}
      />

      <Button mode='contained' onPress={calcularValor}>Calcular valor</Button>

      {valorCalculado && (
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>Valor a pagar:</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'green' }}>
            R$ {valorCalculado}
          </Text>
        </View>
      )}
    </View>
  );

}