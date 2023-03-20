import ReactDOM from 'react-dom/client'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { NotificationContextProvider } from './context/NotificationContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>,
)
