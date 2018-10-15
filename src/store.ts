import Element from './element'

const DEFAULT_NAME = '_default_anchors'

interface StoreInterface {
  anchors: {
    [name: string]: any[]
  }
  indexs: {
    [name: string]: number
  }
  push: Function
  get: Function
  getLength: Function
  getCurAnchor: Function
  getIndex: Function
  setIndex: Function
  _getGroupName: Function
}

const Store: StoreInterface = {
  anchors: {
    [DEFAULT_NAME]: []
  },
  indexs: {
    [DEFAULT_NAME]: -1
  },
  push (name: string, anchor: Element): StoreInterface {
    this.anchors[this._getGroupName(name)].push(anchor)
    return this
  },
  get (name: string, index: number): Element {
    return this.anchors[this._getGroupName(name)][index]
  },
  getLength (name: string): number {
    return this.anchors[this._getGroupName(name)].length
  },
  getCurAnchor (name: string): Element {
    return this.anchors[this._getGroupName(name)][this.indexs[this._getGroupName(name)]]
  },
  getIndex (name: string): number {
    return this.indexs[name]
  },
  setIndex (name: string, index: number): StoreInterface {
    this.indexs[name] = index
    return this
  },
  _getGroupName (name: string | undefined): string {
    return name === undefined ? DEFAULT_NAME : name
  }
}

export default Store
