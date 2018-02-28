import vAnchor from '../src/index.js'

const { Vue } = window

Vue.use(vAnchor)

new Vue({
  el: '#app',
  data: {
    index: -1
  },
  methods: {
    getIndex(index) {
      this.index = index
      console.log(index)
    }
  }
})
