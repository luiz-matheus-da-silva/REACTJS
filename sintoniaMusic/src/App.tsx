import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/favoritas" element={<Favorites/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
