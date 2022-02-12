export default function Security() {
    return (
        <form className="px-3 form-style-two">
            <div className="row">
                <div className="col mb-md-4 pb-3">
                    <label htmlFor="LastName" className="form-label form-label-lg">Ancien mot de passe</label>
                    <input type="text" className="form-control form-control-xl" id="Password" placeholder="**********"></input>
                </div>
            </div>
            <div className="row">
                <div className="col mb-md-4 pb-3">
                    <label htmlFor="LastName" className="form-label form-label-lg">Mot de passe</label>
                    <input type="text" className="form-control form-control-xl" id="Password" placeholder="**********"></input>
                </div>
            </div>
            <div className="row">
                <div className="col mb-md-4 pb-3">
                    <label htmlFor="LastName" className="form-label form-label-lg">Confirmer nouveau mot de passe</label>
                    <input type="text" className="form-control form-control-xl" id="Password" placeholder="**********"></input>
                </div>
            </div>
                
                
                <div className="text-end py-md-3">
                    <button type="submit" className="btn btn-lg btn-primary px-md-4 mt-lg-3">
                        <span className="px-md-3">Modifier votre mot de passe</span>
                    </button>
                </div>
            
        </form>
    )
}