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
                        <Link  href="/app/Calendar/calendar"><a className="nav-link">Mon planning</a></Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/utilisateur"><a className="nav-link">Utilisateur</a></Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/permanence"><a className="nav-link">Permanence</a></Link>
                    </li>
                </ul>

                <div className="navbar-vertical-footer border-top border-gray-50">
                    <div className="col-auto d-flex flex-wrap align-items-center icon-blue-hover ps-0">
                        <div className="grid-option">
                            <label>Maxime DERAME</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
  }
}