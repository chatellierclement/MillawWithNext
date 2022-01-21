import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select'

export default function Utilisateur() {

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [users, setUsers] = useState([]);
  const [optionsRole, setOptionsRole] = useState([]);
  const [optionsBar, setOptionsBar] = useState([]);
  const [defaultValueSelectRole, setDefaultValueSelectRole] = useState(null);
  const [defaultValueSelectBarreau, setDefaultValueSelectBarreau] = useState(null);
  const columns = [
    {
      id: 1,
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "lastName",
      selector: (row) => row.lastName,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "firstName",
      selector: (row) => row.firstName,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true
    },
    {
      id: 5,
      name: "barreau",
      selector: (row) => row.bar.name,
      sortable: true,
      reorder: true
    },
    {
      id: 6,
      name: "role",
      selector: (row) => row.role.libelle,
      sortable: true,
      reorder: true
    },
    {
      button: true,
      cell: (row) => (            
        <div className="openbtn text-center">
          <button type="button" onClick={() => eventClick(row)} className="btn btn-primary">Edit</button>         
        </div>            
      )
    },
    {
      button: true,
      cell: (row) => (            
        <div className="openbtn text-center">
          <button type="button" onClick={() => deleteUser(row)} className="btn btn-danger">Delete</button>         
        </div>            
      )
    }
  ];

  useEffect(() => {  
    //Initialisation des User
    axios.get('/api/user') 
      .then(function (response) { 
        setUsers(response.data);
      }) 
      .catch(function (error) { 
        console.log(error); 
      }) 
      
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
console.log(m)
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
      
      console.log(m)
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
          let findIndex = users.findIndex(item => item.id == response.data.id)
          console.log(response.data)
          users[findIndex] = response.data
          setUsers([...users]);
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })
      
    } else {
      //Ajout
      const u = {
        lastName: modal.item.lastName,
        firstName: modal.item.firstName,
        email: modal.item.firstName,
        password: 'test',
        bar_id: modal.item.bar_id,
        role_id: modal.item.role_id
      };      

      axios.post('/api/user', u) 
      .then(function (response) {
        NotificationManager.success("success", "L'utilisateur est enregistré avec succès.", 3000)
        setUsers([...users, response.data]);
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
        let findIndex = users.findIndex(item => item.id == response.data.id)
        users.splice(findIndex,1)
        setUsers([...users]);
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
              <span>lastName :</span>
              <input type='text' 
                    name="lastName" 
                    className="form-control" 
                    onChange={changeObjEventModal} 
                    defaultValue={modal ? modal.item.lastName : ""} 
              />
              <span>firstName</span> 
              <input type='text' 
                    name="firstName" 
                    className="form-control" 
                    onChange={changeObjEventModal} 
                    defaultValue={modal ? modal.item.firstName : ""} 
              />  
              <span>email</span> 
              <input type='email' 
                    name="firstName" 
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
                Save
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
                <a href="#" onClick={eventClick} className="btn btn-lg btn-outline-dark px-3 me-2 me-md-3">
                  <span className="ps-1">
                    Ajouter
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>  

        <div className="row g-0">
          <div className="container-fluid px-0">
            <div className="row">
              <DataTable
                title="Utilisateurs"
                columns={columns}
                data={users}
                defaultSortFieldId={1}
                pagination
                language='fr'
              />
            </div>
          </div>
        </div>        
    </>
  )  
}
