const Information = () => import(/* webpackChunkName: 'information' */ '../components/data/device/Information.vue')
const Basics = () => import(/* webpackChunkName: 'basics' */ '../components/data/device/Basics.vue')

const deviceRouter = [
  {
    path: '/index/:catlog/information',
    name: 'information',
    component: Information,
    meta: {
      title: 'device/设备管理',
      name: '设备信息'
    }
  },
  {
    path: '/index/:catlog/basics',
    name: 'basics',
    component: Basics,
    meta: {
      title: 'device/设备管理',
      name: '设备基础信息'
    }
  }
]

export default deviceRouter
