import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Picker } from 'react-native';
import { getFirestore, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export default function Saida(props){

    const [placas, setPlacas] = useState([]);
    const [placaSelecionada, setPlacaSelecionada] = useState('');
    const [horaSaida, setHoraSaida] = useState('');

    const carregarPlacas = async () =>{
        const snapShot = await getDoc(collection(db, 'entradas'));
        const data = snapShot.docs
        .map(doc => ({id: doc.id, ...doc.data()}))
        .filter(e => e.ativo);
        setPlacas(data);
    }

    const calcularValor = async () => {
        if(!placaSelecionada || !horaSaida) return Alert.alert('Erro, preencha todos os campos');
        
        const entrada = placas.find(p => p.id === placaSelecionada);
        const configDoc = await getDoc(doc(db, 'configuracao', 'valorHora'));
        const valorHora = configDoc.exists() ? configDoc.data().valor : 0;

        const [h1, m1] = entrada.horaEntrada.splt(':').map(Number);
        const [h2, m2] = horaSaida.split(':').map(Number);
        const totalHoras = Math.max(1, (h2 + m2/60) - (h1 + m1/60));

        const valorTotal = totalHoras * valorHora;

        await updateDoc(doc(db, 'entradas', placaSelecionada),{
            horaSaida,
            valorCobrado: valorTotal,
            ativo: false
        });

        Alert.alert('Valor a cobrar R$: ' `${valorTotal.toFixed(2)}` );
        setHoraSaida('');
        carregarPlacas('');
    }

    useEffect(() => {
        carregarPlacas();
    }, []);

    return(
        <View>
      <Text>Placa:</Text>
      {placas.length > 0 ? (
        <Picker
          selectedValue={placaSelecionada}
          onValueChange={setPlacaSelecionada}
        >
          {placas.map(p => (
            <Picker.Item key={p.id} label={p.placa} value={p.id} />
          ))}
        </Picker>
      ) : (
        <Text>Nenhum carro no estacionamento</Text>
      )}

      <TextInput
        placeholder="Hora de Saída (HH:MM)"
        value={horaSaida}
        onChangeText={setHoraSaida}
      />
      <Button title="Registrar Saída" onPress={calcularValor} />
    </View>
    );

}