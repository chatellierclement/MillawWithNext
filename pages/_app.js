import '../styles/globals.css'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import '../styles/app.css';
import '../styles/calendar.css';
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import Menu from "./app/Menu/Menu"
import Login from "./login"
import Index from '.';
import Link from 'next/link';
import useToken from './useToken';


function MyApp({ Component, pageProps }) {  

  const acces_data = [
    { path: "/app/admin/users", roles: ["ADMIN"] },        
    { path: "/app/admin/co/all", roles: ["ADMIN"] },    
    { path: "/app/admin/co/create", roles: ["ADMIN"] },
    { path: "/app/admin/permanence", roles: ["ADMIN"] }
  ]

  const router = useRouter();
  const loginRoot = ['/login'];
  const marketingRoot = ['/'];
  const { token, setToken } = useToken();

  function handleClick() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("content").classList.toggle("active");
  }

  useEffect(() => {
    if(!token) {
      router.push("/login")
    } else {      

      //Gestion des accès en fonction du role
      const role = "AVOCAT"
      let acces_bool = false
      acces_data.forEach(a => {
        if (a.path === window.location.pathname && a.roles.includes(role)) {
          acces_bool = true
        }
      })

      if(loginRoot.indexOf(router.route) > -1 || acces_bool === false) {
        router.push("/app")
      } 
    }  
  }, [])
  
  if(marketingRoot.indexOf(router.route) > -1) {
    return <Index />
  }
  
  if(loginRoot.indexOf(router.route) > -1) {
    return <Login setToken={setToken} />
  } 

  return (
    <>
          <div>
            <Menu />
          </div>
          
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

                        <div className="dropdown grid-option">
                          <Link href="/app/admin/barreau" className="text-dark ms-4 ms-xxl-5 mb-0 notification-icon" data-bs-toggle="dropdown" aria-expanded="false" id="notification"> 
                            <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" x="0px" y="0px" viewBox="0 0 463 463">
                              <path d="M423,219.5V211h16.5c4.142,0,7.5-3.358,7.5-7.5V179h8.5c4.142,0,7.5-3.358,7.5-7.5v-24c0-2.691-1.442-5.177-3.779-6.512
                                l-224-128c-2.306-1.317-5.137-1.317-7.442,0l-224,128C1.442,142.323,0,144.808,0,147.5v24c0,4.142,3.358,7.5,7.5,7.5H16v24.5
                                c0,4.142,3.358,7.5,7.5,7.5H40v8.5c0,5.827,3.235,10.908,8,13.555V372H23.5c-4.142,0-7.5,3.358-7.5,7.5V404H7.5
                                c-4.142,0-7.5,3.358-7.5,7.5v32c0,4.142,3.358,7.5,7.5,7.5h448c4.142,0,7.5-3.358,7.5-7.5v-32c0-4.142-3.358-7.5-7.5-7.5H447v-24.5
                                c0-4.142-3.358-7.5-7.5-7.5H415V233.055C419.765,230.408,423,225.327,423,219.5z M408,219.5c0,0.276-0.224,0.5-0.5,0.5h-32
                                c-0.276,0-0.5-0.224-0.5-0.5V211h33V219.5z M335,372V233.055c4.765-2.647,8-7.728,8-13.555V211h17v8.5
                                c0,5.827,3.235,10.908,8,13.555V372H335z M303,372V235h17v137H303z M255,372V233.055c4.765-2.647,8-7.728,8-13.555V211h17v8.5
                                c0,5.827,3.235,10.908,8,13.555V372H255z M223,372V235h17v137H223z M175,372V233.055c4.765-2.647,8-7.728,8-13.555V211h17v8.5
                                c0,5.827,3.235,10.908,8,13.555V372H175z M143,372V235h17v137H143z M95,372V233.055c4.765-2.647,8-7.728,8-13.555V211h17v8.5
                                c0,5.827,3.235,10.908,8,13.555V372H95z M168,211v8.5c0,0.276-0.224,0.5-0.5,0.5h-32c-0.276,0-0.5-0.224-0.5-0.5V211H168z M248,211
                                v8.5c0,0.276-0.224,0.5-0.5,0.5h-32c-0.276,0-0.5-0.224-0.5-0.5V211H248z M328,211v8.5c0,0.276-0.224,0.5-0.5,0.5h-32
                                c-0.276,0-0.5-0.224-0.5-0.5V211H328z M15,151.852L231.5,28.138L448,151.852V164H15V151.852z M31,179h401v17H31V179z M88,211v8.5
                                c0,0.276-0.224,0.5-0.5,0.5h-32c-0.276,0-0.5-0.224-0.5-0.5V211H88z M63,235h17v137H63V235z M448,436H15v-17h433V436z M432,404H31
                                v-17h401V404z M383,372V235h17v137H383z"/>
                            </svg>
                          </Link>
                        </div>

                        <div className="dropdown grid-option">
                          <a href="#" className="text-dark ms-4 ms-xxl-5 mb-0 notification-icon" data-bs-toggle="dropdown" aria-expanded="false" id="notification"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Component {...pageProps} />
          </div>
    </>
  )
}

export default MyApp
