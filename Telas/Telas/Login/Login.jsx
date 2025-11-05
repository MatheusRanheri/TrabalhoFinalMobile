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

  const Separator = () => <View style={styles.separator} />;

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

  const addData = async () => {
      try {
        await addDoc(collection(db, "Usuario"), { nome : usuario, senha : senha});
        Alert.alert('Sucesso', 'Usuario Cadastrado com sucesso');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

  const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Usuario"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched data:", data);
        setlista(data);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
  };


  const deleteData = async (documentId) => {
      try {
        await deleteDoc(doc(db, "Usuario", documentId));
        Alert.alert('Sucesso', 'Usuario Deletado do cadastrado');
        Navigation.navigate('Login')
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    };


  const criarUsuario =  async () => {

      try {
       const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
       const user = userCredential.user;
        
       await sendEmailVerification(user);

       await setDoc(doc(db, "usuarios", user.uid),{
        email: user.email,
        dataCadastro: new Date(),
        verificado: false
       });
       Alert.alert("Sucesso, usuario criado e salvo no firebase");
      }catch (error) {
      ///  console.error('Erro ao registrar:', error.message);
        Alert.alert('Erro', error.message);
      }
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