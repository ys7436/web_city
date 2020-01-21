import { loginAxios } from '../../utils/request'
import qs from 'qs'
// 获取树级结构
const login = async (option) => {
  return loginAxios.post('/recycle-auth/oauth/token', qs.stringify({ ...option }))
}
export {
  login
}
