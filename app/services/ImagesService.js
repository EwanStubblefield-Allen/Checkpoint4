import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class ImagesService {
  async getImages() {
    const res = await api.get('api/images')
    AppState.image = res.data
  }
}

export const imagesService = new ImagesService()