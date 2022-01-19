import React from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select'

export default class Utilisateur extends React.Component {
    render() {
        return (
            <>
            <Button variant="primary" onClick={this.eventClick} >
              Add
            </Button>

            <DataTable
                title="Permanences"
                columns={this.state.columns}
                data={this.state.permanences}
                defaultSortFieldId={1}
                pagination
                language='fr'
            />
          </>
        )
    }
}