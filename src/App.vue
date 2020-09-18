<template>
  <div id="app">
    <nav-bar v-show="!isHomeView"></nav-bar>
    <color-selector></color-selector>
    <router-view></router-view>
  </div>
</template>

<script>
  import ColorSelector from './components/AppColorSelector'
  import NavBar from './components/AppNavBar'

  export default {
    components: { NavBar, ColorSelector },
    computed: {
      isHomeView() {
        return this.$route.name === 'home'
      },
    }
  }
</script>

<style lang="scss">

</style>
