<template>
  <div class="view-full-page">
    <section class="hero">
      <span>Yet another</span>
      <h1>Web Developer.</h1>
      <c-btn class="cta" style="width: 140px" primary to="/about">提供工作机会</c-btn>
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
        to="/works"
      ></nav-card>
      <nav-card
        class="nav-card"
        title="关于"
        detail="了解我的技能和履历，提供可能的工作机会"
        to="/about"
      ></nav-card>
    </section>
  </div>
</template>

<script>
  import CBtn from '../components/Button'
  import NavCard from '../components/NavCard'
  import animate from 'animateplus/animateplus'
  import { mobileCheck } from '../lib/utls'

  export default {
    components: { NavCard, CBtn },
    computed: {

    },
    methods: {
      initAnimation() {
        const play = async () => {
          await animate({
            elements: '.hero',
            opacity: [0, 1],
            duration: 800,
            easing: 'linear',
            delay: 500
          })

          await animate({
            elements: '.nav-cards .nav-card',
            transform: ['scale(0)', 'scale(1)'],
            duration: 2000,
            delay: index => (index + 1) * 100,
          })
        }

        play()
      }
    },
    mounted () {
      if(!mobileCheck()) {
        this.initAnimation()
      }
    }
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
      opacity: 0;

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

      .nav-card {
        transform: scale(0);
      }

      .nav-card:not(:last-child) {
        margin-right: 2rem;
      }
    }
  }

  @media screen and (max-width: 810px) {
    .view-full-page {
      height: auto;
      overflow-x: hidden;
      overflow-y: auto;
      display: block;

      .hero {
        width: 80vw;
        margin: 15vh auto;
        text-align: left;
        box-sizing: border-box;
        opacity: 1;

        h1 {
          font-size: 2.5rem;
          margin-top: 1rem;
          line-height: 1;
        }
      }

      .nav-cards {
        flex-direction: column;
        width: 80vw;
        align-items: center;
        justify-content: center;

        .nav-card {
          margin-right: 0 !important;
          margin-top: 1rem;
          box-sizing: border-box;
          transform: scale(1);
        }
      }
    }
  }
</style>
