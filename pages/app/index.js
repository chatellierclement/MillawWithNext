import React, { useState } from "react";

export default function Index() {

  return (
    <>
      <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h2 mb-0">Accueil</h1>
              </div>
            </div>
          </div>
        </div>  

        <div className="p-3 p-xxl-5">
          <div className="container-fluid px-0">
            <div className="row">
            <div className="col-4 widget_custom">
              <div className="x_panel">
                  <div>Nombres de permanences</div>
                  <hr />
                  <div className="text-center valeur">
                    <b>10</b>
                  </div>
              </div>
          </div>

          <div className="col-4 widget_custom">
              <div className="x_panel">
                  <div>Nombres de permanences</div>
                  <hr />
                  <div className="text-center valeur">
                    <b>10</b>
                  </div>
              </div>
          </div>

          <div className="col-4 widget_custom">
              <div className="x_panel">
                  <div>Nombres de permanences</div>
                  <hr />
                  <div className="text-center valeur">
                    <b>10</b>
                  </div>
              </div>
          </div>
            </div>
            </div>
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