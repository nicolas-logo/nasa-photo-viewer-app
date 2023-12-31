import Gallery from './components/Gallery/Gallery'
import { useSelector, useDispatch } from 'react-redux'
import { ApiKey } from './components/ApiKey/ApiKey'
import { setApiKey } from './redux/generalSlice'

function App () {
  const dispatch = useDispatch()
  const API_KEY = localStorage.getItem('API_KEY')
  dispatch(setApiKey(API_KEY))

  const general = useSelector((state) => state.general)

  return (
    <div className="App">
      {
        general.API_KEY
          ? <Gallery />
          : <ApiKey />
      }

    </div>
  )
}

export default App
