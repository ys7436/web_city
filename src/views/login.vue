<template>
  <div class="blackBack">
    <div class="innerBack">
      <img class="name" src="../assets/images/name.png" alt="">
      <div class="map">
        <div class="mapWater">
          <em class="water" v-for="(item, index) in length" :key="item + index" :style="{'left': leftMax(), 'top': topMax(), 'animation-duration': millisecond()}"></em>
        </div>
        <img class="identification d1" src="../assets/images/d1.png" alt="">
        <img class="identification d2" src="../assets/images/d2.png" alt="">
        <img class="identification d3" src="../assets/images/d3.png" alt="">
        <img src="../assets/images/map.png" alt="">
      </div>
      <div class="login">
        <div class="loginInner">
          <div class="lightLeft">
            <div class="light"></div>
          </div>
          <div class="lightRight">
            <div class="light"></div>
          </div>
          <div class="lightTop">
            <div class="light"></div>
          </div>
          <div class="lightBottom">
            <div class="light"></div>
          </div>
          <div class="loginMain">
            <div class="loginName">用户登录</div>
            <el-form :model="ruleForm" :rules="rule" status-icon ref="ruleForm" label-width="0" class="demo-ruleForm">
              <el-form-item class="elB" label="" prop="username">
                <el-input v-model.trim="ruleForm.username" placeholder="账号" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="elB"  label="" prop="password">
                <el-input v-model.trim="ruleForm.password" show-password placeholder="密码" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="checkPassword" prop="checked">
                <el-checkbox @change="changeLocal" v-model="ruleForm.checked">记住密码</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button class="blockInput" type="primary" @click="loginTo('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">Anhui Shenning Technology Co., Ltd. All Rights Reserved</div>
  </div>
</template>

<script>
import { languageList } from '../utils/validate'
export default {
  name: 'login',
  data () {
    return {
      length: 30,
      ruleForm: {
        username: '',
        password: '',
        checked: true
      },
      rule: {
        username: [{ required: true, message: languageList.name, trigger: 'blur' }],
        password: [{ required: true, message: languageList.password, trigger: 'blur' }]
      }
    }
  },
  methods: {
    leftMax () {
      return Math.floor(Math.random() * (580 - 20 + 1) + 20) + 'px'
    },
    topMax () {
      return Math.floor(Math.random() * (220 - 20 + 1) + 20) + 'px'
    },
    millisecond () {
      return Math.floor(Math.random() * (3000 - 1000 + 1) + 1000) + 'ms'
    },
    loginTo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          return false
        }
      })
    },
    changeLocal (val) {
      this.$store.commit('setRemember', val)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/mixin';
  @keyframes topWater {
    0% { opacity: 0; }
    20% { opacity: 1; }
    100% { top: 21px; }
  }
  @keyframes lefts {
    0% { left: -152px }
    100% { left: 489px }
  }
  @keyframes rights {
    0% { right: -152px }
    100% { right: 489px }
  }
  @keyframes tops {
    0% { bottom: -152px }
    100% { bottom: 527px }
  }
  @keyframes bottoms {
    0% { top: -152px }
    100% { top: 527px }
  }
  .blackBack {
    height: 100%;
    background-color: #000;
    padding: 80px 0 65px 80px;
    box-sizing: border-box;
    position: relative;
    .innerBack {
      height: 100%;
      position: relative;
      .name { display: block; }
      .login {
        width: 407px;
        height: 454px;
        padding: 11px;
        position: absolute;
        right: 140px;
        top: 50%;
        margin-top: -238px;
        background-image: url("../assets/images/border.png");
        @include backImage;
        .loginInner {
          position: relative;
          height: 100%;
          .lightLeft, .lightRight, .lightTop, .lightBottom {
            position: absolute;
            overflow: hidden;
          }
          .lightLeft, .lightRight {
            width: 337px;
            height: 4px;
          }
          .lightTop, .lightBottom {
            width: 4px;
            height: 375px;
          }
          .lightTop {
            left: -3px;
            top: 40px;
          }
          .lightBottom {
            right: -4px;
            bottom: 40px;
          }
          .lightLeft {
            left: 35px;
            top: 0;
          }
          .lightRight {
            width: 335px;
            right: 35px;
            bottom: -2px;
          }
          .light { position: absolute; }
          .lightLeft .light, .lightRight .light, .lightTop .light, .lightBottom .light { @include backImage }
          .lightLeft .light, .lightRight .light {
            width: 152px;
            height: 4px;
            background-image: url("../assets/images/l1.png");
          }
          .lightTop .light, .lightBottom .light {
            width: 4px;
            height: 152px;
            background-image: url("../assets/images/l2.png");
          }
          .lightLeft .light {
            left: 0;
            top: 0;
            animation: lefts 2s linear infinite;
          }
          .lightRight .light {
            right: 0;
            bottom: 0;
            animation: rights 2s linear infinite;
          }
          .lightTop .light {
            right: 0;
            bottom: 0;
            animation: tops 2s linear infinite;
          }
          .lightBottom .light {
            top: 0;
            left: 0;
            animation: bottoms 2s linear infinite;
          }
        }
      }
    }
    .footer {
      height: 50px;
      line-height: 50px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 14px;
      text-align: center;
      @include ellipsis;
      color: #89c1ff;
    }
    .map {
      position: absolute;
      padding-top: 160px;
      padding-bottom: 70px;
      left: 0;
      top: 50%;
      margin-top: -313px;
      .mapWater {
        height: 240px;
        position: absolute;
        left: 20px;
        right: 20px;
        top: 190px;
        .water {
          width: 3px;
          height: 21px;
          position: absolute;
          animation: topWater linear infinite;
          background-image: url("../assets/images/water.png");
          @include backImage;
        }
      }
      .identification {
        position: absolute;
        &.d1 {
          left: 180px;
          top: 85px;
        }
        &.d2 {
          right: 143px;
          top: 103px;
        }
        &.d3 {
          left: 155px;
          bottom: 52px;
        }
      }
      img {
        display: block;
      }
    }
  }
  .loginMain {
    height: 100%;
    padding: 60px 38px 85px;
    box-sizing: border-box;
    .elB { margin-bottom: 30px; }
    .blockInput {
      width: 100%;
      border-radius: 0;
    }
    .checkPassword {
      text-align: right;
    }
    .loginName {
      height: 52px;
      line-height: 52px;
      text-align: center;
      font-size: 30px;
      color: #5aa3f4;
      margin-bottom: 25px;
    }
  }
</style>
