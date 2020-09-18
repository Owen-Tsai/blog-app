<template>
  <div :class="[
    'c-tag',
    {
      'dark': dark,
      'sharp': sharp
    }
   ]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CTag',
    props: {
      dark: Boolean,
      sharp: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .c-tag {
    padding: 3px 15px;
    font-size: 14px;
    border: 1px solid #000000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    user-select: none;

    &.dark {
      color: #ffffff;
      background-color: #000000;
    }

    &.sharp {
      border-radius: 0;
    }
  }
</style>
