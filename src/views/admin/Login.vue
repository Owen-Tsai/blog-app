<template>
  <div class="view">
    <form>
      <h2>嘿，你知道规矩的</h2>
      <p>输入口令错误 3 次后，系统将锁闭。</p>
      <label>
        <input type="password" v-model="password" placeholder="Input validation code...">
      </label>

      <c-btn class="btn-login" primary block @click.prevent="signIn">SIGN IN</c-btn>
    </form>
  </div>
</template>

<script>
  import CBtn from '../../components/Button'
  import { mobileCheck } from '../../lib/utls'
  import { requests } from '../../lib/requests'
  import { sessionData } from '../../lib/store'

  export default {
    components: { CBtn },
    data: () => ({
      password: ''
    }),
    methods: {
      signIn() {
        requests.post(`/login/`, {
          password: this.password
        }, res => {
          console.log(res.data)
          sessionData.token = res.data.token
          sessionData.auth = true
          window.localStorage.setItem('oc_token', res.data.token)
          this.$router.push('/')
        }, error => {
          this.$msg({
            message: 'login failed',
            duration: 2000,
            offset: 60
          })
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    padding-top: 60px;
    width: 300px;
    box-sizing: border-box;
    margin: auto;

    label, input {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    h2 {
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.9rem;
      margin-top: 0;
      margin-bottom: 2rem;
    }

    input {
      height: 36px;
      padding: 0 8px;
      margin-bottom: 1rem;
    }
  }
</style>
