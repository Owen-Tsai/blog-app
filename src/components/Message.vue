<template>
  <transition>
    <div class="c-message" :style="style" v-if="visible">
      <div class="message-content">
        {{ message }}
      </div>
      <div class="close-icon" @click="close">
        <close-20></close-20>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'CMessage',
    data: () => ({
      visible: true,
      message: '',
      closed: false,
      onClose: null,
      verticalOffset: 0
    }),
    computed: {
      style() {
        return {
          top: `${this.verticalOffset}px`
        }
      }
    },
    methods: {
      startTimer() {
        if(this.duration > 0 && !this.closed) {
          this.timer = setTimeout(() => {
            this.close()
          }, this.duration)
        }
      },
      close() {
        this.visible = false
        this.closed = true
        if(typeof this.onClose === 'function') {
          this.onClose(this)
        }
      }
    },
    mounted () {
      this.startTimer()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .c-message {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1rem;
    position: fixed;
    width: 400px;
    right: calc(50vw - 200px);
    z-index: 2000;
    background-color: rgba($error-color, 0.8);
    border: 2px solid $error-color;
    color: $light-color;

    .close-icon, .message-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-icon {
      cursor: pointer;
    }
  }
</style>
