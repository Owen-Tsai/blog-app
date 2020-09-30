<template>
  <div class="view">
    <section class="dashboard">
      <router-view></router-view>
    </section>
    <aside class="side-menu">
      <nav>
        <router-link
          class="nav-item"
          v-for="(navItem, i) in adminNavs" :key="`nav-${i}`"
          :to="navItem.to"
        >
          <span>{{ navItem.text }}</span>
        </router-link>
      </nav>
      <div class="control">
        <c-btn primary block style="margin-top: 1rem" to="/create-article">新建文章</c-btn>
        <c-btn block to="/create-works">新建作品</c-btn>
        <c-btn block @click="signOut" style="margin-top: 2rem">注销登录</c-btn>
      </div>
    </aside>
  </div>
</template>

<script>
  import CBtn from '../../components/Button'
  import { sessionData } from '../../lib/store'
  export default {
    components: { CBtn },
    data: () => ({
      adminNavs: [
        { text: '文章管理', to: '/y/articles' },
        { text: '作品管理', to: '/y/works' },
        { text: '草稿管理', to: '/y/drafts' },
      ]
    }),
    methods: {
      signOut() {
        sessionData.clear()
        window.localStorage.clear()
        window.sessionStorage.clear()
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/hover";

  .view {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .dashboard {
      margin-right: 80px;
      width: 100%;
    }

    aside {
      flex-basis: 200px;
      position: sticky;
      top: 80px;
      box-sizing: border-box;

      nav {
        display: block;
        width: 100%;
        border: 2px solid $dark-color;
        padding: 2rem;
        text-align: center;

        .nav-item {
          display: block;
          height: 40px;
          line-height: 40px;

          span {
            @include hover;
          }

          &.router-link-exact-active {
            span {
              @include active;
            }
          }
        }
      }
    }
  }

  body[data-theme="dark"] {
    nav {
      border-color: $light-color;

      .nav-item span {
        @include hover-dark;
      }
    }
  }
</style>
