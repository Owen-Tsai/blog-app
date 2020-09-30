<template>
  <div class="view-full-page">
    <section class="introduction">
      <div class="contact">
        <div class="contact-item">
          <email-20></email-20>
          <a href="mailto://owentsai.v@gmail.com">owentsai.v@gmail.com</a>
        </div>
        <div class="contact-item">
          <logo-github-20></logo-github-20>
          <a href="https://www.github.com/Owen-Tsai/">Owen-Tsai</a>
        </div>
      </div>

      <div>
        <p>我是 Owen，一名 Web 前端工程师。欢迎来到我的网站。</p>
        <p>我说中文和简单的英语，我参与过一些游戏和 Web 文档的中文本地化。我乐于尝试新技术，喜欢喵星人。</p>
        <p>我也玩电子游戏，从最著名的系列到独立作品都会尝试。</p>
      </div>

      <div class="recent-status" @wheel="handleScroll" ref="status">
        <div class="items-container">
          <div class="item">
            <p>最近正在读</p>
            <bookmark-32 class="icon"></bookmark-32>
            <div class="text">
              <strong>{{ status.reading.title }}</strong>
              <span>{{ status.reading.intro }}</span>
            </div>
          </div>
          <div class="item">
            <p>最近正在玩</p>
            <game-console-32 class="icon"></game-console-32>
            <div class="text">
              <strong>{{ status.playing.title }}</strong>
              <span>{{ status.playing.intro }}</span>
            </div>
          </div>
          <div class="item">
            <p>最近正在做</p>
            <code-32 class="icon"></code-32>
            <div class="text">
              <strong>{{ status.coding.title }}</strong>
              <span>{{ status.coding.intro }}</span>
            </div>
          </div>
          <div class="item">
            <p>最近想要买</p>
            <gift-32 class="icon"></gift-32>
            <div class="text">
              <strong>{{ status.wishingFor.title }}</strong>
              <span>{{ status.wishingFor.intro }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="secondary-text">
        <pan-20></pan-20>
        <p>滚动了解我的最近动态</p>
      </div>
    </section>

    <section class="project-exp">
      <project-list-panel></project-list-panel>
    </section>
  </div>
</template>

<script>
  import ProjectListPanel from '../components/ProjetListPanel'
  import status from '../../public/static-data/recent-status.json'

  export default {
    components: { ProjectListPanel },
    data: () => ({
      status: status
    }),
    methods: {
      handleScroll(e) {
        let delta = e.deltaY
        this.$refs.status.scrollLeft += (delta / 5)
        e.preventDefault();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .view-full-page {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: calc(100vh - #{$header-height} - 40px);
    max-width: $view-max-width;
    margin: 80px auto 0;
    box-sizing: border-box;
    overflow-y: hidden;

    section {
      width: 472px;
      height: 90%;
      box-sizing: border-box;
      overflow-x: hidden;
    }

    .contact {
      text-align: center;
      margin-bottom: 1rem;
      font-size: 14px;
      padding-left: 1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;

      &:after {
        content: "";
        display: block;
        width: 160px;
        height: 2px;
        margin: 2rem auto;
        background-color: $dark-color;
      }

      .contact-item {
        display: inline-flex;
        align-items: center;
        margin-right: 1rem;

        a {
          margin-left: 10px;
        }
      }
    }

    .project-exp {
      overflow-y: hidden;
      // border: 2px solid $dark-color;
      transition: all ease-in-out .3s;
    }

    .recent-status {
      overflow-x: scroll;
      border: 2px solid $dark-color;
      margin-top: 2rem;

      .items-container {
        width: 800px;
        padding: 0 1rem 2rem;
      }

      .item {
        display: inline-block;
        text-align: center;
        margin-top: 2rem;
        width: 160px;
        margin-right: 32px;

        p {
          margin-top: 0;
          font-size: 14px;
        }

        strong {
          font-size: 16px;
          font-weight: 500;
        }

        span {
          font-size: 12px;
        }
      }

      .icon {
        margin: auto;
      }

      .text {
        display: flex;
        flex-direction: column;
        line-height: 1.5rem;
      }
    }
  }

  .secondary-text {
    font-weight: 300;
    font-size: 14px;
    text-align: center;
    margin-top: 1rem;
    p {
      margin: 0;
    }
  }

  @media screen and (max-width: 810px) {
    .view-full-page {
      flex-direction: column;
      overflow-y: scroll;
      overflow-x: hidden;
      height: auto;
      margin-top: 40px;

      section {
        width: 80vw;
        height: auto;
        margin: 0 auto;
      }

      .project-exp {
        margin-top: 60px;
        margin-bottom: 80px;
        border: none;
      }

      .contact {
        flex-direction: column;

        .contact-item {
          margin-top: 6px;
        }
      }
    }
  }

  body[data-theme="dark"] {
    .contact:after {
      background-color: $light-color;
    }
    .recent-status {
      border-color: $light-color;
    }
  }
</style>
