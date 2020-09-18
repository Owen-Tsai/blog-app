<template>
  <div class="c-pagination">
    <!--  first page  -->
    <div
      class="paginator"
      :disabled="currentPage === 1"
    >
      <page-first-20></page-first-20>
    </div>
    <!--  previous  -->
    <div
      class="paginator"
      :disabled="currentPage === 1"
    >
      <chevron-left-20></chevron-left-20>
    </div>
    <!-- list  -->
    <div
      class="paginator"
      :disabled="currentPage === 1"
    ></div>
    <!--  next  -->
    <div
      class="paginator"
      :disabled="currentPage === 1"
    >
      <chevron-right-20></chevron-right-20>
    </div>
    <!--  last page  -->
    <div
      class="paginator"
      :disabled="currentPage === 1"
    >
      <page-last-20></page-last-20>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CPagination',
    props: {
      // total count of the items
      totalCount: {
        type: Number,
        default: 0
      },
      // how many items should be displayed in one page
      itemsPerPage: {
        type: Number,
        default: 8
      },
      // how many paginators can be shown at a time
      limit: {
        type: Number,
        default: 5
      }
    },
    data: () => ({
      currentPage: 1
    }),
    computed: {
      totalPage() {
        return Math.ceil(this.totalCount / this.itemsPerPage)
      },
      renderPage() {
        return Math.min(this.limit, this.totalPage)
      }
    },
    watch: {
      currentPage(val) {
        // todo: calculate
      }
    }
  }
</script>
