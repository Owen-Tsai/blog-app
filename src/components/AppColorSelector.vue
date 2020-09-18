<template>
  <section class="color-selector">
    <div
      v-for="(color, i) in colors" :key="`color-${i}`"
      class="color-indicator hover"
      @click="changeTheme(color.name)"
      :style="{ backgroundColor: color.value }"
      :aria-label="color.name"
      data-microtip-position="left"
      role="tooltip"
    ></div>
  </section>
</template>

<script>
  export default {
    name: 'ColorSelector',
    data: () => ({
      currentColor: null,
      colors: [
        { name: 'white', value: '#ffffff' },
        { name: 'russian-green', value: '#698f5f' },
        { name: 'light-french-beige', value: '#c8af80' },
        { name: 'middle-red', value: '#ed917a' },
      ]
    }),
    methods: {
      changeTheme(theme) {
        this.currentColor = theme
      }
    },
    watch: {
      currentColor(val) {
        localStorage.setItem('owen-theme', val)
        document.body.setAttribute('data-theme', val)
      }
    },
    mounted () {
      const storedTheme = localStorage.getItem('owen-theme')
      if(storedTheme && storedTheme !== 'null') {
        this.changeTheme(storedTheme)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .color-selector {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 2rem;
    top: calc(50% - 52px);

    .color-indicator {
      width: 14px;
      height: 14px;
      border: 2px solid #000000;
      border-radius: 50%;
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
</style>
