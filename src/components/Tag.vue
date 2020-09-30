<template>
  <div :class="[
    'c-tag',
    {
      'primary': primary,
      'sharp': sharp,
      'small': small,
      'clickable': clickable
    }
   ]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CTag',
    props: {
      primary: Boolean,
      sharp: Boolean,
      small: Boolean,
      clickable: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .c-tag {
    padding: 3px 15px;
    font-size: 14px;
    border: 1px solid $dark-color;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    user-select: none;

    &.primary {
      color: $light-color;
      background-color: $dark-color;
    }

    &.sharp {
      border-radius: 0;
    }

    &.small {
      padding: 3px 10px;
      font-size: 12px;
    }

    &.clickable {
      cursor: pointer;
    }
  }

  body[data-theme="dark"] {
    .c-tag {
      border: 1px solid $light-color;

      &.primary {
        color: $dark-color;
        background-color: $light-color;
      }
    }
  }
</style>
