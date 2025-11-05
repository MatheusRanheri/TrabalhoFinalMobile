import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Home from "./Telas/Home/Home";
import Login from "./Telas/Login/Login";
import CadastroCliente from "./Telas/CadastroCliente/CadastroCliente";
import ValorFinal from "./Telas/ValorFinal/ValorFinal";
import CadastrarValorHora from "./Telas/ValorHora/CadastrarValorHora";
import Saida from "./Telas/Saida/Saida";
import CadastroEstacionamento from "./Telas/CadastroEstacionemento/CadastroEstacionento";
import ValorDia from "./Telas/ValorDia/ValorDia";
import ValorHora from "./Telas/ValorHora/CadastrarValorHora"

export default function App() {
  const Stack = createStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="ValorFinal" component={ValorFinal}/>
          <Stack.Screen name="CadastrarValorHora" component={CadastrarValorHora}/>
          <Stack.Screen name="Saida" component={Saida}/>
          <Stack.Screen name="CadastroCliente" component={CadastroCliente}/>
          <Stack.Screen name="CadastroEstacionamento" component={CadastroEstacionamento}/>
          <Stack.Screen name="ValorDia" component={ValorDia}/>
          <Stack.Screen name="ValorHora" component={ValorHora}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
