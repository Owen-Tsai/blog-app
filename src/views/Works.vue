<template>
  <div class="view story-view">

    <section class="stories">
      <div
        class="story-filters"
        v-if="queryType !== -1"
      >
        <c-tag
          class="query-chip"
          v-if="queryType === 0 || queryType === 2"
        >
          <span>包含关键字 {{ queryObj.search }} 的文章</span>
          <close-20 class="close-icon" @click="resetQuerySearch"></close-20>
        </c-tag>
        <c-tag
          class="query-chip"
          v-if="queryType === 1 || queryType === 2"
        >
          <span>包含话题标签 {{ queryObj.tags.name }} 的文章</span>
          <close-20 class="close-icon" @click="resetQueryTags"></close-20>
        </c-tag>

      </div>

      <div class="story-card-list">
        <c-card
          v-for="(works, i) in worksList" :key="`works-${i}`"
          :title="works.title"
          :tags="works.tags"
          :id="works.id"
          type="works"
        ></c-card>
      </div>

      <div class="story-after">
        <c-loader
          v-if="worksList.length <= 0"
          empty-text="暂时没有作品可以展示"
          :is-loading="worksLoading"
        ></c-loader>

        <div class="pagination" v-if="worksList.length > 0">
          <c-pagination
            :total-count="totalCount"
            v-model="queryObj.page"
            @change="loadWorks"
          ></c-pagination>
        </div>
      </div>
    </section>

    <aside class="side-menu">
      <section class="search">
        <label>
          <input
            type="text"
            placeholder="Search keywords"
            v-model="queryObj.search"
          >
        </label>
        <c-btn primary class="search-btn" @click="search">
          <search-20></search-20>
        </c-btn>
      </section>
      <section class="topics">
        <c-tag
          class="tag" clickable
          v-for="(tag, i) in tagList" :key="`tag-${i}`"
          @click.native="filter(tag)"
        >{{ tag.name }}</c-tag>
      </section>
    </aside>
  </div>
</template>

<script>
  import CCard from '../components/Card'
  import CBtn from '../components/Button'
  import CTag from '../components/Tag'
  import CPagination from '../components/Pagination'
  import { requests } from '../lib/requests'
  import { objToQueryString } from '../lib/utls'
  import { authenticated } from '../lib/store'
  import CLoader from '../components/Loader'

  export default {
    components: { CLoader, CPagination, CTag, CBtn, CCard },
    data: () => ({
      // 0 - search by text
      // 1 - search by tag name
      // 2 - combined search
      queryType: -1,
      queryObj: {
        title: '',
        tags: {
          id: 0,
          name: ''
        },
        page: 1
      },

      /* works list */
      worksList: [],
      tagList: [],
      totalCount: 0,

      /* loader */
      worksLoading: true,
      tagsLoading: true
    }),
    computed: {
      authenticated() {
        return authenticated()
      }
    },
    methods: {
      resetQuerySearch() {
        this.queryObj.search = ''
        this.queryObj.page = 1
        this.queryType = this.queryObj.tags.id === 0 ? -1 : 1
        this.loadWorks()
      },
      resetQueryTags() {
        this.queryObj.tags = { id: 0, name: '' }
        this.queryObj.page = 1
        this.queryType = this.queryObj.search === '' ? -1 : 0;
        this.loadWorks()
      },
      search() {
        if(this.queryObj.search) {
          this.queryObj.page = 1;
          this.loadWorks()
          this.queryType = this.queryObj.tags.id === 0 ? 0 : 2;
        }
      },
      filter(tag) {
        console.log(tag)
        this.queryObj.page = 1;
        this.queryObj.tags = tag;
        this.loadWorks()
        this.queryType = this.queryObj.search === '' ? 1 : 2;
      },
      loadWorks() {
        this.worksLoading = true
        let q = objToQueryString(this.queryObj)
        requests.get(`/api/works/${q}`, res => {
          this.worksList = res.data.results
          this.totalCount = res.data.count
          this.worksLoading = false
        }, error => {
          this.$msg({
            message: `loadWorks 错误`,
            duration: 2000
          })
          console.log(error)
        })
      },
      loadTags() {
        requests.get(`/api/works-tags/`, res => {
          this.tagList = res.data
          this.tagsLoading = false
        }, error => {
          console.log(error)
        })
      },
    },
    mounted () {
      this.loadWorks()
      this.loadTags()
    }
  }
</script>
