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
      console.error('Erro ao obter a previsão do tempo:', error);
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
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Cidade: {weatherData.name}</Text>
          <Text style={styles.weatherText}>Temperatura: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherText}>Clima: {weatherData.weather[0].description}</Text>
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
    // width: 450,
    // height: 500 
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
