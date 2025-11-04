import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Separator, TextInput} from 'react-native';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';

export default function App({navigation}) {  
 
  const cadastroEstacionamento = () =>{
    navigation.navigate('CadastroEstacionamento');
  }

  return(
    <View>

      <Button mode='contained' onPress={cadastroEstacionamento}>Cadastro Estacionamento</Button>

    </View>
  );
  
}

