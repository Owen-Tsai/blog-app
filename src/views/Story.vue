<template>
  <div class="view story-detail-view">
    <section class="story">
      <article v-if="!loading">
        <div class="article-header">
          <h1>{{ title }}</h1>
          <p>{{ publishTime }}</p>
          <div class="tags">
            <c-tag
              v-for="(tag, i) in tags" :key="`tag-${i}`"
              class="tag"
            >{{ tag.name }}</c-tag>
          </div>
        </div>

        <hr class="article-divider">

        <div class="content" v-viewer v-html="content"></div>

        <hr class="article-divider">
      </article>

      <c-loader
        v-else
        :is-loading="loading"
      ></c-loader>

    </section>
    <aside class="story-side-menu" v-if="!loading">
      <div class="toc">
        <ul v-html="toc" v-if="toc"></ul>
        <p v-else style="text-align: center">文本没有目录</p>
      </div>
    </aside>
  </div>
</template>

<script>
  import CTag from '../components/Tag'
  import RendererMixin from '../lib/mixin.renderer'
  import StoryMixin from '../lib/mixin.story'
  import { requests } from '../lib/requests'
  import CLoader from '../components/Loader'
  import { scrollToNode } from '../lib/utls'

  export default {
    components: { CLoader, CTag },
    mixins: [
      RendererMixin,
      StoryMixin
    ],
    methods: {
      getStory(id) {
        requests.get(`/api/articles/${id}`, res => {
          this.title = res.data.title
          this.publishTime = res.data.publish_time
          this.tags = res.data.tags
          this.render(res.data.content)
        }, error => {
          if(error.status === 404) {
            this.$router.push('/404')
          } else {
            console.log(error)
            this.$msg({
              message: '文章载入错误',
              duration: 2000
            })
          }
        })
      },
    }
  }
</script>
