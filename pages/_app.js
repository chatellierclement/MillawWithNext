import '../styles/globals.css'

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import '../styles/app.css';
import '../styles/calendar.css';
import { Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import Menu from "./Menu/Menu"
import Login from "./login"


function MyApp({ Component, pageProps }) {  
  
  const router = useRouter();
  const noLayout = ['/login']

  if(noLayout.indexOf(router.route) > -1) {
    return <Login />
  } 

  const handleClick = () => {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("content").classList.toggle("active");
  };

  return (
    <>
    <div className="bg-gray-100">
              <Menu />
          
          <div className="main-content" id="content">
              <div className="header border-bottom border-gray-200 header-fixed">
                <div className="container-fluid px-0">
                  <div className="header-body px-3 px-xxl-5 py-3 py-lg-4">
                    <div className="row align-items-center">
                      <div className="col d-flex align-items-center">
                        <a href="#" onClick={handleClick} className="back-arrow bg-white circle circle-sm shadow border border-gray-200 rounded mb-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16">
                            <g data-name="icons/tabler/chevrons-left" transform="translate(0)">
                              <rect data-name="Icons/Tabler/Chevrons Left background" width="16" height="16" fill="none"></rect>
                              <path d="M14.468,14.531l-.107-.093-6.4-6.4a.961.961,0,0,1-.094-1.25l.094-.107,6.4-6.4a.96.96,0,0,1,1.451,1.25l-.094.108L10,7.36l5.72,5.721a.961.961,0,0,1,.094,1.25l-.094.107a.96.96,0,0,1-1.25.093Zm-7.68,0-.107-.093-6.4-6.4a.961.961,0,0,1-.093-1.25l.093-.107,6.4-6.4a.96.96,0,0,1,1.45,1.25l-.093.108L2.318,7.36l5.72,5.721a.96.96,0,0,1,.093,1.25l-.093.107a.96.96,0,0,1-1.25.093Z" transform="translate(0 1)" fill="#6C757D"></path>
                            </g>
                          </svg>
                        </a>
                        {/* <Button variant="danger" onClick={handleClick}>Menu</Button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
                <div className="container-fluid px-0">
                  <div className="row align-items-center">
                    <Component {...pageProps} />
                  </div>
                </div>
              </div>
              {/* <div className="container container_custom">
                
              </div> */}
          </div>
      </div>
    </>
  )
}

export default MyApp
