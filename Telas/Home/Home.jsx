import { Text, View, TouchableOpacity } from "react-native";
import Estilos from "../../Componentes/Estilos";
import styles from "../../Componentes/Estilos";

export default function Home(props) {

    const abrirLogin = () => {
        props.navigation.navigate('Login');
    }

    const abrirCadastro = () => {
        props.navigation.navigate('Cadastro');
    }

    const cadastroValorMinuto = () => {
        props.navigation.navigate('Valor');
    }

    return (
        <View style={Estilos.container}>
            
                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirLogin}>
                    <Text style={Estilos.buttonTexto}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirCadastro}>
                    <Text style={Estilos.buttonTexto}>Cadastro de cliente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={cadastroValorMinuto}>
                    <Text style={Estilos.buttonTexto}> Valor minuto do estacionamento</Text>
                </TouchableOpacity>
            
        </View>
    )

}

