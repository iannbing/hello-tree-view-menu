# Introduction

This is a MVP for TreeViewMenu React component. See [Demo](https://iannbing.github.io/hello-tree-view-menu).

## Usage

To generate a `TreeViewMenu`, you need to provide data in the following structure.

```javascript
const treeData = {
  releasenotes: {             // node name
    label: 'Release Notes',   // label of this menu item
    onClick: () => ({}),      // defines the behavior; it will do console.warn if not specified
    key: 'releasenotes',      // use url as unique key for the node, removing leading and trailing slashes
    index: 0,                 // decide the order in the same level
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        onClick: () => ({}),
        key: 'releasenotes/desktop-modeler',
        index: 0,
        nodes: {
          7: {
            label: '7',
            onClick: () => ({}),
            key: 'releasenotes/desktop-modeler/7',
            index: 0,
            nodes: {
              '7.0': {
                label: '7.0',
                onClick: () => ({}),
                key: 'releasenotes/desktop-modeler/7.0', // note that the URL is not necessarily reflecting the node path
                index: 0
              }
            }
          }
        }
      }
    }
  },
  atd: {
    label: 'ATS Guide',
    onClick: () => ({}),
    key: 'ats',
    index: 1 // i.e. ATS Guide should be right after Release Notes
  }
};
```

And then import `TreeViewMenu` and use it.

```jsx
<TreeViewMenu
  data={treeData}
  activeKey="releasenotes/desktop-modeler/7.0"
  search
/>
```

## API

TreeViewMenu

| props     | description                                                                                                                       | type                | default |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| data      | Data that defines the structure of the tree. You can nest it as many as you want, but note that it might cause performance issue. | {[string]:TreeNode} | -       |
| activeKey | the node matching this key will be highlighted                                                                                    | string              | ''      |
| search    | enable `search` on the tree nodes' `label`                                                                                        | boolean             | false   |

TreeNode

| props   | description                                                                             | type                | default        |
| ------- | --------------------------------------------------------------------------------------- | ------------------- | -------------- |
| label   | the rendered text of a Node                                                             | string              | ''             |
| onClick | a function that is called when a node is clicked                                        | function            | `console.warn` |
| key     | a unique key that represent this node                                                   | string              | -              |
| index   | a number that defines the order of the nodes in the same level                          | number              | -              |
| nodes   | \[optional\] a node without this property means that it is the last child of its branch | {[string]:TreeNode} | -              |

## Dependencies

`TreeViewMenu` is built with

- [reactstrap](https://reactstrap.github.io/)
- [emotion](https://emotion.sh/)

This Demo application is built with [Create React App](https://github.com/facebook/create-react-app) version 2. [react-app-rewired](https://github.com/timarney/react-app-rewired) and [customize-cra](https://github.com/arackaf/customize-cra) are used in order to configure `babel` without ejection. [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is used for only importing used modules to reduce bundle size, this allows using `Lodash` when you only want to use light-weight functions like `get` and `merge`.

NOTE: configure `REACT_APP_BUNDLE_VISUALIZE=true` in `.env` and then run `yarn build` to see the actual bundle size.

## Code conventions

- [eslint-config-react-airbnb-prettier](https://github.com/iannbing/eslint-config-react-airbnb-prettier).
