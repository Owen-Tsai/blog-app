<template>
  <div class="c-collection-card">
    <div class="header">
      <span>{{ title }}</span>
      <p>{{ intro }}</p>
    </div>
    <div class="count">收录 {{ count }} 篇文章</div>
  </div>
</template>

<script>
  export default {
    name: 'CCollectionCard',
    props: {
      title: String,
      intro: String,
      count: Number
    },

  }
</script>

<style lang="scss" scoped>
  @import "../styles/hover";
  .c-collection-card {
    background-color: #fff;
    position: relative;
    border: 2px solid #000000;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 2rem;
    height: 280px;
    cursor: pointer;

    .header {
      font-size: 2rem;

      h2 {
        margin: 0;
        padding: 0;
        font-weight: normal;
      }
    }
  }

  .c-collection-card,
  .c-collection-card::before,
  .c-collection-card::after {
    /* Add shadow to distinguish sheets from one another */
    box-shadow: 2px 1px 1px rgba(0,0,0,0.15);
  }

  .c-collection-card::before,
  .c-collection-card::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #eee;
  }

  /* Second sheet */
  .c-collection-card::before {
    left: 7px;
    top: 5px;
    z-index: -1;
  }

  /* Third sheet of c-collection-card */
  .c-collection-card::after {
    left: 12px;
    top: 10px;
    z-index: -2;
  }
</style>
