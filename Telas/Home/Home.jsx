import { Text, View, TouchableOpacity } from "react-native";
import Estilos from "../../Componentes/Estilos";
import styles from "../../Componentes/Estilos";

export default function Home(props) {

    const abrirLogin = () => {
        props.navigation.navigate('Login');
    }

    const abrirCadastroUsuario = () => {
        props.navigation.navigate('CadastroCliente');
    }

    const esqueceuSenha = () =>{
        props.navigation.navigate('ResetarSenha');
    }

    const CadastrarValorHora = () => {
        props.navigation.navigate('CadastrarValorHora');
    }

    const cadastroEstacionamento = () =>{
        props.navigation.navigate('CadastroEstacionamento');
    }

    const saida = () =>{
        props.navigation.navigate('Saida');
    }

    const valorDia = () =>{
        props.navigation.navigate('ValorDia');
    }
 
    return (
        <View style={Estilos.container}>
            
                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirLogin}>
                    <Text style={Estilos.buttonTexto}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirCadastroUsuario}>
                    <Text style={Estilos.buttonTexto}>Cadastro de cliente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={esqueceuSenha}>
                    <Text style={Estilos.buttonTexto}> Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={cadastroEstacionamento}>
                    <Text style={Estilos.buttonTexto}> Cadastro Estacionamento </Text>
                </TouchableOpacity>

                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={CadastrarValorHora}>
                    <Text style={Estilos.buttonTexto}> Valor da hora</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={saida}>
                    <Text style={Estilos.buttonTexto}> Saída</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={valorDia}>
                    <Text style={Estilos.buttonTexto}> Valor total do dia</Text>
                </TouchableOpacity>
            
        </View>
    )

}

