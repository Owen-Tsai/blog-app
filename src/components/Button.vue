<template>
  <button :class="[
    'btn',
    {
      'primary': primary,
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
  $hover-color: lighten(#000000, 25%);
  .btn {
    border: 2px solid #000000;
    font-weight: 500;
    color: #000000;
    padding: 0.5rem 1.4rem;
    transition: all .3s;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;

    &:hover {
      border-color: $hover-color;
      color: $hover-color;
    }

    &.primary {
      background-color: #000000;
      color: #ffffff;

      &:hover {
        background-color: $hover-color;
      }
    }
  }
</style>
