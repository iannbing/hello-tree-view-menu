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
// Inconsistent dataset
export const apm = {
  filename: 'apm.json',
  content: {
    categories: ['Use Cases'],
    pages: [
      {
        d: '/apm/use-cases/',
        i: 'index',
        t: 'Use Cases',
        u: '/apm/use-cases/'
      },
      {
        d: '/apm/use-cases/uc-1/',
        i: 'generic',
        p: 'use-cases-1',
        t: 'Generic',
        u: '/apm/use-cases/uc-1/generic'
      },
      {
        c: 'Use Cases',
        d: '/apm/use-cases/uc-1/',
        i: 'use-cases-1',
        mo: 20,
        t: 'APM 1 Use Cases',
        u: '/apm/use-cases/uc-1/use-cases-1'
      },
      {
        d: '/apm/use-cases/uc-1/',
        i: 'in-development',
        p: 'use-cases-1',
        t: 'In Development',
        u: '/apm/use-cases/uc-1/in-development'
      }
    ]
  }
};

const data = [releasenotes];

export default data;
