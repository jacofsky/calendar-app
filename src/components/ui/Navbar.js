import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { eventLogout } from "../../actions/events";

const Navbar = () => {

  const dispatch = useDispatch()
  const {name} = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
    dispatch(eventLogout())
  }

  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          {name}
        </span>
        
        <button className="btn btn-outline-danger" onClick={handleLogout}> 
          <span><i className="bi bi-box-arrow-right"></i> Salir</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
