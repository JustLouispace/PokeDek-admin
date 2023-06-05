import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Resetpassword from './pages/Resetpassword';
import Forotpassword from './pages/Forgotpassword';
import Customers from './pages/Customers';
import Addproduct from './pages/Addproduct';
import Productlist from './pages/Productlist';
import UpdateProduct from './pages/UpdateProduct'; // Corrected component name
import Requsetlist from './pages/Requsetlist';
import UpdateRequest from './pages/updateRequest';
import Addrequest from './pages/Addrequest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customer" element={<Customers />} />
          <Route path="customerupload/:slug" element={<Customers />} />
          <Route path="add-product" element={<Addproduct />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="updateproduct/:slug" element={<UpdateProduct />} />
          <Route path="Requset-list" element={<Requsetlist />} />
          <Route path="add-Requset" element={<Addrequest />} />
          <Route path="update-Request/:slug" element={<UpdateRequest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
