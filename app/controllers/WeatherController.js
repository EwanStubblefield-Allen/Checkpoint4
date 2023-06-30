import { AppState } from "../AppState.js"
import { weatherService } from "../services/WeatherService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js"

function _drawWeather() {
  setHTML('weather', AppState.weather.WeatherTemplate)
}

function _drawTime() {
  let time = new Date()
  setText('time', time.toLocaleTimeString())
}

export class WeatherController {
  constructor() {
    console.log('Weather Controller Loaded')

    this.getWeather()
    setInterval(_drawTime, 1000)

    AppState.on('weather', _drawWeather)
  }

  changeTemp() {
    weatherService.changeTemp()
  }

  async getWeather() {
    try {
      await weatherService.getWeather()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}