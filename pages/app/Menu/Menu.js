import React from "react";
import Link from 'next/link'
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
                        <Link  href="/app/Calendar/calendar"><a className="nav-link">Planning</a></Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/utilisateur"><a className="nav-link">Utilisateur</a></Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/permanence"><a className="nav-link">Permanence</a></Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/barreau"><a className="nav-link">Barreau</a></Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    );
  }
}