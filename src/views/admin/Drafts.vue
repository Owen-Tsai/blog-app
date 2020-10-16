<template>
  <div class="sub-view">
    <table class="admin-table">
      <thead>
      <tr>
        <td style="width: 10%">ID</td>
        <td style="width: 40%">标题</td>
        <td style="width: 20%">最近编辑时间</td>
        <td class="center" style="width: 30%">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, i) in itemList" :key="`post-${i}`"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.update_time }}</td>
        <td class="center">
          <c-btn primary small style="margin-right: 10px" :to="`/create-article?draft=${item.id}`">继续编辑</c-btn>
          <c-btn small @click="deleteDraft(item.id)">废除</c-btn>
        </td>
      </tr>
      </tbody>
    </table>

    <c-pagination
      style="margin-top: 1rem"
      :total-count="5"
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
      itemList: [],

      /* paginator */
      page: 1,
      totalCount: 0
    }),
    methods: {
      loadDrafts() {
        requests.get(`/api/drafts?page=${this.page}`, res => {
          this.itemList = res.data.results
          this.totalCount = res.data.count
        }, error => {
          console.log(error)
        })
      },
      deleteDraft(id) {
        requests.delete(`/api/drafts/${id}/`, res => {
          this.loadDrafts()
        }, err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.loadDrafts()
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
