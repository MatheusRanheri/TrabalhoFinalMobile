import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , Alert, Separator, TextInput} from 'react-native';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const db = getFirestore();

export default function App() {  
 
  const [usuario, setusuario] = useState('');
  const [senha, setsenha] = useState('');
  const [lista, setlista] = useState([]);

  const Separator = () => <View style={styles.separator} />;

  const resetarsenha = async() => {
     await sendPasswordResetEmail(auth, 'profgilsonlima@gmail.com');
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
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    };


  const CriarUsuario =  async () => {

      try {
       const userCredential = await createUserWithEmailAndPassword(auth, usuario, senha);
        console.log(userCredential.user.email);
        await sendEmailVerification(userCredential.user);
        console.log('Usuário registrado com sucesso!', userCredential.user);
        Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      }
      catch (error) {
      ///  console.error('Erro ao registrar:', error.message);
        Alert.alert('Erro', error.message);
      }
  }


   const LogginVerificar = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, usuario, senha);
        console.log('Login bem-sucedido!', userCredential.user);
        Alert.alert('Sucesso', 'Login bem-sucedido!');
      }
      catch (error) {
        //console.error('Erro ao fazer login:', error.message);
        Alert.alert('Erro', 'Usuário e Senha invalidos');
      }
    };

    const LogginGoogle = async () => {

    }



  return (
    <View style={styles.container}>

          <TextInput style={styles.input} placeholder='Digite seu email'  value={usuario}   onChangeText={setusuario}/>

          <TextInput style={styles.input} placeholder='Digite seu senha'  value={senha}  onChangeText={setsenha} secureTextEntry={true}/>


          <Button title="Resetar Email" style={styles.button} onPress={resetarsenha} />
          <Separator />

          <Button title="Registrar" style={styles.button} onPress={CriarUsuario} />
          <Separator />
         
          <Button title="Login" style={styles.button} onPress={LogginVerificar} />
          <Separator />

          <Button title="Adicionar Dados" style={styles.button} onPress={addData} />
          <Separator />  

          <Button title="Listar Dados" style={styles.button} onPress={fetchData} />
          <Separator />  

          <Button title="Deletar Dados" style={styles.button} onPress={()=> deleteData('Aim1yN7zsfS4JHxVX2vk')} />
          <Separator />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    marginTop: 20
  },
 separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input : {
    width: '90%',
    height: 50,
    margin: 10,
    fontSize: 15
  }
});