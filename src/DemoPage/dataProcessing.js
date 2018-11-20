/* eslint-disable import/prefer-default-export */

const getRootPage = dataEntry => dataEntry.content.pages.find(page => page.m);

const getCategories = ({ dataEntry, spaceName }) => {
  const {
    content: { categories, pages }
  } = dataEntry;
  return categories.map(category => {
    const categoryPage = pages.find(page => page.t === category);
    const nodeName = categoryPage.u.replace(spaceName, '').replace(/\//g, '');
    return {
      node: nodeName,
      title: category,
      url: categoryPage.u
    };
  });
};

export const dehydrate = data => {
  const dehydrated = data.reduce((accu, curr) => {
    const spaceName = curr.filename.replace('.json', '');
    const { categories, pages } = curr.content;
    const rootPage = getRootPage(curr);
    // const categories = getCategories({ dataEntry: curr, spaceName });
    return [
      ...accu,
      {
        node: spaceName,
        title: rootPage.t,
        url: rootPage.u
      },
      ...categories
    ];
  }, []);

  return dehydrated;
};

export const transpose = ({ data, navigate }) => {};
