<template>
  <div id="app">
    <transition mode="out-in" name="slideSwiper">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
  @import 'assets/reset';
</style>
