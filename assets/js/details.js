let url = "https://amazing-events.herokuapp.com/api/events"

traerDatos(url)

function traerDatos (url){
  fetch (url)
      .then(response => response.json())
          .then(data => {
              let eventos = data.events
              const queryString = location.search 
              const params = new URLSearchParams(queryString)
              const id = params.get("id")
              const buscarId = eventos.find(eventos => (eventos._id == id))
              eventosHome = data.events
              categorias = eventosHome
              crearDetalles(buscarId)
          })      
          .catch(error => console.error(error.message))
}

function crearDetalles(buscarId) {
        let contenedorDetails = document.getElementById("contenedorDetails")
        contenedorDetails.className = 'card mb-3'
        contenedorDetails.innerHTML =`<div class="row g-0 ">
        <div class="col-md-4 ">
          <img src="${buscarId.image}" class="img-fluid rounded-start d-placeholder-img" style="width: 400px ; height: 200px" alt="${buscarId.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${buscarId.name}</h5>
            <div><span>${buscarId.category} ~ </span><span class = "fecha">${buscarId.date}</span></div>
            
            <div><span>Place: ${buscarId.place}</span> <span>| Capacity: <span class="numeros">${buscarId.capacity}</span></span></div>
            <div></div>
            <span></span>
            <p class="card-text">${buscarId.description}</p>
            <p class="card-text"><small class="text-muted">Price: $<span class = "numeros">${buscarId.price}</span></small></p>
          </div>
        </div>
      </div>`
    return contenedorDetails
}