import Link from "next/link";

export default function Dons() {
  return (
    <>
      <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
        <div className="container-fluid px-0">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 mb-0">Dons</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 p-xxl-5">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="border-bottom border-gray-200 border-3 pb-4 pt-3 mb-4 mb-xl-5">
              <ul className="nav nav-segment nav-pills mb-7" role="tablist">
                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link"
                      data-bs-toggle="pill"
                      role="tab"
                      aria-selected="true"
                    >
                      Mes dons éffectués
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link"
                      data-bs-toggle="pill"
                      role="tab"
                      aria-selected="true"
                    >
                      Mes dons réçus
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-4">
              <div className="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5">
                <div className="d-flex align-items-center px-3 px-md-4 py-3">
                  <h5 className="card-header-title mb-0 ps-md-2 font-weight-semibold">
                    Vos dons
                  </h5>
                </div>
                <div className="table-responsive mb-0">
                  <table className="table card-table table-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Permanence</th>
                        <th>Avocat</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
