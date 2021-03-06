import Link from "next/link";
import { useEffect, useState } from "react";
import useToken from "../../../pages/useToken";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import {useStateIfMounted} from "use-state-if-mounted"

export default function Dons() {
  const [exchanges, setExchanges] = useStateIfMounted([]);
  const { token, setToken } = useToken();

  function getExchanges() {
    axios
      .get("/api/exchange", { params: { user_id_recipient: +token.id } })
      .then(function (response) {
        setExchanges(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function onUpdateEvent(exchange) {
    delete exchange.event.permanence;
    delete exchange.event.planning;
    exchange.event.user_id = exchange.user_id_recipient;

    axios
      .put("/api/event", exchange.event)
      .then(function (response) {
        NotificationManager.success(
          "success",
          "Le don a bien été accepté.",
          3000
        );
      })
      .catch(function (error) {
        NotificationManager.error(
          "warning",
          "Une erreur est survenue lors du don. Si le problème persiste, veuillez contacter le support.",
          3000
        );
    });


  }

  function onAcceptedOrRefused(_exchange, isAccepted) {


    _exchange.isAccepted = isAccepted;

    if(isAccepted) {
        onUpdateEvent(_exchange);

        delete _exchange.event;
        delete _exchange.userSender;
        axios
      .put("/api/exchange", _exchange)
      .then(function (response) {
        getExchanges()

        
      })
      .catch(function (error) {
        NotificationManager.error(
          "warning",
          "Une erreur est survenue lors du don. Si le problème persiste, veuillez contacter le support.",
          3000
        );
      });
    } else {
        NotificationManager.success(
            "success",
            "Le don a bien été refusé.",
            3000
          );
    }





    
  }

//   useEffect(() => {
//     let mounted = true;
//     if (token) {
//       dispatch({ type: "FETCH_PET" });
//       getExchanges().then(data => {
//         if(mounted){
//           dispatch({ type: "FETCH_PET_SUCCESS", payload: data });
//         }
//       });
//     } else {
//       dispatch({ type: "RESET" });
//     }

//     return () => mounted = false;

//   }, [token]);

  useEffect(() => {
    getExchanges();
  }, [token]);

  return (
    <>
      <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
        <div className="container-fluid px-0">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 mb-0">Dons</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 p-xxl-5">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="border-bottom border-gray-200 border-3 pb-4 pt-3 mb-4 mb-xl-5">
              <ul className="nav nav-segment nav-pills mb-7" role="tablist">
                <li className="nav-item">
                  <Link href="/app/dons/effectue">
                    <a
                      className="nav-link"
                      data-bs-toggle="pill"
                      role="tab"
                      aria-selected="true"
                    >
                      Mes dons effectués
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/app/dons/recu">
                    <a
                      className="active nav-link"
                      data-bs-toggle="pill"
                      role="tab"
                      aria-selected="true"
                    >
                      Mes dons réçus
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-4">
              <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                <div className="d-flex align-items-center px-3 px-md-4 py-3">
                  <h5 className="card-header-title mb-0 ps-md-2 font-weight-semibold">
                    Vos dons
                  </h5>
                </div>
                <div className="table-responsive mb-0">
                  <table className="table card-table table-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Permanence</th>
                        <th>Avocat</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {exchanges &&
                        exchanges.map((exchange, index) => (
                          <tr key={index}>
                            <td>
                              <span className="ps-2 font-weight-semibold text-gray-700">
                                {exchange.createdAt}
                              </span>
                            </td>
                            <td>
                              <span className="ps-2 font-weight-semibold text-gray-700">
                                {exchange.event.planning.Permanence.name}
                              </span>
                            </td>
                            <td>
                              <span className="ps-2 font-weight-semibold text-gray-700">
                                {exchange.userSender.firstName}{" "}
                                {exchange.userSender.lastName}
                              </span>
                            </td>
                            <td>
                              <span className="ps-2 font-weight-semibold text-gray-700">
                                {exchange.isAccepted == null ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        onAcceptedOrRefused(exchange, true)
                                      }
                                      className="btn btn-success"
                                    >
                                      Accepter
                                    </button>{" "}
                                    <button
                                      onClick={() =>
                                        onAcceptedOrRefused(exchange, false)
                                      }
                                      className="btn btn-danger"
                                    >
                                      Refuser
                                    </button>
                                  </>
                                ) : exchange.isAccepted ? (
                                  <span className="badge bg-success">
                                    Accepté
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">
                                    Refusé
                                  </span>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
