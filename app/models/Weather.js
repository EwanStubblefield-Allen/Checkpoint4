export class Weather {
  constructor(data) {
    this.temp = data.main.temp
    this.main = data.weather[0].main
    this.isCelsius = false
  }

  get WeatherTemplate() {
    return `
    <div class="d-flex align-items-center">
      <div>
        <p>${this.computedTemp}</p>
        <p>${this.main}</p>
      </div>
      <i class="mdi mdi-white-balance-sunny ps-2 fs-1"></i>
    </div>`
  }

  get computedTemp() {
    if (!this.isCelsius) {
      let fahrenheit = Math.floor(((this.temp - 273.15) * 9 / 5 + 32) * 100) / 100
      return `${fahrenheit}°F`
    } else {
      let celsius = Math.floor((this.temp - 273.15) * 100) / 100
      return `${celsius}°C`
    }
  }
}