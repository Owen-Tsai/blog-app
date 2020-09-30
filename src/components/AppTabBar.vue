<template>
  <div class="c-tab-bar">
    <nav>
      <div class="tab-item" @click="navigateTo('/')">
        <home-32></home-32>
      </div>
      <div class="tab-item" @click="navigateTo('/articles')">
        <blog-32></blog-32>
      </div>
      <div class="tab-item"  @click="navigateTo('/works')">
        <gamification-32></gamification-32>
      </div>
      <div class="tab-item" @click="navigateTo('/about')">
        <education-32></education-32>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'CTabBar',
    data: () => ({

    }),
    methods: {
      navigateTo(to) {
        if(this.$route.path !== to) {
          this.$router.push(to)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .c-tab-bar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    overflow: hidden;
    background-color: #ffffff;
    box-sizing: border-box;

    nav {
      height: 60px;
      width: 80vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: auto;
      box-sizing: border-box;
    }

    .tab-item {

    }
  }
</style>
