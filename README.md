# Introduction

This is a demo app for [react-simple-tree-menu](https://github.com/iannbing/react-simple-tree-menu). See [Live Demo](https://iannbing.github.io/hello-tree-view-menu).

## Usage

To generate a `TreeViewMenu`, you need to provide data in the following structure.

```javascript
const treeData = {
  releasenotes: {             // node name
    label: 'Release Notes',   // label of this menu item
    index: 0,                 // decide the rendering order on the same level
    url: 'releasenotes',      // you can pass any props you need
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        index: 0,
        url: 'releasenotes/desktop-modeler',
        nodes: {
          7: {
            label: '7',
            index: 0,
            url: 'releasenotes/desktop-modeler/7',
            nodes: {
              '7.0': {
                label: '7.0',
                index: 0,
                url: 'releasenotes/desktop-modeler/7.0', // note that the URL is not necessarily reflecting the node path
              },
            },
          },
        },
      },
    },
  },
  atd: {
    label: 'ATS Guide',
    index: 1, // i.e. ATS Guide should be right after Release Notes (index: 0)
    url: 'ats',
  },
};
```

And then import `TreeViewMenu` and use it.

```jsx
<TreeViewMenu
  data={treeData}
  activeKey="releasenotes/desktop-modeler/7.0"
  debounceTime={500}
/>
```

## API

TreeViewMenu

| props        | description                                                                                                                              | type                                 | default        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------------- |
| data         | Data that defines the structure of the tree. You can nest it as many levels as you want, but note that it might cause performance issue. | {[key: string]:TreeNode}             | -              |
| activeKey    | the node matching this key will be highlighted                                                                                           | string                               | ''             |
| onClickItem  | A callback function that defines the behavior when user clicks on an node                                                                | ({node, label, key}): void           | `console.warn` |
| debounceTime | debounce time for searching                                                                                                              | number                               | 125            |
| renderItem   | a render props that renders the list item per `TreeNode`                                                                                 | (RenderItemProps) => React.ReactNode | -              |
| renderList   | a render props that renders the whole tree menu; `items` is an array of rendered `TreeNode`s                                             | (RenderListProps) => React.ReactNode | -              |

TreeNode

| props | description                                                                             | type                | default |
| ----- | --------------------------------------------------------------------------------------- | ------------------- | ------- |
| label | the rendered text of a Node                                                             | string              | ''      |
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
| key         | key of a `TreeNode`                                      | string   | -       |
| label       | `TreeNode` `label`                                       | string   | -       |

RenderListProps

| props  | description                                                    | type                    | default |
| ------ | -------------------------------------------------------------- | ----------------------- | ------- |
| search | A function that takes a string to filter the label of the item | (value: string) => void | -       |
| items  | The rendered Item from the renderItem function                 | ReactNode[]             | []      |

## Dependencies

- [emotion](https://emotion.sh/): for adding stylings to the default DOM elements (i.e. default `renderItem`, `renderSearch` and `renderGroup`).

This Demo application is built with [Create React App](https://github.com/facebook/create-react-app) version 2. [react-app-rewired](https://github.com/timarney/react-app-rewired) and [customize-cra](https://github.com/arackaf/customize-cra) are used in order to configure `babel` without ejection. [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is used for only importing used modules to reduce bundle size, this allows using `Lodash` when you only want to use light-weight functions like `get` and `merge`.

NOTE: configure `REACT_APP_BUNDLE_VISUALIZE=true` in `.env` and then run `yarn build` to see the actual bundle size.

## Code conventions

- [eslint-config-react-airbnb-prettier](https://github.com/iannbing/eslint-config-react-airbnb-prettier).
