import axios from '../utils/request'
// 获取二级列表
const getSlideBar = async (catlog) => {
  return axios.get('/s.json', {
    params: {
      catlog: catlog
    }
  })
}
// 获取树级结构
const getTree = async () => {
  return axios.get('/tree.json')
}
// 权限配置
const getRenderTree = async () => {
  return axios.get('/rendertree.json')
}
// 测试接口
const getList = async () => {
  return axios.get('/recycle/admin/v1/user/resident')
}
export {
  getSlideBar,
  getTree,
  getRenderTree,
  getList
}
