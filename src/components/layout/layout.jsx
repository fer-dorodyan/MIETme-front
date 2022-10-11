import React from 'react';
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";

// layout for common pages
const Layout = ({children, withoutNavbar}) => {
    return (
        <div>
            <Header/>
            {!withoutNavbar && <Navbar/>}
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;
