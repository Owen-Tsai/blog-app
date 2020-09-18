<template>
  <div class="c-nav-card" @click="navigateTo">
    <div>
      <h2>{{ title }}</h2>
      <p>{{ detail }}</p>
    </div>
    <div class="actions">
      <arrow-right-32></arrow-right-32>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavCard',
    props: {
      title: String,
      detail: String,
      to: [String, Object]
    },
    methods: {
      navigateTo() {
        this.$router.push(this.to)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/hover";

  .c-nav-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border: 2px solid #000000;
    padding: 1.25rem;
    cursor: pointer;
    width: 100%;

    @include shadow-hover;

    h2 {
      margin-top: 0;
    }

    .actions {
      display: block;
      width: 100%;
      text-align: right;
    }
  }
</style>
