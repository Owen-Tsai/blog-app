<template>
  <div class="view-no-flex">
    <div class="editor-toolbar reactive-background">
      <div class="left">
        <label>
          <span>作品名称</span>
          <input type="text" v-model="story.title">
        </label>
        <div class="controls">
          <c-btn primary @click="publishWorks" v-if="!updateInstead">发布</c-btn>
          <c-btn primary @click="updateWorks" v-else>更新</c-btn>
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
      publishWorks() {
        this.parseMeta()

        console.log(this.story)

        requests.post(`/api/works/`, {
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
      updateWorks() {
        this.parseMeta()

        requests.put(`/api/works/${this.param}/`, {
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
        if(param && param['works']) {
          this.loadWorksToEditor(param['works'])
          this.param = param
        }
      },
      loadWorksToEditor(id) {
        requests.get(`/api/works/${id}/`, res => {
          this.initLoadedContext(res.data)
        }, error => {
          console.log(error)
          this.$msg({
            message: 'loadWorksToEditor 错误',
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

<style lang="scss" scoped>
  @import "../styles/hover";

  .editor-toolbar {
    height: 60px;
    border: 2px solid #000000;
    border-bottom-width: 1px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 60px;
    z-index: 99;

    .left {
      display: flex;
      align-items: center;
    }

    .right {
      font-size: 14px;

      .mode-btn {
        margin-left: 10px;
        cursor: pointer;
        @include hover;

        &.active {
          @include active;
        }
      }
    }

    label {
      font-size: 14px;
      span {
        margin-right: 10px;
      }
      input {
        height: 40px;
        padding: 0 10px;
        width: 240px;
      }
    }

    .controls {
      margin-left: 1rem;
    }
  }

  .image-bed {
    position: fixed;
    bottom: 120px;
    right: 120px;
    border: 2px solid #000000;
    width: 500px;

  }
</style>
