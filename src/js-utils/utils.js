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
  }
  return path
}

/**
 * Returns global window object if valid or an empty string (e.g. Node env)
 * @return {string}
 */
export function safeWindowPath() {
  let path = typeof window !== 'undefined' ? window.location.pathname : '';
  return path;
}
