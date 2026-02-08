import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './Context/ThemeProvider';

import ProtectedRoute from './Routes/ProtectedRoute';
import AdminRoute from './Routes/AdminRoute';


import Home from './Pages/Home/Home';
import AllProducts from './Pages/AllProducts/AllProducts';
import ProductInfo from './Pages/ProductInfo/ProductInfo';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Dashboard from './Pages/Admin/Dashboard';
import AddProduct from './Pages/Admin/AddProduct';
import UpdateProduct from './Pages/Admin/UpdateProduct';
//import NoPage from './pages/NotFound/NoPage';

import { checkAuthStatus } from './Features/Auth/AuthSlice';
import  {loadCartFromStorage}  from './Features/Cart/CartSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());

    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AllProducts />} />
           <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/addproduct"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            }
          />
          {/* <Route path="/*" element={<NoPage />} /> */}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;

