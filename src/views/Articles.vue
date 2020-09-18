<template>
  <div class="view">

    <section class="articles">
      <div class="articles-list">
        <c-card
          title="Daily Algorithm Challenge Vol.11"
          :tags="['数据结构', '算法']"
        ></c-card>
        <c-card
          title="博客小站的施工 - 前端篇"
          :tags="['Vue.js', 'Web 前端']"
        ></c-card>
        <c-card
          title="创造动人瞬间"
          :tags="['游戏设计']"
        ></c-card>
        <c-card
          title="Daily Algorithm Challenge Vol.11"
          :tags="['数据结构', '算法']"
        ></c-card>
        <c-card
          title="博客小站的施工 - 前端篇"
          :tags="['Vue.js', 'Web 前端']"
        ></c-card>
        <c-card
          title="创造动人瞬间"
          :tags="['游戏设计']"
        ></c-card>
      </div>

      <div class="pagination">
        <c-pagination
          :total-page="7"
        ></c-pagination>
      </div>
    </section>

    <aside class="side-menu">
      <section class="browse-select">
        <c-radio name="browse" checked>按文章浏览</c-radio>
        <c-radio name="browse" style="margin-top: 10px">按 Collection 浏览</c-radio>
      </section>

      <hr>

      <section class="search">
        <label>
          <input
            type="text"
            placeholder="Search keywords"
          >
        </label>
        <c-btn primary class="search-btn">
          <search-20></search-20>
        </c-btn>
      </section>

      <hr>

      <section class="topics">
        <c-tag class="tag">Vue.js</c-tag>
        <c-tag class="tag">Django</c-tag>
        <c-tag class="tag">TypeScript</c-tag>
        <c-tag class="tag">Web 前端</c-tag>
        <c-tag class="tag">NSFW</c-tag>
        <c-tag class="tag">Docker</c-tag>
        <c-tag class="tag">Web 后端</c-tag>
      </section>
    </aside>
  </div>
</template>

<script>
  import CCard from '../components/Card'
  import CRadio from '../components/Radio'
  import CBtn from '../components/Button'
  import CTag from '../components/Tag'
  import CPagination from '../components/Pagination'

  export default {
    components: { CPagination, CTag, CBtn, CRadio, CCard }
  }
</script>

<style lang="scss" scoped>
  .view {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .articles-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.6rem;
    margin-right: 80px;
  }

  .side-menu {
    width: 440px;
    position: sticky;
    top: 80px;
  }

  hr {
    border-top: 1px solid #000000;
    border-bottom: none;
    margin: 2rem 0;
  }

  .search {
    display: flex;
    align-items: center;

    label {
      display: block;
      width: 100%;
    }

    input {
      width: 100%;
      display: block;
      height: 44px;
      box-sizing: border-box;
      padding: 0 10px;

      &:focus {
        border-width: 2px;
        outline: none;
      }
    }

    .search-btn {
      transform: translate(-1px, 0);
    }
  }

  .topics {
    .tag {
      margin: 4px;
    }
  }

  .pagination {
    margin-right: 80px;
    margin-top: 40px;
  }
</style>
