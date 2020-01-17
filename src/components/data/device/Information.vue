<template>
  <div class="whiteBack">
    <div class="editInput">
      <el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="小区/路段：">
          <el-input v-model.trim="ruleForm.road" placeholder="请输入小区/路段" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="型号：">
          <el-input v-model.trim="ruleForm.models" placeholder="请输入型号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="role">
          <el-select v-model="ruleForm.status" placeholder="请选择状态" filterable>
            <el-option label="工作中" value="1"></el-option>
            <el-option label="待维护" value="2"></el-option>
            <el-option label="待换桶" value="3"></el-option>
            <el-option label="休息中" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addForm" plain>添加</el-button>
          <el-button type="success" icon="el-icon-download" @click="exportForm">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                 @handleCheckBox="editCheckBox" @handleRow="editMessage" @deleteRow="deleteRow"></table-colum>
    <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    <el-dialog class="treeDialogList" title="设备信息添加/编辑" :visible.sync="dialogVisible" width="900px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-scrollbar :native="false" tag="div" class="treeScroll">
          <el-form :inline="true" ref="dialogItem" :model="ruleDialog" :rules="DialogRules" class="demo-form-inline" label-width="130px">
            <el-form-item label="型号：">
              <el-select v-model="ruleDialog.models" placeholder="请选择型号" filterable>
                <el-option label="型号1" value="1"></el-option>
                <el-option label="型号2" value="2"></el-option>
                <el-option label="型号3" value="3"></el-option>
                <el-option label="型号4" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="安装时间：">
              <el-input v-model.trim="ruleDialog.time" placeholder="请选择安装时间" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="归属小区/路段：" prop="roads">
              <el-select class="nowInline" v-model="ruleDialog.roads" placeholder="请选择归属小区/路段" filterable>
                <el-option label="天华小区" value="1"></el-option>
                <el-option label="荣成北苑" value="2"></el-option>
                <el-option label="亳州路" value="3"></el-option>
                <el-option label="四里河路" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="位置/名称：" prop="location">
              <el-input v-model.trim="ruleDialog.location" placeholder="请输入位置" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="投递时间段：">
              <div class="timeListNow" v-for="(item, index) in ruleDialog.timeList" :key="'time' + index">
                <el-time-picker class="timeList" is-range v-model="item.text" range-separator="至" value-format="HH:mm"
                                start-placeholder="开始时间" end-placeholder="结束时间" placeholder="请选择投递时间段">
                </el-time-picker>
                <el-button @click="deleteTime(index)" class="elIcon" title="删除" type="danger" icon="el-icon-delete" size="mini"></el-button>
                <el-button @click="addTime(item, ruleDialog.timeList.length)" class="elIcon" title="添加" type="primary" icon="el-icon-circle-plus-outline" size="mini"></el-button>
              </div>
            </el-form-item>
            <el-form-item label="经度：" prop="lng">
              <el-input v-model.trim="ruleDialog.lng" placeholder="请输入经度" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="纬度：" prop="lat" class="bottomNone">
              <el-input v-model.trim="ruleDialog.lat" placeholder="请输入纬度" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
        <div class="isMap">
          <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo" :events="events"></el-amap>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDetail('dialogItem')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableColum from '../../common/tablecolum'
import PageSize from '../../common/pageSize'
import { tableEvent } from '../../../utils/mixin'
import { languageList } from '../../../utils/validate'
export default {
  name: 'Information',
  data () {
    return {
      ruleForm: {
        road: '',
        models: '',
        status: ''
      },
      tableStatus: '2',
      tableHead: [
        { align: 'left', prop: 'road', name: '归属小区/路段', width: '260' },
        { align: 'left', prop: 'addr', name: '位置/名称', width: '260' },
        { align: 'center', prop: 'time', name: '投递时间段', width: 'auto' },
        { align: 'center', prop: 'models', name: '型号', width: '120' },
        { align: 'center', prop: 'status', name: '状态', width: '120' }
      ],
      tableData: [
        { road: '1号小区', addr: '北京路口', time: '08:00-10:00;11:00-13:00；17:00-19:00', models: '1号类型', status: '待换桶' },
        { road: '2号小区', addr: '北京路口', time: '08:00-10:00;11:00-13:00；17:00-19:00', models: '2号类型', status: '待换桶' },
        { road: '3号小区', addr: '北京路口', time: '08:00-10:00;11:00-13:00；17:00-19:00', models: '3号类型', status: '待维护' },
        { road: '4号小区', addr: '北京路口', time: '08:00-10:00;11:00-13:00；17:00-19:00', models: '4号类型', status: '工作中' },
        { road: '5号小区', addr: '北京路口', time: '08:00-10:00;11:00-13:00；17:00-19:00', models: '5号类型', status: '工作中' },
        { road: '6号小区', addr: '北京路口', time: '08:00-10:00;11:00-13:00；17:00-19:00', models: '6号类型', status: '休息中' }
      ],
      ruleDialog: {
        models: '',
        time: '',
        roads: '',
        location: '',
        timeList: [{ id: 1, key: 'item1', text: '' }],
        lng: '',
        lat: ''
      },
      DialogRules: {
        roads: [{ required: true, message: languageList.road, trigger: 'change' }],
        location: [{ required: true, message: languageList.location, trigger: 'change' }],
        lng: [{ required: true, message: languageList.lng, trigger: 'change' }],
        lat: [{ required: true, message: languageList.lat, trigger: 'change' }]
      },
      zoom: 15,
      center: [117.275456, 31.923321],
      events: {
        'click': (e) => { this.mapClick(e) }
      }
    }
  },
  components: {
    TableColum,
    PageSize
  },
  mixins: [tableEvent],
  methods: {
    mapClick (e) {
      const { lng, lat } = e.lnglat
      const that = this
      this.ruleDialog.lng = lng
      this.ruleDialog.lat = lat
      let geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getAddress([lng, lat], function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            that.ruleDialog.location = result.regeocode.formattedAddress
          }
        }
      })
    },
    submitForm (formNode) {},
    editMessage (val) {
      console.log(val)
    },
    deleteRow (val) {
      console.log(val)
    },
    deleteTime (item) {
      if (this.ruleDialog.timeList.length <= 1) {
        this.$alert('必须保留一组', '提示', { confirmButtonText: '确定', type: 'warning' })
      } else {
        this.ruleDialog.timeList.splice(item, 1)
        this.ruleDialog.timeList.forEach((item, index) => {
          item.id = index + 1
          item.key = 'item' + (index + 1)
        })
      }
    },
    addTime (item, index) {
      if (index >= 4) {
        this.$alert('最多展示四组', '提示', { confirmButtonText: '确定', type: 'warning' })
      } else {
        const key = index + 1
        this.ruleDialog.timeList.push({ id: key, key: 'item' + key, text: '' })
      }
    },
    editDetail (fromNode) {
      this.$refs[fromNode].validate((valid) => {
        if (valid) {
          console.log('123')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .dialogList {
    padding-right: 400px;
    position: relative;
    .treeScroll {
      overflow: hidden;
      height: 435px;
      .timeList {
        width: 202px;
      }
      .nowInline {width: 202px}
      .timeListNow {
        width: 305px;
        margin-bottom: 5px;
        .elIcon {
          margin-left: 5px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .isMap {
    width: 380px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #f7f7f7;
    border-radius: 4px;
  }
</style>
