<template>
  <section class="theme-switch">
    <div class="toggle-btn">
      <input type="checkbox" v-model="isDarkMode">
      <span></span>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ColorSelector',
    data: () => ({
      isDarkMode: false
    }),
    methods: {
      changeTheme(theme) {
        this.isDarkMode = theme === 'dark'
      }
    },
    watch: {
      isDarkMode(val) {
        if (val) {
          localStorage.setItem('owen-theme', 'dark')
          document.body.setAttribute('data-theme', 'dark')
        } else {
          localStorage.setItem('owen-theme', 'light')
          document.body.setAttribute('data-theme', 'light')
        }
      }
    },
    mounted () {
      const storedTheme = localStorage.getItem('owen-theme')
      if(storedTheme && storedTheme === 'dark') {
        this.changeTheme('dark')
      } else {
        this.changeTheme('light')
        localStorage.setItem('owen-theme', 'light')
        document.body.setAttribute('data-theme', 'light')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .theme-switch {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    right: 6vw;
    top: 50vh;

    .toggle-btn {
      position: relative;
      width: 24px;
      height: 48px;
      margin: 0 auto;
      border-radius: 40px;

      input {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
        cursor: pointer;
        opacity: 0;
        z-index: 2;
      }

      span {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        opacity: 1;
        background-color: $dark-color;
        border-radius: 40px;
        transition: 0.2s ease background-color, 0.2s ease opacity;

        &:before, &:after {
          content: '';
          position: absolute;
          top: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          transition: 0.5s ease transform, 0.2s ease background-color;
        }

        &:before {
          // used for clip :after
          background-color: #000000;
          z-index: 1;
          transform: translate(4px, -20px);
        }

        &:after {
          // used to indicate selection
          background-color: #ffffff;
          z-index: 0;
          transform: translate(4px, 0);
        }
      }

      input:active + span {
        opacity: 0.5;
      }

      input:checked {
        & + span {
          background-color: $light-color;

          &:before {
            background-color: $light-color;
            transform: translate(8px, 16px);
          }

          &:after {
            background-color: $dark-color;
            transform: translate(4px, 24px);
          }
        }
      }
    }
  }
</style>
