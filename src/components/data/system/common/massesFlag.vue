<template>
  <div class="whiteBack">
    <div class="massesEdit">
      <slot name="back"></slot>
      <div class="massesTitle">在住地址</div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="20%" class="event">姓名</td>
          <td width="30%">加断行</td>
          <td width="20%" class="event">手机</td>
          <td width="30%">15155556666</td>
        </tr>
        <tr>
          <td class="event">身份证号</td>
          <td>340121199010108888</td>
          <td class="event">默认住址</td>
          <td>四里河</td>
        </tr>
        <tr>
          <td class="event">区/县</td>
          <td>庐阳区</td>
          <td class="event">楼号</td>
          <td>15</td>
        </tr>
        <tr>
          <td class="event">乡镇/街道</td>
          <td>太黄河路</td>
          <td class="event">单元</td>
          <td>8</td>
        </tr>
        <tr>
          <td class="event">社区</td>
          <td>黄河社区</td>
          <td class="event">门牌号</td>
          <td>1503</td>
        </tr>
        <tr>
          <td class="event">网格</td>
          <td>1#</td>
          <td class="event">类型</td>
          <td>住户</td>
        </tr>
        <tr>
          <td class="event">小区</td>
          <td>黄河大厦</td>
          <td class="event">家庭成员</td>
          <td>住户</td>
        </tr>
      </table>
      <div class="massesTitle">其他地址</div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="20%" class="event">区/县</td>
          <td width="30%">庐阳区</td>
          <td width="20%" class="event">楼号</td>
          <td width="30%">15</td>
        </tr>
        <tr>
          <td class="event">乡镇/街道</td>
          <td>太黄河路</td>
          <td class="event">单元</td>
          <td>8</td>
        </tr>
        <tr>
          <td class="event">社区</td>
          <td>黄河社区</td>
          <td class="event">门牌号</td>
          <td>1503</td>
        </tr>
        <tr>
          <td class="event">网格</td>
          <td>1#</td>
          <td class="event">类型</td>
          <td>住户</td>
        </tr>
        <tr>
          <td class="event">小区</td>
          <td>黄河大厦</td>
          <td class="event">家庭成员</td>
          <td>住户</td>
        </tr>
      </table>
      <div class="massesTitle">收货地址</div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="20%" class="event left">姓名</td>
          <td width="20%" class="event left">手机号</td>
          <td width="60%" class="event left">收货地址</td>
        </tr>
        <tr v-for="(item, index) in addrList" :key="'addr' + index">
          <td>{{ item.name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.addr }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'massesFlag',
  props: {
    massesDetail: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      addrList: [
        { name: '刘元', phone: '15144554455', addr: '安徽省合肥市光明橡树湾19栋1110' },
        { name: '拉伸', phone: '15166333366', addr: '安徽省合肥市光明橡树湾19栋1111' },
        { name: '模式', phone: '15188999988', addr: '安徽省合肥市光明橡树湾19栋1112' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .whiteBack { background-color: #fff; }
  .massesEdit {
    border: 1px solid #ddd;
    height: 100%;
    padding: 5px 20px 35px;
    box-sizing: border-box;
    overflow-y: auto;
    position: relative;
    table td {
      height: 35px;
      line-height: 35px;
      padding: 0 15px;
      border: 1px solid #ddd;
      border-collapse: collapse;
      font-size: 14px;
      color: #333;
      &.event {
        color: #888;
        text-align: right;
        background-color: #F9F9F9;
      }
      &.left {
        text-align: left !important;
      }
    }
    .massesTitle {
      height: 40px;
      line-height: 40px;
      padding-top: 5px;
      font-size: 16px;
      color: #333;
    }
  }
</style>
