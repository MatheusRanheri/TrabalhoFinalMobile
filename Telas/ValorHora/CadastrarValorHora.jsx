import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';

    const db = getFirestore();

export default function CadastrarValorHora(props){
    const [valor, setValor] = useState('');

    const salvarValor = async () =>{
        if(!valor){
            Alert.alert('Erro, digite um valor');
        }

        try{
            await setDoc(doc(db, 'configuracao', 'valorHora'),{
                valor: parseFloat(valor),
            });
            Alert.alert('Sucesso, valor atualizado');
        }catch(error){
            console.error(error);
            Alert.alert('Erro, não foi possível salvar');
        }
    }

    const carregarValor = async () =>{
        const docRef = doc(db, 'configuracao', 'valorHora');
        const docSnap = await  getDoc(docRef);
        if(docSnap.exists()) setValor(docSnap.data().valor.toString());
    };

    useEffect(() => {
        carregarValor();
    }, []);

    return(
        <View>
            <Text>Valor da hora:</Text>
            <TextInput
                placeholder='Digite o valor'
                value={valor}
                onChangeText={setValor}
                keyboardType='numeric'
            />
            <Button mode='contained' onPress={salvarValor}/>
        </View>
    );
}