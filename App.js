import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, ImageBackground, useEffect } from 'react-native';

export default function App() {

  const API_KEY = 'dc4b643d35bae910201d495796ea62a4';
  const [city, setCityWeather] = useState('')
  const [weatherData, setWeatherData] = useState(null);
 
  const getWeather = async() => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Cidade não encontrada', error);
    }
  };


  return (
    <View style={styles.container}>
      {/* <Text style = {styles.header}>  G1 </Text> */}
      <ImageBackground source={require('./assets/teste.png')}
      style={styles.ImageBackground}>
      </ImageBackground>


      <View style = {styles.mainContent}> 
        <Text  style = {{margin: 10, color: '#00008b', fontWeight: 'bold'}}>Veja a previsão do tempo para sua cidade:</Text>

        <TextInput style = {{borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20}}
        placeholder='Digite aqui sua cidade' 
        onChangeText={text => setCityWeather(text)}
        value={city}/>

        <Button style = {styles.buttonAdd} color= '#00008b' title='Buscar' 
        onPress = {getWeather}/>
        {weatherData && (
        <View style={{
          marginTop: 10,
          alignItems: 'center',}}>
          <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 15,padding: 5}}>Cidade: {weatherData.name}- {weatherData.sys.country}</Text> 
          <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 15,padding: 5}}>Temperatura: {weatherData.main.temp} °C</Text> 
          <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 15,padding: 5}}>Vento: {weatherData.wind.speed} km/h</Text> 
          <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 15,padding: 5}}>Observação: {weatherData.weather[0].description}</Text> 
          <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 15,padding: 5}}>Umidade: {weatherData.main.humidity} % </Text>
          
        </View>
      )}

      </View>


      <Text style = {styles.footer}>Trabalho G1 React Native</Text>
      <StatusBar style="auto" backgroundColor='#4682B4'/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1 ,
    paddingTop: 40, 
  },
  header:{
    backgroundColor: "#708090", // cor de fundo 
    padding: 20, // borda de dentro do header 
    color: "#000000", // cor do texto 
  },
  footer :{
    backgroundColor: "#4682B4", // cor de fundo 
    padding: 20, // borda de dentro do header 
    color: "#000000", // cor do texto 
    textAlign: "center"
  },
  mainContent :{
    backgroundColor: "#4682B4",
    textAlignVertical: "center",
    flexGrow: 1 ,
    padding: 20
  },
  buttonAdd :{
    borderColor: 'black', borderWidth: 1,  padding: 20, backgroundColor: '#708090', color: 'black'
  },
  ImageBackground: {
    flex: 1,
    width: 500,
    height: 400 
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
    
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },

});
