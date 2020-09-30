<template>
  <div class="view error-view">
    <section>
      <h1>404</h1>
      <p>无论是谁指引你来到这个页面，你都来晚了</p>
      <span>很抱歉，这个链接可能失效或不存在</span>

      <div class="actions">
        <c-btn primary @click="$router.go(-1)">返回上一页</c-btn>
        <c-btn to="/">返回首页</c-btn>
      </div>
    </section>
  </div>
</template>

<script>
  import CBtn from '../components/Button'

  export default {
    components: { CBtn }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .error-view {
    height: calc(100vh - #{$header-height} - 80px);
    overflow: hidden;

    section {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      margin-top: -2rem;
    }

    h1 {
      font-weight: 300;
      font-size: 5rem;
      margin: 0;
    }

    p {
      margin: 0;
      font-size: 20px;
      font-weight: 300;
    }

    span {
      margin: 1rem 0;
      font-size: 14px;
    }
  }
</style>
