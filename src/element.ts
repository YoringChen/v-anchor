import Store from './store'
import { window } from './global'
import { HTMLAnchorElement } from '../types'

interface ElementConfig {
  name: string
  context: any
  index?: number
  callback: string
}

class Element {
  public el!: HTMLAnchorElement
  public name!: string
  public context!: any
  public index!: number
  public callback!: Function

  public constructor (el: HTMLAnchorElement, options: ElementConfig) {
    const { name, context, index, callback } = options

    this.el = el
    this.name = name
    this.context = context
    this.index = index != null ? index : Store.getLength(name)
    this.callback = typeof this.context[callback] === 'function' ? this.context[callback] : (): void => {}
    this.bindScrollHandler()
    Store.push(name, this)
  }

  public destory (): void {
    this.unbindScrollHandler()
  }

  // 初始化检查元素激活状态
  public initActivedStatus (): Element {
    const { name, index } = this
    const rect = this.getRect()
    const prevAnchor = Store.get(name, index - 1)
    const prevRect = prevAnchor && prevAnchor.getRect()

    // 当前元素在屏幕内
    if (rect.top + rect.height >= 0 && rect.top < window.innerHeight) {
      // 前一个元素的3/4内容消失在可视范围
      if (!prevAnchor || prevRect.top + (prevRect.height * 0.75) < 0) {
        Store.setIndex(name, index)
        this.callback(index)
      }
    }

    return this
  }

  public getRect (): ClientRect | DOMRect {
    return this.el.getBoundingClientRect()
  }

  public bindScrollHandler (): Element {
    const { name, index } = this
    const prevAnchor = Store.get(name, index - 1)
    const activeAnchor = Store.getCurAnchor(this.name)

    this.el.anchorHandler = (): void => {
      const rect = this.getRect()
      const prevRect = prevAnchor && prevAnchor.getRect()
      const activeAnchorRect = activeAnchor && activeAnchor.getRect()
      const activeIndex = Store.getIndex(name)

      // 当前激活的元素完全在屏幕内, 则跳过
      if (activeAnchorRect &&
          activeAnchorRect.height > 0 &&
          activeAnchorRect.top >= 0 &&
          activeAnchorRect.top + activeAnchorRect.height < window.innerHeight) return

      // 当前元素出现在屏幕内
      if (rect.top + rect.height >= 0 && rect.top < window.innerHeight) {
        // 当前元素的3/4内容不在可视范围内，则略过处理
        if (rect.top < -(rect.height * 0.25) ||
            rect.top > window.innerHeight - (rect.height * 0.25)) return

        // 前一个元素的3/4内容消失在可视范围, 当前元素激活
        if (!prevAnchor || prevRect.top + (prevRect.height * 0.75) < 0) {
          if (activeIndex !== index) {
            Store.setIndex(name, index)
            this.callback(index)
          }

          return
        }

        // 前一个元素的1/2内容出现在可视范围, 前一个元素激活
        if (prevAnchor && rect.top - (prevRect.height / 2) > 0) {
          if (activeIndex !== index - 1) {
            Store.setIndex(name, index - 1)
            this.callback(index - 1)
          }
        }
      }
    }

    window.addEventListener('scroll', this.el.anchorHandler as EventListenerOrEventListenerObject)

    return this
  }

  public unbindScrollHandler (): Element {
    window.removeEventListener('scroll', this.el.anchorHandler as EventListenerOrEventListenerObject)

    return this
  }
}

export default Element
