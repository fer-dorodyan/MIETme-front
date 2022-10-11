import {Navigate, Route, Routes} from "react-router-dom";

// die Componente importieren:
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import ProductDetails from "../pages/ProductDetails.jsx/productDetail.jsx";
import UserPanel from '../pages/UserPanel/adminProductList';
import CreateEditProduct from '../pages/UserPanel/CreateEditProduct';
import AboutUs from "../pages/AboutUs/about";
import ContactUs from "../pages/ContactUs/contactUs";
import CategoriesPage from '../pages/CategoriesPage/categoryPage';
import Layout from "../components/layout/layout";
import PanelLayout from "../components/layout/panelLayout";
import FavoriteList from "../pages/UserPanel/favoriteList";
import Roles from "../pages/roles/roles";
import RequestedProducts from "../pages/UserPanel/RequestedProducts";
import MyRequests from "../pages/UserPanel/MyRequests";
import RequestDetail from "../pages/UserPanel/requestDetail";
import ReserveDetail from "../pages/UserPanel/reserveDetail";
import AdminUserList from "../pages/AdminPanel/adminUserList";
import AdminPanelLayout from "../components/layout/adminPanelLayout";
import AdminProductList from "../pages/AdminPanel/adminProductList";
import AdminContractList from "../pages/AdminPanel/adminContractList";
import AdminContactList from "../pages/AdminPanel/adminContactList";
import ForgetPassword from "../pages/forgetPassword/forgetPassword";
import ResetPassword from "../pages/resetPassword/resetPassword";

// alle Routes in eine Funktion
function  RoutesMap() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/> /* home page route which navigate to /home*/
            <Route path="/home" element={<Layout><HomePage/></Layout>}/> /* home page route */
            <Route path="/login" element={<Login/>}/> /* login route */
            <Route path="/forgetPassword" element={<ForgetPassword/>}/> /* forget password router */
            <Route path="/resetPassword" element={<ResetPassword/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/about-us" element={<Layout withoutNavbar><AboutUs/></Layout>}/>
            <Route path="/roles" element={<Layout withoutNavbar><Roles/></Layout>}/>
            <Route path="/contact-us" element={<Layout withoutNavbar><ContactUs/></Layout>}/>
            {/* /* route for products by category */}
            <Route path="/categories/:name" element={<Layout><CategoriesPage/></Layout>}/>  
            <Route path="/product-details/:id" element={<Layout><ProductDetails/></Layout>}/>
            <Route path="/user-panel" element={<PanelLayout><UserPanel/></PanelLayout>}/>
            <Route path="/user-panel/favorite" element={<PanelLayout><FavoriteList/></PanelLayout>}/>
            <Route path="/user-panel/requestedProducts" element={<PanelLayout><RequestedProducts/></PanelLayout>}/>
            <Route path="/user-panel/requestedProducts/:requestId"
                   element={<PanelLayout><RequestDetail/></PanelLayout>}/>
            <Route path="/user-panel/myRequests" element={<PanelLayout><MyRequests/></PanelLayout>}/>
            <Route path="/user-panel/myRequests/:id" element={<PanelLayout><ReserveDetail/></PanelLayout>}/>
             {/* /*create product route: */ }
            <Route path="/user-panel/create-edit-form/" element={<PanelLayout><CreateEditProduct/></PanelLayout>}/> 
            {/* /*Edit(update) product route (wegen id): */ }
            <Route path="/user-panel/create-edit-form/:id"
                   element={<PanelLayout><CreateEditProduct/></PanelLayout>}/> /* update product route */
            <Route path="/admin-panel/userList" element={<AdminPanelLayout><AdminUserList/></AdminPanelLayout>}/>
            <Route path="/admin-panel/productList" element={<AdminPanelLayout><AdminProductList/></AdminPanelLayout>}/>
            <Route path="/admin-panel/contractList"
                   element={<AdminPanelLayout><AdminContractList/></AdminPanelLayout>}/>
            <Route path="/admin-panel/contactList" element={<AdminPanelLayout><AdminContactList/></AdminPanelLayout>}/>
            <Route path="/admin-panel" element={<Navigate to={"/admin-panel/userList"}/>}/>   {/* /* navigate to admin user list */}

        </Routes>
    )
}

export {
    RoutesMap,
}
