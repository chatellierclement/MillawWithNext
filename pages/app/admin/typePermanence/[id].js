import React, { Component, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { nanoid } from "nanoid";
import Link from "next/link";
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

export default function TypePermanenceItem(props) {
  const router = useRouter();
  const { id } = props;

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [permanences, setPermanences] = useState([]);
  const [avocats, setAvocats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [plannings, setPlannings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

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
      .get("/api/user", { params: { role_id: 2 } })
      .then(function (response) {
        setAvocats(response.data);
      });

    axios.get("/api/typePermanence").then(function (response) {
      getPermanences();
    });
  }, [id]);

  function changeDatePicker(date) {
    setCurrentMonth(new Date(date).getMonth());
    setCurrentYear(new Date(date).getFullYear());

    getPlannings();

    setSelectedDate(date);
  }

  function generatePlanning(idPermanence) {
    /// Quand il y a moins d'avocat que de date
    let newEvent;
    let dateEvent = new Date(2022, 5, 1);

    for (let index = 0; index < avocats.length; index++) {
      let avocat_id = avocats[index]["id"];
      newEvent = {
        date: new Date(2022, 5, index++),
        planning_id: nanoid(),
        user_id: +avocat_id,
        permanence_id: +idPermanence,
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
  }

  function getPlannings() {
    axios
      .get("/api/planning", {
        params: { month: currentMonth, year: currentYear },
      })
      .then(function (response) {
        setPlannings(response.data);
      });
  }

  function getPermanences() {
    axios
      .get("/api/permanence", { params: { typePermanence_id: id } })
      .then(function (response) {
        setPermanences(response.data);
      });
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
      title: "Nouvelle categorie",
    };

    setModal(m);
    openCloseModal(true);
  }

  //Clic sur un button Edit/add d'une permanence
  function eventClick(idPermanence) {
    let m = {
      item: null,
      title: "Nouvelle permanence",
    };

    if (typeof idPermanence === "number") {
      m = {
        title: "Modification de la permanence",
      };

      //Hydratation de l'objet Event dans formulaire de la Modal
      let permanence = permanences.find((item) => item.id == idPermanence);
      m = { ...m, item: permanence };
    }

    setModal(m);

    openCloseModal(true);
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
          getPermanences();
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
        typePermanence_id: +id,
      };

      console.log(p);
      axios
        .post("/api/permanence", p)
        .then(function (response) {
          NotificationManager.success(
            "success",
            "La permanence est enregistré avec succès.",
            3000
          );
          getPermanences();
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

  function deletePermanence(idPermanence) {
    axios
      .delete("/api/permanence", { data: { idPermanence: idPermanence } })
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
  
  async function getPlanningForDisplayButton(props) {
    let result = null
    await axios.get("/api/planning", {params: {month: currentMonth, year: currentYear, permanenceId: props.permanenceId}})
    .then(function (response) {
      if (response.data.id) {
        result = response
      } 
    });

    return result
  }

  function DisplayButton(props) {
    let response = getPlanningForDisplayButton(props)

    if (response.data) {
      return (
        <Link href={`/app/admin/planning/${response.data.id}`}>
          <a className="btn btn-dark">
            <span className="ms-2">Afficher le planning</span>
          </a>
        </Link>
      );
    }
    
    return (
      <button
        onClick={() => generatePlanning(props.permanenceId)}
        className="btn btn-dark"
      >
        Générer le planning
      </button>
    );
    
  }

  function DisplayAvancement(props) {
    //TODO : le '10' est le nombre d'events. je ne suis pas sur de comment le recuperer
    //Peux etre jouer sur la couleur en fonction du %
    let result = (10/moment(selectedDate).daysInMonth() * 100).toFixed(2)
    return (
      <span className="badge bg-teal-50 text-teal-500">
        {result}%
      </span>
    )
    
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
              defaultValue={modal && modal.item ? modal.item.id : ""}
            />
            <span>Nom :</span>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={changeObjEventModal}
              defaultValue={modal && modal.item ? modal.item.name : ""}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="p-3 p-xxl-5">
        <div className="container-fluid px-0">
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
          </div>

          <div className="row">
            <div className="col-12 mb-4">
              <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                <div className="d-flex align-items-center px-3 px-md-4 py-3">
                  <h5 className="card-header-title mb-0 ps-md-2 font-weight-semibold">
                    Planning
                  </h5>

                  <div className="dropdown export-dropdown ms-auto pe-md-2">
                    <div className="w-56 text-right fixed top-16"></div>

                    <DatePicker
                      locale="fr"
                      selected={selectedDate}
                      className="form-control"
                      onChange={changeDatePicker}
                      showMonthYearPicker
                      dateFormat="MMMM Y"
                    />

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
                          <span className="ms-2">Custom</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="table-responsive mb-0">
                  <table className="table card-table table-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th>Permanence</th>
                        <th>Planning complet à</th>
                        <th>Planning</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {permanences.map((permanence, index) => (
                        <>
                          <tr key={index}>
                            <td>
                              <span className="ps-2 font-weight-semibold text-gray-700">
                                {permanence.name}
                              </span>
                            </td>
                            <td>
                              <DisplayAvancement permanenceId={permanence.id} />
                            </td>
                            <td>
                              <DisplayButton permanenceId={permanence.id} />
                            </td>
                            <td>
                              <svg
                                onClick={() => eventClick(permanence.id)}
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
                            </td>
                            <td>
                              <svg
                                onClick={() => deletePermanence(permanence.id)}
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
                            </td>
                          </tr>
                        </>
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
