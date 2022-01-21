import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select'

export default function Barreau() {  
  
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [barreaux, setBarreaux] = useState([]);
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
            <button type="button" onClick={() => deleteBarreau(row)} className="btn btn-danger">Delete</button>         
          </div>            
        )
      }
    ];
  
    
  useEffect(() => {  
    //Initialisation des barreaux
    axios.get('/api/bar') 
      .then(function (response) { 
        setBarreaux(response.data);
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

  //Clic sur un button Edit/add d'une barreau
  function eventClick(row = null) {      

    let m = {
      item : {},
      title : "Nouveau barreau"
    }  

    if (row.id) {
      m = {
        title : "Modification du barreau"
      }

      //Hydratation de l'objet Event dans formulaire de la Modal
      let barreau = barreaux.find(item => item.id == row.id)
      m = { ...m, item: barreau }      
    } 
    
    setModal(m)

    openCloseModal(true)
  }

  //Mise a jour d'un User
  function handleSubmit(type) {

    //Mise a jour
    if (modal.item.id) { 
      axios.put('/api/bar', modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "Le barreau est enregistré avec succès.", 3000)
          let findIndex = barreaux.findIndex(item => item.id == response.data.id)
          barreaux[findIndex] = response.data
          setBarreaux([...barreaux]);
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })
      
    } else {
      //Ajout
      const p = {
        name: modal.item.name,
      };      

      axios.post('/api/bar', p) 
      .then(function (response) {
        NotificationManager.success("success", "Le barreau est enregistré avec succès.", 3000)
        setBarreaux([...barreaux, response.data]);
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
      })    
    }

    openCloseModal(false)
    
  }

  function deleteBarreau(row) {

    axios.delete('/api/bar', { data : row })
      .then(function (response) {
        NotificationManager.success("success", "Le barreau a été supprimé avec succès.", 3000)
        let findIndex = barreaux.findIndex(item => item.id == response.data.id)
        barreaux.splice(findIndex,1)
        setBarreaux([...barreaux]);
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
                <h1 className="h2 mb-0">Barreau</h1>
              </div>
            </div>
          </div>
        </div>
    </>
  )    
}
