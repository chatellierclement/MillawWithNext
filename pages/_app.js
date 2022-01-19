import '../styles/globals.css'

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import '../styles/app.css';
import '../styles/calendar.css';
import { Button } from "react-bootstrap";
import Menu from "./Menu/Menu"


function MyApp({ Component, pageProps }) {
  
  const handleClick = () => {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("content").classList.toggle("active");
  };

  return (
    <>
    <div className="container-fluid">
      <div className="row"> 
          <div>
              <Menu />
          </div>
          
          <div className="page-content nopadding" id="content">
              <Button variant="danger" onClick={handleClick}>Menu</Button>
              <div className="container container_custom">
                <Component {...pageProps} />
              </div>
          </div>
      </div>
    </div>    
    </>
  )
}

export default MyApp
