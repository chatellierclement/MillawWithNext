import React, { useState, useEffect } from "react";
import Api from "../../../components/Barreau/Api";
import Information from "../../../components/Barreau/Information";
import useToken from "../../useToken";
import axios from "axios";

export default function Barreau() {
  const [currentPage, setCurrentPage] = useState(1);

  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);
  const [bar, setBar] = useState(null);

  function getUser() {
    axios
      .get("/api/user", { params: { id: token.id } })
      .then(function (response) {
        setUser(response.data);
        getBar(response.data.bar_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getBar(id) {
    axios
      .get("/api/bar", { params: { id: id } })
      .then(function (response) {
        setBar(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <>
      <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
        <div className="container-fluid px-0">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 mb-0">{bar ? bar.name : ""}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 p-xxl-5">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-12 col-xl-4 col-xxl-3 mb-3">
              <aside className="card border border-gray-200 rounded-12 mb-xl-4">
                <div className="collapse navbar-collapse d-xl-block">
                  <ul className="sidebar-nav">
                    <li onClick={() => setCurrentPage(1)}>
                      <a href="#" className={currentPage == 1 ? "active" : ""}>
                        <svg
                          className="me-2 feather feather-user"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>

                        <span className="ps-1">Informations</span>
                      </a>
                    </li>
                    <li onClick={() => setCurrentPage(2)}>
                      <a href="#" className={currentPage == 2 ? "active" : ""}>
                        <svg
                          className="me-2 feather feather-lock"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="ps-1">API</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>

            <div className="col-12 col-xl-8 col-xxl-9">
              <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                <div className="d-flex align-items-center px-3 px-md-4 py-3 border-bottom border-gray-200">
                  <h5 className="card-header-title my-2 ps-md-3 font-weight-semibold">
                    {currentPage === 1 && <>Informations</>}

                    {currentPage === 2 && <>API</>}
                  </h5>
                </div>
                <div className="card-body px-0 p-md-4">
                  {currentPage === 1 && <Information />}

                  {currentPage === 2 && <Api />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
