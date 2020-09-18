<template>
  <div class="c-article-card" @click="navigateTo">
    <div class="header">{{ title }}</div>
    <div class="tags">
      <c-tag
        v-for="(tag, i) in tags" :key="`tag-${i}`"
      >{{ tag }}</c-tag>
    </div>
  </div>
</template>

<script>
  import CTag from './Tag'

  export default {
    name: 'CCard',
    components: { CTag },
    props: {
      id: Number,
      title: String,
      tags: Array,
      type: {
        type: String,
        default: 'articles'
      }
    },
    methods: {
      navigateTo() {
        this.$router.push(`/${this.type}/${this.id}/`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/hover";

  .c-article-card {
    border: 2px solid #000000;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 2rem;
    height: 280px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;

    @include shadow-hover;

    .header {
      font-size: 2rem;
    }

    .tags > .c-tag {
      margin-right: 6px;
    }
  }
</style>
