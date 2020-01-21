import HttpRequest from './axios'
import { normalBaseUrl, doneBaseUrl, loginBaseUrl } from '../config/location'
const normalAxios = new HttpRequest({ url: normalBaseUrl, status: false })
const doneAxios = new HttpRequest({ url: doneBaseUrl, status: false })
const loginAxios = new HttpRequest({ url: loginBaseUrl, status: true })
export {
  normalAxios,
  doneAxios,
  loginAxios
}
