// global window
const _w = window

// global document
const _d = window.document

// brower scrollTop
const _sctp = _d.documentElement.scrollTop || _d.body.scrollTop

export {
  _w as window,
  _d as document,
  _sctp as scroll_top
}