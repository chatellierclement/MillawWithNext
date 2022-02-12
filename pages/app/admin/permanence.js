import React, { Component, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Permanence() {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [permanences, setPermanences] = useState([]);
  const [typePermanences, setTypePermanences] = useState([]);
  const [id, setId] = useState(null);
  const paginationComponentOptions = {
    rowsPerPageText: "Lignes par page :",
    rangeSeparatorText: "sur",
  };
  const columns = [
    {
      id: 2,
      name: "Nom",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      button: true,
      cell: (row) => (
        <div className="openbtn text-center">
          <a href="#" className="btn-dark-100" onClick={() => eventClick(row)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-edit"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </a>
        </div>
      ),
    },
    {
      button: true,
      cell: (row) => (
        <div className="openbtn text-center">
          <a
            href="#"
            className="btn-dark-100"
            onClick={() => deletePermanence(row)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-trash"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("/api/typePermanence")
      .then(function (response) {
        setTypePermanences(response.data);

        if(id != 0) {
          getPermanences();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [permanences]);

  function getPermanences() {
    axios
    .get("/api/permanence", { params: { typePermanence_id: id } })
    .then(function (response) {
      setPermanences(response.data);
    })
  }

  //Binding de l'objet Event de la modal
  function changeObjEventModal(event) {
    let { item } = modal;
    item = { ...item, [event.target.name]: event.target.value };

    let m = { ...modal, item };
    setModal(m);
  }

  //Ouverture/Fermeture de la modal
  function openCloseModal(arg = false) {
    setShow(arg);

    if (!arg) {
      setModal(null);
    }
  }



  function typePermanenceEventClick() {
    let m = {
      item: {},
      title: "Nouvelle categorie"
    }

    setModal(m);
    openCloseModal(true);
  }

  //Clic sur un button Edit/add d'une permanence
  function eventClick(row = null) {
    let m = {
      item: {},
      title: "Nouvelle permanence",
    };

    if (row.id) {
      m = {
        title: "Modification de la permanence",
      };

      //Hydratation de l'objet Event dans formulaire de la Modal
      let permanence = permanences.find((item) => item.id == row.id);
      m = { ...m, item: permanence };
    }

    setModal(m);

    openCloseModal(true);
  }

  function addTypePermanence() {
    
  }

  //Mise a jour d'un User
  function handleSubmit(type) {
    //Mise a jour
    if (modal.item.id) {
      axios
        .put("/api/permanence", modal.item)
        .then(function (response) {
          NotificationManager.success(
            "success",
            "La permanence est enregistré avec succès.",
            3000
          );
          let findIndex = permanences.findIndex(
            (item) => item.id == response.data.id
          );
          permanences[findIndex] = response.data;
          setPermanences([...permanences]);
        })
        .catch(function (error) {
          NotificationManager.error(
            "warning",
            "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.",
            3000
          );
        });
    } else {
      //Ajout
      const p = {
        name: modal.item.name,
      };

      axios
        .post("/api/permanence", p)
        .then(function (response) {
          NotificationManager.success(
            "success",
            "La permanence est enregistré avec succès.",
            3000
          );
          setPermanences([...permanences, response.data]);
        })
        .catch(function (error) {
          NotificationManager.error(
            "warning",
            "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.",
            3000
          );
        });
    }

    openCloseModal(false);
  }

  function deletePermanence(row) {
    axios
      .delete("/api/permanence", { data: row })
      .then(function (response) {
        NotificationManager.success(
          "success",
          "La permanence a été supprimé avec succès.",
          3000
        );
        let findIndex = permanences.findIndex(
          (item) => item.id == response.data.id
        );
        permanences.splice(findIndex, 1);
        setPermanences([...permanences]);
      })
      .catch(function (error) {
        NotificationManager.error(
          "warning",
          "Une erreur est survenue lors de la suppression. Si le problème persiste, veuillez contacter le support.",
          3000
        );
      });
  }

  return (
    <>
      <NotificationContainer />

      <Modal show={show} onHide={openCloseModal}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Modal.Header closeButton>
            <Modal.Title>{modal ? modal.title : ""}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="hidden"
              className="form-control"
              defaultValue={modal ? modal.item.id : ""}
            />
            <span>Name :</span>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={changeObjEventModal}
              defaultValue={modal ? modal.item.name : ""}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
        <div className="container-fluid px-0">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 mb-0">Permanences</h1>
            </div>

            <div className="col-auto d-flex align-items-center my-2 my-sm-0">
              <a
                href="#"
                onClick={typePermanenceEventClick}
                className="btn btn-lg btn-darner px-3 me-2 me-md-3"
              >
                <span className="ps-1">Ajouter une categorie</span>
                <svg
                  className="ms-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <rect
                    data-name="Icons/Tabler/Add background"
                    width="14"
                    height="14"
                    fill="none"
                  ></rect>
                  <path
                    d="M6.329,13.414l-.006-.091V7.677H.677A.677.677,0,0,1,.585,6.329l.092-.006H6.323V.677A.677.677,0,0,1,7.671.585l.006.092V6.323h5.646a.677.677,0,0,1,.091,1.348l-.091.006H7.677v5.646a.677.677,0,0,1-1.348.091Z"
                    fill="#1e1e1e"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

     
      <div className="p-3 p-xxl-5">
        <div className="container-fluid px-0">

          <div className="row">
            <div className="border-bottom border-gray-200 border-3 pb-4 pt-3 mb-4 mb-xl-5">
              <ul className="nav nav-segment nav-pills mb-7" role="tablist">
              {typePermanences.map((typePermanence, index) => (
                  <>
                    <li onClick={() => setId(typePermanence.id)} className="nav-item">
                      
                        <a
                          className="nav-link active"
                          data-bs-toggle="pill"
                          role="tab"
                          href="#"
                          aria-selected="true"
                        >
                          {typePermanence.name} (2)
                        </a>
                      
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>

          <div className="pb-2 pt-1 mb-2 mb-xl-5 row">
             
          <div className="col-auto d-flex align-items-center  my-2 my-sm-0">
              <a
                href="#"
                onClick={eventClick}
                className="btn btn-lg  btn-darner px-3 me-2 me-md-3"
              >
                <span className="ps-1">Ajouter une permanence</span>
                <svg
                  className="ms-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <rect
                    data-name="Icons/Tabler/Add background"
                    width="14"
                    height="14"
                    fill="none"
                  ></rect>
                  <path
                    d="M6.329,13.414l-.006-.091V7.677H.677A.677.677,0,0,1,.585,6.329l.092-.006H6.323V.677A.677.677,0,0,1,7.671.585l.006.092V6.323h5.646a.677.677,0,0,1,.091,1.348l-.091.006H7.677v5.646a.677.677,0,0,1-1.348.091Z"
                    fill="#1e1e1e"
                  ></path>
                </svg>
              </a>
            </div>
            {/* <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
              <DataTable
                columns={columns}
                data={permanences}
                defaultSortFieldId={1}
                pagination
                noDataComponent="Il n'y a aucune permanence"
                paginationComponentOptions={paginationComponentOptions}
              />
            </div> */}
          </div>

          <div className="row">
            <div className="col-12 mb-4">
              <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                <div className="d-flex align-items-center px-3 px-md-4 py-3">
                  <h5 className="card-header-title mb-0 ps-md-2 font-weight-semibold">
                    Planning
                  </h5>

                  <div className="dropdown export-dropdown ms-auto pe-md-2">
                  <div className="w-56 text-right fixed top-16">
                 

    </div>

                    {/* <a
                      href="#"
                      role="button"
                      id="Sources"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      className="btn btn-outline-dark border-gray-700 text-gray-700 px-3"
                    >
                      <span>Janvier 2022 </span>{" "}
                      <svg
                        className="ms-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                      >
                        <rect
                          data-name="Icons/Tabler/Chevron Down background"
                          width="13"
                          height="13"
                          fill="none"
                        ></rect>
                        <path
                          d="M.214.212a.738.738,0,0,1,.952-.07l.082.07L7.1,5.989a.716.716,0,0,1,.071.94L7.1,7.011l-5.85,5.778a.738.738,0,0,1-1.034,0,.716.716,0,0,1-.071-.94l.071-.081L5.547,6.5.214,1.233A.716.716,0,0,1,.143.293Z"
                          transform="translate(13 3.25) rotate(90)"
                          fill="#495057"
                        ></path>
                      </svg>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="Sources"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <span>Today</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span>Yesterday</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span>Last 7 days</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span>This month</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span>Last month</span>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <svg
                            data-name="icons/tabler/calendar"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <rect
                              data-name="Icons/Tabler/Calendar background"
                              width="16"
                              height="16"
                              fill="none"
                            ></rect>
                            <path
                              d="M2.256,16A2.259,2.259,0,0,1,0,13.743V3.9A2.259,2.259,0,0,1,2.256,1.641H3.282V.616A.615.615,0,0,1,4.507.532l.005.084V1.641H9.846V.616A.615.615,0,0,1,11.071.532l.006.084V1.641H12.1A2.259,2.259,0,0,1,14.359,3.9v9.846A2.259,2.259,0,0,1,12.1,16ZM1.231,13.743a1.027,1.027,0,0,0,1.025,1.026H12.1a1.027,1.027,0,0,0,1.026-1.026V7.795H1.231Zm11.9-7.179V3.9A1.027,1.027,0,0,0,12.1,2.872H11.077V3.9a.616.616,0,0,1-1.226.084L9.846,3.9V2.872H4.513V3.9a.615.615,0,0,1-1.225.084L3.282,3.9V2.872H2.256A1.026,1.026,0,0,0,1.231,3.9V6.564Z"
                              transform="translate(1)"
                              fill="#495057"
                            ></path>
                          </svg>
                          <span className="ms-2">Custom</span>
                        </a>
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className="table-responsive mb-0">
                  <table className="table card-table table-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th>Permanence</th>
                        <th>Planning complet à</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      <tr>
                        <td>
                          <span className="ps-2 font-weight-semibold text-gray-700">
                            Garde à vue Jour
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-teal-50 text-teal-500">
                            100%
                          </span>
                        </td>
                        <td>
                          <div className="text-end">
                          <div className="text-end">
                              <button className="btn btn-dark">
                                Afficher le planning
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      
                      <tr>
                        <td>
                          <span className="ps-2 font-weight-semibold text-gray-700">
                          Garde à vue Nuit
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-red-50 text-dnd">
                            0%
                          </span>
                        </td>
                        <td>
                          <div className="text-end">
                            <button className="btn btn-dark">
                              Générer le planning
                            </button>
                          </div>
                        </td>
                      </tr>
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