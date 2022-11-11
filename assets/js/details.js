const eventos = data.events
const contenedorDetails = document.getElementById("contenedorDetails")
const queryString = location.search 
const params = new URLSearchParams(queryString)
const id = params.get("id")

console.log(location)
console.log(id)
console.log(typeof(eventos))
const fn = ( evento ) => evento
const eventoAArray = eventos.filter( fn )
const eventoId = eventoAArray.map( fn )
const setEventoId = new Set( eventoId )
const arrayEventoId = Array.from( setEventoId )

const buscarId = arrayEventoId.find(eventos => (eventos._id == id))
console.log(buscarId)

    contenedorDetails.className = 'card mb-3"'
    contenedorDetails.innerHTML =`<div class="row g-0 style="width: 200px;">
          <div class="col-md-4">
            <img src="${buscarId.image}" class="img-fluid rounded-start d-placeholder-img" style="width: 300px ; height: 180px" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${buscarId.name}</h5>
              <span>${buscarId.date}</span>
              <span></span>
              <p class="card-text">${buscarId.description}</p>
              <p class="card-text"><small class="text-muted">Price: $${buscarId.price}</small></p>
            </div>
          </div>
        </div>`