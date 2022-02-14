import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from "@fullcalendar/interaction" 
import DatePicker from 'react-datepicker'; 
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import useToken from "../../pages/useToken";

export default function Calendar() {  

  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);
  const [showEvent, setShowEvent] = useState(false);  
  const [showDay, setShowDay] = useState(false); 
  const [role, setRole] = useState("admin");
  const [events, setEvents] = useState([]);
  const [editable_boolean, setEditableBoolean] = useState(true);
  const [modal, setModal] = useState(null);  
  const [datePicker, setDatePicker] = useState(null);
  const [optionsUser, setOptionsUser] = useState([]);
  const [defaultValueSelectUser, setDefaultValueSelectUser] = useState(null);

  function getUser() {
    axios
      .get("/api/user", { params: { id: token.id } })
      .then(function (response) {
        setUser(response.data);
        getEvents()
      });
  }

  useEffect(() => {
    getUser()

    //Gestion des roles utilisateurs
    let type = role === "admin" ? true : false  
    setEditableBoolean(type)


    
    //Initialisation des User
    // axios.get('/api/user') 
    //   .then(function (response) { 
    //     let data_select = response.data.map(item => {
    //       return { value: item.id, label: item.lastName + " " + item.firstName  }
    //     })
    //     setOptionsUser(data_select);
    //   }) 
    //   .catch(function (error) { 
    //     console.log(error); 
    //   }) 
  }, [token])

  //Initialisation des Events
  function getEvents() {
      axios.get('/api/event', { params: { user_id: token.id } })
      .then(function (response) { 
        setEvents(response.data);
      });
    
  }

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
  function openCloseModalEvent(arg = false) {
    setShowEvent(arg);
    
    if (!arg) { setModal(null) }
  }

  function openCloseModalDay(arg = false) {
    setShowDay(arg);
    
    if (!arg) { setModal(null) }
  }

  //Clic sur le jour du calendrier
  function dayClick(arg) { 

    //if (!editable_boolean) { return false }

    let m = {
      ...modal, 
      item: { date: arg.dateStr },
      title_modal: "Ajout d'un évènement"
    }

    setModal(m)

    //setDatePicker(new Date(arg.date));    

    openCloseModalDay(true)
  }

  //Clic sur un Event du calendrier
  function eventClick(info) { 
    let m = { title_modal: "Evènement" } 

    if (editable_boolean) {
      m = { title_modal: "Que voulez vous faire ?" } 
    }     
    
    //Hydratation de l'objet Event dans formulaire de la Modal
    let event = events.find(item => item.id == info.event._def.publicId)
    m = { ...m, item: event }

    //Hydratation de la valeur par défaut du Select
    let valueUser = optionsUser.filter(option => { return m && m.item.user.id === option.value })      
    setDefaultValueSelectUser(valueUser[0])

    setModal(m)
    
    //Cas particulier de la date qui doit etre setter
    setDatePicker(new Date(m.item.date));

    openCloseModalEvent(true)
  }

  //Drag drop event
  function eventDrop(info) {

    let event = events.find(item => item.id == info.event._def.publicId)

    event.date = moment(info.event.start).format('YYYY-MM-DD')   
    
    //TODO : Pb de relation
    delete event.user

    axios.put('/api/event', event) 
      .then(function (response) {
        NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
        getEvents()
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
      }) 
  }

  //CRUD
  function handleSubmit(type) {
    
    switch (type) {
      case "conge": 
        let newEvent = {
          permanence_id: 1,
          user_id: 1,
          idDayOff: true,
          planning_id: 1,
          date: modal.item.date
        }

        /*axios.post('/api/event', newEvent) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          getEvents()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        }) */
        break;
    }
    /*if (type === "delete") {
      //Suppression
      axios.delete('/api/event', { data : modal.item }) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement a été supprimé avec succès.", 3000)
          getEvents()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de la suppression. Si le problème persiste, veuillez contacter le support.", 3000)
        })

    } else {

      //TODO : Pb de relation
      delete modal.item.user

      //Mise a jour
      if (modal.item.id) {         
            
        axios.put('/api/event', modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          getEvents()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        }) 

      } else {
        //Ajout
        const newEvent = {
          title: modal.item.title,
          description: modal.item.description,
          date: modal.item.date,          
          user_id: modal.item.user_id
        };  

        axios.post('/api/event', newEvent) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          getEvents()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })      
        
      }       
    }*/

    //openCloseModal(false) 
    
  }

  //Formattage du datePicker pour l'objet Event Modal
  //Mise a jour de l'objet Modal 
  function changeDatePicker(date) {  
    modal.item.date = moment(date).format('YYYY-MM-DD hh:mm')
    setDatePicker(date)
    setModal(modal)
  }
      
  return (
    <>
      <div>
        <NotificationContainer/>

        {/* <Modal show={show} onHide={openCloseModal}>
          <form onSubmit={e => e.preventDefault()}>
            <Modal.Header closeButton>  
              <Modal.Title>{modal ? modal.title_modal : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>              
              <input type='hidden' 
                    className="form-control"
                    defaultValue={modal ? modal.item.id : ""} 
                    disabled={role === 'admin' ? '' : 'disabled'} />
              <span>Date : </span>
              <DatePicker                    
                  className="form-control"
                  disabled={role === 'admin' ? '' : 'disabled'} 
                  selected={datePicker}
                  onChange={changeDatePicker}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="dd/MM/Y HH:mm"
              />
              <span>Evenement :</span>
              <input type='text' 
                    name="title" 
                    className="form-control" 
                    onChange={(e) => changeObjEventModal(e)}
                    defaultValue={modal ? modal.item.title : ""} 
                    disabled={role === 'admin' ? '' : 'disabled'}/>
              <span>Description</span> 
              <input type='text' 
                    name="description" 
                    className="form-control" 
                    onChange={(e) => changeObjEventModal(e)}
                    defaultValue={modal ? modal.item.description : ""} 
                    disabled={role === 'admin' ? '' : 'disabled'}/>
              <span>Utilisateur</span>
              <Select name="user_id" 
                options={optionsUser} 
                onChange={changeObjEventModal_Select} 
                defaultValue={defaultValueSelectUser} 
              />                              
            </Modal.Body>              
            <Modal.Footer className={ editable_boolean === true ? '' : 'hidden' }>
              <Button variant="primary" type="submit" value="save" onClick={() => handleSubmit("save")} >
                Enregistrer
              </Button>
              <Button variant="danger" type="submit" value="delete" onClick={() => handleSubmit("delete")} >
                Supprimer
              </Button>
            </Modal.Footer>
          </form>
        </Modal> */}

        <Modal show={showEvent} onHide={openCloseModalEvent}>
          <form onSubmit={e => e.preventDefault()}>
            <Modal.Header closeButton>  
              <Modal.Title>{modal ? modal.title_modal : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>  
              <div className='row'>
                <Button variant="primary" type="submit" value="save" onClick={() => handleSubmit("save")} >
                  Donner cette désignation
                </Button>
              </div>  
            </Modal.Body>              
          </form>
        </Modal>

        <Modal show={showDay} onHide={openCloseModalDay}>
          <form onSubmit={e => e.preventDefault()}>
            <Modal.Header closeButton>  
              <Modal.Title>Modification</Modal.Title>
            </Modal.Header>
            <Modal.Body>  
              <div className='row'>
                <Button variant="primary" type="submit" value="save" onClick={() => handleSubmit("conge")} >
                  Se mettre en congés
                </Button>
              </div>   
              
            </Modal.Body>              
          </form>
        </Modal>

        <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h2 mb-0">Mon planning</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 p-xxl-5">
          <div className="container-fluid px-0 pb-4">
            <div className="bg-white border-top border-4 border-yellow-400 p-3">
            <FullCalendar
                locale= 'fr'
                firstDay="1"
                plugins={[ dayGridPlugin, interactionPlugin ]}
                dateClick={dayClick}
                eventClick={eventClick} 
                initialView='dayGridMonth'      
                headerToolbar={{
                  left: "prev,today,next",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek,dayGrid"
                }}
                buttonText={{
                  today:    "Aujoud'hui",
                  month:    "Mois",
                  week:     "Semaine",
                  dayGrid:  "Jour"
                }}
                editable={editable_boolean}
                eventDrop={eventDrop}
                events={events}
              
              
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}