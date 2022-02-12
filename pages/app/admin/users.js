import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select'

export default function Users() {

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [users, setUsers] = useState([]);
  const [optionsRole, setOptionsRole] = useState([]);
  const [optionsBar, setOptionsBar] = useState([]);
  const [defaultValueSelectRole, setDefaultValueSelectRole] = useState(null);
  const [defaultValueSelectBarreau, setDefaultValueSelectBarreau] = useState(null);
  const paginationComponentOptions = {
    rowsPerPageText: "Lignes par page :",
    rangeSeparatorText: 'sur'
  };
  const columns = [
    {
      id: 1,
      name: "Nom",
      selector: (row) => row.lastName,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Prénom",
      selector: (row) => row.firstName,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "Rôle",
      selector: (row) => row.role.libelle,
      sortable: true,
      reorder: true,
      cell: (row) => ( 
        <span className={row.role.libelle == "Admin" ? "badge badge-pill badge-warning" : "badge badge-pill badge-info"}>{row.role.libelle}</span>
      )
    },
    {
      button: true,
      cell: (row) => (            
        <div className="openbtn text-center">
          <a href="#" className="btn-dark-100" onClick={() => eventClick(row)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </a>
        </div>            
      )
    },
    {
      button: true,
      cell: (row) => (            
        <div className="openbtn text-center">
          <a href="#" className="btn-dark-100" onClick={() => deleteUser(row)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </a>
        </div>            
      )
    }
  ];

  //Initialisation des Utilisateurs
  async function getUsers() {
    await axios.get('/api/user') 
    .then(function (response) { 
      setUsers(response.data);
    }) 
    .catch(function (error) { 
      console.log(error); 
    }) 
  }

  useEffect(() => {  
    getUsers()
      
    //Initialisation des Roles
    axios.get('/api/role') 
      .then(function (response) { 
        let data_select = response.data.map(item => {
          return { value: item.id, label: item.libelle }
        })
        setOptionsRole(data_select);          
      }) 
      .catch(function (error) { 
        console.log(error); 
      })

    //Initialisation des Barreaux
    axios.get('/api/bar') 
      .then(function (response) { 
        let data_select = response.data.map(item => {
          return { value: item.id, label: item.name }
        })
        setOptionsBar(data_select);          
      }) 
      .catch(function (error) { 
        console.log(error); 
      })
  }, [])   

  //Binding de l'objet Event de la modal
  function changeObjEventModal(event) {
    let { item } = modal
    item = { ...item, [event.target.name] : event.target.value }
    
    let m = { ...modal, item}
    setModal(m)
  }

  //Binding de l'objet User de la modal - Special pour le SELECT
  function changeObjEventModal_Select(value, action) {
    let { item } = modal
    item = { ...item, [action.name] : value.value }
    
    let m = { ...modal, item }
    
    setModal(m)    
  }

  //Ouverture/Fermeture de la modal
  function openCloseModal(arg = false) {
    setShow(arg);
    
    if (!arg) { setModal(null) }
  }
  
  //Clic sur un button Edit/add du User
  function eventClick(row = null) {    

    let m =  {
      item : { id : null },
      title : "Nouvel utilisateur"
    }

    if (row.id) {

      m = {
        title : "Modification de l'utilisateur"
      }

      //Hydratation de l'objet User dans formulaire de la Modal
      let user = users.find(item => item.id == row.id)
      m = { ...m, item: user }   
      
      //Hydratation de la valeur par défaut du Select (le Role du User en Edit)
      let valueRole = optionsRole.filter(option => { return m && m.item.role.id === option.value })
      setDefaultValueSelectRole(valueRole[0])

      //Hydratation de la valeur par défaut du Select (le Barreau du User en Edit)
      let valueBar = optionsBar.filter(option => { return m && m.item.bar.id === option.value })      
      setDefaultValueSelectBarreau(valueBar[0])

    }     

    setModal(m)

    openCloseModal(true)
  }

  //Mise a jour d'un User
  function handleSubmit(type) {

    //TODO : Pb de relation
    delete modal.item.role
    delete modal.item.bar
    
    //Mise a jour
    if (modal.item.id) { 
      axios.put('/api/user', modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "L'utilisateur est enregistré avec succès.", 3000)
          getUsers()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })
      
    } else {
      //Ajout
      const u = {
        lastName: modal.item.lastName,
        firstName: modal.item.firstName,
        email: modal.item.email,
        password: 'test',
        bar_id: modal.item.bar_id,
        role_id: modal.item.role_id
      };      

      axios.post('/api/user', u) 
      .then(function (response) {
        NotificationManager.success("success", "L'utilisateur est enregistré avec succès.", 3000)
        getUsers()
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
      })    
    }

    openCloseModal(false)    
  }

  function deleteUser(row) {
    
    axios.delete('/api/user', { data : row })
      .then(function (response) {
        NotificationManager.success("success", "L'utilisateur a été supprimé avec succès.", 3000)
        getUsers()
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de la suppression. Si le problème persiste, veuillez contacter le support.", 3000)
      })
  }
   
  return (
    <>
        <NotificationContainer/>

        <Modal show={show} onHide={openCloseModal}>
          <form onSubmit={e => e.preventDefault()}>
            <Modal.Header closeButton>  
              <Modal.Title>{modal ? modal.title : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>              
              <input type='hidden' 
                    className="form-control"
                    defaultValue={modal ? modal.item.id : ""} 
              />
              <span>Nom</span>
              <input type='text' 
                    name="lastName" 
                    className="form-control" 
                    onChange={changeObjEventModal} 
                    defaultValue={modal ? modal.item.lastName : ""} 
              />
              <span>Prénom</span> 
              <input type='text' 
                    name="firstName" 
                    className="form-control" 
                    onChange={changeObjEventModal} 
                    defaultValue={modal ? modal.item.firstName : ""} 
              />  
              <span>Email</span> 
              <input type='email' 
                    name="email" 
                    className="form-control" 
                    onChange={changeObjEventModal} 
                    defaultValue={modal ? modal.item.email : ""} 
              />                 
              <span>Barreau</span>
              <Select name="bar_id" 
                options={optionsBar} 
                onChange={changeObjEventModal_Select} 
                defaultValue={defaultValueSelectBarreau} 
              />  
              <span>Rôle</span>
              <Select name="role_id" 
                options={optionsRole} 
                onChange={changeObjEventModal_Select} 
                defaultValue={defaultValueSelectRole} 
              />                             
            </Modal.Body>              
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleSubmit} >
                Enregistrer
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h2 mb-0">Utilisateurs</h1>
              </div>

              <div className="col-auto d-flex align-items-center my-2 my-sm-0">
                <a href="#" onClick={eventClick} className="btn btn-lg btn-darner px-3 me-2 me-md-3">
                  <span className="ps-1">Ajouter</span>
                  <svg className="ms-4" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <rect data-name="Icons/Tabler/Add background" width="14" height="14" fill="none"></rect>
                    <path d="M6.329,13.414l-.006-.091V7.677H.677A.677.677,0,0,1,.585,6.329l.092-.006H6.323V.677A.677.677,0,0,1,7.671.585l.006.092V6.323h5.646a.677.677,0,0,1,.091,1.348l-.091.006H7.677v5.646a.677.677,0,0,1-1.348.091Z" fill="#1e1e1e"></path>
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
                <form>
                  <div className="align-items-center">
                    <div className="col">
                      <div className="input-group input-group-xl bg-white border border-gray-300 rounded px-3 me-2 me-xl-4">
                        <button type="button" className="border-0 bg-transparent p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" id="Icon" width="14" height="14" viewBox="0 0 14 14">
                            <rect id="Icons_Tabler_Search_background" data-name="Icons/Tabler/Search background" width="14" height="14" fill="none"/>
                            <path id="Combined_Shape" data-name="Combined Shape" d="M13.141,13.895l-.06-.052L9.1,9.859A5.569,5.569,0,1,1,9.859,9.1l3.983,3.983a.539.539,0,0,1-.7.813ZM1.077,5.564A4.487,4.487,0,1,0,5.564,1.077,4.492,4.492,0,0,0,1.077,5.564Z" fill="#6c757d"/>
                          </svg>
                        </button>
                        <input type="search" className="form-control border-0" placeholder="Rechercher un utilisateur"></input>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                <DataTable
                  columns={columns}
                  data={users}
                  defaultSortFieldId={1}
                  pagination
                  noDataComponent="Il n'y a aucun utilisateur"
                  paginationComponentOptions={paginationComponentOptions}
                />
              </div>
              
            </div>
          </div>
        </div>        
    </>
  )  
}
