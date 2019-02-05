import * as Utils from '../../js-utils/utils';

/**
 * Formats menu data from GraphQL to work with menuCreateTree().
 *
 * @param {array} data
 * @return {array}
 */
export function menuFormatData(data) {
  let formatted = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i].node.frontmatter;
    item.id = data[i].node.id;
    formatted.push(item);
  }

  // Top level items must appear first for createTree() to work.
  formatted.sort(function(a, b) {
    return a.path.split('/').length - b.path.split('/').length;
  });

  return formatted;
}

/**
 * Creates a menu tree out of formatted GraphQL data.
 *
 * @param {array} nodes
 * @return {array}
 */
export function menuCreateTree(nodes) {
  var tree = [];
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    menuAddToTree(node, tree);
  }
  return tree;
}

/**
 * Adds a menu item to the tree at the right position.
 *
 * @param {object} node
 * @param {array} treeNodes
 */
export function menuAddToTree(node, treeNodes) {
  // Check if the item node should inserted in a subnode.
  for (var i = 0 ; i < treeNodes.length ; i++) {
    var treeNode = treeNodes[i];
    if (node.path.indexOf(treeNode.path + '/') === 0) {
      menuAddToTree(node, treeNode.children);
      return;
    }
  }
  // Item node was not added to a subnode, so it's a top level item.
  treeNodes.push({
    title: node.title,
    path: node.path,
    id: node.id,
    children: []
  });
}

/**
 * Helper to format and sort data, then create a tree out of it.
 *
 * @param {array} data
 * @return {array}
 */
export function menuTreeFromRawData(data) {
  if (data.allMarkdownRemark.edges) {
    return menuCreateTree(menuFormatData(data.allMarkdownRemark.edges));
  }
  return;
}


/**
 * Extract a portion of a menu from the tree.
 *
 * @param {array} menu
 * @return {array}
 */
export function menuGetSection(menu) {
  const path = Utils.safeWindowPath();
  const pathParts = path.split('/').filter(part => part !== '');
  let data = [];

  menu.forEach(function(item) {
    if ('/' + pathParts[0] === item.path) {
      data.push(item);
    }
  })

  return data;
}
