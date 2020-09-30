<template>
  <div class="project-list-panel">
    <div
      class="project"
      v-for="(project, i) in projectList" :key="`project-${i}`"
    >
      <details>
        <summary>{{ project.title }}</summary>
        <section>
          <div class="tags">
            <c-tag
              class="tag"
              small
              v-for="(tag, i) in project.tags" :key="`tag-${i}`"
            >{{ tag }}</c-tag>
          </div>
          <div class="info">
            <p>{{ project.date }}</p>
            <p>{{ project.role }}</p>
          </div>
          <div class="detail">
            <p>{{ project.intro }}</p>
            <ul>
              <li v-for="(line, i) in project.duties" :key="`item-${i}`">{{ line }}</li>
            </ul>
          </div>
        </section>
      </details>
    </div>
  </div>
</template>

<script>
  import CTag from './Tag'
  import projectList from '../../public/static-data/project-exp.json'

  export default {
    name: 'ProjectListPanel',
    components: { CTag },
    data: () => ({
      projectList: projectList,
      currentSelected: null
    }),
  }
</script>

<style lang="scss" scoped>
  @import "../styles/hover";
  @import "../styles/var";

  .project-list-panel {
    box-sizing: border-box;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    .info {
      margin-top: 2rem;
      p {
        margin: 0;
        font-size: 0.85rem;
      }
    }

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
      border-top: 1px solid $dark-color;
      position: relative;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 300;
      list-style: none;
      box-sizing: border-box;
    }

    details summary:after {
      content: "＋";
      color: $dark-color;
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

  @media screen and (max-width: 810px) {
    .project-list-panel {
      overflow-y: hidden;
      overflow-x: hidden;
      height: auto;
      border: none;
      padding: 0;
      box-sizing: border-box;

      details summary {
        font-size: 1rem;
        padding-right: 30px;
      }

      details summary:after {
        font-size: 1.2rem;
      }

      .tag {
        margin-right: 6px;
      }
    }
  }

  body[data-theme="dark"] {
    details summary {
      border-color: $light-color;
    }
    details summary:after {
      color: $light-color;
    }
  }
</style>
