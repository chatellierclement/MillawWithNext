import { useEffect, useState } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import useToken from "../../pages/useToken";

export default function Exchange(props) {
  const { event } = props;
  const { token, setToken } = useToken();
  const [users, setUsers] = useState(null);

  function getUsers() {
    axios
      .get("/api/user", { params: { role_id: 1 } })
      .then(function (response) {
        setUsers(response.data);
      });
  }

  function exchangeEvent(eventId) {
    exchange = {
      createdAt: "",
      user_id_send: token.id,
      updatedAt: "",
      user_id_recipient: +eventId,
      eventId: event.id,
    };

    axios
      .post("/api/exchange", exchange)
      .then(function (response) {
        NotificationManager.success(
          "success",
          "Le nouveau token a été généré avec succès.",
          3000
        );
        getApi();
      })
      .catch(function (error) {
        NotificationManager.error(
          "warning",
          "Une erreur est survenue lors de la génération du token. Si le problème persiste, veuillez contacter le support.",
          3000
        );
      });
  }

  useEffect(() => {
    getUsers();
  }, [event]);

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
            <div className="col-12 mb-4">
              <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                <div className="d-flex align-items-center px-3 px-md-4 py-3">
                  <h5 className="card-header-title mb-0 ps-md-2 font-weight-semibold">
                    A qui souhaitez vous donner votre permanence ?
                  </h5>
                </div>
                <div className="table-responsive mb-0">
                  <table className="table card-table table-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th>Avocat disponnible</th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {users.map((user, index) => (
                        <tr onClick={() => exchangeEvent(user.id)} key={index}>
                          <td>
                            <span className="ps-2 font-weight-semibold text-gray-700">
                              {user.firstName} {user.lastName}
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
