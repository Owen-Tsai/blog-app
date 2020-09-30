import { serializeTags } from './utls'

export default {
  methods: {
    parseMeta() {
      const meta = this.$refs.editor.metaContent;
      if(!meta) {
        return
      }

      let lines = meta.split('\n')
      let tagsArray = []

      lines.forEach(line => {
        let key = line.split(':')[0]
        if (key === 'tags') {
          let tags = line.split(':')[1].trim().split(',')
          tags.forEach(tag => {
            tagsArray.push(tag.trim())
          });

          this.story.tags = serializeTags(tagsArray)
        }
      })
    }
  }
}
