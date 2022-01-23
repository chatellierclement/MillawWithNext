import React, { useState } from "react";

export default function Index() {

  return (
    <>
      <div className="container">
        <div className="col-xs-12 col-sm-6 col-md-2 widget_custom">
            <div className="x_panel">
                <div>Nombres de permanences</div>
                <hr />
                <div className="text-center">
                  <b>10</b>
                </div>
            </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2 widget_custom">
            <div className="x_panel">
                <div>Nombres de permanences</div>
                <hr />
                <div className="text-center">
                  <b>10</b>
                </div>
            </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2 widget_custom">
            <div className="x_panel">
                <div>Nombres de permanences</div>
                <hr />
                <div className="text-center">
                  <b>10</b>
                </div>
            </div>
        </div>
      </div>

      <style>
        {`
          .widget_custom .x_panel {
              border-radius: 3%;
              border-top: 7px solid blue;
              box-shadow: 6px 6px 2px 1px #dfe6e9;
              padding: 1em 0.5em;
          }
        `}
      </style>
    </>
  );
}