import WatchListMovie from "./WatchListMovie";


export default function WatchList({
  movies,
  removeFromWatchList,
  title
}) {
  return (
    <>
       
        <div className="container py-3">
        <h1 className=" mb-3 h4">{title}</h1>
          {/* <div className="card">
            <div className="card-header">
              <h2 className="title h5 mb-0">Watch List</h2>
            </div> 
            <div className="card-body">*/}

              
              {movies.length == 0 ? (
                <div>Film bulunamadı</div>
              ) : (
                <div
                  id="movie-list"
                  className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-1 g-lg-3"
                >
                  {movies.map((m, index) => (
                    <WatchListMovie
                      key={index}
                      movieObj={m}
                      /*image={m.image}
                title={m.title}
                description={m.description}*/
                      removeFromWatchList={removeFromWatchList}
                    />
                  ))}
                </div>
              )}
            </div>
          {/* </div>
        </div> */}
      
    </>
  );
}
