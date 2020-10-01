import { scrollToNode } from './utls'

export default {
  data: () => ({
    content: '',
    title: '',
    publishTime: '',
    tags: [],
    loading: true,
    toc: ''
  }),
  methods: {
    render(raw) {
      if(!this.renderer) {
        this.$msg({
          message: 'renderer is not properly initialized',
          duration: 2000
        })
        return
      }

      this.content = this.renderer.render(raw)
      this.$nextTick(() => {
        this.generateTOC()
      })
      this.loading = false
    },
    generateTOC() {
      this.$nextTick(() => {
        const tocOriginal = document.querySelector('.toc-original')
        this.toc = tocOriginal ? tocOriginal.innerHTML : undefined

        this.$nextTick(() => {
          const links = document.querySelectorAll('aside .toc a')
          links.forEach(link => {
            let decoded = decodeURIComponent(link.getAttribute('href'))
            link.setAttribute('data-anchor', decoded)
            link.removeAttribute('href')

            link.addEventListener('click', () => {
              scrollToNode(link.getAttribute('data-anchor'))
            })
          })
        })
      })
    }
  },
  mounted() {
    const id = this.$route.params.id
    if(id) {
      this.getStory(id);
      this.initRenderer();
      this.initRenderPlugins();
      this.loading = true;
    }
  }
}
