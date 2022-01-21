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
import Menu from "./app/Menu/Menu"
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
                        <a href="#" onClick={handleClick} className="back-arrow bg-white circle shadow border border-gray-200 rounded mb-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16">
                            <g data-name="icons/tabler/chevrons-left" transform="translate(0)">
                              <rect data-name="Icons/Tabler/Chevrons Left background" width="16" height="16" fill="none"></rect>
                              <path d="M14.468,14.531l-.107-.093-6.4-6.4a.961.961,0,0,1-.094-1.25l.094-.107,6.4-6.4a.96.96,0,0,1,1.451,1.25l-.094.108L10,7.36l5.72,5.721a.961.961,0,0,1,.094,1.25l-.094.107a.96.96,0,0,1-1.25.093Zm-7.68,0-.107-.093-6.4-6.4a.961.961,0,0,1-.093-1.25l.093-.107,6.4-6.4a.96.96,0,0,1,1.45,1.25l-.093.108L2.318,7.36l5.72,5.721a.96.96,0,0,1,.093,1.25l-.093.107a.96.96,0,0,1-1.25.093Z" transform="translate(0 1)" fill="#6C757D"></path>
                            </g>
                          </svg>
                        </a>
                        {/* <Button variant="danger" onClick={handleClick}>Menu</Button> */}
                      </div>
                      <div className="col-auto d-flex flex-wrap align-items-center icon-blue-hover ps-0">
                        <div className="dropdown grid-option">
                          <a href="#" className="text-dark ms-4 ms-xxl-5 mb-0 notification-icon" data-bs-toggle="dropdown" aria-expanded="false" id="notification">
                            <svg id="Icons_tabler_notification" data-name="Icons/tabler/notification" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <rect id="Icons_Tabler_Notification_background" data-name="Icons/Tabler/Notification background" width="24" height="24" fill="none"></rect>
                              <path d="M6.162,19.63l-.005-.246v-.308H.926A.923.923,0,0,1,.471,17.35a4,4,0,0,0,1.956-2.66l.036-.229V10.726A9.492,9.492,0,0,1,7.292,2.873l.147-.08,0-.018A3.369,3.369,0,0,1,10.566.007L10.771,0a3.379,3.379,0,0,1,3.287,2.573l.045.22.147.08a9.556,9.556,0,0,1,4.806,7.541l.023.355-.007,3.582a4.016,4.016,0,0,0,2,3,.924.924,0,0,1-.329,1.719l-.126.008H15.387v.308a4.616,4.616,0,0,1-9.225.246ZM8,19.385a2.769,2.769,0,0,0,5.532.189l.007-.189v-.308H8ZM9.242,3.228l-.012.238-.005.045L9.2,3.63l-.039.113-.054.107-.035.055L9,4l-.036.038-.05.046-.1.074L8.7,4.219A7.7,7.7,0,0,0,4.332,10.46l-.022.309-.007,3.8a5.875,5.875,0,0,1-.94,2.541l-.084.119H18.266l-.007-.012a6.007,6.007,0,0,1-.983-2.452l-.043-.306V10.812a7.674,7.674,0,0,0-4.4-6.593.919.919,0,0,1-.518-.7l-.009-.132a1.538,1.538,0,0,0-3.069-.157Z" transform="translate(1.499)" fill="#1e1e1e"></path>
                            </svg>
                            <sup className="status bg-warning">&nbsp;</sup>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Component {...pageProps} />

              
              {/* <div className="container container_custom">
                
              </div> */}
          </div>
      </div>
    </>
  )
}

export default MyApp
