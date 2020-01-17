import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAMap from 'vue-amap'
import { Menu, Button, Switch, Submenu, MenuItem, Table, TableColumn, Breadcrumb, BreadcrumbItem, Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Form,
  FormItem,
  Select,
  Option,
  OptionGroup,
  Dialog,
  Pagination,
  Tree,
  Scrollbar,
  Tooltip,
  DatePicker,
  TimeSelect,
  TimePicker,
  Loading,
  Message,
  MessageBox,
  Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Menu)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Tree)
Vue.use(Scrollbar)
Vue.use(Tooltip)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.config.productionTip = false
/* !!!: 初始化高德地图 */
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '58ef0a93b37985026fad62cfc8c2f66b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar',
    'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4'
})
// 实现对话框拖拽
Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    // dialogHeaderEl.style.cursor = 'move';
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null)
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomheight = dragDom.offsetHeight // 对话框高度
      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight
      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left')
      let styT = sty(dragDom, 'top')
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.split('%')[0] / 100)
        styT = +document.body.clientHeight * (+styT.split('%')[0] / 100)
      } else {
        styL = +styL.split('px')[0]
        styT = +styT.split('px')[0]
      }
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft)
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop)
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }
        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
