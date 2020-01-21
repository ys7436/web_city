import { doneAxios } from '../../utils/request'
// import qs from 'qs'
// 获取群众用户 分页列表
const massesTableList = async (data) => {
  return doneAxios.get('/recycle/admin/v1/user/resident', {
    params: {
      ...data
    }
  })
}
export {
  massesTableList
}
