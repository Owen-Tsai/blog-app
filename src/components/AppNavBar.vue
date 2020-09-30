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
        <router-link
          class="nav-item" v-if="isAuthenticated"
          to="/y/" :class="{'force-active': $route.path.includes('/y/')}"
        >
          管理
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
  import { authenticated } from '../lib/store'

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
          case 'article-content':
            return {
              link: '/articles',
              text: '返回文章列表'
            }
          case 'works-content':
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
      },
      isAuthenticated() {
        return authenticated()
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
    background-color: $light-color;
    transition: background-color ease-in-out .3s;

    nav {
      width: $view-max-width;
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
      &.force-active {
        @include active;
      }
    }
  }

  body[data-theme="dark"] {
    header {
      background-color: $dark-color;

      .back-btn {
        @include hover-dark;
      }
      .nav-item {
        @include hover-dark;

        &.router-link-exact-active {
          @include active;
        }
        &.force-active {
          @include active;
        }
      }
    }
  }
</style>
