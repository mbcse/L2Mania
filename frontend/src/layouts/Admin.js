
import React, { createContext, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import { useAccount, useDisconnect } from 'wagmi'

export const searchContext = createContext()

const Admin = (props) => {

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const mainContent = React.useRef(null);
  const location = useLocation();

  const [searchTx, setSearchTx] = useState()
  const [showSearch, setShowSearch] = useState(false)
  const setSearch = (txHash) => {
    setSearchTx(txHash)
    console.log(searchTx)
    Redirect('/admin/transactionsearch')

  }

  const handleSearch = () => {
    setShowSearch(true)
    console.log(showSearch)
    // window.location.href='/admin/transactionsearch'
  }

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
            />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
    <searchContext.Provider value={searchTx}>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
          handleSearch={handleSearch}
          searchTx = {searchTx}
          setSearch= {setSearch}
        />
        <Switch>
          {getRoutes(routes)}
          {showSearch? <Redirect from="*" to="/admin/transactionsearch" /> :<Redirect from="*" to="/admin/index" />}
        </Switch>
        {showSearch? <Redirect from="*" to="/admin/transactionsearch" /> :<Redirect from="*" to="/admin/index" />}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
      </searchContext.Provider>
    </>
  );
};

export default Admin;
