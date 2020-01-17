<template>
  <div class="whiteBack">
    {{ nowActives }}
    <div>
      <el-scrollbar style="height: 500px" :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" tag="div">
        <div>
          <p v-for="(item, index) in 150" :key="index">{{item + index}} 这里是一些文本。</p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tables',
  computed: {
    nowActives () {
      return this.$store.state.users.nowActives
    }
  }
}
</script>

<style scoped lang="scss">
</style>
