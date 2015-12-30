/** @jsx element */
import { element, dom } from '../lib'
import test from 'tape'

test('basic non-component', (t) => {
  const { div } = r(<div>hello</div>)
  t.equal(div.innerHTML, '<div>hello</div>')
  t.end()
})

test('class name', (t) => {
  const { div } = r(<div className='foo'>hola</div>)
  t.equal(div.innerHTML, '<div class="foo">hola</div>')
  t.end()
})

test('interpolation', (t) => {
  const {div } = r(<div>hey {'John'}</div>)
  t.equal(div.innerHTML, '<div>hey John</div>')
  t.end()
})

test('basic component', (t) => {
  const App = {
    render () { return <div>hello</div> }
  }

  const { div } = r(<App />)
  t.equal(div.innerHTML, '<div>hello</div>')
  t.end()
})

test('props', (t) => {
  const Button = {
    render ({ props }) {
      return <button>{ props.label }</button>
    }
  }

  const App = {
    render () {
      return <div>hi. <Button label='press' /></div>
    }
  }

  const { div } = r(<App />)
  t.equal(div.innerHTML, '<div>hi. <button>press</button></div>')
  t.end()
})

/*
 * Helper
 */

function r (tree) {
  const div = document.createElement('div')
  const render = dom.createRenderer(div)
  render(tree)
  return { div, render }
}