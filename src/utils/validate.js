const languageList = {
  required: '此项必选',
  phone: '请输入正确的手机号',
  rePhone: '请输入手机号',
  user: '请输入账号、手机',
  name: '请输入姓名',
  password: '请输入密码',
  userId: '请输入正确的身份证号',
  reUserId: '请输入身份证号码',
  comapny: '请选择归属企业',
  role: '请输入角色',
  region: '请输入区域',
  isOff: '请选择是否启用',
  superior: '请选直属上级',
  dictionariesName: '请输入字典名称',
  dictionariesKey: '请输入键值',
  dictionariesCode: '请输入编码',
  dictionariesValue: '请输入字典值',
  dictionariesStatus: '请输入字典类型',
  lng: '请输入经度',
  lat: '请输入纬度',
  road: '归属小区、路段',
  location: '请输入当前位置、名称',
  models: '请输入型号',
  bucket: '所选垃圾桶数量必须以4个投递口为基准',
  reBucket: '请至少选择一项垃圾桶数量'
}
const regList = {
  PHONE: /^[1]([3-9])[0-9]{9}$/,
  ID: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  MAXLENGTH: 200
}

const regMessage = {
  PHONE: {
    REG: languageList.phone,
    REQUIRED: languageList.rePhone
  },
  ID: {
    REG: languageList.userId,
    REQUIRED: languageList.reUserId
  },
  BUCKET: {
    REG: languageList.bucket,
    REQUIRED: languageList.reBucket
  }
}

const userPhone = (rule, value, callback) => {
  let reg = regList.PHONE
  let val = value.replace(/\s*/g, '')
  if (val !== '' && !reg.test(val)) {
    callback(new Error(regMessage.PHONE.REG))
  } else {
    callback()
  }
}

const requiredUserPhone = (rule, value, callback) => {
  if (value !== 0 && (!value || value.length === 0)) {
    callback(new Error(regMessage.PHONE.REQUIRED))
  } else {
    userPhone(rule, value, callback)
  }
}

const userId = (rule, value, callback) => {
  let reg = regList.ID
  let val = value.replace(/\s*/g, '')
  if (val !== '' && !reg.test(val)) {
    callback(new Error(regMessage.ID.REG))
  } else {
    callback()
  }
}

const requiredBucketData = (rule, value, callback) => {
  let count = 0
  for (let i in value) { (value[i] !== '') && (count += parseInt(value[i])) }
  if (count === 0) {
    callback(new Error(regMessage.BUCKET.REQUIRED))
  } else if (count !== 0 && count % 4 !== 0) {
    callback(new Error(regMessage.BUCKET.REG))
  } else {
    callback()
  }
}

const requiredpowerData = (rule, value, callback) => {
  if (value !== '') {
    callback()
  } else {
    callback()
  }
}

export {
  userPhone,
  userId,
  requiredUserPhone,
  requiredBucketData,
  requiredpowerData,
  languageList
}
