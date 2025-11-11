import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Button } from 'react-native-paper';

const db = getFirestore();

export default function ValorDia(props) {
    const [totalCarros, setTotalCarros] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const calcularTotaisDoDia = async () => {
        try {
            const saidasRef = collection(db, 'saidas');
            const querrySnapshot = await getDocs(saidasRef);

            let total = 0;
            let qntCarros = 0;

            const hoje = new Date();
            const dataAtual = hoje.toDateString();

            querrySnapshot.forEach((doc) => {
                let dataSaida;

                if(doc.data().data?.toDate){
                    dataSaida = doc.data().data.toDate().toDateString();
                }else{
                    dataSaida = new Date(doc.data().data).toDateString();
                }

                if(dataSaida === dataAtual){
                    qntCarros++;
                    total += doc.data().valorCobrado || 0;
                }
            });

            setTotalCarros(qntCarros);
            setValorTotal(total.toFixed(2));

            if(qntCarros === 0){
                Alert.alert('Erro, nenhum registro');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro, não foi possível calcular o total do dia');
        }
    }

    useEffect(() => {
        calcularTotaisDoDia();
    }, []);

    return (
        <View style={{flex: 1, justifyContent: "center", padding: 20}}>
            <Text style={{fontSize: 22, fontWeight: "bold", marginBottom: 20}}>Resumo do dia</Text>

            <Text style={{fontSize: 18, marginBottom: 10}}> 
                Carros estacionados hoje: <Text style={{fontWeight: "bold"}}>{totalCarros}</Text>
            </Text>

            <Text style={{fontSize: 18, marginBottom: 30}}>
                Valor total arrecadado:{""}
                <Text style={{ fontWeight: "bold", color: "green"}}>R$ {valorTotal}</Text>
            </Text>
        </View>
    );
}