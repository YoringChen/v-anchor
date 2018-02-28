const DEFAULT_NAME = '_default_anchors'
const getGroupName = name => (name === undefined ? DEFAULT_NAME : name)

const Store = {
  anchors: {
    [DEFAULT_NAME]: []
  },
  indexs: {
    [DEFAULT_NAME]: -1
  },
  push(name, anchor) {
    this.anchors[getGroupName(name)].push(anchor)
    return this
  },
  get(name, index) {
    return this.anchors[getGroupName(name)][index]
  },
  getLength(name) {
    return this.anchors[getGroupName(name)].length
  },
  getCurAnchor(name) {
    return this.anchors[getGroupName(name)][this.indexs[getGroupName(name)].index]
  },
  getIndex(name) {
    return this.indexs[name]
  },
  setIndex(name, index) {
    this.indexs[name] = index
    return this
  }
}

export default Store