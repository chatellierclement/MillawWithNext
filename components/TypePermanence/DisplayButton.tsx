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

  const { setPermanences, id } = props;

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
    };

    axios.post("/api/planning", newPlanning).then(function (response) {
      let lastDay = new Date(+props.year, +props.month + 1, 0).getDate();
      let firstDay = new Date(+props.year, +props.month + 1, 1).getDate();

      try {
        for (let index = firstDay; index <= lastDay; index++) {
          let avocat_id =
            avocats[Math.floor(Math.random() * avocats.length)]["id"];

          newEvent = {
            date: new Date(props.year, props.month, index),
            planning_id: planningId,
            user_id: +avocat_id,
          };

          axios.post("/api/event", newEvent).then(function (response) {
            axios
              .get("/api/planning", {
                params: {
                  month: props.month + 1,
                  year: props.year,
                  permanenceId: props.permanenceId,
                },
              })
              .then(function (response) {
                setPlanning(response.data);
              });
            axios
              .get("/api/permanence", { params: { typePermanence_id: id } })
              .then(function (response) {
                setPermanences(response.data);
              });
          });
        }

        NotificationManager.success(
          "success",
          "La planning a ??t?? g??n??r?? avec succ??s.",
          3000
        );
      } catch (error) {
        NotificationManager.error(
          "warning",
          "Une erreur est survenue lors de la g??n??ration du planning. Si le probl??me persiste, veuillez contacter le support.",
          3000
        );
      }

      /// Affecter un avocat par date
      // for (let index = 0; index < avocats.length; index++) {
      //   let avocat_id = avocats[index]["id"];

      //   newEvent = {
      //     date: new Date(2022, 5, index++),
      //     planning_id: planningId,
      //     user_id: +avocat_id,
      //   };

      //   axios
      //     .post("/api/event", newEvent)
      //     .then(function (response) {
      //       axios
      //         .get("/api/planning", {
      //           params: {
      //             month: props.month + 1,
      //             year: props.year,
      //             permanenceId: props.permanenceId,
      //           },
      //         })
      //         .then(function (response) {
      //           setPlanning(response.data);
      //           NotificationManager.success(
      //             "success",
      //             "Le planning a ??t?? g??n??r?? avec succ??s.",
      //             3000
      //           );
      //         });
      //       axios
      //         .get("/api/permanence", { params: { typePermanence_id: id } })
      //         .then(function (response) {
      //           setPermanences(response.data);
      //         });
      //     })
      //     .catch(function (error) {
      //       NotificationManager.error(
      //         "warning",
      //         "Une erreur est survenue lors de la g??n??ration du planning. Si le probl??me persiste, veuillez contacter le support.",
      //         3000
      //       );
      //     });
      // }
    });
  }

  useEffect(() => {
    axios
      .get("/api/planning", {
        params: {
          month: props.month + 1,
          year: props.year,
          permanenceId: props.permanenceId,
        },
      })
      .then(function (response) {
        setPlanning(response.data);
      });

    axios
      .get("/api/user")
      .then(function (response) {
        setAvocats(response.data);
      });
  }, [props.month]);

  return (
    <>
      {planning ? (
        <Link href={`/app/admin/planning/${planning.id}`}>
          <a className="btn btn-dark">Afficher le planning</a>
        </Link>
      ) : (
        <button
          onClick={() => generatePlanning(props.permanenceId)}
          className="btn btn-dark"
        >
          G??n??rer le planning
        </button>
      )}
    </>
  );
}
