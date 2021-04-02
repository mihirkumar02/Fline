import React, {useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {UserContext} from '../../App';
import M from 'materialize-css';

const Navbar = () => {    
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();

    const AuthLinks = () => {
      if(state.type === "seller"){
        return (
        <ul id="nav-mobile" className="right">
          <li><Link to="/seller/login">Login</Link></li>
          <li><Link to="/seller/register">Signup</Link></li>
        </ul> 
        )
      }

      if(state.type === "buyer"){
        return (
        <ul id="nav-mobile" className="right">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Signup</Link></li>
        </ul> 
        )
      }
    }

    const logout = e => {
      e.preventDefault();
      localStorage.clear();
      let redirectLink;
      let userType = state.type;
      if(state.type === "buyer"){
        redirectLink = "/login";
      } 

      if(state.type === "seller"){
        redirectLink = "/seller/login";
      } 

      dispatch({type: "CLEAR", payload: userType})
      M.toast({ html: "Logged out!", classes: "green darken-1"})
      history.push(redirectLink)
    }

    let homeLink;
    if(state.type === "buyer"){
      homeLink = "/"
    }
    if(state.type === "seller"){
      homeLink = "/seller/"
    }


    let loginLink;
    if(state.type === "buyer"){
      loginLink = "/login"
    }
    if(state.type === "seller"){
      loginLink = "/seller/login"
    }

    return (
      <div>
        <nav className="white paddedNav">
           <div className="nav-wrapper">
             <Link to={state.user ? homeLink : loginLink} className="brand-logo left">Fline</Link>
             {/* <form>
                <div className="input-field">
                  <input id="search" type="search" required />
                  <label className="label-icon" for="search"><i class="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
             </form> */}
             {
               state.user ? (
                 
                /*<a className='dropdown-trigger btn right' href='#' data-target='nav-mobile'>Drop Me!</a>*/
                 <ul id="nav-mobile" className="right">
                    <li>
                        <button 
                            className="btn waves-effect waves-light blue darken-1"
                            onClick={logout}
                        >
                        Logout
                        </button>
                    </li>
                 </ul>
                 
               ) : (
                  <AuthLinks />
               )
             }
           </div>
        </nav>
        <nav className="underNav paddedNav">
           <div className="nav-wrapper">
             {
               state.user ? (
                 <>
                 <ul id="nav-mobile" className="left">
                    <li>
                      <p className="blackName">{ state.user.username }</p>
                    </li>
                 </ul>
                 {state.user.type === "seller" ? (
                  <ul id="nav-mobile" className="right">
                     <li className="optionsLi"><Link to="/seller/product/add">Add</Link></li>
                  </ul>
                 ) : (
                   <>
                   </>
                 )}
                 </>
               ) : (
                  <>
                  </>
               )
             }
           </div>
        </nav>
      </div>
    )
}

export default Navbar;
