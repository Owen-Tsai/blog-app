<template>
  <div class="contact-card">
    <div class="info" v-if="location || salary || companyName">
      {{ location }} / {{ salary }} / {{ companyName }}
    </div>
    <div class="link" v-if="link">
      <a :href="link">{{ link }}</a>
    </div>
    <div class="contact" v-if="wechat">
      微信 {{ wechat }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CContactCard',
    props: {
      link: String,
      salary: String,
      companyName: String,
      wechat: String
    }
  }
</script>

<style lang="scss" scoped>
  .contact-card {
    width: 100%;
    border: 2px solid #000000;
  }
</style>
