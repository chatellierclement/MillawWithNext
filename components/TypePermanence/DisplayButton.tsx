import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
  import { nanoid } from "nanoid";
  import Link from "next/link";

export default function Button(props) {

    const [planning, setPlanning] = useState();
    const [avocats, setAvocats] = useState([]);

    function generatePlanning(idPermanence) {
        /// Quand il y a moins d'avocat que de date
        let newEvent;
        let dateEvent = new Date(2022, 5, 1);
    
        const planningId = nanoid();
    
    
        let newPlanning = {
          month: +props.month + 1,
          year: +props.year,
          createdAt: new Date(),
          permanenceId: +idPermanence,
          id: planningId,
        }
    
        axios.post("/api/planning", newPlanning)
           .then(function(response) {
             for (let index = 0; index < avocats.length; index++) {
               let avocat_id = avocats[index]["id"];
        
               newEvent = {
                 date: new Date(2022, 5, index++),
                 planning_id: planningId,
                 user_id: +avocat_id
               };
        
               axios
                 .post("/api/event", newEvent)
                 .then(function (response) {
                   NotificationManager.success(
                     "success",
                     "Le planning a été généré avec succès.",
                     3000
                   );
                 })
                 .catch(function (error) {
                   NotificationManager.error(
                     "warning",
                     "Une erreur est survenue lors de la génération du planning. Si le problème persiste, veuillez contacter le support.",
                     3000
                   );
                 });
             }
           })
    
        
      }

    useEffect(() => {
        axios
          .get("/api/planning", {params: {month: props.month + 1, year: props.year, permanenceId: props.permanenceId}})
          .then(function (response) {
            setPlanning(response.data);
          });

          axios
          .get("/api/user", { params: { role_id: 2 } })
          .then(function (response) {
            setAvocats(response.data);
          });
    
      }, [props.month]);

    return (



        <>{planning ? <Link href={`/app/admin/planning/${planning.id}`}>
               <a className="btn btn-dark">
                 <span className="ms-2">Afficher le planning</span>
               </a>
               </Link> : <button
                   onClick={() => generatePlanning(props.permanenceId)}
                   className="btn btn-dark"
                 >
                   Générer le planning
                 </button>}</>
    )
}