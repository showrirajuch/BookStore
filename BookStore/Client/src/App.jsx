import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Footer from './Components/Footer';

// Admin Space
import Alogin from './Admin/Alogin';
import Asignup from './Admin/Asignup';
import Ahome from './Admin/Ahome';
import SellerApproval from './Admin/Seller';
import UsersList from './Admin/Users';
import ItemsCatalog from './Admin/items';

// Seller Space
import Slogin from './Seller/Slogin';
import Ssignup from './Seller/Ssignup';
import Shome from './Seller/Shome';
import MyProducts from './Seller/MyProducts';
import Addbook from './Seller/Addbook';
import SellerOrders from './Seller/Orders';

// User Space
import UserLogin from './User/Login';
import UserSignup from './User/Signup';
import Uhome from './User/Uhome';
import Products from './User/Products';
import Uitem from './User/Uitem';
import MyOrders from './User/MyOrders';

import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#020617' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Alogin />} />
            <Route path="/admin/signup" element={<Asignup />} />
            <Route path="/admin/home" element={<Ahome />} />
            <Route path="/admin/sellers" element={<SellerApproval />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/items" element={<ItemsCatalog />} />

            {/* Seller Routes */}
            <Route path="/seller/login" element={<Slogin />} />
            <Route path="/seller/signup" element={<Ssignup />} />
            <Route path="/seller/home" element={<Shome />} />
            <Route path="/seller/products" element={<MyProducts />} />
            <Route path="/seller/add-book" element={<Addbook />} />
            <Route path="/seller/orders" element={<SellerOrders />} />

            {/* User Routes */}
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/home" element={<Uhome />} />
            <Route path="/user/products" element={<Products />} />
            <Route path="/user/books/:id" element={<Uitem />} />
            <Route path="/user/orders" element={<MyOrders />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
