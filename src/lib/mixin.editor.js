import { debounce } from './utls'
import RendererMixin from './mixin.renderer'

export default {
  props: {
    debounce: Number
  },
  mixins: [
    RendererMixin
  ],
  methods: {
    render() {
      if(!this.renderer) {
        console.error('renderer is not properly initialized')
      }

      this.parse()
      this.$emit('input', this.rawContent)
    },
    enableParseDebounce() {
      if(this.debounce) {
        this.parse = debounce(() => {
          this.renderedContent = this.renderer.render(this.rawContent)
          // this.$emit('input', this.rendered);
        }, this.debounce)
      }
    }
  },
  mounted () {
    this.initRenderer()
    this.initRenderPlugins()
    this.enableParseDebounce()
  }
}
