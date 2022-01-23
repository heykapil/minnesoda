import references from '../pages/references.json'
import ReactDOM from 'react-dom'
import Link from 'next/link'

const Tooltip = ({ router, query, removeTooltip, position }) => {
  const href = references[query].definition
  const arrowSize = 8
  function handleClick() {
    removeTooltip()
    router.push(href)
  }
  const style =
    position === 'above'
      ? {
          transform: 'translateY(calc(-100% - 8px))',
        }
      : null
  const Arrow = () => {
    const down =
      'w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-blue-100'
    const rotate = position === 'above' ? 'translate-y-[-8px]' : 'rotate-180'
    return <div className={`${down} ${rotate}`} />
  }
  return (
    <div>
      {position === 'below' ? <Arrow /> : null}
      <div className="absolute flex flex-col bg-blue-100 px-3 py-2" style={style}>
        <a onClick={handleClick}>Go to definition</a>
        <div className="mt-1-h">Go to reference</div>
        <div className="flex flex-col">
          {references[query].references.map((e) => (
            <a onClick={handleClick}>{e[0]}</a>
          ))}
        </div>
      </div>
      {position === 'above' ? <Arrow /> : null}
    </div>
  )
}

function removeTooltip() {
  const exisitngFloat = document.getElementById('reference-tooltip')
  if (exisitngFloat) {
    exisitngFloat.remove()
  }
}

function handleMouseUp({ router }) {
  removeTooltip()
  const selection = window.getSelection()
  const query = selection.toString().toLowerCase().trim()

  if (query === '') {
    return
  }

  if (references.hasOwnProperty(query)) {
    // console.log('has reference!')
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const i = document.createElement('div')
    i.style.position = 'absolute' // fixed positioning = easy mode
    i.style.left = rect.left + window.scrollX + 'px'
    i.id = 'reference-tooltip'
    var position
    // check if element is more than halfway down the screen
    if (rect.top > window.innerHeight / 2) {
      i.style.top = window.scrollY + rect.top + 'px' // set coordinates
      position = 'above'
    } else {
      i.style.top = window.scrollY + rect.top + rect.height + 'px' // set coordinates
      position = 'below'
    }
    document.body.appendChild(i)
    ReactDOM.render(Tooltip({ router, query, removeTooltip, position }), i)
  }
}

export { handleMouseUp, removeTooltip }