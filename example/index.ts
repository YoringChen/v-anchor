import vAnchor from '../src'

window.Vue.use(vAnchor)

/* eslint no-new: 'off' */
new window.Vue({
  el: '#app',
  data: {
    index: -1
  },
  methods: {
    getIndex (index: number): void {
      (this as any).index = index
      console.log(index)
    }
  }
})
