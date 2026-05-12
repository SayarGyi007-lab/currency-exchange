import { Provider } from "react-redux"
import { store } from "./slices/store/store"
import { RouterProvider } from "react-router-dom"
import router from "./app/routes/route"

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App
