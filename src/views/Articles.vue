<template>
  <div class="story-view view">

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
          v-for="(article, i) in articleList" :key="`article-${i}`"
          :title="article.title"
          :tags="article.tags"
          :id="article.id"
        ></c-card>
      </div>

      <div class="story-after">
        <c-loader
          v-if="articleList.length <= 0"
          empty-text="暂时没有文章可以展示"
          :is-loading="articlesLoading"
        ></c-loader>

        <div class="pagination">
          <c-pagination
            :total-count="totalCount"
            v-model="queryObj.page"
            @change="loadArticles"
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
  import CLoader from '../components/Loader'
  import { requests } from '../lib/requests'
  import { objToQueryString } from '../lib/utls'
  import { authenticated } from '../lib/store'

  export default {
    components: {
      CPagination,
      CTag,
      CBtn,
      CCard,
      CLoader
    },
    data: () => ({
      // 0 - search by text
      // 1 - search by tag name
      // 2 - combined search
      queryType: -1,
      queryObj: {
        search: '',
        tags: {
          id: 0,
          name: ''
        },
        page: 1
      },

      /* article list */
      articleList: [],
      tagList: [],
      totalCount: 0,

      articlesLoading: true,
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
        this.loadArticles()
      },
      resetQueryTags() {
        this.queryObj.tags = { id: 0, name: '' }
        this.queryObj.page = 1
        this.queryType = this.queryObj.search === '' ? -1 : 0;
        this.loadArticles()
      },
      search() {
        if(this.queryObj.search) {
          this.queryObj.page = 1;
          this.loadArticles()
          this.queryType = this.queryObj.tags.id === 0 ? 0 : 2;
        }
      },
      filter(tag) {
        console.log(tag)
        this.queryObj.page = 1;
        this.queryObj.tags = tag;
        this.loadArticles()
        this.queryType = this.queryObj.search === '' ? 1 : 2;
      },
      loadArticles() {
        this.articlesLoading = true
        let q = objToQueryString(this.queryObj)
        requests.get(`/api/articles/${q}`, res => {
          this.articleList = res.data.results
          this.totalCount = res.data.count
          this.articlesLoading = false
        }, error => {
          this.$msg({
            message: `loadArticles 错误`,
            duration: 2000
          })
          console.log(error)
        })
      },
      loadTags() {
        requests.get(`/api/article-tags/`, res => {
          this.tagList = res.data
          this.tagsLoading = false
        }, error => {
          console.log(error)
        })
      },
    },
    mounted () {
      this.loadArticles()
      this.loadTags()
    }
  }
</script>
