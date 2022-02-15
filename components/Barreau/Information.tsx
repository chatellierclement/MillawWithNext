import React, { useState, useEffect } from "react";
import useToken from "../../pages/useToken";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default function Information() {

    const { token, setToken } = useToken();
    const [user, setUser] = useState(null);
    const [bar, setBar] = useState(null);
    
    function getBar() {
      axios
        .get("/api/bar", { params: { id: token.bar_id } })
        .then(function (response) {
          setBar(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function handleIsApplyAuthorizedChange(event) {
      bar.isApplyAuthorized = event.target.value;
    }


    function onSaveBar (event) {
      event.preventDefault()
      
      bar.isApplyAuthorized = event.target.isApplyAuthorized.checked

      axios.put('/api/bar', bar) 
      .then(function (response) {
        NotificationManager.success("success", "Le barreau a été modifié avec succès.", 3000)
        getBar()
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de la modification du barreau. Si le problème persiste, veuillez contacter le support.", 3000)
      }) 
    }
  
  
    useEffect(() => {
      getBar();
    }, [token]);

  return (
    <>
    <NotificationContainer/>

<form onSubmit={onSaveBar} className="px-3 form-style-two">
  <div className="row">
    <div className="col mb-md-4 pb-3">
      <label htmlFor="Email" className="form-label form-label-lg">
        Nom
      </label>
      <input
        type="text"
        disabled
        className="form-control form-control-xl"
        id="Email"
        value={bar ? bar.name : ""}
      ></input>
    </div>

    <div className="media border-bottom border-gray-200 py-2 py-md-4">
      <div className="media-body my-2 w-100">
        <div className="row align-items-center">
          <div className="col">
            <span className="fs-16">Autoriser les candidatures</span>
          </div>
          <div className="col-auto">
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleIsApplyAuthorizedChange}
                checked={bar && bar.isApplyAuthorized}
                name="isApplyAuthorized"
                id="isApplyAuthorized"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="text-end py-md-3">
    <button
      type="submit"
      className="btn btn-lg btn-primary px-md-4 mt-lg-3"
    >
      <span className="px-md-3">Enregistrer</span>
    </button>
  </div>
</form>
    </>
    
  );
}
