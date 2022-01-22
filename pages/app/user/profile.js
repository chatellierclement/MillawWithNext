import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default function Permanence() {
    return (
        <>
            <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
                <div className="container-fluid px-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h1 className="h2 mb-0">Mon profile</h1>
                        </div>
                    </div>
                </div>
            </div> 

            <div className="p-3 p-xxl-5">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-12 col-xl-4 col-xxl-3 mb-3">
                            <aside className="card border border-gray-200 rounded-12 mb-xl-4">
                                <div className="p-3 p-md-4 d-flex align-items-center">
                                    <div className="ps-2 ps-md-3">
                                        <h5 className="mb-1">Maxime DERAME</h5>
                                    </div>
                                </div>

                                <div className="collapse navbar-collapse d-xl-block">
                                    <ul className="sidebar-nav">
                                        <li>
                                            <a href="#0" className="active">
                                                <svg className="me-2" data-name="icons/tabler/user" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <rect data-name="Icons/Tabler/User background" width="16" height="16" fill="none"></rect>
                                                    <path d="M11.334,16H.667a.665.665,0,0,1-.661-.568L0,15.343v-1.75A4.179,4.179,0,0,1,4.029,9.44l.193,0H7.778A4.186,4.186,0,0,1,12,13.4l0,.191v1.75a.661.661,0,0,1-.576.651ZM4.222,10.749a2.869,2.869,0,0,0-2.884,2.683l-.005.162v1.094h9.334V13.594A2.857,2.857,0,0,0,8.1,10.767l-.162-.013-.164,0ZM6,8.314A4.2,4.2,0,0,1,1.778,4.157a4.223,4.223,0,0,1,8.445,0A4.2,4.2,0,0,1,6,8.314Zm0-7A2.87,2.87,0,0,0,3.111,4.157a2.889,2.889,0,0,0,5.778,0A2.87,2.87,0,0,0,6,1.313Z" transform="translate(2)" fill="#1e1e1e"></path>
                                                </svg>
                                                <span className="ps-1">Informations</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#0">
                                                <svg className="me-2" data-name="icons/tabler/user" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <rect data-name="Icons/Tabler/User background" width="16" height="16" fill="none"></rect>
                                                    <path d="M11.334,16H.667a.665.665,0,0,1-.661-.568L0,15.343v-1.75A4.179,4.179,0,0,1,4.029,9.44l.193,0H7.778A4.186,4.186,0,0,1,12,13.4l0,.191v1.75a.661.661,0,0,1-.576.651ZM4.222,10.749a2.869,2.869,0,0,0-2.884,2.683l-.005.162v1.094h9.334V13.594A2.857,2.857,0,0,0,8.1,10.767l-.162-.013-.164,0ZM6,8.314A4.2,4.2,0,0,1,1.778,4.157a4.223,4.223,0,0,1,8.445,0A4.2,4.2,0,0,1,6,8.314Zm0-7A2.87,2.87,0,0,0,3.111,4.157a2.889,2.889,0,0,0,5.778,0A2.87,2.87,0,0,0,6,1.313Z" transform="translate(2)" fill="#1e1e1e"></path>
                                                </svg>
                                                <span className="ps-1">Sécurité</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>

                        <div className="col-12 col-xl-8 col-xxl-9">
                            <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                                <div className="d-flex align-items-center px-3 px-md-4 py-3 border-bottom border-gray-200">
                                    <h5 className="card-header-title my-2 ps-md-3 font-weight-semibold">Informations</h5>
                                </div>
                                <div className="card-body px-0 p-md-4">
                                    <form className="px-3 form-style-two">
                                        <div className="row">
                                            <div className="col-sm-6 mb-md-4 pb-3">
                                                <label htmlFor="FullName" className="form-label form-label-lg">Nom</label>
                                                <input type="text" className="form-control form-control-xl" id="FullName" placeholder="Full name" value="DERAME"></input>
                                            </div>
                                            <div className="col-sm-6 mb-md-4 pb-3">
                                                <label htmlFor="FullName" className="form-label form-label-lg">Prénom</label>
                                                <input type="text" className="form-control form-control-xl" id="FullName" placeholder="Full name" value="Maxime"></input>
                                            </div>
                                            
                                        </div>
                                        <div className="row">
                                        <div className="col mb-md-4 pb-3">
                                                <label htmlFor="Email" className="form-label form-label-lg">Email</label>
                                                <input type="text" className="form-control form-control-xl" id="Email" placeholder="Email" value="maxime.derame@millaw.fr"></input>
                                            </div>
                                        </div>
                                        <div className="text-end py-md-3">
                                            <button type="submit" className="btn btn-lg btn-primary px-md-4 mt-lg-3">
                                                <span className="px-md-3">Enregistrer</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        </>
    )  
}