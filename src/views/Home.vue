<template>
  <div class="view-full-page">
    <section class="hero">
      <span>Yet another</span>
      <h1>Web Developer.</h1>
      <c-btn primary>提供工作机会</c-btn>
    </section>

    <section class="nav-cards">
      <nav-card
        class="nav-card"
        title="文章"
        detail="浏览我原创或者翻译自英文的文章"
        to="/articles"
      ></nav-card>
      <nav-card
        class="nav-card"
        title="作品"
        detail="可能有趣的实验性项目、设计和原型收集箱"
        to="/articles"
      ></nav-card>
      <nav-card
        class="nav-card"
        title="关于"
        detail="了解我的技能和履历，提供可能的工作机会"
        to="/articles"
      ></nav-card>
    </section>
  </div>
</template>

<script>
  import CBtn from '../components/Button'
  import NavCard from '../components/NavCard'
  export default {
    components: { NavCard, CBtn }
  }
</script>

<style lang="scss" scoped>
  .view-full-page {
    height: 100vh;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .hero {
      text-align: center;

      h1 {
        font-size: 3rem;
        margin-top: 0;
        margin-bottom: 2rem;
      }
    }

    .nav-cards {
      width: 660px;
      margin: 80px auto;
      display: flex;

      .nav-card:not(:last-child) {
        margin-right: 2rem;
      }
    }
  }
</style>
