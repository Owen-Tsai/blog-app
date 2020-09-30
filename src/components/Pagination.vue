<template>
  <div class="c-pagination">
    <!--  first page  -->
    <div
      class="paginator"
      :disabled="currentPage === 1 || totalPage === 0"
      @click="toFirstPage"
    >
      <page-first-20></page-first-20>
    </div>
    <!--  previous  -->
    <div
      class="paginator"
      :disabled="currentPage === 1 || totalPage === 0"
      @click="tpPreviousPage"
    >
      <chevron-left-20></chevron-left-20>
    </div>
    <!-- list  -->
    <div
      class="paginator"
      :class="{ 'active': renderStartIndex + i - 1 === currentPage }"
      v-for="i in renderPage" :key="`paginator-${i}`"
      @click="toPage(renderStartIndex + i - 1)"
    >{{ renderStartIndex + i - 1 }}</div>
    <!--  next  -->
    <div
      class="paginator"
      :disabled="currentPage === totalPage || totalPage === 0"
      @click="toNextPage"
    >
      <chevron-right-20></chevron-right-20>
    </div>
    <!--  last page  -->
    <div
      class="paginator"
      :disabled="currentPage === totalPage || totalPage === 0"
      @click="toLastPage"
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
      },
      value: Number
    },
    data: () => ({
      currentPage: 1,
      renderStartIndex: 1
    }),
    computed: {
      totalPage() {
        return Math.ceil(this.totalCount / this.itemsPerPage)
      },
      renderPage() {
        return Math.min(this.limit, this.totalPage)
      },
      middlePage() {
        return (this.renderStartIndex + this.renderStartIndex + this.renderPage - 1) / 2
      }
    },
    methods: {
      toPage(index) {
        if (this.currentPage !== index && this.totalPage > 0) {
          this.currentPage = index
        }
      },
      toFirstPage() {
        if (this.currentPage !== 1 && this.totalPage > 0) {
          this.currentPage = 1
        }
      },
      toLastPage() {
        if (this.currentPage !== this.totalPage && this.totalPage > 0) {
          this.currentPage = this.totalPage
        }
      },
      tpPreviousPage() {
        if (this.currentPage > 1 && this.totalPage > 0) {
          this.currentPage --
        }
      },
      toNextPage() {
        if (this.currentPage < this.totalPage && this.totalPage > 0) {
          this.currentPage ++
        }
      },
      centerActivePaginator() {
        // if total page count is smaller than the display limit
        // then there is no need to center active paginator
        if(this.limit >= this.totalPage) return

        // offset amount between current page and the middle paginator
        console.log(`current page is ${this.currentPage}, middle is ${this.middlePage}`)
        const offset = this.currentPage - this.middlePage

        this.renderStartIndex += offset
        console.log(`offset is ${offset}, render start is ${this.renderStartIndex}`)
      }
    },
    watch: {
      currentPage() {
        this.centerActivePaginator()
        this.$emit('input', this.currentPage)
        this.$emit('change', this.currentPage)
      },
      renderStartIndex(val, oldVal) {
        if(val <= 0) {
          this.renderStartIndex = 1
        }
        if(val + this.renderPage > this.totalPage + 1) {
          this.renderStartIndex = this.totalPage - this.renderPage + 1
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/hover";

  .c-pagination {
    display: flex;
    align-items: center;
    justify-content: center;

    .paginator {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      cursor: pointer;
      user-select: none;
      transition: background-color ease-in-out .3s,
                  color ease-in-out .3s;

      @include hover;

      &[disabled] {
        color: gray;
        cursor: not-allowed;
      }

      &.active {
        background-color: $dark-color;
        color: $light-color;
      }
    }
  }

  body[data-theme="dark"] {
    .paginator {
      @include hover-dark

      &.active {
        background-color: $light-color;
        color: $dark-color;
      }
    }
  }
</style>
