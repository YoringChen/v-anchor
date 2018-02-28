import Store from './store.js'
import { window } from './global.js'

class ELement {
  constructor(el, { name, context, index, callback }) {
    this.el = el
    this.name = name
    this.context = context
    this.index = index != null ? index : Store.getLength(name)
    this.callback = typeof this.context[callback] === 'function' ? this.context[callback] : () => {}
    this.bindScrollHandler()
    Store.push(name, this)
  }

  destory() {
    this.unbindScrollHandler()
  }

  // 初始化检查元素激活状态
  initActivedStatus() {
    const { name, index } = this
    const rect = this.getRect()
    const prev_anchor = Store.get(name, index - 1)
    const prev_rect = prev_anchor && prev_anchor.getRect()

    // 当前元素在屏幕内
    if (rect.top + rect.height >= 0 && rect.top < window.innerHeight) {
      // 前一个元素的3/4内容消失在可视范围
      if (!prev_anchor || prev_rect.top + (prev_rect.height * 0.75) < 0) {
        Store.setIndex(name, index)
        this.callback(index)
      }
    }

    return this
  }

  getRect() {
    return this.el.getBoundingClientRect()
  }

  bindScrollHandler() {
    const { name, index } = this
    const prev_anchor = Store.get(name, index - 1)
    const active_anchor = Store.getCurAnchor(this.name)

    this.el.anchorHandler = () => {
      const rect = this.getRect()
      const prev_rect = prev_anchor && prev_anchor.getRect()
      const active_anchor_rect = active_anchor && active_anchor.getRect()
      const active_index = Store.getIndex(name)

      // 当前激活的元素完全在屏幕内, 则跳过
      if (active_anchor_rect &&
          active_anchor_rect.height > 0 &&
          active_anchor_rect.top >= 0 &&
          active_anchor_rect.top + active_anchor_rect.height < window.innerHeight) return

      // 当前元素出现在屏幕内
      if (rect.top + rect.height >= 0 && rect.top < window.innerHeight) {
        // 当前元素的3/4内容不在可视范围内，则略过处理
        if (rect.top < -(rect.height * 0.25) ||
            rect.top > window.innerHeight - (rect.height * 0.25)) return

        // 前一个元素的3/4内容消失在可视范围, 当前元素激活
        if (!prev_anchor || prev_rect.top + (prev_rect.height * 0.75) < 0) {
          if (active_index !== index) {
            Store.setIndex(name, index)
            this.callback(index)
          }

          return
        }

        // 前一个元素的1/2内容出现在可视范围, 前一个元素激活
        if (prev_anchor && rect.top - (prev_rect.height / 2) > 0) {
          if (active_index !== index - 1) {
            Store.setIndex(name, index - 1)
            this.callback(index - 1)
          }
        }
      }
    }

    window.addEventListener('scroll', this.el.anchorHandler)
  }

  unbindScrollHandler() {
    window.removeEventListener('scroll', this.el.anchorHandler)
  }
}

export default ELement