import { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { Button } from "react-native-paper";

export default function CadastroCliente({navigation}) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const criarUsuario = async () => {
        if (!nome || !email || !senha) {
            Alert.alert('Preencha todos os campos');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            await sendEmailVerification(user);

            await setDoc(doc(db, 'Usuario', user.uid), {
                nome,
                email,
                dataCadastro: new Date(),
                verificado: false
            });

            Alert.alert('Sucesso, usuário criado!');
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro ao criar usuário', error.message);
        }
    }

    return (
        <View style={{ padding: 20 }}>

            <TextInput
                style={{marginBottom: 10, borderWidth: 1, padding: 8 }}
                placeholder="Nome completo"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-addres"
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />

            <Button mode='contained' onPress={criarUsuario}>Cadastrar</Button>
        </View>
    );
}