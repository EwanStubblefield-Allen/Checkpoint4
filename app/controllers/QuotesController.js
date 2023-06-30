import { AppState } from "../AppState.js"
import { quotesService } from "../services/QuotesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawQuote() {
  let quote = AppState.quote
  setHTML('quote', `
  <p>${quote.content}</p>
  <p class="on-hover text-end">-${quote.author}</p>`)
}

export class QuotesController {
  constructor() {
    console.log('Quotes Controller Loaded')

    this.getQuotes()
    AppState.on('quote', _drawQuote)
  }

  async getQuotes() {
    try {
      await quotesService.getQuotes()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}