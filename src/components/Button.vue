<template>
  <button :class="[
    'btn',
    {
      'primary': primary,
      'small': small,
      'block': block
    },
  ]" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'CBtn',
    props: {
      primary: Boolean,
      flat: Boolean,
      to: [String, Object],
      small: Boolean,
      block: Boolean
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

  $hover-color: lighten($dark-color, 10%);
  $hover-color-dark: mix($light-color, $dark-color, 90%);

  .btn {
    border: 2px solid $dark-color;
    font-weight: 500;
    color: $dark-color;
    padding: 0 1rem;
    height: 38px;
    transition: all .3s;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: $hover-color;
      color: $hover-color;
    }

    &.primary {
      background-color: $dark-color;
      color: $light-color;

      &:hover {
        background-color: $hover-color;
      }
    }

    &.block {
      display: flex;
      width: 100%;
    }

    &.small {
      padding: 0.2rem 0.7rem;
    }
  }

  body[data-theme="dark"] {
    .btn {
      color: $light-color;
      border: 2px solid $light-color;

      &:hover {
        border-color: $hover-color-dark;
        color: $hover-color-dark;
      }

      &.primary {
        background-color: $light-color;
        color: $dark-color;

        &:hover {
          background-color: $hover-color-dark;
        }
      }
    }
  }
</style>
