import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function Permanence() {  
  
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [permanences, setPermanences] = useState([]);
  const columns = 
    [
      {
        id: 1,
        name: "id",
        selector: (row) => row.id,
        sortable: true,
        reorder: true
      },
      {
        id: 2,
        name: "name",
        selector: (row) => row.name,
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
            <button type="button" onClick={() => deletePermanence(row)} className="btn btn-danger">Delete</button>         
          </div>            
        )
      }
    ];
  
    
  useEffect(() => {  
    //Initialisation des permanences
    axios.get('/api/permanence') 
      .then(function (response) { 
        setPermanences(response.data);
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
  
  //Ouverture/Fermeture de la modal
  function openCloseModal(arg = false) {
    setShow(arg);
    
    if (!arg) { setModal(null) }
  }

  //Clic sur un button Edit/add d'une permanence
  function eventClick(row = null) {      

    let m = {
      item : {},
      title : "Nouvelle permanence"
    }  

    if (row.id) {
      m = {
        title : "Modification de la permanence"
      }

      //Hydratation de l'objet Event dans formulaire de la Modal
      let permanence = permanences.find(item => item.id == row.id)
      m = { ...m, item: permanence }      
    } 
    
    setModal(m)

    openCloseModal(true)
  }

  //Mise a jour d'un User
  function handleSubmit(type) {

    //Mise a jour
    if (modal.item.id) { 
      axios.put('/api/permanence', modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "La permanence est enregistré avec succès.", 3000)
          let findIndex = permanences.findIndex(item => item.id == response.data.id)
          permanences[findIndex] = response.data
          setPermanences([...permanences]);
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })
      
    } else {
      //Ajout
      const p = {
        name: modal.item.name,
      };      

      axios.post('/api/permanence', p) 
      .then(function (response) {
        NotificationManager.success("success", "La permanence est enregistré avec succès.", 3000)
        setPermanences([...permanences, response.data]);
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
      })    
    }

    openCloseModal(false)
    
  }

  function deletePermanence(row) {

    axios.delete('/api/permanence', { data : row })
      .then(function (response) {
        NotificationManager.success("success", "La permanence a été supprimé avec succès.", 3000)
        let findIndex = permanences.findIndex(item => item.id == response.data.id)
        permanences.splice(findIndex,1)
        setPermanences([...permanences]);
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
              <span>Name :</span>
              <input type='text' 
                    name="name" 
                    className="form-control" 
                    onChange={changeObjEventModal} 
                    defaultValue={modal ? modal.item.name : ""} 
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
                <h1 className="h2 mb-0">Permanences</h1>
              </div>

              <div className="col-auto d-flex align-items-center my-2 my-sm-0">
                <a href="#" onClick={eventClick} className="btn btn-lg btn-outline-dark px-3 me-2 me-md-3">
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

        <div className="row g-0">
          <div className="container-fluid px-0">
            <div className="row">
              <DataTable
                columns={columns}
                data={permanences}
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
