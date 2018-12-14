# Introduction

This is a MVP for TreeViewMenu React component. See [Demo](https://iannbing.github.io/hello-tree-view-menu).

## Usage

To generate a `TreeViewMenu`, you need to provide data in the following structure.

```javascript
const treeData = {
  releasenotes: {             // node name
    label: 'Release Notes',   // label of this menu item
    key: 'releasenotes',      // use url as unique key for the node, removing leading and trailing slashes
    index: 0,                 // decide the rendering order on the same level
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        key: 'releasenotes/desktop-modeler',
        index: 0,
        nodes: {
          7: {
            label: '7',
            key: 'releasenotes/desktop-modeler/7',
            index: 0,
            nodes: {
              '7.0': {
                label: '7.0',
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
    key: 'ats',
    index: 1 // i.e. ATS Guide should be right after Release Notes (index: 0)
  }
};
```

And then import `TreeViewMenu` and use it.

```jsx
<TreeViewMenu
  data={treeData}
  activeKey="releasenotes/desktop-modeler/7.0"
  search
  onClickItem={({ node, label, key }) => {
    console.log({ node, label, key });
  }}
  debounceTime={500}
/>
```

## API

TreeViewMenu

| props        | description                                                                                                                              | type                                 | default        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------------- |
| data         | Data that defines the structure of the tree. You can nest it as many levels as you want, but note that it might cause performance issue. | {[string]:TreeNode}                  | -              |
| activeKey    | the node matching this key will be highlighted                                                                                           | string                               | ''             |
| search       | enable `search` on the tree nodes' `label`                                                                                               | boolean                              | false          |
| onClickItem  | A callback function that defines the behavior when user clicks on an node                                                                | ({node, label, key}): void           | `console.warn` |
| debounceTime | debounce time for searching                                                                                                              | number                               | 125            |
| renderItem   | a render props that renders the list item                                                                                                | (RenderItemProps) => React.ReactNode | -              |
| renderSearch | a render props that takes a `onSearch` function as a parameter and renders the search field                                              | (onSearch) => React.ReactNode        | -              |
| renderGroup  | a render props that takes an array of tree items as a parameter and renders the whole tree view menu                                     | (items) => React.ReactNode           | -              |

TreeNode

| props | description                                                                             | type                | default |
| ----- | --------------------------------------------------------------------------------------- | ------------------- | ------- |
| label | the rendered text of a Node                                                             | string              | ''      |
| key   | a unique key that represent this node                                                   | string              | -       |
| index | a number that defines the rendering order of this node on the same level                | number              | -       |
| nodes | \[optional\] a node without this property means that it is the last child of its branch | {[string]:TreeNode} | -       |

RenderItemProps

| props       | description                                              | type     | default |
| ----------- | -------------------------------------------------------- | -------- | ------- |
| hasSubItems | if a `TreeNode` is the last node of its branch           | boolean  | false   |
| isOpen      | if it is showing its children                            | boolean  | false   |
| level       | the level of the current node (root is zero)             | number   | 0       |
| onClick     | a callback function that is run when the node is clicked | Function | -       |
| active      | if current node is being selected                        | boolean  | -       |
| key         | `TreeNode` `key`                                         | string   | -       |
| label       | `TreeNode` `label`                                       | string   | -       |

## Dependencies

- [emotion](https://emotion.sh/): for adding stylings to the default DOM elements (i.e. default `renderItem`, `renderSearch` and `renderGroup`).

This Demo application is built with [Create React App](https://github.com/facebook/create-react-app) version 2. [react-app-rewired](https://github.com/timarney/react-app-rewired) and [customize-cra](https://github.com/arackaf/customize-cra) are used in order to configure `babel` without ejection. [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is used for only importing used modules to reduce bundle size, this allows using `Lodash` when you only want to use light-weight functions like `get` and `merge`.

NOTE: configure `REACT_APP_BUNDLE_VISUALIZE=true` in `.env` and then run `yarn build` to see the actual bundle size.

## Code conventions

- [eslint-config-react-airbnb-prettier](https://github.com/iannbing/eslint-config-react-airbnb-prettier).
