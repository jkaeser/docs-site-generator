const deepmerge = require('deepmerge');

const defaultColors = {
  black: '#0f1108',
  white: '#fff',
  lightestgray: '#f4f4f5',
  lightgray: '#eaeaec',
  midgray: '#7e878c',
  darkgray: '#6f686d',
  blue: '#009de0',
  darkblue: '#0081b8',
  orange: '#f18f01'
}

let config = {
  site: {
    title: `Documentation Site`,
    url: `https://example.com`,
    pathPrefix: false
  },
  colors: {
    header: {
      color: defaultColors.black,
      background: defaultColors.white,
      borderColor: defaultColors.lightgray,
    },
    banner: {
      color: defaultColors.black,
      background: defaultColors.lightgray,
    },
    body: {
      color: defaultColors.midgray,
      background: defaultColors.white,
    },
    footer: {
      color: defaultColors.black,
      background: defaultColors.white,
      borderColor: defaultColors.lightgray,
    },
    navigation: {
      breadcrumb: {
        color: defaultColors.midgray,
        a: {
          color: defaultColors.blue,
          background: defaultColors.lightgray,
          hover: {
            color: defaultColors.darkblue
          }
        }
      },
      sidebar: {
        background: defaultColors.lightestgray,
        color: defaultColors.blue,
        hover: {
          color: defaultColors.darkblue,
          borderColor: defaultColors.darkblue,
        },
        header: {
          color: defaultColors.white,
          background: defaultColors.darkgray
        }
      },
      grid: {
        color: defaultColors.white,
        background: defaultColors.blue,
        hover: {
          color: defaultColors.white,
          background: defaultColors.darkblue,
          underlineColor: defaultColors.orange
        }
      }
    },
    search: {
      color: defaultColors.midgray,
      backgroundColor: defaultColors.white,
      borderColor: defaultColors.lightgray,
      results: {
        color: defaultColors.blue,
        backgroundEven: defaultColors.lightgray,
        backgroundOdd: defaultColors.white,
        hover: {
          color: defaultColors.darkblue,
        }
      }
    },
    pageTitle: {
      color: defaultColors.black,
    },
    typography: {
      a: {
        color: defaultColors.blue,
        hover: {
          color: defaultColors.darkblue,
          borderColor: defaultColors.lightgray
        }
      },
      h1: {
        color: defaultColors.darkgray
      },
      h2: {
        color: defaultColors.darkgray
      },
      h3: {
        color: defaultColors.darkgray
      },
      h4: {
        color: defaultColors.darkgray
      },
      h5: {
        color: defaultColors.darkgray
      },
      h6: {
        color: defaultColors.darkgray
      },
      table: {
        borderColor: defaultColors.lightestgray,
        header: {
          color: defaultColors.darkgray,
          background: defaultColors.white
        }
      },
      code: {
        color: defaultColors.darkgray,
        background: defaultColors.lightestgray
      },
      blockquote: {
        color: defaultColors.darkgray,
        borderColor: defaultColors.orange
      }
    },
    ui: {
      focus: defaultColors.orange
    }
  }
};

// Load configuration.
let userConfig = false;
try {
  userConfig = require('./config.js');
} catch (e) {
  console.warn('No user configuration found. Proceeding with defaults.');
}
module.exports = userConfig ? deepmerge(config, userConfig) : config;
