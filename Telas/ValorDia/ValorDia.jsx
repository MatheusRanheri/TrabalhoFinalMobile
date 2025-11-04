import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();

export default function valorDia(props){
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const calcularTotais = async () => {
        const snapShot = await getDocs(collection(db, 'entradas'));
        const data = snapShot.docs.map(doc => doc.data());

        const hoje = new Date().toLocaleDateString();
        const entradasHoje = data.filter(e => e.data === hoje && e.valorCobrado);

        const total = entradasHoje.reduce((acc, e) => acc + (e.valorCobrado || 0), 0);

        setQuantidade(entradasHoje.length);
        setValorTotal(total);
    }

    useEffect(() => {
        calcularTotais();
    }, []);

    return(
        <View>
            <Text>Carros estacionados hoje: {quantidade}</Text>
            <Text>Valor total arrecadado: R$ {valorTotal.toFixed(2)}</Text>
        </View>
    );
}