<template>
  <div class="whiteBack">
    <div class="whiteForm editInput">
      <el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="型号：">
          <el-input v-model.trim="ruleForm.models" placeholder="请输入型号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addForm" plain>添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="whiteTable">
      <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                   @handleCheckBox="editCheckBox" @handleRow="editMessage" @deleteRow="deleteRow"></table-colum>
      <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    </div>
    <el-dialog class="treeDialogList resetError" title="基础数据添加/编辑" :visible.sync="dialogVisible" width="900px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-scrollbar :native="false" tag="div" class="treeScroll">
          <el-form :inline="true" ref="dialogItem" :model="ruleDialog" :rules="DialogRules" class="demo-form-inline" label-width="110px">
            <div>
              <el-form-item label="型号：" prop="models">
                <el-input v-model.trim="ruleDialog.models" placeholder="请输入型号" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="LED触摸屏：" class="bottomNone">
              <el-radio-group v-model="ruleDialog.screen">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="温湿度监测：" class="bottomNone">
              <el-radio-group v-model="ruleDialog.humidity">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="异味检测：" class="bottomNone">
              <el-radio-group v-model="ruleDialog.smell">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自动清洗装置：" class="bottomNone">
              <el-radio-group v-model="ruleDialog.clean">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="除味剂喷洒：" class="bottomNone">
              <el-radio-group v-model="ruleDialog.medicine">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="类型：" class="bottomNone">
              <el-radio-group v-model="ruleDialog.status">
                <el-radio label="1">箱体型</el-radio>
                <el-radio label="2">房屋型</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>
              <el-form-item label="监控相机：" class="windowText bottomNone">
                <el-checkbox-group v-model="ruleDialog.camera">
                  <el-checkbox label="1" name="type">监控相机A</el-checkbox>
                  <el-checkbox label="2" name="type">监控相机B</el-checkbox>
                  <el-checkbox label="3" name="type">监控相机C</el-checkbox>
                  <el-checkbox label="4" name="type">监控相机D</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="投递窗口：" class="windowText bottomNone" prop="window">
                <el-checkbox-group v-model="ruleDialog.window">
                  <el-checkbox label="1" name="type" @change="changeId('1')">厨余垃圾A</el-checkbox>
                  <el-checkbox label="2" name="type" @change="changeId('2')">可回收物B</el-checkbox>
                  <el-checkbox label="3" name="type" @change="changeId('3')">有害垃圾C</el-checkbox>
                  <el-checkbox label="4" name="type" @change="changeId('4')">其他垃圾D</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="电子秤：" class="windowText bottomNone">
                <el-checkbox-group v-model="ruleDialog.balance">
                  <el-checkbox label="1" name="type" disabled>厨余垃圾电子秤</el-checkbox>
                  <el-checkbox label="2" name="type" disabled>可回收物电子秤</el-checkbox>
                  <el-checkbox label="3" name="type" disabled>有害垃圾电子秤</el-checkbox>
                  <el-checkbox label="4" name="type" disabled>其他垃圾电子秤</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="满溢检测：" class="windowText bottomNone">
                <el-checkbox-group v-model="ruleDialog.testing">
                  <el-checkbox label="1" name="type" disabled>厨余垃圾检测</el-checkbox>
                  <el-checkbox label="2" name="type" disabled>可回收物检测</el-checkbox>
                  <el-checkbox label="3" name="type" disabled>有害垃圾检测</el-checkbox>
                  <el-checkbox label="4" name="type" disabled>其他垃圾检测</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="桶数量：" class="windowText" prop="bucket">
                <el-select v-model="ruleDialog.bucket.surplus" @change="resetGarbageList">
                  <el-option label="4" value="4"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
                <el-select v-model="ruleDialog.bucket.recovery" @change="resetGarbageList">
                  <el-option label="4" value="4"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
                <el-select v-model="ruleDialog.bucket.harmful" @change="resetGarbageList">
                  <el-option label="4" value="4"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
                <el-select v-model="ruleDialog.bucket.other" @change="resetGarbageList">
                  <el-option label="4" value="4"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="windowProp">
              <em class="labelTo"><i class="Danger">*</i>动力装置：</em>
              <template>
                <el-form-item v-if="disabledList.surplus" class="bottomNone" key="powerA1">
                  <el-select v-model="ruleDialog.power.surplus" disabled>
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in surplus">
                      <el-option v-if="item.value !== '4'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
                <el-form-item v-else key="powerA2" class="bottomNone" prop="power.surplus">
                  <el-select v-model="ruleDialog.power.surplus" @change="garbage('surplus')">
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in surplus">
                      <el-option v-if="item.value !== '4'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </template>
              <template>
                <el-form-item v-if="disabledList.recovery" key="powerB1" class="bottomNone">
                  <el-select v-model="ruleDialog.power.recovery" disabled>
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in recovery">
                      <el-option v-if="item.value !== '3'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
                <el-form-item v-else key="powerB2" class="bottomNone" prop="power.recovery">
                  <el-select v-model="ruleDialog.power.recovery" @change="garbage('recovery')">
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in recovery">
                      <el-option v-if="item.value !== '3'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </template>
              <template>
                <el-form-item v-if="disabledList.harmful" key="powerC1" class="bottomNone">
                  <el-select v-model="ruleDialog.power.harmful" disabled>
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in harmful">
                      <el-option v-if="item.value !== '2'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
                <el-form-item v-else key="powerC2" class="bottomNone" prop="power.harmful">
                  <el-select v-model="ruleDialog.power.harmful" @change="garbage('harmful')">
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in harmful">
                      <el-option v-if="item.value !== '2'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </template>
              <template>
                <el-form-item v-if="disabledList.other" key="powerD1" class="bottomNone">
                  <el-select v-model="ruleDialog.power.other" disabled>
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in other">
                      <el-option v-if="item.value !== '1'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
                <el-form-item v-else key="powerD2" class="bottomNone" prop="power.other">
                  <el-select v-model="ruleDialog.power.other" @change="garbage('other')">
                    <el-option label="数据共享" value=""></el-option>
                    <template v-for="(item, index) in other">
                      <el-option v-if="item.value !== '1'" :key="'item' + index" :label="item.name" :value="item.value"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </template>
            </div>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="resetPower">重置动力</el-button>
        <el-button type="primary" @click="editDetail('dialogItem')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableColum from '../../common/tablecolum'
import PageSize from '../../common/pageSize'
import _ from 'lodash'
import { tableEvent } from '../../../utils/mixin'
import { languageList } from '../../../utils/validate'
export default {
  name: 'Basics',
  data () {
    return {
      ruleForm: {
        models: ''
      },
      tableHead: [
        { align: 'center', prop: 'models', name: '设备型号', width: '200' },
        { align: 'center', prop: 'window', name: '投递窗口数', width: '140' },
        { align: 'center', prop: 'screen', name: '显示屏数', width: '140' },
        { align: 'center', prop: 'medicine', name: '喷洒药剂装置数', width: '140' },
        { align: 'center', prop: 'smell', name: '异味监测装置数', width: '140' },
        { align: 'center', prop: 'humidity', name: '温湿度监测装置数', width: '140' },
        { align: 'center', prop: 'clean', name: '自动清洗装置数', width: '140' },
        { align: 'center', prop: 'camera', name: '监控相机数', width: '140' },
        { align: 'center', prop: 'status', name: '类型', width: 'auto' }
      ],
      tableData: [
        { models: '10011szsa12', window: '2', screen: '3', medicine: '4', smell: '2', humidity: '3', clean: '2', camera: '3', status: '房屋型' },
        { models: '10011szsa12', window: '2', screen: '3', medicine: '4', smell: '2', humidity: '3', clean: '2', camera: '3', status: '房屋型' },
        { models: '10011szsa12', window: '2', screen: '3', medicine: '4', smell: '2', humidity: '3', clean: '2', camera: '3', status: '房屋型' },
        { models: '10011szsa12', window: '2', screen: '3', medicine: '4', smell: '2', humidity: '3', clean: '2', camera: '3', status: '房屋型' },
        { models: '10011szsa12', window: '2', screen: '3', medicine: '4', smell: '2', humidity: '3', clean: '2', camera: '3', status: '房屋型' }
      ],
      tableStatus: '2',
      ruleDialog: {
        models: '',
        screen: '2',
        humidity: '2',
        smell: '2',
        clean: '2',
        medicine: '2',
        status: '2',
        camera: [],
        balance: [],
        testing: [],
        window: [],
        bucket: {
          surplus: '', recovery: '', harmful: '', other: ''
        },
        power: {
          surplus: '', recovery: '', harmful: '', other: ''
        }
      },
      count: 0,
      DialogRules: {
        models: [{ required: true, message: languageList.models, trigger: 'blur' }],
        window: [{ required: true, message: '必须选择其中一项', trigger: 'change' }],
        bucket: [
          {
            required: true,
            validator: (rule, value, callback) => {
              this.count = 0
              for (let i in value) {
                (value[i] !== '') && (this.count += parseInt(value[i]))
              }
              if (this.count === 0) {
                callback(new Error(languageList.reBucket))
              } else if (this.count !== 0 && this.count % 4 !== 0) {
                callback(new Error(languageList.bucket))
                this.resetGarbageList()
              } else {
                callback()
                if (this.count === 4) this.resetPowerList()
              }
            },
            trigger: 'change'
          }
        ],
        'power.surplus': [{ required: true, message: languageList.required, trigger: 'change' }],
        'power.recovery': [{ required: true, message: languageList.required, trigger: 'change' }],
        'power.harmful': [{ required: true, message: languageList.required, trigger: 'change' }],
        'power.other': [{ required: true, message: languageList.required, trigger: 'change' }]
      },
      disabledList: {
        surplus: true,
        recovery: true,
        harmful: true,
        other: true
      },
      garbageList: [
        { 'name': '厨余垃圾', value: '4', keys: 'surplus' },
        { 'name': '可回收物', value: '3', keys: 'recovery' },
        { 'name': '有害垃圾', value: '2', keys: 'harmful' },
        { 'name': '其他垃圾', value: '1', keys: 'other' }
      ],
      nowList: '',
      surplus: [],
      recovery: [],
      harmful: [],
      other: [],
      changeCount: 0
    }
  },
  mounted () {
    this.nowList = JSON.stringify(this.garbageList)
    this.resetGarbageList()
  },
  watch: {
    'ruleDialog.bucket.surplus' (n, o) {
      this.propTest(n, 'surplus')
    },
    'ruleDialog.bucket.recovery' (n, o) {
      this.propTest(n, 'recovery')
    },
    'ruleDialog.bucket.harmful' (n, o) {
      this.propTest(n, 'harmful')
    },
    'ruleDialog.bucket.other' (n, o) {
      this.propTest(n, 'other')
    }
  },
  mixins: [tableEvent],
  components: {
    TableColum,
    PageSize
  },
  methods: {
    resetGarbageList () {
      this.garbageList = JSON.parse(this.nowList)
      this.surplus = this.garbageList
      this.recovery = this.garbageList
      this.harmful = this.garbageList
      this.other = this.garbageList
      for (let i in this.ruleDialog.power) {
        this.ruleDialog.power[i] = ''
      }
    },
    propTest (n, text) {
      if (n === '2') this.disabledList[text] = false
      else {
        this.ruleDialog.power[text] = ''
        this.disabledList[text] = true
      }
    },
    submitForm (ruleForm) {
      console.log(ruleForm)
    },
    editCheckBox (val) {
      console.log(val)
    },
    editMessage (val) {
      console.log(val)
    },
    deleteRow (val) {
      console.log(val)
    },
    tableSize (val) {
      this.pageSize = val
      this.tableRender()
    },
    tablePage (val) {
      this.currentPage = val
      this.tableRender()
    },
    tableRender () {
      console.log({ page: this.currentPage, limit: this.pageSize })
    },
    editDetail (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log('123')
        } else {
          return false
        }
      })
    },
    changeId (item) {
      this.ruleDialog.testing = this.ruleDialog.window
      this.ruleDialog.balance = this.ruleDialog.window
    },
    garbage (item) {
      const list = this.ruleDialog.power
      const data = this.garbageList
      if (this.count === 8) {
        let val = []
        let count = 0
        for (let i in list) {
          if (i === item && list[i] !== '') val.push({ name: i, value: list[i] })
          if (list[i] !== '') count++
        }
        if (count === 1) {
          let now = ''
          let li = []
          let nowList = []
          let nowKey = [{ keys: item }]
          let other = []
          for (let j = 0; j < data.length; j++) {
            if (data[j].value === val[0].value) {
              now = data[j].keys
              nowList.push(data[j])
              nowKey.push({ keys: now })
            }
            if (item === data[j].keys) li.push(data[j])
          }
          this[item] = val
          if (now !== '') this[now] = li
          this[item] = nowList
          other = _.pullAllBy(data, nowKey, 'keys')
          this[other[0].keys] = [other[1]]
          this[other[1].keys] = [other[0]]
        }
      }
    },
    resetPower () {
      if (this.count === 8) {
        console.log(123)
        this.resetGarbageList()
      }
    },
    resetPowerList () {
      this.resetGarbageList()
      const item = this.ruleDialog.bucket
      let list = []
      let newList = []
      let count = 0
      for (let i in item) {
        if (item[i] === '2') {
          list.push(i)
          count++
        }
      }
      if (count === 2) {
        for (let i = 0; i < this.garbageList.length; i++) {
          for (let j = 0; j < list.length; j++) {
            if (this.garbageList[i].keys === list[j]) {
              newList.push(this.garbageList[i])
            }
          }
        }
        this[list[0]] = [newList[1]]
        this[list[1]] = [newList[0]]
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .dialogList {
    .treeScroll {
      overflow: hidden;
      height: 450px;
      .labelTo {
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding-right: 10px;
        text-align: right;
        display: inline-block;
        vertical-align: top;
        *zoom: 1;
        *display: inline;
        .Danger {
          margin-right: 4px;
          color: #F56C6C;
        }
      }
    }
  }
</style>
