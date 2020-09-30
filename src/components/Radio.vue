<template>
  <label class="c-radio">
    <input
      type="radio"
      :name="name"
      :value="value"
      v-model="model"
    >
    <span class="design"></span>
    <span class="text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
  export default {
    name: 'CRadio',
    props: {
      name: String,
      value: Boolean
    },
    computed: {
      model: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    margin: 12px 0;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
  }


  /* input */
  input {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: -1;
  }


  /* .design */
  .design {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #000000;
    margin-right: 16px;
    position: relative;
    box-sizing: content-box;
  }

  .design::before,
  .design::after {
    content: "";
    display: block;

    width: inherit;
    height: inherit;

    border-radius: inherit;

    position: absolute;
    transform: scale(0);
    transform-origin: center center;
  }

  .design:before {
    background: #000000;
    opacity: 0;
    transition: .3s;
  }

  .design::after {
    background: #000000;
    opacity: .4;
    transition: .6s;
  }


  /* .text */
  .text {
    color: #000000;
  }


  /* checked state */
  input:checked+.design::before {
    opacity: 1;
    transform: scale(.6);
  }


  /* other states */
  input:hover+.design,
  input:focus+.design {
    border: 2px solid #000000;
  }

  input:hover+.design:before,
  input:focus+.design:before {
    background: #000000;
  }

  input:hover~.text {
    color: #000000;
  }

  input:focus+.design::after,
  input:active+.design::after {
    opacity: .1;
    transform: scale(2.6);
  }
</style>
