<template>
  <div class="image-uploader" ref="uploader">
    <div class="previewer" ref="previewer">
      <div
        class="image"
        v-for="(image, i) in urls" :key="`image-${i}`"
      >
        <img :src="image.src" alt="url">
        <span class="overlay">
          <copy-20 class="icon" @click="copyUrl"></copy-20>
          <close-20 class="icon" @click="remove(image.id)"></close-20>
        </span>
      </div>
      <div class="activator" @click="launchFilePicker">
        <add-20 class="icon"></add-20>
      </div>
    </div>

    <input
      type="file" ref="fileUploader"
      @change="onFileChange"
      style="display: none"
    />
  </div>
</template>

<script>
  import { requests } from '../lib/requests'

  export default {
    name: 'CUploader',
    props: {
      maxCount: {
        type: Number,
        default: 1
      },
      cols: {
        type: Number,
        default: 3
      },
      maxSize: {
        type: Number,
        default: 4096
      },
      supportedType: {
        type: String,
        default: 'image.*'
      },
      minHeight: Number,
      maxHeight: {
        type: Number,
        default: 300
      },
      gridGap: {
        type: Number,
        default: 6
      },
      hoverable: Boolean,
      enableSrcCopy: {
        type: Boolean,
        default: true
      },
      allowCopy: {
        type: Boolean,
        default: true
      },
      allowDelete: {
        type: Boolean,
        default: true
      },
    },
    data: () => ({
      // id, image
      urls: [

      ]
    }),
    computed: {
    },
    methods: {
      onFileChange(e) {
        const file = e.target.files[0] || null;
        if(!file) {
          return;
        }
        if(this.validate(file)) {
          this.uploadImage(file);
        } else {
          // clear input file list
          this.$refs.fileUploader.target.value = '';
        }
      },
      copyUrl(src) {
        if(!this.enableSrcCopy) {
          return;
        }
        if(navigator.clipboard) {
          navigator.clipboard.writeText(src);
          this.$msg(`图片路径已复制`);
        } else {
          this.$msg(src, `图片地址`)
        }
      },
      remove(id) {
        requests.delete(`/api/images/${id}/`, () => {
          this.$msg(`图片删除成功`);
          this.urls = this.urls.filter(img => img.id !== id);
        }, error => {
          this.$msg(`图片删除失败`);
          console.log(error);
        })
      },
      validate(file) {
        if(!file.type.match(this.supportedType)) {
          this.$msg(`上传的图片不是合法的格式`);
          return false;
        }
        if(file.size / this.maxSize / this.maxSize > 1) {
          this.$msg(`上传的图片大小必须在 ${this.maxSize} kb 之内`);
          return false;
        }
        return true;
      },
      uploadImage(file) {
        let fd = new FormData();
        fd.append('src', file);
        requests.post(`/api/images/`, fd, res => {
          this.urls.push({
            id: res.data.id,
            src: res.data.src
          });
        }, err => {
          const info = err.data.info ? err.data.info : err;
          this.$msg(`上传图片失败 ${info}`);
        })
      },
      launchFilePicker() {
        this.$refs.fileUploader.click()
      },
      setStyle() {

      },
    },
    mounted() {
      this.setStyle()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .image-uploader {
    overflow-x: hidden;
    padding: 1rem;

    .previewer {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.5rem;
      padding-right: 10px;
      max-height: 260px;
      overflow-y: scroll;

      .image {
        width: 100%;
        position: relative;

        img {
          width: 100%;
          object-fit: cover;
          height: 120px;
          z-index: 1;
        }

        .overlay {
          z-index: 2;
          opacity: 0;
          transition: opacity .3s;
          background-color: rgba($dark-color, 0.6);
          color: $light-color;
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          overflow: hidden;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon {
            cursor: pointer;

            &:first-child {
              margin-right: 1rem;
            }
          }
        }

        &:hover {
          .overlay {
            opacity: 1;
          }
        }
      }

      .activator {
        width: 100%;
        height: 120px;
        border: 2px dashed rgba($dark-color, 0.5);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  body[data-theme="dark"] {
    .activator {
      border-color: rgba($light-color, 0.5) !important;
    }
  }
</style>
