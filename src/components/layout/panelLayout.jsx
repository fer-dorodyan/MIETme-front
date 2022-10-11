import React from 'react';
import Sidebar from "../Sidebar/sidebar";

// layout for user panel pages
const PanelLayout = ({children}) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 w-75">
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                    </div>
                    {/* sein Children ist: <UserPanel/> in RoutesMap, da wird aufgerufen */}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PanelLayout;
