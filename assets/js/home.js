
const tarjetas = document.getElementById("tarjetas")
const categoriasDiv = document.getElementById("categoriasData")
const contenedorDetails = document.getElementById("contenedorDetails")
const inputBuscar = document.getElementById('buscar')
const categorias = data.events
const eventosHome = data.events
const fn = ( categoria ) => categoria.category
const categoriasFiltradas = categorias.filter( fn )
const categoriasBoxs = categoriasFiltradas.map( fn )
const categoriaNoRepetidas = new Set( categoriasBoxs )
const arrayCategoriaNoRepetidas = Array.from( categoriaNoRepetidas )
const formulario = document.getElementById('form')

imprimirTarjetas( eventosHome ,tarjetas )
inputListenerHome()

    function crearEventos(eventos) {
        let div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `<div class="card shadow-sm h-100" >
                    <div>
                        <img class="bd-placeholder-img img-fluid" style="width: 400px ;height: 180px" src="${eventos.image}" alt="imagne ${eventos.name}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h4>${eventos.name}</h4>
                        <p class="card-text">${eventos.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">Price: $${eventos.price}</small>
                            <div class="btn-group">
                            <a href="../pages/details.html?id=${eventos._id}"><button type="button" class="btn btn-sm btn-outline-secondary text-white">View more</button></a>
                            </div>
                        </div>
                    </div>
                </div>`
            return div
    }
    
    function imprimirTarjetas(eventos,contenedor){
    
        contenedor.innerHTML = ''
        let fragment = document.createDocumentFragment()
        eventos.forEach( evento => fragment.appendChild(crearEventos(evento)))
        contenedor.appendChild(fragment)
    }

crearCheckBoxs( arrayCategoriaNoRepetidas, categoriasDiv )

function crearCheckBoxs(values, contenedor){
    let template = ''
    values.forEach( value => template  += `<input class="form-check-input" type="checkbox" value="${value}" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">${value}
    </label>`)
    contenedor.innerHTML = template
    console.log(values)
}

function filtrarCategorias(categoria,categoriaSeleccionadas){
   let fn = arrayCategoriaNoRepetidas => categoriaSeleccionadas.includes(arrayCategoriaNoRepetidas.category)
   let filtrados = categoria.filter( fn )
   console.log(categoria)
   console.log(categoriaSeleccionadas)
   console.log(filtrados)
   return filtrados
}

categoriasDiv.addEventListener( 'change', (event) => {
    const checked = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map( input => input.value )
    if( checked.length === 0 ){
    imprimirTarjetas( eventosHome, tarjetas )
     return
    }
    const categoriasFiltradasBox = filtrarCategorias( categoriasFiltradas, checked )
    categoriasFiltradasBox.length !== 0? imprimirTarjetas( categoriasFiltradasBox, tarjetas ): tarjetas.innerHTML = '<h2> Not available </h2>'
    // console.log(categoriasFiltradasBox)
 } )


 function inputListenerHome(){
    formulario.addEventListener('submit',(e) =>{
        e.preventDefault()
        let eventosFiltrados = filtrarPorTexto(eventosHome,inputBuscar.value)
        if(eventosFiltrados !== inputBuscar.value  )
        {
            tarjetas.innerHTML = `<p> There are no results for your search: "${inputBuscar.value}"</p>`
            console.log(eventosFiltrados)
            console.log(inputBuscar.value)
        }else{
            imprimirTarjetas(eventosFiltrados, tarjetas)
        }
     })
    }

 function filtrarPorTexto(arrayEventoNombre,name){
    let arrayFiltrado = arrayEventoNombre.filter(nombre => nombre.name.toLowerCase().includes(name.toLowerCase()))
    return arrayFiltrado
}



function detallesCard(info){
    info.forEach(item => {
        div.className = 'card mb-3" style="width: 600px;'
        contenedorDetails.innerHTML +=`<div class="row g-0">
          <div class="col-md-4">
            <img src="${categorias.image}" class="img-fluid rounded-start d-placeholder-img" style="width: 400px ; height: 180px" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${categorias.name}</h5>
              <p class="card-text">${categorias.description}</p>
              <p class="card-text"><small class="text-muted">${categorias.price}</small></p>
            </div>
          </div>
        </div>`
    })
}