import React from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from "@fullcalendar/interaction" 
import DatePicker from 'react-datepicker'; 
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class Calendar extends React.Component { 
  
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      role: "admin",
      events: [],
      editable_boolean: false,
      modal: null,
      datePicker: null,      
      submit1: "save",
      submit2: "delete",
    }    

    //Initialisation des Events
    axios.get('/api/event') 
    .then(function (response) { 
      this.setState({ events: response.data });
    }) 
    .catch(function (error) { 
      console.log(error); 
    }) 
    

    //Gestion des roles utilisateurs
    this.state.editable_boolean = this.state.role === "admin" ? true : false

    //Binding des evenements
    this.changeObjEventModal = this.changeObjEventModal.bind(this);
    this.openCloseModal = this.openCloseModal.bind(this);
    this.dayClick = this.dayClick.bind(this);
    this.eventClick = this.eventClick.bind(this);
    this.eventDrop = this.eventDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDatePicker = this.changeDatePicker.bind(this);
  }

  //Binding de l'objet Event de la modal
  changeObjEventModal = (event) => {
    this.state.modal.item[event.target.name] = event.target.value
  }

  //Ouverture/Fermeture de la modal
  openCloseModal = (arg = false) => {
    this.setState({ show: arg });
    
    if (!arg) { this.state.modal = null }
  }

  //Clic sur le jour du calendrier
  dayClick = (arg) => { 

    if (!this.state.editable_boolean) { return false }

    this.state.modal = {
      ...this.state.modal, 
      item: { date: arg.dateStr },
      title: "Ajout d'un évènement"
    }
    this.setState({ datePicker: new Date(arg.date) });    

    this.openCloseModal(true)
  };

  //Clic sur un Event du calendrier
  eventClick = (info) => { 
    if (this.state.role === "admin") {
      this.state.modal = {
        title : "Modification de l'évènement"
      }
    } else {
      this.state.modal = {
        title : "Evènement"
      }
    }

    //Hydratation de l'objet Event dans formulaire de la Modal
    let event = this.state.events.find(item => item.id == info.event._def.publicId)
    this.state.modal = { ...this.state.modal, item: event }

    //Cas particulier de la date qui doit etre setter
    this.setState({ datePicker: new Date(this.state.modal.item.date) });

    this.openCloseModal(true)
  };

  //Drag drop event
  eventDrop = (info) => {
    let $this = this

    if (!window.confirm("Are you sure about this change?")) {
      info.revert();
    } else {     
      let event = $this.state.events.find(item => item.id == info.event._def.publicId)

      event.date = moment(info.event.start).format('YYYY-MM-DD')   
      
      axios.put('/api/event', event) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          let findIndex = $this.state.events.findIndex(item => item.id == response.data.id)
          $this.state.events[findIndex] = response.data
          $this.setState({ events: [...$this.state.events] });
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        }) 
       
    }
  };

  //Pour savoir quel bouton du FORM
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Ajout/Mise/Suppression a jour d'un Event
  handleSubmit = (type) => {
    
    let $this = this
    
    if (type === "delete") {
      //Suppression
      axios.delete('/api/event', { data : this.state.modal.item }) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement a été supprimé avec succès.", 3000)
          let findIndex = $this.state.events.findIndex(item => item.id == response.data.id)
          $this.state.events.splice(findIndex,1)
          $this.setState({ events: [...$this.state.events] });
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de la suppression. Si le problème persiste, veuillez contacter le support.", 3000)
        })

    } else {
      //Mise a jour
      if (this.state.modal.item.id) {         
            
        axios.put('/api/event', this.state.modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          let findIndex = $this.state.events.findIndex(item => item.id == response.data.id)
          $this.state.events[findIndex] = response.data
          $this.setState({ events: [...$this.state.events] });
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        }) 

      } else {
        //Ajout
        const newEvent = {
          title: this.state.modal.item.title,
          description: this.state.modal.item.description,
          date: this.state.modal.item.date
        };      

        axios.post('/api/event', newEvent) 
        .then(function (response) {
          NotificationManager.success("success", "L'évènement est enregistré avec succès.", 3000)
          $this.setState({ events: [...$this.state.events, response.data] });
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })      
        
      }       
    }

    this.openCloseModal(false) 
    
  };

  //Formattage du datePicker pour l'objet Event Modal
  //Mise a jour de l'objet Modal 
  changeDatePicker = (date) => {  
    this.state.modal.item.date = moment(date).format('YYYY-MM-DD hh:mm')
    this.setState({ datePicker: date })
    this.setState({ modal: this.state.modal })
  }

  render() {      
    return (
      <>
          <NotificationContainer/>

          <Modal show={this.state.show} onHide={this.openCloseModal}>
            <form onSubmit={e => e.preventDefault()}>
              <Modal.Header closeButton>  
                <Modal.Title>{this.state.modal ? this.state.modal.title : ""}</Modal.Title>
              </Modal.Header>
              <Modal.Body>              
                <input type='hidden' 
                      className="form-control"
                      defaultValue={this.state.modal ? this.state.modal.item.id : ""} 
                      disabled={this.state.role === 'admin' ? '' : 'disabled'} />
                <span>Date : </span>
                <DatePicker                    
                    className="form-control"
                    disabled={this.state.role === 'admin' ? '' : 'disabled'} 
                    selected={ this.state.datePicker }
                    onChange={ this.changeDatePicker }
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
                      onChange={this.changeObjEventModal} 
                      defaultValue={this.state.modal ? this.state.modal.item.title : ""} 
                      disabled={this.state.role === 'admin' ? '' : 'disabled'}/>
                <span>Description</span> 
                <input type='text' 
                      name="description" 
                      className="form-control" 
                      onChange={this.changeObjEventModal} 
                      defaultValue={this.state.modal ? this.state.modal.item.description : ""} 
                      disabled={this.state.role === 'admin' ? '' : 'disabled'}/>
                               
              </Modal.Body>              
              <Modal.Footer className={ this.state.editable_boolean === true ? '' : 'hidden' }>
                <Button variant="primary" type="submit" value={this.state.submit1} onClick={() => this.handleSubmit("save")} >
                  Save
                </Button>
                <Button variant="danger" type="submit" value={this.state.submit2} onClick={() => this.handleSubmit("delete")} >
                  Delete
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

          <FullCalendar
            locale= 'fr'
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={this.dayClick}
            eventClick={this.eventClick} 
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
            editable={this.state.editable_boolean}
            eventDrop={this.eventDrop}
            events={this.state.events}
          />
      </>
    );    
  }  
}
