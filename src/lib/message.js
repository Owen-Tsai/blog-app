import Vue from 'vue'
import CMessage from '../components/Message'

// create unique id for each component instance
let seed = 1
let instances = []

let MessageConstructor = Vue.extend(CMessage)

let Message = (options = {}) => {
  // if instantiate with string only,
  // consider it as message content
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let id = `message-${seed++}`
  let userOnClose = options.onClose

  options.onClose = () => {
    Message.close(id, userOnClose)
  }

  let offset = options.verticalOffset || 165
  instances.forEach(item => {
    offset += item.$el.offsetHeight + 16
  })

  options.verticalOffset = offset

  // instantiate instance
  let instance = new MessageConstructor({
    data: options,
    el: document.createElement('div')
  })

  instance.id = id

  instances.push(instance)

  // insert to DOM
  document.body.appendChild(instance.$el)
  return instance
}

Message.close = (id, userOnClose) => {
  let len = instances.length
  let index = -1
  index = instances.findIndex(item => {
    return item.id === id
  })

  if (index === -1) {
    return
  }

  const removedHeight = instances[index].$el.offsetHeight
  if (typeof userOnClose === 'function') {
    userOnClose(instances[index])
  }

  instances.splice(index, 1)

  // re-calculate the offset amount
  if (len <= 1 || index > instances.length - 1) return

  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

export default Message
