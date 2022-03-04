const Headers = {}

function sanitize(str) {
  if (!str) {
    return ''
  }
  const clean = str.replace(/ /g, '-').toLowerCase()
  return clean
}

const h = {
  linked: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  unlinked: [],
}

h.linked.forEach((Tag) => {
  Headers[Tag] = Object.assign(
    (props) => {
      return <Tag {...props} id={sanitize(props.children)}/>
    },
    { displayName: Tag }
  )
})

export default Headers
