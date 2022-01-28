import React from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Menu() { 
        
    return (         
        <> 
        <div className="navbar navbar-vertical navbar-expand-lg navbar-light" id="sidebar">
            <Link href="/app">
                <a className="navbar-brand mx-auto d-none d-lg-block my-0 my-lg-4">
                    <Image
                        src="/logo.png"
                        alt="logo millaw"
                        width={450}
                        height={100}
                    />
                </a>
            </Link>
            
            <div className="navbar-collapse">
                <ul className="navbar-nav mb-2">
                    <li className="nav-item">
                        <Link  href="/app/planning">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                <span className="ms-2">
                                    Mon planning
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link  href="/app/candidature">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                <span className="ms-2">
                                    Mes candidatures
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/utilisateur">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                <span className="ms-2">
                                    Utilisateurs
                                </span> 
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/documents">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                <span className="ms-2">
                                    Documents
                                </span> 
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/commissionOffice">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                <span className="ms-2">
                                    Commission d&apos;office
                                </span> 
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/permanence">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                <span className="ms-2">
                                    Permanences
                                </span> 
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">                    
                        <Link href="/app/admin/barreau">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                <span className="ms-2">
                                    Le barreau
                                </span> 
                            </a>
                        </Link>
                    </li>
                </ul>

                <div className="navbar-vertical-footer border-top border-gray-50">
                    <div className="col-auto d-flex flex-wrap align-items-center icon-blue-hover ps-0">
                        <Link href="/app/user/profile">
                            <a className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span className="ms-2">
                                    John Doe
                                </span> 
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}