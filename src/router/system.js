const Masses = () => import(/* webpackChunkName: 'masses' */ '../components/data/system/Masses.vue')
const CompanyUser = () => import(/* webpackChunkName: 'company' */ '../components/data/system/company_user.vue')
const Mechanism = () => import(/* webpackChunkName: 'mechanism' */ '../components/data/system/Mechanism.vue')
const Dictionaries = () => import(/* webpackChunkName: 'dictionaries' */ '../components/data/system/Dictionaries.vue')
const EnterpriseUser = () => import(/* webpackChunkName: 'enterprise' */ '../components/data/system/enterprise.vue')
const RoleManagement = () => import(/* webpackChunkName: 'roleManagement' */ '../components/data/system/RoleManagement.vue')
const RoleStatistics = () => import(/* webpackChunkName: 'roleStatistics' */ '../components/data/system/RoleStatistics.vue')
const Three = () => import(/* webpackChunkName: 'three' */ '../components/data/system/Three.vue')

const systemRouter = [
  {
    path: '/index/:catlog/masses',
    name: 'masses',
    component: Masses,
    meta: {
      title: 'system/用户管理',
      name: '群众用户'
    }
  },
  {
    path: '/index/:catlog/company',
    name: 'company',
    component: CompanyUser,
    meta: {
      title: 'system/用户管理',
      name: '单位用户'
    }
  },
  {
    path: '/index/:catlog/enterprise',
    name: 'enterprise',
    component: EnterpriseUser,
    meta: {
      title: 'system/用户管理',
      name: '企业用户'
    }
  },
  {
    path: '/index/:catlog/mechanism',
    name: 'mechanism',
    component: Mechanism,
    meta: {
      title: 'system/机构管理',
      name: '机构设置'
    }
  },
  {
    path: '/index/:catlog/dictionaries',
    name: 'dictionaries',
    component: Dictionaries,
    meta: {
      title: 'system/其他管理',
      name: '数据字典'
    }
  },
  {
    path: '/index/:catlog/roleManagement',
    name: 'roleManagement',
    component: RoleManagement,
    meta: {
      title: 'system/权限管理',
      name: '角色管理'
    }
  },
  {
    path: '/index/:catlog/roleStatistics',
    name: 'roleStatistics',
    component: RoleStatistics,
    meta: {
      title: 'system/权限管理',
      name: '角色统计'
    }
  },
  {
    path: '/index/:catlog/three',
    name: 'three',
    component: Three,
    meta: {
      title: 'system/机构管理',
      name: '第三方公司'
    }
  }
]
export default systemRouter
