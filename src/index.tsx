import ReactDOM from 'react-dom/client'
import App from '@/App'
import 'normalize.css'
import './tailwind.css'
import { Provider } from 'react-redux'
import './assets/css/index.less'
import { HashRouter } from 'react-router'
import store from '@/store'
import theme from '@/assets/theme'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@/assets/theme/GlobalStyle'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
  <ThemeProvider theme={theme}>
  <GlobalStyle />
<HashRouter>
<App />
</HashRouter>
</ThemeProvider>
</Provider>
)
