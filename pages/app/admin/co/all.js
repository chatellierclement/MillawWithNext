import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import DataTable from "react-data-table-component";

export default function AllCO() {

  const [commissionsOffice, setCommissionsOffice] = useState([]);
  const paginationComponentOptions = {
    rowsPerPageText: "Lignes par page :",
    rangeSeparatorText: 'sur'
  };

  const columns = [
    {
      id: 1,
      name: "Nom",
      selector: (row) => row.lastName,
      sortable: true,
      reorder: true
    },
    
  ];

  //Initialisation des Events
  async function getCommissionsOffice() {
    await axios.get('/api/commissionOffice') 
    .then(function (response) { 
      setCommissionsOffice(response.data);
    }) 
    .catch(function (error) { 
      console.log(error); 
    }) 
  }

  

    return (
        <>
        <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h2 mb-0">Commission d&apos;office</h1>
              </div>
            </div>
          </div>
        </div>  

        <div className="p-3 p-xxl-5">
            <div className="container-fluid px-0">
                <div className="mb-2 mb-md-3 mb-xl-4 pb-2">
                    <ul className="nav nav-tabs nav-tabs-md nav-tabs-line position-relative zIndex-0">
                        <li className="nav-item"><a href="#" className="nav-link">Toutes les CO</a></li>
                        <li className="nav-item"><Link href="/app/admin/co/create"><a className="nav-link">Nouvelle CO</a></Link></li>
                    </ul>
                </div>

                <div className="text-center py-3 py-md-5">
                    <h2>Toutes les CO</h2>
                    <p className="big text-black-600">Retrouvez vos CO déjà créées</p>
                </div>

         
                <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                  <DataTable
                    columns={columns}
                    data={commissionsOffice}
                    defaultSortFieldId={1}
                    pagination
                    noDataComponent="Il n'y a aucune commission d'office"
                    paginationComponentOptions={paginationComponentOptions}
                  />
                </div>
             
            </div>
        </div>
        </>
    )
}