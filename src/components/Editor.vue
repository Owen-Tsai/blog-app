<template>
  <div class="editor-container">
    <div class="editing-area" v-if="editorMode !== 2">
      <textarea
        @input="render"
        placeholder="Start creating..."
        ref="input"
        v-model="rawContent"
      ></textarea>
    </div>
    <div
      class="preview-area"
      :class="{'no-border': editorMode === 2}"
      v-if="editorMode !== 1"
      v-html="renderedContent"
    ></div>
  </div>
</template>

<script>
  import editorMixin from '../lib/mixin.editor'

  export default {
    name: 'CEditor',
    mixins: [
      editorMixin
    ],
    props: {
      value: String,
      mode: Number
    },
    data: () => ({
      rawContent: '',
      metaContent: '',
      renderedContent: '',

      editorMode: 0
    }),
    watch: {
      mode(val) {
        this.editorMode = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .editor-container {
    display: flex;
    align-items: stretch;
    border: 2px solid $dark-color;
    border-top-width: 1px;

    .editing-area {
      width: 50%;
      flex-grow: 1;
      padding: 1rem;
      min-height: calc(100vh - 200px);

      textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        background-color: transparent;
        color: $dark-color;
      }
    }

    .preview-area {
      width: 50%;
      flex-grow: 1;
      padding: 1rem;
      border-left: 1px solid $dark-color;
      min-height: calc(100vh - 200px);

      &.no-border {
        border: none;
      }
    }
  }

  body[data-theme="dark"] {
    .editor-container, .preview-area {
      border-color: $light-color;
    }

    textarea {
      color: $light-color !important;
    }
  }
</style>
