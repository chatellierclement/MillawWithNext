export default function LawyerStep() {
    return (
        <>
            <div className="mb-4 mb-xl-5">
                <label className="form-label form-label-lg" htmlFor="ProjectName">Choix d&apos;un avocat</label>

                <select className="form-label form-label-lg" id="ProjectName">
                    <option>John Doe</option>
                    <option>Clément Chatellier</option>
                </select>
            </div>

            <div className="mb-4 mb-xl-5">
                <label className="form-label form-label-lg" htmlFor="ProjectName">Avocat de suivi</label>

                <input type="text" value="John Doe" disabled id="ProjectName" className="form-control form-control-xl" />
            </div>
        </>
    )
}