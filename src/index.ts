import ELement from './element'
import { HTMLAnchorElement } from '../types'

const vAnchor = {
  install (Vue: any): void {
    Vue.directive('anchor', {
      inserted (el: HTMLAnchorElement, binding: any, vnode: any): void {
        el.anchorElement = new ELement(el, {
          name: binding.args,
          context: vnode.context,
          callback: binding.expression
        }).initActivedStatus()
      },
      unbind (el: HTMLAnchorElement): void {
        el.anchorElement.destory()
      }
    })
  }
}

export default vAnchor
