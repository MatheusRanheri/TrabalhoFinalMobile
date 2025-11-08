import { View, Button } from 'react-native';

export default function App({navigation}) {  
 
  const cadastroEstacionamento = () =>{
    navigation.navigate('CadastroEstacionamento');
  }

  const valorDia = () =>{
    navigation.navigate('ValorDia');
  }

  const valorHora = () =>{
    navigation.navigate('ValorHora');
  } 

  const saida = () =>{
    navigation.navigate('Saida');
  }

  return(
    <View style={{padding: 50}}>
      <View style={{ marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5}}>
        <Button title='cadastro Estacionamento' onPress={cadastroEstacionamento}>Cadastro Estacionamento</Button>
      </View>
      <View style={{ marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5}}>
        <Button title='Valor da hora' onPress={valorHora}>Valor da hora</Button>
      </View>
      <View style={{ marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5}}>
        <Button title='Saida' onPress={saida}>Saída</Button>
      </View>
      <View style={{ marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5}}>
        <Button title='valor Final' onPress={valorDia}>Valor Dia</Button>
      </View>
    </View>
  );
  
}

