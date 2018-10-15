import Element from '../src/element'

interface HTMLAnchorElement extends HTMLElement {
  anchorHandler: Function | null
  anchorElement: Element
}
