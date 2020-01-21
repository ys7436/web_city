import { normalAxios } from '../utils/request'
// 获取二级列表
const getSlideBar = async (catlog) => {
  return normalAxios.get('/s.json', {
    params: {
      catlog: catlog
    }
  })
}
// 获取树级结构
const getTree = async () => {
  return normalAxios.get('/tree.json')
}
// 权限配置
const getRenderTree = async () => {
  return normalAxios.get('/rendertree.json')
}
export {
  getSlideBar,
  getTree,
  getRenderTree
}
