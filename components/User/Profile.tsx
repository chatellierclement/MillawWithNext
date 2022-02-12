import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../../pages/useToken";

export default function Profile() {
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);

  async function getUser() {
    await axios
      .get("/api/user", { params: { id: token.id } })
      .then(function (response) {
        setUser(response.data);
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
        <div className="col-sm-6 mb-md-4 pb-3">
          <label htmlFor="LastName" className="form-label form-label-lg">
            Nom
          </label>
          <input
            type="text"
            className="form-control form-control-xl"
            id="LastName"
            placeholder="Nom"
            value={user ? user.lastName : ""}
          ></input>
        </div>

        <div className="col-sm-6 mb-md-4 pb-3">
          <label htmlFor="FirstName" className="form-label form-label-lg">
            Prénom
          </label>
          <input
            type="text"
            className="form-control form-control-xl"
            id="FirstName"
            placeholder="Prénom"
            value={user ? user.firstName : ""}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col mb-md-4 pb-3">
          <label htmlFor="Email" className="form-label form-label-lg">
            Email
          </label>
          <input
            type="text"
            className="form-control form-control-xl"
            id="Email"
            placeholder="Email"
            value={user ? user.email : ""}
          ></input>
        </div>
      </div>
      <div className="text-end py-md-3">
        <button
          type="submit"
          className="btn btn-lg btn-primary px-md-4 mt-lg-3"
        >
          <span className="px-md-3">Enregistrer les modifications</span>
        </button>
      </div>
    </form>
  );
}
