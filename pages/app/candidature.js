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

export default function Candidature() {   
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);  
  const [role, setRole] = useState("admin");
  const [events, setEvents] = useState([]);
  const [editable_boolean, setEditableBoolean] = useState(true);
  const [modal, setModal] = useState(null);  
  const [datePicker, setDatePicker] = useState(null);
  const [optionsPermanences, setOptionsPermanences] = useState([]);
  const [defaultValueSelectPermanence, setDefaultValueSelectPermanence] = useState(null);

  useEffect(() => {
    
    //Gestion des roles utilisateurs
    let type = role === "admin" ? true : false  
    setEditableBoolean(type)

    getCandidatures()
    
    //Initialisation des permanences
    axios.get('/api/permanence') 
      .then(function (response) { 
        let data_select = response.data.map(item => {
          return { value: item.id, label: item.name }
        })
        setOptionsPermanences(data_select);
      });
  }, [])

  //Initialisation des Events
  async function getCandidatures() {
    axios.get('/api/apply', { params: { user_id: 1 } })
    .then(function (response) { 
      setEvents(response.data);
    }) 
    .catch(function (error) { 
      console.log(error); 
    })
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
      title_modal: "Candidater ?? une permanence"
    }

    setModal(m)

    setDatePicker(new Date(arg.date));    

    openCloseModal(true)
  }

  //Clic sur un Event du calendrier
  function eventClick(info) { 
    let m = { title_modal: "Ev??nement" } 

    if (editable_boolean) {
      m = { title_modal: "Modification de l'??v??nement" } 
    }     
    
    //Hydratation de l'objet Event dans formulaire de la Modal
    let event = events.find(item => item.id == info.event._def.publicId)
    m = { ...m, item: event }

    //Hydratation de la valeur par d??faut du Select
    let valuePermanence = optionsPermanences.filter(option => { return m && m.item.permanence.id === option.value })      
    setDefaultValueSelectPermanence(valuePermanence[0])

    setModal(m)
    
    //Cas particulier de la date qui doit etre setter
    setDatePicker(new Date(m.item.date));

    openCloseModal(true)
  }

  //Drag drop event
  function eventDrop(info) {

    let event = events.find(item => item.id == info.event._def.publicId)

    event.date = moment(info.event.start).format('YYYY-MM-DD')   
    
    //TODO : Pb de relation
    delete event.user

    axios.put('/api/event', event) 
      .then(function (response) {
        NotificationManager.success("success", "L'??v??nement est enregistr?? avec succ??s.", 3000)
        getCandidatures()
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le probl??me persiste, veuillez contacter le support.", 3000)
      }) 
  }

  //Ajout/Mise/Suppression a jour d'un Event
  function handleSubmit(type) {

    if (type === "delete") {
      //Suppression
      axios.delete('/api/apply', { data : modal.item }) 
        .then(function (response) {
          NotificationManager.success("success", "L'??v??nement a ??t?? supprim?? avec succ??s.", 3000)
          getCandidatures()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de la suppression. Si le probl??me persiste, veuillez contacter le support.", 3000)
        })

    } else {

      //TODO : Pb de relation
      delete modal.item.apply

      //Mise a jour
      if (modal.item.id) {         
            
        axios.put('/api/apply', modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "L'??v??nement est enregistr?? avec succ??s.", 3000)
          getCandidatures()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le probl??me persiste, veuillez contacter le support.", 3000)
        }) 

      } else {
        //Ajout
        const newApply = {
          permanence_id: +modal.item.permanence_id,
          date: moment(modal.item.date, "YYYY-MM-DD hh:mm:ss"),       
          user_id: +token.id
        };  

        axios.post('/api/apply', newApply) 
        .then(function (response) {
          NotificationManager.success("success", "L'??v??nement est enregistr?? avec succ??s.", 3000)
          getCandidatures()
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le probl??me persiste, veuillez contacter le support.", 3000)
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
      <div>
        <NotificationContainer/>

        <Modal show={show} onHide={openCloseModal}>
          <form onSubmit={e => e.preventDefault()}>
            <Modal.Header closeButton>  
              <Modal.Title>{modal ? modal.title_modal : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>              
              
              <label>Date de votre candidature</label>
              <DatePicker                    
                  className="form-control"
                  disabled={'disabled'} 
                  selected={datePicker}
                  onChange={changeDatePicker}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="dd/MM/Y"
              />
              
              <span>Permanence</span>
              <Select name="permanence_id" 
                options={optionsPermanences} 
                onChange={changeObjEventModal_Select} 
                defaultValue={defaultValueSelectPermanence} 
              />                              
            </Modal.Body>              
            <Modal.Footer className={ editable_boolean === true ? '' : 'hidden' }>
              <Button variant="primary" type="submit" value="save" onClick={() => handleSubmit("save")} >
                Candidater
              </Button>
              <Button variant="danger" type="submit" value="delete" onClick={() => handleSubmit("delete")} >
                Annuler sa candidature
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h2 mb-0">Mes candidatures</h1>
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
                  right: "dayGridMonth,dayGrid"
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