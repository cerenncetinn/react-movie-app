export default function Actors({actors}) {

    return(
  <div className="container my-3
      ">
        {/* <div className="card">
            <div className="card-header">
              <h3 className="card-title">Kadro</h3>
            </div>
            <div className="card-body"> */}

        <h1 className="mb-3 h4">Kadro</h1>
          <div className="row">
            {actors.slice(0, 10).map((actor) => (
              <div className="col-3 text-center mb-2" key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? "https://image.tmdb.org/t/p/w185/" + actor.profile_path
                      : ""
                  }
                  alt={actor.name}
                  className="img-fluid img-thumbnail rounded shadow"
                />
                <p>{actor.name}</p>
              </div>
            ))}
            </div>
         
          </div>
    //     </div>
    //   </div>

    )
   
}