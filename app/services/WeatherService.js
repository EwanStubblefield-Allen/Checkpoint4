import { AppState } from "../AppState.js"
import { Weather } from "../models/Weather.js"
import { saveState } from "../utils/Store.js"
import { api } from "./AxiosService.js"

class WeatherService {
  changeTemp() {
    let weather = AppState.weather
    weather.isCelsius = !weather.isCelsius
    AppState.emit('weather')
    saveState('weather', weather.isCelsius)
  }

  async getWeather() {
    const res = await api.get('api/weather')
    let newWeather = new Weather(res.data)
    AppState.weather = newWeather
  }
}

export const weatherService = new WeatherService()