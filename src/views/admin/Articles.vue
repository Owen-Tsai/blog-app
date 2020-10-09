<template>
  <div class="sub-view">
    <table class="admin-table">
      <thead>
      <tr>
        <td style="width: 10%">ID</td>
        <td style="width: 40%">标题</td>
        <td style="width: 20%">发布时间</td>
        <td style="width: 10%">热度</td>
        <td class="center" style="width: 20%">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(article, i) in articleList" :key="`post-${i}`"
      >
        <td>{{ article.id }}</td>
        <td>
          <router-link
            class="link"
            :to="`/articles/${article.id}/`"
          >{{ article.title }}</router-link>
        </td>
        <td>{{ article.publish_time }}</td>
        <td>{{ article.views }}</td>
        <td class="center">
          <c-btn
            primary small style="margin-right: 10px"
            :to="`/create-article?article=${article.id}`"
          >编辑</c-btn>
          <c-btn small>删除</c-btn>
        </td>
      </tr>
      </tbody>
    </table>

    <c-pagination
      style="margin-top: 1rem"
      :total-count="totalCount"
      v-model="page"
    ></c-pagination>
  </div>
</template>

<script>
  import CBtn from '../../components/Button'
  import CPagination from '../../components/Pagination'
  import { requests } from '../../lib/requests'
  export default {
    components: { CPagination, CBtn },
    data: () => ({
      articleList: [],

      /* paginator */
      totalCount: 0,
      page: 1
    }),
    methods: {
      loadArticles() {
        requests.get(`/api/articles?page=${this.page}`, res => {
          this.articleList = res.data.results
          this.totalCount = res.data.count
        }, error => {
          console.log(error)
        })
      },
    },
    mounted () {
      this.loadArticles()
    }
  }
</script>

<style lang="scss" scoped>

</style>
