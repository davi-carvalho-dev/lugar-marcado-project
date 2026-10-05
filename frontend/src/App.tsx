import { Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Restaurantes from './pages/Restaurantes'
import RestauranteDetalhe from './pages/RestauranteDetalhe'
import MinhasReservas from './pages/MinhasReservas'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/restaurantes/:id" element={<RestauranteDetalhe />} />
        {<Route path="/minhas-reservas" element={<MinhasReservas />} /> }
        { <Route path="/login" element={<Login />} />}
      </Route>
    </Routes>
  )
}