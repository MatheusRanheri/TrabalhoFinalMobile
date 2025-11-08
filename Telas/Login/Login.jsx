import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Separator, TextInput} from 'react-native';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';

const db = getFirestore();

export default function Login({navigation}) {  
 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lista, setlista] = useState([]);

  const fazerLogin = async () => {
    if(!email || !senha){
      Alert.alert('Erro, preencha todos os campos');
      return;
    }

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home');
    }catch(error){
      Alert.alert('Erro, usuário ou senha inválidos');
    }
  }

  const resetarsenha = async() => {
    if(!email){
      Alert.alert('Digite seu email!');
      return;
    }

    try{
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Email de redefinição enviado');
    }catch(error){
      Alert.alert('Erro', error.message);
    }
  }

  const cadastroCliente = () =>{
      navigation.navigate('CadastroCliente');
  }
   
  return (
     <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button mode='outlined' onPress={fazerLogin}>Entrar</Button>
      <Button mode='contained' onPress={resetarsenha}>Resetar senha</Button>
      <Button mode='text' onPress={cadastroCliente}>Cadastrar novo usuário</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '90%',
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});