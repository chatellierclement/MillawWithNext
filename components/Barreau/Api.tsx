import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../../pages/useToken";
import { nanoid } from "nanoid";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Api() {
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);
  const [bar, setBar] = useState(null);
  let [api, setApi] = useState(null);

  function getUser() {
    axios
      .get("/api/user", { params: { id: token.id } })
      .then(function (response) {
        setUser(response.data);
        getBar(user.bar_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function generateToken() {
    api = {
      token: nanoid(),
      bar_id: bar.id,
    };

    axios
      .post("/api/api", api)
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

  function getBar(id) {
    axios
      .get("/api/bar", { params: { id: id } })
      .then(function (response) {
        setBar(response.data);
        getApi();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getApi() {
    axios
      .get("/api/api", { params: { bar_id: bar.id } })
      .then(function (response) {
        setApi(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <form className="px-3 form-style-two">
      <div className="row">
        <div className="col mb-md-4 pb-3">
          <label htmlFor="Email" className="form-label form-label-lg">
            Token
          </label>
          <input
            type="text"
            disabled
            className="form-control form-control-xl"
            id="Token"
            value={api ? api.token : "Aucun token n'a été généré"}
          ></input>
        </div>

        <small>Pour plus d&apos;informations, consulter la documentation</small>
      </div>

      <div className="text-end py-md-3">
        <button
          onClick={generateToken}
          type="submit"
          className="btn btn-lg btn-primary px-md-4 mt-lg-3"
        >
          <span className="px-md-3">Générer un nouveau token</span>
        </button>
      </div>
    </form>
  );
}
