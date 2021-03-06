import React, { useState } from "react";
import useToken from '../useToken';

export default function Index() {

  const { token, setToken } = useToken();

  return (
    <>
      <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col">
              {token &&
                <h1 className="h2 mb-0">Bonjour {token.firstName} {token.lastName}</h1>
              } 
              </div>
            </div>
          </div>
        </div>  

        <div className="row g-0">     

          <div className="col-md-5 col-xxl-3 bg-gray-100"></div>
        </div>
      <style>
        {`
          .widget_custom .x_panel {
              background: #fff;
              border-radius: 3%;
              border-top: 2px solid #ffcd39;
              box-shadow: 6px 6px 2px 1px #dfe6e9;
              padding: 1em 0 4em 0.5em;
          }

          .valeur {
            font-size: 2.5em;
          }
        `}
      </style>
    </>
  );
}