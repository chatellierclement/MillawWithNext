import React, { useState } from 'react'
import Image from 'next/image'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FileUploader } from "react-drag-drop-files";

export default function Documents() {    
    const [show, setShow] = useState(false); 
    const [showAddDoc, setShowAddDoc] = useState(false); 
    const [selectedFile, setSelectedFile] = useState(null); 
    const fileTypes = ["PDF"];

    //Ouverture/Fermeture de la modal
    function openCloseModal(arg = false) {
        setShow(arg);
    }
    //Ouverture/Fermeture de la modal
    function openCloseModalAddDocument(arg = false) {
        setShowAddDoc(arg);
    }

    function onChangeHandler(event) {
        setSelectedFile(event)
    }

    function eventDeleteDoc() {
        setSelectedFile(null)
    }

    async function eventClick() {         

        const data = new FormData() 
        data.append('file', selectedFile)
        await axios.post('http://localhost:8000/upload', data) 
        .then(function (response) {
            let newDoc = {
                name: 'test',
                url: "documents/" + response.data.filename,
                user_id: 1
            }

            axios.post('/api/document', newDoc) 
            .then(function (response) {
                NotificationManager.success("success", "Le document est enregistré avec succès.", 3000)
            }) 
        }) 
        .catch(function (error) { 
            NotificationManager.error("warning", "Une erreur est survenue lors de l'enregistrement. Si le problème persiste, veuillez contacter le support.", 3000)
          })  
          
        openCloseModalAddDocument(false)
    }

    function openDocument() {    
        openCloseModal(true)
    }

    function openAddDocument() {    
        openCloseModalAddDocument(true)
    }

    return (
        <>
        <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
            <div className="container-fluid px-0">
                <div className="row align-items-center">
                    <div className="col">
                    <h1 className="h2 mb-0">Documents</h1>
                    </div>

                    <div className="col-auto d-flex align-items-center my-2 my-sm-0">                        
                        <a href="#" onClick={openAddDocument} className="btn btn-lg btn-darner px-3 me-2 me-md-3">
                            <span className="ps-1">Ajouter un document</span>
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
            <div className="container-fluid px-0 pb-1 pb-md-4">
                <div className="border-bottom border-gray-200 pb-2 pb-xl-5 mb-2 mb-xl-5">
                    <h5 className="font-weight-semibold text-black-600 mb-lg-4 pb-1">Ajoutés récemments</h5>
                    <div className="row">
                        <div className="col-6 col-md-4 col-lg-6 col-xl-4 has-xxl-5 mb-3 mb-lg-4">
                            <figure onClick={openDocument} className="p-2 rounded-6 shadow-dark-80 bg-white mb-0 h-100 border border-gray-200">
                                <figcaption className="text-center">
                                    <Image src="/pdf.svg" alt="PDF" height={40} width={33} />
                                    <h6 className="font-weight-semibold open-sans-font mt-3">CERFA 3654</h6>
                                    <p className="text-gray-600 fs-11 lh-base">Uploaded today</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="col-6 col-md-4 col-lg-6 col-xl-4 has-xxl-5 mb-3 mb-lg-4">
                            <figure className="p-2 rounded-6 shadow-dark-80 bg-white mb-0 h-100 border border-gray-200">
                                <figcaption className="text-center">
                                    <Image src="/pdf.svg" alt="PDF" height={40} width={33} />
                                    <h6 className="font-weight-semibold open-sans-font mt-3">AJ</h6>
                                    <p className="text-gray-600 fs-11 lh-base">Uploaded today</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="col-6 col-md-4 col-lg-6 col-xl-4 has-xxl-5 mb-3 mb-lg-4">
                            <figure className="p-2 rounded-6 shadow-dark-80 bg-white mb-0 h-100 border border-gray-200">
                                <figcaption className="text-center">
                                    <Image src="/pdf.svg" alt="PDF" height={40} width={33} />
                                    <h6 className="font-weight-semibold open-sans-font mt-3">CERFA 8521</h6>
                                    <p className="text-gray-600 fs-11 lh-base">Uploaded today</p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>

                <div className="border-bottom border-gray-200 pb-2 pb-xl-5 mb-2 mb-xl-5">
                    <h5 className="font-weight-semibold text-black-600 mb-lg-4 pb-1">Documents</h5>
                    <div className="row">
                        <div className="col-6 col-md-4 col-lg-6 col-xl-4 has-xxl-5 mb-3 mb-lg-4">
                            <figure className="p-2 rounded-6 shadow-dark-80 bg-white mb-0 h-100 border border-gray-200">
                                <figcaption className="text-center">
                                    <Image src="/pdf.svg" alt="PDF" height={40} width={33} />
                                    <h6 className="font-weight-semibold open-sans-font mt-3">CERFA 3654</h6>
                                    <p className="text-gray-600 fs-11 lh-base">Uploaded today</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="col-6 col-md-4 col-lg-6 col-xl-4 has-xxl-5 mb-3 mb-lg-4">
                            <figure className="p-2 rounded-6 shadow-dark-80 bg-white mb-0 h-100 border border-gray-200">
                                <figcaption className="text-center">
                                    <Image src="/pdf.svg" alt="PDF" height={40} width={33} />
                                    <h6 className="font-weight-semibold open-sans-font mt-3">AJ</h6>
                                    <p className="text-gray-600 fs-11 lh-base">Uploaded today</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="col-6 col-md-4 col-lg-6 col-xl-4 has-xxl-5 mb-3 mb-lg-4">
                            <figure className="p-2 rounded-6 shadow-dark-80 bg-white mb-0 h-100 border border-gray-200">
                                <figcaption className="text-center">
                                    <Image src="/pdf.svg" alt="PDF" height={40} width={33} />
                                    <h6 className="font-weight-semibold open-sans-font mt-3">CERFA 8521</h6>
                                    <p className="text-gray-600 fs-11 lh-base">Uploaded today</p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <NotificationContainer/>

        <Modal show={show} onHide={openCloseModal} className="modal_pdf">
            <Modal.Header closeButton>  
                <Modal.Title>PDF</Modal.Title>
            </Modal.Header>
            <Modal.Body>              
                 <iframe src="/documents/doc.pdf"></iframe>                      
            </Modal.Body>    
        </Modal>

        <Modal show={showAddDoc} onHide={openCloseModalAddDocument}>
            <Modal.Header closeButton>  
                <Modal.Title>Ajout document</Modal.Title>
            </Modal.Header>
            <Modal.Body>              
                <FileUploader handleChange={onChangeHandler} name="file" types={fileTypes} label="Déposer ou déplacer un fichier ici !"  />    
                <p>
                    <span>{selectedFile ? `Fichier : ${selectedFile.name}` : "Aucun fichier déposé"}</span>
                    {selectedFile &&
                        <Button variant="danger" className="float-right" type="button" onClick={() => eventDeleteDoc()} >
                            Supprimer
                        </Button>
                    } 
                </p>                               
            </Modal.Body> 
            <Modal.Footer>
              <Button variant="primary" type="button" disabled={selectedFile ? "" : "disabled"} onClick={() => eventClick()} >
                Enregistrer
              </Button>
            </Modal.Footer>   
        </Modal>

        <style>
            {`
               .modal_pdf .modal-dialog {
                    max-width: 90vh !important;
               } 

               iframe {
                   height: 75vh;
                   width: 100%;
               }
            `}
        </style>
        </>
    )
}