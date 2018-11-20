# Introduction

This is a MVP for TreeViewMenu React component.

## CRA 2

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) version 2.

## Code conventions

An opinionated eslint config for this project [eslint-config-react-airbnb-prettier](https://github.com/iannbing/eslint-config-react-airbnb-prettier).

## Dehydrate data

Ideal data format is designed in the following format

```javascript
// an Array of sapces
// key: tree node in the menu
[{
    'releasenotes' : {
        title: 'Release Notes',
        url: '/releasenotes/',
        'desktop-modeler': {
            title: 'Desktop Modeler',
            url: '/releasenotes/desktop-modeler/',
            7: {
                title: '7',
                url: '/releasenotes/desktop-modeler/7',
                '7.0': {
                    title: '7.0',
                    url: '/releasenotes/desktop-modeler/7.0'
                }
            }
        }
    }
},...]

```
