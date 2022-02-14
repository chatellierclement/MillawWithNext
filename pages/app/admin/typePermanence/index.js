import React, { Component, useState, useEffect } from "react";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Link from "next/link";
import { nanoid } from "nanoid";
import TypePermanenceItem from "./[id]";

export default function Index () {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [showPermanence, setShowPermanence] = useState(false);
  const [modal, setModal] = useState(null);
  const [typePermanences, setTypePermanences] = useState([]);
  const [permanences, setPermanences] = useState([]);
  const [id, setId] = useState(null);
  const [avocats, setAvocats] = useState([])

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

  async function getTypePermanences() {
    await axios
      .get("/api/typePermanence")
      .then(function (response) {
        setTypePermanences(response.data);
       // getPermanences();
      });
  }

  async function getUsers() {
    await axios
      .get("/api/user", { params: { role_id: 2 } })
      .then(function (response) {
        setAvocats(response.data);
    });
  }

  function changePermanences(id) {
    setId(id)
  }
  useEffect(() => {
    
    getUsers()

    getTypePermanences()

  }, [router.query]);  

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
      item: {},
      title: "Nouvelle permanence",
    };

    if (idPermanence) {
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

  function handleSubmit(type) {
    //Mise a jour
    if (modal.item.id) {
      axios
        .put("/api/typePermanence", modal.item)
        .then(function (response) {
          NotificationManager.success(
            "success",
            "La catégorie est enregistrée avec succès.",
            3000
          );
          getTypePermanences()
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
        .post("/api/typePermanence", p)
        .then(function (response) {
          NotificationManager.success(
            "success",
            "La catégorie est enregistrée avec succès.",
            3000
          );
          getTypePermanences()
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
              Enregistrer
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
                    <li className="nav-item">
                      <span onClick={() => changePermanences(typePermanence.id)}>
                        <a
                          className={typePermanence.id == id ? "nav-link active" : "nav-link"}
                          data-bs-toggle="pill"
                          role="tab"
                          aria-selected="true"
                        >
                          {typePermanence.name}
                        </a>
                      </span>
                    </li>
                  </>
                ))}
              </ul>              
            </div>
            {id && 
              <TypePermanenceItem id={id} />
            }
          </div>  
        </div>
      </div>
    </>
  );
};