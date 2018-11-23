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

const cleanPath = path =>
  path
    .split('/')
    .filter(x => x)
    .join('/');

const transposeSpace = ({ space, navigate, spaceIndex }) => {
  const { content } = space;
  return content.pages.reduce((allPages, currentPage, pageIndex) => {
    const label = currentPage.t;
    const url = currentPage.u;
    const isSpace = !!currentPage.m;
    const parentPage = currentPage.p;
    const path = url.split('/').filter(x => x);

    // if it has a parent page, insert it to have complete nodes
    if (parentPage) path.splice(path.length - 1, 0, parentPage);

    const newObj = createObjFromKeys({
      keys: path,
      value: {
        label,
        onClick: () => navigate(url),
        key: cleanPath(url),
        index: isSpace ? spaceIndex : pageIndex
      }
    });
    return merge(newObj, allPages);
  }, {});
};

const transpose = ({ data, navigate, index }) => {
  if (Array.isArray(data))
    return data.reduce((allSpaces, currentSpace, spaceIndex) => {
      const currentSpacePages = transposeSpace({
        space: currentSpace,
        spaceIndex,
        navigate
      });
      return {
        ...allSpaces,
        ...currentSpacePages
      };
    }, {});
  return transposeSpace({
    space: data,
    spaceIndex: index,
    navigate
  });
};

export default transpose;
