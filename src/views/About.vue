<template>
  <div class="view-full-page">
    <section class="introduction">
      <div>
        <p>我是 Owen，一名 Web 前端工程师。欢迎来到我的网站。</p>
        <p>我说中文和简单的英语，我参与过一些游戏和 Web 文档的中文本地化。我乐于尝试新技术，喜欢喵星人。</p>
        <p>我也玩电子游戏，从最著名的系列到独立作品都会尝试。</p>
      </div>
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
    </section>

    <section class="project-exp">
      <project-list-panel></project-list-panel>
    </section>
  </div>
</template>

<script>
  import ProjectListPanel from '../components/ProjetListPanel'
  export default {
    components: { ProjectListPanel }
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
      width: 46%;
      height: 90%;
      box-sizing: border-box;
    }

    .contact {
      margin-top: 60px;
      .contact-item {
        display: flex;
        align-items: center;
        margin-top: 6px;

        a {
          margin-left: 10px;
        }
      }
    }

    .project-exp {
      overflow-y: hidden;
      border: 2px solid #000000;
    }
  }
</style>
