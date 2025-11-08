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
            Alert.alert('Sucesso, valor cadastrado');
            setValor('');
        }catch(error){
            console.error(error);
            Alert.alert('Erro, não foi possível salvar');
        }
    }

    return(
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
            <Text style={{fontSize: 18, marginBottom: 10}}>Definir Valor da hora:</Text>
            <TextInput
                placeholder='Digite o valor da hora de entrada'
                value={valor}
                onChangeText={setValor}
                keyboardType='numeric'
                style={{borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20, fontSize: 16,}}
            />
            <Button mode='contained' onPress={salvarValor}>Salvar o valor da hora</Button>
        </View>
    );
}