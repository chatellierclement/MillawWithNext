import React from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select'

export default class Utilisateur extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {       
      show: false,
      modal: null,
      options: [],
      defaultValueSelect: null,
      columns: [
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
          name: "role",
          selector: (row) => row.role.libelle,
          sortable: true,
          reorder: true
        },
        {
          button: true,
          cell: (row) => (            
            <div className="openbtn text-center">
              <button type="button" onClick={() => this.eventClick(row)} className="btn btn-primary">Edit</button>         
            </div>            
          )
        },
        {
          button: true,
          cell: (row) => (            
            <div className="openbtn text-center">
              <button type="button" onClick={() => this.deleteUser(row)} className="btn btn-danger">Delete</button>         
            </div>            
          )
        }
      ]
    }

    //Binding des evenements
    this.changeObjEventModal = this.changeObjEventModal.bind(this);
    this.changeObjEventModal_Select = this.changeObjEventModal_Select.bind(this);

    //Initialisation des Users
    axios.get('/api/user') 
      .then(function (response) { 
        this.setState({ users: response.data });
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
        this.setState({ options: data_select });          
      }) 
      .catch(function (error) { 
        console.log(error); 
      }) 
  }   

  //Binding de l'objet User de la modal
  changeObjEventModal = (event) => {
    this.state.modal.item[event.target.name] = event.target.value
  }
  
  //Binding de l'objet User de la modal - Special pour le SELECT
  changeObjEventModal_Select= (value, action) => {
    this.state.modal.item[action.name] = value.value
  }

  //Ouverture/Fermeture de la modal
  openCloseModal = (arg = false) => {
    this.setState({ show: arg });
    
    if (!arg) { this.state.modal = null }
  }

  //Clic sur un button Edit/add du User
  eventClick = (row = null) => {      

    if (row.id) {
      this.state.modal = {
        title : "Modification de l'utilisateur"
      }

      //Hydratation de l'objet Event dans formulaire de la Modal
      let user = this.state.users.find(item => item.id == row.id)
      this.state.modal = { ...this.state.modal, item: user }
      
      //Hydratation de la valeur par défaut du Select (le Role du User en Edit)
      let value = this.state.options.filter(option => { return this.state.modal && this.state.modal.item.role.id === option.value })      
      this.setState({ defaultValueSelect: value[0] })

    } else {
      this.state.modal = {
        item : { id : null },
        title : "Nouvel utilisateur"
      }
    }      

    this.openCloseModal(true)
  };

  //Mise a jour d'un User
  handleSubmit = (type) => {
    
    let $this = this

    //TODO : Pb de relation
    delete this.state.modal.item.role
    
    //Mise a jour
    if (this.state.modal.item.id) { 
      axios.put('/api/user', this.state.modal.item) 
        .then(function (response) {
          NotificationManager.success("success", "L'utilisateur est enregistré avec succès.", 3000)
          let findIndex = $this.state.users.findIndex(item => item.id == response.data.id)
          $this.state.users[findIndex] = response.data
          $this.setState({ users: [...$this.state.users] });
        }) 
        .catch(function (error) { 
          NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
        })
      
    } else {
      //Ajout
      const newUser = {
        lastName: this.state.modal.item.lastName,
        firstName: this.state.modal.item.firstName,
      };      

      axios.post('/api/user', newUser) 
      .then(function (response) {
        NotificationManager.success("success", "L'utilisateur est enregistré avec succès.", 3000)
        $this.setState({ users: [...$this.state.users, response.data] });
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
      })    
    }

    this.openCloseModal(false)
    
  };

  deleteUser = (row) => {
    
    let $this = this
    axios.delete('/api/user', { data : row })
      .then(function (response) {
        NotificationManager.success("success", "L'utilisateur a été supprimé avec succès.", 3000)
        let findIndex = $this.state.users.findIndex(item => item.id == response.data.id)
        $this.state.users.splice(findIndex,1)
        $this.setState({ users: [...$this.state.users] });
      }) 
      .catch(function (error) { 
        NotificationManager.error("warning", "Une erreur est survenue lors de la suppression. Si le problème persiste, veuillez contacter le support.", 3000)
      })
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
                />
                <span>lastName :</span>
                <input type='text' 
                      name="lastName" 
                      className="form-control" 
                      onChange={this.changeObjEventModal} 
                      defaultValue={this.state.modal ? this.state.modal.item.lastName : ""} 
                />
                <span>firstName</span> 
                <input type='text' 
                      name="firstName" 
                      className="form-control" 
                      onChange={this.changeObjEventModal} 
                      defaultValue={this.state.modal ? this.state.modal.item.firstName : ""} 
                />                  
                <span>Rôle</span>
                <Select name="role_id" 
                  options={this.state.options} 
                  onChange={this.changeObjEventModal_Select} 
                  defaultValue={this.state.defaultValueSelect} 
                />                             
              </Modal.Body>              
              <Modal.Footer>
                <Button variant="primary" type="submit" onClick={this.handleSubmit} >
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

          <Button variant="primary" onClick={this.eventClick} >
              Add
          </Button>

          <DataTable
            title="Utilisateurs"
            columns={this.state.columns}
            data={this.state.users}
            defaultSortFieldId={1}
            pagination
            language='fr'
          />
      </>
    );    
  }  
}
