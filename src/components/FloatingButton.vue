<template>
  <button
    :class="['c-fab', {
      'sharp': sharp,
      'primary': primary,
      'absolute': absolute,
    }, `fixed-${position}`]"
    v-if="!mobile"
    @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  import { mobileCheck } from '../lib/utls'

  export default {
    name: 'CFab',
    props: {
      sharp: Boolean,
      primary: Boolean,
      position: {
        type: String,
        default: 'right'
      },
      absolute: Boolean,
      to: String
    },
    computed: {
      mobile() {
        return mobileCheck()
      }
    },
    methods: {
      handleClick(evt) {
        if(this.to) {
          this.$router.push(this.to)
        }

        this.$emit('click', evt)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .c-fab {
    position: fixed;
    bottom: 60px;
    border: 2px solid $dark-color;
    outline: none;
    background-color: transparent;
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    z-index: 9;

    &.absolute {
      position: absolute;
      bottom: 1rem;

      &.fixed-right {
        right: 1rem;
      }

      &.fixed-left {
        left: 1rem;
      }
    }

    &.sharp {
      border-radius: 0;
    }

    &.primary {
      background-color: $dark-color;
      color: $light-color;
    }

    &.fixed-right {
      right: 60px;
    }

    &.fixed-left {
      left: 120px;
    }
  }

  body[data-theme="dark"] {
    .c-fab {
      border-color: $light-color;

      &.primary {
        background-color: $light-color;
        color: $dark-color;
      }
    }
  }
</style>
