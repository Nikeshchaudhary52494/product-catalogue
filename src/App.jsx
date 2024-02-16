import { Route, Routes } from 'react-router-dom'
import CategoriesList from './components/products/CategoriesList'
import Products from './components/products/Products'
import ProductDetails from './components/products/ProductDetails'
import Login from './components/User/Login'
import Layout from './components/layout/Layout'
import Cart from './components/Cart/Cart'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CategoriesList />} />
        <Route path=":category" element={<Products />} />
        <Route path="product/:productid" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
