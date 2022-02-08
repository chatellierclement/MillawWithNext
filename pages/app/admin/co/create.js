import Link from 'next/link';

export default function CreateCO() {
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
                        <li className="nav-item"><Link href="/app/admin/co/all"><a className="nav-link">Toutes les CO</a></Link></li>
                        <li className="nav-item"><a className="nav-link" href="#">Nouvelle CO</a></li>
                    </ul>
                </div>

                <div className="text-center py-3 py-md-5">
                    <h2>Ajouter une nouvelle CO</h2>
                    <p className="big text-black-600">Créeez et désignez un avocat à la nouvelle CO</p>
                </div>

                <ul className="step-list mb-4 mb-md-5">
                    <li className="active">
                        <span className="circle circle-lg bg-primary">
                            <svg data-name="icons/tabler/check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                <rect data-name="Icons/Tabler/Check background" width="16" height="16" fill="none"></rect>
                                <path d="M14.758.213a.727.727,0,0,1,1.1.947l-.07.082-9.7,9.7a.727.727,0,0,1-.947.07l-.082-.07L.213,6.09a.727.727,0,0,1,.947-1.1l.082.07L5.576,9.4Z" transform="translate(0 2)" fill="#fff"></path>
                            </svg>
                        </span>
                        <h5 className="mb-0 mt-3 font-weight-semibold">Identité</h5>
                    </li>
                    <li className="active">
                        <span className="circle circle-lg bg-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <rect data-name="Icons/Tabler/Circle background" width="20" height="20" fill="none"></rect>
                                <path d="M7.5,15A7.5,7.5,0,1,1,15,7.5,7.508,7.508,0,0,1,7.5,15ZM7.5,1.73A5.77,5.77,0,1,0,13.269,7.5,5.777,5.777,0,0,0,7.5,1.73Z" transform="translate(2.5 2.5)" fill="#fff"></path>
                            </svg>
                        </span>
                        <h5 className="mb-0 mt-3 font-weight-semibold">Permanence</h5>
                    </li>
                    <li>
                        <span className="circle circle-lg bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <rect data-name="Icons/Tabler/Circle background" width="20" height="20" fill="none"></rect>
                                <path d="M7.5,15A7.5,7.5,0,1,1,15,7.5,7.508,7.508,0,0,1,7.5,15ZM7.5,1.73A5.77,5.77,0,1,0,13.269,7.5,5.777,5.777,0,0,0,7.5,1.73Z" transform="translate(2.5 2.5)" fill="#ADB5BD"></path>
                            </svg>
                        </span>
                        <h5 className="mb-0 mt-3 font-weight-semibold">Avocat</h5>
                    </li>
                </ul>

                <div className="row group-cards pt-2">
                    <div className="col-xxl-12 mb-4">
                        <div className="card rounded-12 shadow-dark-80 border border-gray-200 h-100">
                            <div className="card-body pb-0 px-3 pt-3">
                                <div className="pb-3 p-xl-5">
                                    <form>
                                        <div className="mb-4 mb-xl-5">
                                            <label className="form-label form-label-lg" htmlFor="ProjectName">Nom</label>
                                            <input type="text" placeholder="My project..." id="ProjectName" className="form-control form-control-xl" />
                                        </div>
                                        <div className="mb-4 mb-xl-5">
                                            <label className="form-label form-label-lg" htmlFor="ProjectName">Prénom</label>
                                            <input type="text" placeholder="My project..." id="ProjectName" className="form-control form-control-xl" />
                                        </div>
                                        <div className="mb-4 mb-xl-5">
                                            <label className="form-label form-label-lg" htmlFor="ProjectName">Age</label>
                                            <input type="text" placeholder="My project..." id="ProjectName" className="form-control form-control-xl" />
                                        </div>
                                        <div className="mb-4 mb-xl-5">
                                            <label className="form-label form-label-lg" htmlFor="ProjectName">Ville</label>
                                            <input type="text" placeholder="My project..." id="ProjectName" className="form-control form-control-xl" />
                                        </div>
                                        <div className="mb-4 mb-xl-5">
                                            <label className="form-label form-label-lg" htmlFor="ProjectName">Code postal</label>
                                            <input type="text" placeholder="My project..." id="ProjectName" className="form-control form-control-xl" />
                                        </div>
                                        <div className="mb-4 mb-xl-5">
                                            <label className="form-label form-label-lg" htmlFor="ProjectName">Adresse</label>
                                            <input type="text" placeholder="My project..." id="ProjectName" className="form-control form-control-xl" />
                                        </div>

                                        <div className="pt-xl-2 text-end">
                                            <span className="text-muted font-weight-semibold me-md-4 pe-sm-3 d-block d-sm-inline-block pb-2 pb-sm-0">ETAPE 1 SUR 3</span>
                                            <a href="#0" className="btn btn-xl btn-outline-dark text-gray-700 border-gray-700 me-2 me-md-4">Annuler</a>
                                            <button type="button" className="btn btn-xl btn-primary">Suivant</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}