import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
import './style.css'
// import Button from '../../../src/components/Button.vue'
// import '../../../src/styles/index.css'
// ctx.app.component(Button.name, Button)
export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    useComponents(ctx.app)
    
  }
}
