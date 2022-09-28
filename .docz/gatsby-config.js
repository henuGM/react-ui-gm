const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'React Ui Gm',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'React Ui Gm',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm',
          templates:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\node_modules\\.pnpm\\docz-core@2.4.0_yjz3icw22xtetcem7w5a2q75e4\\node_modules\\docz-core\\dist\\templates',
          docz: 'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz',
          cache:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz\\.cache',
          app:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz\\app',
          appPackageJson:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\package.json',
          appTsConfig:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\tsconfig.json',
          gatsbyConfig:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\gatsby-config.js',
          gatsbyBrowser:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\gatsby-browser.js',
          gatsbyNode:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\gatsby-node.js',
          gatsbySSR:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\gatsby-ssr.js',
          importsJs:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz\\app\\imports.js',
          rootJs:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz\\app\\root.jsx',
          indexJs:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz\\app\\index.jsx',
          indexHtml:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz\\app\\index.html',
          db:
            'D:\\new_App\\project\\vite\\react-vite\\react-ui-gm\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
