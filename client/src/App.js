import React, { useContext, createContext, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import Navbar from './components/layout/Navbar';
import BuyerLogin from './components/buyers/BuyerLogin';
import BuyerHome from './components/buyers/BuyerHome';
import BuyerSignup from './components/buyers/BuyerSignup';
import EmailVerified from './components/buyers/EmailVerified';
import ForgotPassword from './components/buyers/ForgotPassword';
import UpdatePassword from './components/buyers/UpdatePassword';
import SellerHome from './components/sellers/SellerHome';
import SellerLogin from './components/sellers/SellerLogin';
import SellerSignup from './components/sellers/SellerSignup';
import SellerEmailVerified from './components/sellers/SellerEmailVerified';
import SellerForgotPassword from './components/sellers/SellerForgotPassword';
import SellerUpdatePassword from './components/sellers/SellerUpdatePassword';
import AddProduct from './components/sellers/AddProduct';
import Inventory from './components/sellers/Inventory';

import {reducer, initialState} from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();

  const {state, dispatch} = useContext(UserContext);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type: "USER", payload: user})
      if(user.type === "buyer")
        history.push('/')
      else 
        history.push('/seller/')

    } else {
      if(!history.location.pathname.startsWith('/reset') && !history.location.pathname.startsWith('/verify')){
        M.toast({ html: "Please login first!", classes: "red darken-3" })
        if(state.type === "buyer")
          history.push('/login');
        if(state.type === "seller")
          history.push('/seller/login');
      }
      }
  }, []);



  return(
    <Switch>
      <Route exact path="/" component={ BuyerHome } />
      <Route path="/login" component={ BuyerLogin } />
      <Route path="/register" component={ BuyerSignup } />
      <Route exact path="/verify/:token" component={ EmailVerified } />
      <Route path="/forgot" component={ ForgotPassword } />
      <Route exact path="/reset/:token" component={ UpdatePassword } />

      <Route exact path="/seller/" component={ SellerHome } />
      <Route path="/seller/login" component={ SellerLogin } />
      <Route path="/seller/register" component={ SellerSignup } />
      <Route path="/verify/seller/:token" component={ SellerEmailVerified } />
      <Route path="/seller/forgot" component={ SellerForgotPassword } />
      <Route path="/reset/seller/:token" component={ SellerUpdatePassword } />
      <Route path="/seller/product/add" component={ AddProduct } />
      <Route path="/seller/inventory" component={ Inventory } />
    </Switch>
  )
}

function App() {
  // add separate react client for sellers
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state: state, dispatch: dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
