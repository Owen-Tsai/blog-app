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
        v-for="(works, i) in worksList" :key="`post-${i}`"
      >
        <td>{{ works.id }}</td>
        <td>
          <router-link
            class="link"
            :to="`/works/${works.id}/`"
          >{{ works.title }}</router-link>
        </td>
        <td>{{ works.publish_time }}</td>
        <td>{{ works.views }}</td>
        <td class="center">
          <c-btn primary small style="margin-right: 10px">编辑</c-btn>
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
      worksList: [],

      /* paginator */
      page: 1,
      totalCount: 0
    }),
    methods: {
      loadWorks() {
        requests.get(`/api/works?page=${page}`, res => {
          this.worksList = res.data.results
          this.totalCount = res.data.count
        }, error => {
          console.log(error)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/hover";

  .admin-table {
    width: 100%;
    border-collapse: collapse;

    thead {
      border-bottom: 2px solid #000000;
      td {
        height: 40px;
      }
    }

    tbody {
      td {
        border-bottom: 1px solid #000000;
        font-size: 14px;
        height: 50px;
      }
    }

    td {
      &.left {
        text-align: left;
      }
      &.right {
        text-align: right;
      }
      &.center {
        text-align: center;
      }

      .link {
        @include hover;
      }
    }
  }
</style>
