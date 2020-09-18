<template>
  <div class="project-list-panel">
    <div
      class="project"
      v-for="(project, i) in projectList" :key="`project-${i}`"
    >
      <details>
        <summary>{{ project.name }}</summary>
        <section>
          <div class="tags">
            <c-tag class="tag">Django</c-tag>
            <c-tag class="tag">Vue.js</c-tag>
            <c-tag class="tag">Web 前端</c-tag>
          </div>
          <div class="info">
            <p>2020.6 - 2020.9</p>
            <p>前端开发 / 后端开发</p>
          </div>
          <div class="detail">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae commodi doloribus ducimus earum error facilis hic, iusto laboriosam non, officia provident quam qui quisquam quod repellat sed sit voluptatem.</p>
          </div>
        </section>
      </details>
    </div>
  </div>
</template>

<script>
  import CTag from './Tag'
  export default {
    name: 'ProjectListPanel',
    components: { CTag },
    /*props: {
      projectList: Array,
    }*/
    data: () => ({
      projectList: [
        { id: 1, name: '基于 Vue.js 的智能家居系统原型' },
        { id: 2, name: '四川省高校毕业生就业数据可视化分析系统' },
        { id: 3, name: '自贡市自流井区人民法院自主服务系统' },
        { id: 4, name: '山东大学基础教育集团移动智慧校园' },
        { id: 5, name: '基于 Vue.js 的智能家居系统原型' },
        { id: 6, name: '基于 Unity 的 3D 远程虚拟实验操作系统' },
      ],
      currentSelected: null
    }),
    methods: {
      changeActiveItem(id, index) {
        // TODO: send request to fetch project detail with id
        this.currentSelected = index
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../styles/hover";

  .project-list-panel {
    box-sizing: border-box;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 2rem;

    details[open] summary ~ * {
      animation: open 0.3s ease-in-out;
    }

    @keyframes open {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    details summary::-webkit-details-marker {
      display: none;
    }

    details summary {
      width: 100%;
      padding: 0.5rem 0;
      border-top: 1px solid black;
      position: relative;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 300;
      list-style: none;
      box-sizing: border-box;
    }

    details summary:after {
      content: "＋";
      color: black;
      position: absolute;
      font-size: 1.75rem;
      line-height: 0;
      margin-top: 0.75rem;
      right: 0;
      font-weight: 200;
      transform-origin: center;
      transition: 200ms linear;
    }
    details[open] summary:after {
      content: "×";
    }
    details summary {
      outline: 0;
    }
    details section {
      font-size: 0.95rem;
      margin: 0 0 1rem;
      padding: 1rem;
    }

    .tag {
      margin-right: 10px;
    }
  }
</style>
