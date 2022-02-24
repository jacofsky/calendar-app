import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          Jaco
        </span>
        
        <button className="btn btn-outline-danger"> 
            
            <span><i className="bi bi-box-arrow-right"></i> Salir</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
