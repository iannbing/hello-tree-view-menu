import { merge } from 'lodash';

const createObjFromKeys = ({ obj = {}, keys, value }) => {
  if (keys.length === 1) {
    obj[keys[0]] = value;
  } else {
    const key = keys.shift();
    obj[key] = obj[key] || {};
    obj[key].nodes = {
      ...obj[key].nodes,
      ...createObjFromKeys({
        obj: typeof obj[key].nodes === 'undefined' ? {} : obj[key].nodes,
        keys,
        value
      })
    };
  }

  return obj;
};

const transpose = ({ data, navigate }) => {
  const transposed = data.reduce((allSpaces, currentSpace, spaceIndex) => {
    const { content } = currentSpace;
    const currentSpacePages = content.pages.reduce(
      (allPages, currentPage, pageIndex) => {
        const {
          t, // title
          // c, // category
          // i, // identifier
          u, // url
          // d, // directory
          m, // is space
          p // parent page
        } = currentPage;
        const path = u.split('/').filter(x => x);

        // if it has a parent page, insert it to have complete nodes
        if (p) path.splice(path.length - 1, 0, p);

        const newObj = createObjFromKeys({
          keys: path,
          value: {
            label: t,
            onClick: () => navigate(u),
            url: u,
            index: m ? spaceIndex : pageIndex
          }
        });
        return merge(newObj, allPages);
      },
      {}
    );
    return {
      ...allSpaces,
      ...currentSpacePages
    };
  }, {});
  return transposed;
};

export default transpose;
