import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';

const db = getFirestore();

export default function CadastroEstacionamento(){

    const [placa, setPlaca] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    
    const cadastarEntrada = async () => {
        if(!placa || !data || !hora){
            Alert.alert('Erro, preencha todos os campos');
            return;
        }
        try{
           await addDoc(collection(db, 'entradas'),{
            placa,
            data,
            hora,
            horaEntrada: hora,
            ativo: true
           }); 
           Alert.alert('Sucesso');
           setPlaca('');
           setData('');
           setHora('');
        }catch(error){
            Alert.alert('Erro, não foi possível cadastrar');
            console.error(error);
        }
    };

    return(
        <View>
            <TextInput placeholder='Placa' value={placa} onChangeText={setPlaca}/>
            <TextInput placeholder='Data (DD/MM/YYYY)' value={data} onChangeText={setData}/>
            <TextInput placeholder='Hora de entrada(HH:MM)' value={hora} onChangeText={setHora}/>
            <Button mode='contained' title='Cadastrar Entrada' onPress={cadastarEntrada}>Cadastrar</Button>
        </View>
    );
}