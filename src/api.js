import axios from "axios";

export function GetWeatherData(query){
    console.log(query);
   return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=4868fb3e001fe5192c44e542a0a7a6c6&units=metric`).then(function(response){
        return response.data;
    })
}