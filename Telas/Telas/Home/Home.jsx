import { View, Button } from 'react-native';

export default function App({navigation}) {  
 
  const cadastroEstacionamento = () =>{
    navigation.navigate('CadastroEstacionamento');
  }

  const valorDia = () =>{
    navigation.navigate('ValorDia');
  }

  const valorFinal = () =>{
    navigation.navigate('ValorFinal');
  } 

  const valorHora = () =>{
    navigation.navigate('ValorHora');
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
        <Button title='valor do Dia' onPress={valorDia}>Valor do dia</Button>
      </View>
      <View style={{ marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5}}>
        <Button title='valor Final' onPress={valorFinal}>Valor Final</Button>
      </View>
    </View>
  );
  
}

