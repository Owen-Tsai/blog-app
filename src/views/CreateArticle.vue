<template>
  <div class="view-no-flex">
    <div class="editor-toolbar reactive-background">
      <div class="left">
        <label>
          <span>文章标题</span>
          <input type="text" v-model="story.title">
        </label>
        <div class="controls">
          <c-btn primary @click="publishArticle" v-if="!updateInstead">发布</c-btn>
          <c-btn primary @click="updateArticle" v-else>更新</c-btn>
          <c-btn @click="saveAsDraft">保存</c-btn>
        </div>
      </div>
      <div class="right">
        <span
          class="mode-btn"
          :class="{'active': mode === 0}"
          @click="mode = 0"
        >对比模式</span>
        <span
          class="mode-btn"
          :class="{'active': mode === 1}"
          @click="mode = 1"
        >编辑模式</span>
        <span
          class="mode-btn"
          :class="{'active': mode === 2}"
          @click="mode = 2"
        >预览模式</span>
      </div>
    </div>
    <c-editor
      :debounce="100"
      :mode="mode"
      ref="editor"
      v-model="story.content"
    ></c-editor>

    <c-fab primary @click="imageBedVisible = !imageBedVisible">
      <image-24></image-24>
    </c-fab>

    <transition>
      <div class="image-bed reactive-block-background" v-show="imageBedVisible">
        <c-uploader></c-uploader>
      </div>
    </transition>
  </div>
</template>
<script>
  import CEditor from '../components/Editor'
  import CBtn from '../components/Button'
  import CFab from '../components/FloatingButton'
  import CUploader from '../components/ImageUpload'
  import { requests } from '../lib/requests'
  import MetaMixin from '../lib/mixin.meta-parser'

  export default {
    components: { CUploader, CFab, CBtn, CEditor },
    mixins: [
      MetaMixin
    ],
    data: () => ({
      mode: 0,
      updateInstead: false,
      param: -1,

      story:{
        title: '',
        content: '',
        tags: [],
      },
      imageBedVisible: false
    }),
    methods: {
      saveAsDraft() {
        requests.post(`/api/drafts/`, {
          title: this.story.title,
          content: this.story.content
        }, res => {
          this.$msg({
            message: 'Draft Saved',
            duration: 2000
          })
        },error => {
          console.log(error)
        })
      },
      publishArticle() {
        this.parseMeta()

        requests.post(`/api/articles/`, {
          title: this.story.title,
          tags: this.story.tags,
          content: this.story.content
        }, () => {
          this.$msg({
            message: 'Story Published',
            duration: 2000
          })
        }, error => {
          console.log(error)
        })
      },
      updateArticle() {
        this.parseMeta()

        requests.put(`/api/articles/${this.param['article']}/`, {
          title: this.story.title,
          tags: this.story.tags,
          content: this.story.content
        }, () => {
          this.$msg({
            message: 'Story Updated',
            duration: 2000
          })
        }, error => {
          console.log(error)
        })
      },
      parseRouterParam() {
        const param = this.$route.query
        if(param && param['draft']) {
          this.loadDraftToEditor(param['draft'])
        } else if(param && param['article']) {
          this.loadArticleToEditor(param['article'])
          this.updateInstead = true
          this.param = param
        }
      },
      loadDraftToEditor(id) {
        requests.get(`/api/drafts/${id}/`, res => {
          this.initLoadedContext(res.data)
        }, error => {
          console.log(error)
          this.$msg({
            message: 'loadDraftToEditor 错误',
            duration: 2000
          })
        })
      },
      loadArticleToEditor(id) {
        requests.get(`/api/articles/${id}/`, res => {
          this.initLoadedContext(res.data)
        }, error => {
          console.log(error)
          this.$msg({
            message: 'loadArticleToEditor 错误',
            duration: 2000
          })
        })
      },
      initLoadedContext(data) {
        this.story.title = data.title
        this.story.content = data.content
        this.$refs.editor.rawContent = this.story.content
        this.$refs.editor.render()
      },

    },
    mounted () {
      this.parseRouterParam()
    }
  }
</script>
