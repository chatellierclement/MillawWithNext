import React from "react";
import { NavLink } from "react-bootstrap";

export default class Menu extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
        user: null
    }    

    //this.state.user = JSON.parse(localStorage.getItem("user"))
    this.state.user = {
        lastName : "CHATELLIER",
        firstName: "Clément",
        role: {
        id: 1,
        libelle: "Dev"
        }
    }
  }    
  
  
  render() {      
    return (         
        <> 
        <div className="navbar navbar-vertical navbar-expand-lg navbar-light" id="sidebar">
            <a className="navbar-brand mx-auto d-none d-lg-block my-0 my-lg-4">
                LOGO
            </a>
            <div className="navbar-collapse">
                <ul className="navbar-nav mb-2">
                    <li className="nav-item">
                        <NavLink href="/Calendar/calendar">Planning</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink href="/admin/utilisateur">Utilisateur</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink href="/admin/permanence">Permanence</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink href="/admin/barreau">Barreau</NavLink>
                    </li>

                </ul>
            </div>
        </div>
        {/* <div className="vertical-nav" id="sidebar">
            <div className="py-4 px-3 mb-4 media">
                <div className="d-flex align-items-center">
                    <div className="media-body">
                        <h2 className="m-0">Millaw</h2>
                        <h4 className="m-0">{this.state.user.firstName} {this.state.user.lastName}</h4>
                        <p className="font-weight-light text-muted mb-0">{this.state.user.role.libelle}</p>
                    </div>
                </div>
            </div>

            <ul className="nav flex-column mb-0">
                <li className="nav-item activeLi">
                    <Link className="nav-link text-white" href="/Calendar/calendar">Planning</Link>
                </li>
                <li className="nav-item">                    
                    <Link className="nav-link text-white" href="/admin/utilisateur">Utilisateur</Link>
                </li>
                <li className="nav-item">                    
                    <Link className="nav-link text-white" href="/admin/permanence">Permanence</Link>
                </li>
                <li className="nav-item">                    
                    <Link className="nav-link text-white" href="/admin/barreau">Barreau</Link>
                </li>
            </ul>          
        </div> */}
        </>
    );
  }
}