import Theme from 'vitepress/dist/client/theme-default'
import SButton from '../../../src/button/index'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(SButton)
  },
}