import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useToken from "../../useToken";
import axios from "axios";

export default function Menu(props) {
  const { user } = props;
  const { token, setToken } = useToken();
  const [bar, setBar] = useState(null);
  const [typePermanences, setTypePermanences] = useState([]);

  function getTypesPermanence() {
    axios.get("/api/typePermanence").then(function (response) {
      setTypePermanences(response.data);
    });
  }

  function getBar() {
    if (token) {
      axios
      .get("/api/bar", { params: { bar_id: token.bar_id } })
      .then(function (response) {
        setBar(response.data);
      });
    }
  }

  useEffect(() => {
    getTypesPermanence();
    getBar();
  }, [token]);

  return (
    <>
      <div
        className="navbar navbar-vertical navbar-expand-lg navbar-light"
        id="sidebar"
      >
        <Link href="/app">
          <a className="navbar-brand mx-auto d-none d-lg-block my-0 my-lg-4">
            <Image src="/logo.png" alt="logo millaw" width={450} height={100} />
          </a>
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav mb-2">
            <li
              className="pt-2 pb-2 nav-item nav-subtitle"
              style={{ top: "161.781px" }}
            >
              <small>Avocat</small>
            </li>
            <li className="nav-item">
              <Link href="/app/planning">
                <a className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-calendar"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className="ms-2">Mon planning</span>
                </a>
              </Link>
            </li>
            {bar && bar.isApplyAuthorized && (
              <>
                <li className="nav-item">
                  <Link href="/app/candidature">
                    <a className="nav-link">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-calendar"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span className="ms-2">Mes candidatures</span>
                    </a>
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link href="/app/dons/effectue">
                <a className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  <span className="ms-2">Mes dons</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/app/documents">
                <a className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-file"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>{" "}
                  <span className="ms-2">Documents</span>
                </a>
              </Link>
            </li>

            {user && user.role.libelle == "ADMIN" && (
              <>
                <li
                  className="pt-2 pb-2 nav-item nav-subtitle"
                  style={{ top: "161.781px" }}
                >
                  <small>Administration</small>
                </li>
                <li className="nav-item">
                  <Link href="/app/admin/users">
                    <a className="nav-link">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span className="ms-2">Utilisateurs</span>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="#">
                    <a className="nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      <span className="ms-2">Commissions d&apos;office</span>
                      <span className="badge bg-info text-dark">Bientôt</span>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/app/admin/typePermanence">
                    <a className="nav-link">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span className="ms-2">Permanences</span>
                    </a>
                  </Link>
                </li>                
              </>
            )}
          </ul>

          <div className="navbar-vertical-footer border-top border-gray-50">
            <div className="col-auto d-flex flex-wrap align-items-center icon-blue-hover ps-0">
              <Link href="/app/user/profile">
                <a className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  {token && (
                    <span className="ms-2">
                      {token.firstName} {token.lastName}
                    </span>
                  )}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
