export const releasenotes = {
  filename: 'releasenotes.json',
  content: {
    categories: ['Desktop Modeler'],
    pages: [
      {
        t: 'Release Notes', // title
        i: 'index',
        u: '/releasenotes/', // url
        d: '/releasenotes/', // directory
        m: true // is root category
      },
      {
        t: 'Desktop Modeler',
        i: 'index',
        u: '/releasenotes/desktop-modeler/',
        d: '/releasenotes/desktop-modeler/'
      },
      {
        t: '7',
        c: 'Desktop Modeler',
        i: '7',
        u: '/releasenotes/desktop-modeler/7',
        d: '/releasenotes/desktop-modeler/'
      },
      {
        t: '7.0',
        i: '7.0',
        u: '/releasenotes/desktop-modeler/7.0',
        d: '/releasenotes/desktop-modeler/',
        p: '7' // parent page
      }
    ]
  }
};

const data = [releasenotes];

export default data;
