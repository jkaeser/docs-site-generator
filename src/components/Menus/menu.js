import { graphql } from 'gatsby';
import * as Utils from '../../js-utils/utils';
import { pathPrefix } from '../../../gatsby-config.js';

const MENU_NODE_FALLBACK_WEIGHT = 99;

/**
 * Creates a new Menu.
 * @class
 * @param {array} data
 *  An array as returned by the dynamicMenuQuery GraphQL fragment.
 */
export function Menu(data) {
  this.nodes = _menuFormatData(data.allMarkdownRemark.edges);
  this.tree = _menuCreateTree(this.nodes);
};

/**
 * See _menuAddToTree().
 */
Menu.prototype.addItem = function(node) {
  _menuAddToTree(node, this.tree);
};

/**
 * Extract a portion of a menu from the tree based on the current page path.
 * @return {array}
 */
Menu.prototype.getCurrentSection = function() {
  const path = Utils.safeWindowPath();
  const pathParts = Utils.splitPath(path);
  let section = [];

  this.tree.forEach(function(node) {
    let pathCompare = '';
    for (let i = 0; i < pathParts.length; i++) {
      pathCompare += '/' + pathParts[i];
      if (Utils.stripSlashes(pathCompare) === Utils.stripSlashes(node.comparePath)) {
        section.push(node);
      }
    }
  });

  return section;
};

/**
 * Extract the children of a given page by path.
 * @param {string} path
 *  The path to inspect for child pages.
 * @return {array}
 */
Menu.prototype.getChildrenByPath = function(path) {
  let children = [];
  const self = this;

  this.tree.forEach(function(node) {
    if (path === '/') {
      children = self.tree;
    }
    if (node.path === path) {
      children = node.children;
    }
  });

  return children;
};

/**
 * Sort menu items by path length.
 * @param {array} nodes
 * @return {array}
 */
function _menuSortByPath(nodes) {
  return nodes.sort(function(a, b) {
    return a.path.split('/').length - b.path.split('/').length;
  });
};

/**
 * Formats menu data from GraphQL to work with _menuCreateTree().
 * @param {array} data
 * @return {array}
 */
function _menuFormatData(data) {
  let formatted = [];
  for (let i = 0; i < data.length; i++) {
    let node = data[i].node.frontmatter;
    node.id = data[i].node.id;
    node.comparePath = pathPrefix ? '/' + pathPrefix + node.path : node.path;
    formatted.push(node);
  }

  // Top level items must appear first for _menuCreateTree() to work properly.
  return _menuSortByPath(formatted);
};

/**
 * Sort menu items by weight. If weights match, sort alphabetically.
 * @param {array} tree
 * @return {array}
 */
function _menuSortByWeight(tree) {
  return tree.sort(function(a, b) {
    let aWeight = parseInt(a.weight);
    let bWeight = parseInt(b.weight);

    if (aWeight !== bWeight) {
      return aWeight - bWeight;
    }
    else {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      else {
        return -1;
      }
    }
  });
};

/**
 * Adds a menu item to the tree at the right position.
 * @param {object} node
 * @param {array} tree
 */
function _menuAddToTree(node, tree) {
  // Check if the item node should inserted in a subnode.
  for (let i = 0 ; i < tree.length ; i++) {
    let treeNode = tree[i];

    // If the entire treeNode's path is equal to the first portion of the
    // node's path, we know this node is a child of the treeNode.
    if (node.path.indexOf(treeNode.path + '/') === 0) {
      _menuAddToTree(node, treeNode.children);
      return;
    }
  }

  // If node is not flagged as a child, it must be a sibling. Add it to the
  // tree at this level.
  tree.push({
    title: node.title || "",
    path: node.path || "",
    comparePath: node.comparePath || "",
    id: node.id || "",
    weight: node.weight !== null ? node.weight : MENU_NODE_FALLBACK_WEIGHT,
    icon: node.icon || null,
    children: []
  });
};

/**
 * Creates a sorted menu tree out of formatted GraphQL data.
 * @param {array} nodes
 * @return {array}
 */
function _menuCreateTree(nodes) {
  let tree = [];
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    _menuAddToTree(node, tree);
  }
  return _menuSortByWeight(tree);
};

export const dynamicMenuQuery = graphql`
  fragment dynamicMenuQuery on Query {
    allMarkdownRemark(filter:{ frontmatter:{ home:{ ne: true} } } ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            weight
            icon
          }
        }
      }
    }
  }
`
