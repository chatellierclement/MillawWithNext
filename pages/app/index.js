import React, { useState } from "react";

export default function Index() {

  return (
    <>
      <div className="container">
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