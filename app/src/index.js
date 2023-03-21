import ReactDOM from 'react-dom/client'
import App from './App'
import store from './app/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { NotificationContextProvider } from './context/NotificationContext'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </QueryClientProvider>
  </Provider>,
)
