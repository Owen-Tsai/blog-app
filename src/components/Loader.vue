<template>
  <div
    :class="['c-loader', {
      'small': small
    }]"
  >
    <span class="loading-text" v-if="isLoading">
      {{ loadingText }}
    </span>
    <span class="empty-text" v-if="!isLoading">
      {{ emptyText }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'CLoader',
    props: {
      small: Boolean,
      loadingText: {
        type: String,
        default: 'Loading / 加载中'
      },
      emptyText: {
        type: String,
        default: '暂时没有数据'
      },
      isLoading: Boolean,
    }
  }
</script>

<style lang="scss" scoped>
  .c-loader {
    font-size: 20px;
    font-weight: 300;
    margin-top: 1rem;
    text-align: center;

    &.small {
      font-size: 1rem;
      margin-top: 0;
    }
  }
</style>
