/**
 * Transforms a URL path piece into a link label
 * E.g. 'this-is-a-path' to 'This Is A Path'
 * @param {string} string
 * @return {string}
 */
export function getLabelFromPathPart(string) {
  let string_parts = string.split('-').filter(piece => piece !== '-')
  let title = []
  string_parts.forEach(function(part) {
    let part_capitalized = part.charAt(0).toUpperCase() + part.slice(1)
    title.push(part_capitalized)
  })
  title = title.join(' ')
  return title
}

/**
 * Gets rid of leading or trailing slashes to make path comparisons easier
 * @param {string} path
 * @return {string}
 */
export function stripSlashes(path) {
  if (path === '/') {
    return;
  }
  if (path.charAt(path.length - 1) === '/') {
    path = path.slice(0, -1)
  }
  if (path.charAt(0) === '/') {
    path = path.slice(1, path.length)
    // console.log(slash);
  }
  return path
}
