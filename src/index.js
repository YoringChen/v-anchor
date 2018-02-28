import ELement from './element.js'

const vAnchor = {
  install(Vue) {
    Vue.directive('anchor', {
      inserted(el, binding, vnode) {
        el.anchor_element = new ELement(el, {
          name: binding.args,
          context: vnode.context,
          callback: binding.expression
        }).initActivedStatus()
      },
      unbind(el) {
        el.anchor_element.destory()
      }
    })
  }
}

export default vAnchor