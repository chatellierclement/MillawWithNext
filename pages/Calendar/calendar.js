import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from "@fullcalendar/interaction" 
import DatePicker from 'react-datepicker'; 
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function Calendar() {   
  
  const [show, setShow] = useState(false);  
  const [role, setRole] = useState("admin");
  const [events, setEvents] = useState([]);
  const [editable_boolean, setEditableBoolean] = useState(true);
  const [modal, setModal] = useState(null);  
  const [datePicker, setDatePicker] = useState(null);

  useEffect(() => {
    
    //Gestion des roles utilisateurs
    let type = role === "admin" ? true : false  
    setEditableBoolean(type)

    //Initialisation des Events
    axios.get('/api/event') 
    .then(function (response) { 
      setEvents(response.data);
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

  //Clic sur le jour du calendrier
  function dayClick(arg) { 

    if (!editable_boolean) { return false }

    let m = {
      ...modal, 
      item: { date: arg.dateStr },
      title_modal: "Ajout d'un évènement"
    }

    setModal(m)

    setDatePicker(new Date(arg.date));    

    openCloseModal(true)
  }

  //Clic sur un Event du calendrier
  function eventClick(info) { 
    let m = { title_modal: "Evènement" } 

    if (editable_boolean) {
      m = { title_modal: "Modification de l'évènement" } 
    }     
    
    //Hydratation de l'objet Event dans formulaire de la Modal
    let event = events.find(item => item.id == info.event._def.publicId)
    m = { ...m, item: event }

    setModal(m)
    
    //Cas particulier de la date qui doit etre setter
    setDatePicker(new Date(m.item.date));

    openCloseModal(true)
  }

  //Drag drop event
  function eventDrop(info) {

    let event = events.find(item => item.id == info.event._def.publicId)

    event.date = moment(info.event.start).format('YYYY-MM-DD')   
    
    axios.put('/api/event', event) 
      .then(function (response) {
        NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
        let findIndex = events.findIndex(item => item.id == response.data.id)
        events[findIndex] = response.data
        setEvents([...events]);
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
      }) 
  }

  //Ajout/Mise/Suppression a jour d'un Event
  function handleSubmit(type) {

    if (type === "delete") {
      //Suppression
      axios.delete('/api/event', { data : modal.item }) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement a été supprimé avec succès.", 3000)
          let findIndex = events.findIndex(item => item.id == response.data.id)
          events.splice(findIndex,1)
          setEvents([...events]);
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de la suppression. Si le problème persiste, veuillez contacter le support.", 3000)
        })

    } else {
      //Mise a jour
      if (modal.item.id) {         
            
        axios.put('/api/event', modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          let findIndex = events.findIndex(item => item.id == response.data.id)
          events[findIndex] = response.data
          setEvents([...events]);
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        }) 

      } else {
        //Ajout
        const newEvent = {
          title: modal.item.title,
          description: modal.item.description,
          date: modal.item.date
        };      

        axios.post('/api/event', newEvent) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          setEvents([...events, response.data]);
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })      
        
      }       
    }

    openCloseModal(false) 
    
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
        <NotificationContainer/>

        <Modal show={show} onHide={openCloseModal}>
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
                              
            </Modal.Body>              
            <Modal.Footer className={ editable_boolean === true ? '' : 'hidden' }>
              <Button variant="primary" type="submit" value="save" onClick={() => handleSubmit("save")} >
                Save
              </Button>
              <Button variant="danger" type="submit" value="delete" onClick={() => handleSubmit("delete")} >
                Delete
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <FullCalendar
          locale= 'fr'
          plugins={[ dayGridPlugin, interactionPlugin ]}
          dateClick={dayClick}
          eventClick={eventClick} 
          initialView='dayGridMonth'      
          headerToolbar={{
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth,dayGrid"
          }}
          buttonText={{
            today:    "Courant",
            month:    "Mois",
            week:     "Semaine",
            day:      "Jour",
            dayGrid:  "Aujourd'hui"
          }}
          editable={editable_boolean}
          eventDrop={eventDrop}
          events={events}
        />
    </>
  );
}
