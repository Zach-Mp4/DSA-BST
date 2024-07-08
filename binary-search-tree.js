class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;

    while (true) {
      if (val < currentNode.val) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return this;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return this;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    const insertHelper = (currentNode, val) => {
      if (currentNode === null) {
        return new Node(val);
      }

      if (val < currentNode.val) {
        currentNode.left = insertHelper(currentNode.left, val);
      } else {
        currentNode.right = insertHelper(currentNode.right, val);
      }

      return currentNode;
    };

    insertHelper(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (val === currentNode.val) {
        return currentNode;
      } else if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return undefined;
  }



  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findHelper = (currentNode, val) => {
      if (currentNode === null) {
        return undefined;
      }

      if (val === currentNode.val) {
        return currentNode;
      } else if (val < currentNode.val) {
        return findHelper(currentNode.left, val);
      } else {
        return findHelper(currentNode.right, val);
      }
    };

    return findHelper(this.root, val);
  }


  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (node !== null) {
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
    };
    
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
      }
    };
    
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
      }
    };
    
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];

    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode.val);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (node === null) {
        return null;
      }

      if (val === node.val) {
        // Node to be removed found

        // Case 1: Node has no children (leaf node)
        if (node.left === null && node.right === null) {
          return null;
        }

        // Case 2: Node has one child
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }

        // Case 3: Node has two children
        // Find the in-order successor (smallest node in the right subtree)
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.val = tempNode.val;
        node.right = removeNode(node.right, tempNode.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    };

    this.root = removeNode(this.root, val);
    return this.root;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkHeight = (node) => {
      if (node === null) {
        return 0;
      }

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (this.root === null || (this.root.left === null && this.root.right === null)) {
      return undefined;
    }

    let currentNode = this.root;
    let parentNode = null;

    // Traverse to the rightmost node
    while (currentNode.right !== null) {
      parentNode = currentNode;
      currentNode = currentNode.right;
    }

    // If the rightmost node has a left subtree, find the largest value in that subtree
    if (currentNode.left !== null) {
      currentNode = currentNode.left;
      while (currentNode.right !== null) {
        currentNode = currentNode.right;
      }
      return currentNode.val;
    }

    // Otherwise, the parent of the rightmost node is the second highest
    return parentNode.val;
  }
}


module.exports = BinarySearchTree;
