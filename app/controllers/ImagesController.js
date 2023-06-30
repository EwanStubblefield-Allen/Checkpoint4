import { AppState } from "../AppState.js"
import { imagesService } from "../services/ImagesService.js"
import { Pop } from "../utils/Pop.js"
import { setText } from "../utils/Writer.js"

function _drawImage() {
  let url = AppState.image.largeImgUrl
  document.body.style.backgroundImage = `url('${url}')`
  setText('author', AppState.image.author)
}

export class ImagesController {
  constructor() {
    console.log('Images Controller Loaded')

    this.getImages()

    AppState.on('image', _drawImage)
  }

  async getImages() {
    try {
      await imagesService.getImages()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}