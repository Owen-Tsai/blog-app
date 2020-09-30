import MarkdownIt from 'markdown-it'
import hljs from 'highlightjs'
import MarkdownEmoji from 'markdown-it-emoji'
import MarkdownContainer from 'markdown-it-container'
import MarkdownKatex from 'markdown-it-katex'
import MarkdownFrontMater from "markdown-it-front-matter"
import MarkdownTOC from 'markdown-it-toc-and-anchor'

export default {
  methods: {
    initRenderer() {
      this.renderer = new MarkdownIt({
        highlight: (str, lang) => {
          if(lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (e) {
              console.error(e)
            }
          }

          return ''
        }
      })
    },
    initRenderPlugins() {
      // use emoji plugin
      this.renderer.use(MarkdownEmoji)
      // use custom containers for spoilers
      this.renderer.use(MarkdownContainer, 'spoiler', {
        validate: (params) => {
          return params.includes('spoiler');
        },
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            let info = tokens[idx].info.trim().replace('spoiler', '');
            // opening tag
            return `<details>\n<summary> ${this.renderer.utils.escapeHtml(info)} </summary>\n`;

          } else {
            // closing tag
            return '</details>\n';
          }
        }
      })
      // use custom containers for tips
      this.renderer.use(MarkdownContainer, 'tip', {
        validate: (params) => {
          return params.includes('tip');
        },
        render: (tokens, idx) => {
          if(tokens[idx].nesting === 1) {
            let type = tokens[idx].info.includes('-') ? tokens[idx].info.split('-')[1].split(' ')[0] : 'info';
            let info = tokens[idx].info.includes('-')
              ? tokens[idx].info.split('-')[1].split(' ')[1]
              : tokens[idx].info.trim().replace('tip', '');
            return `<div class="tip tip-${type} reactive-block-background">\n<b>${info || ''}</b>`
          } else {
            return `</div>`
          }
        }
      })

      // use front-matter plugin
      this.renderer.use(MarkdownFrontMater, (fm) => {
        this.metaContent = fm;
      });
      // use katex plugin
      this.renderer.use(MarkdownKatex)

      // modify default rules
      this.renderer.renderer.rules.table_open = (tokens, index) => {
        return '<table class="reactive-table-bg">'
      }
      this.renderer.renderer.rules.blockquote_open = () => {
        return '<blockquote class="reactive-block-background">'
      }

      // anchors and toc
      this.renderer.use(MarkdownTOC, {
        tocClassName: 'toc-original',
        tocLastLevel: 4,
        anchorLinkSymbol: ''
      })
    }
  }
}
