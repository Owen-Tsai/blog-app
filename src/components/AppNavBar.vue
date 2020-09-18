<template>
  <header>
    <nav>
      <router-link class="back-btn" :to="back.link">
        <arrow-left-20></arrow-left-20>
        <span>{{ back.text }}</span>
      </router-link>

      <div class="site-views">
        <router-link
          v-for="(nav, i) in navs" :key="`nav-item-${i}`"
          class="nav-item"
          :to="nav.link"
        >{{ nav.text }}</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'NavBar',
    data: () => ({
      navs: [
        { text: '文章', link: '/articles' },
        { text: '作品', link: '/works' },
        { text: '关于', link: '/about' },
      ]
    }),
    computed: {
      back() {
        switch (this.$route.name) {
          case 'article':
            return {
              link: '/articles',
              text: '返回文章列表'
            }
          case 'work':
            return {
              link: '/works',
              text: '返回作品列表'
            }
          default:
            return {
              link: '/',
              text: '返回首页'
            }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/hover";
  @import "../styles/var";

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $header-height;
    margin: 0 auto;
    position: fixed;
    z-index: 99;
    width: 100%;
    top: 0;

    nav {
      width: 1100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .back-btn {
      display: flex;
      align-items: center;
      @include hover;

      span {
        margin-left: 10px;
      }
    }

    .nav-item:not(:first-child) {
      margin-left: 1rem;
    }
    .nav-item {
      @include hover;

      &.router-link-exact-active {
        @include active;
      }
    }
  }
</style>
