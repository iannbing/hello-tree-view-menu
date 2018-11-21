# Introduction

This is a MVP for TreeViewMenu React component.

## CRA 2

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) version 2.

## Code conventions

An opinionated eslint config for this project [eslint-config-react-airbnb-prettier](https://github.com/iannbing/eslint-config-react-airbnb-prettier).

## API design

To generate a `TreeViewMenu`, you need to provide a data tree in the following format:

```javascript
{
  releasenotes: {            // node name
    label: 'Release Notes',  // label of this menu item
    onClick: () => ({}),     // define behavior
    key: 'releasenotes',     // use url as unique key for the node, removing leading and trailing slashes
    index: 0,                // decide the order in the same level
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        onClick: () => ({}),
        key:'releasenotes/desktop-modeler',
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
                key: 'releasenotes/desktop-modeler/7.0',  // note that the URL is not necessarily reflecting the node path
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
    index: 1  // i.e. ATS Guide should be right after Release Notes
  }
}

```
