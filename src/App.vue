<template>
  <div id="app">
    <nav-bar v-show="!isHomeView" class="hidden-on-tablet"></nav-bar>
    <color-selector class="hidden-on-tablet"></color-selector>
    <router-view></router-view>
    <c-tab-bar class="hidden-on-desktop"></c-tab-bar>
    <c-fab primary to="/y/" v-if="authenticated">
      <dashboard-20></dashboard-20>
    </c-fab>
  </div>
</template>

<script>
  import ColorSelector from './components/AppColorSelector'
  import NavBar from './components/AppNavBar'
  import CTabBar from './components/AppTabBar'
  import { requests } from './lib/requests'
  import { sessionData } from './lib/store'
  import CFab from './components/FloatingButton'

  export default {
    components: { CFab, CTabBar, NavBar, ColorSelector },
    data: () => ({
      authenticated: false
    }),
    computed: {
      isHomeView() {
        return this.$route.name === 'home'
      },
      isAuthed: {
        get() {
          return sessionData.auth
        },
        set(val) {
          this.authenticated = val
        }
      }
    },
    methods: {
      tryAuthenticate() {
        const token = window.localStorage.getItem('oc_token')
        if(token) {
          this.validateToken(token)
        }
      },
      validateToken(token) {
        requests.post(`/validate/`, {}, res => {
          console.log(res)
          if(res.data.authenticated === 'true') {
            sessionData.auth = true
            sessionData.token = token
            this.isAuthed = true
            window.sessionStorage.setItem('owen_auth', 'true')
          }
        }, error => {
          sessionData.auth = false
          sessionData.token = null
        })
      }
    },
    mounted () {
      this.tryAuthenticate()
    }
  }
</script>

<style lang="scss">
  #app {
    position: relative;
  }
</style>
