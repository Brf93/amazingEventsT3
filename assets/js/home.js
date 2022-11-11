
const tarjetas = document.getElementById("tarjetas")
const categoriasDiv = document.getElementById("categoriasData")
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
crearCheckBoxs( arrayCategoriaNoRepetidas, categoriasDiv )

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
                <a href="./assets/pages/details.html?id=${eventos._id}"><button type="button" class="btn btn-sm btn-outline-secondary text-white">View more</button></a>
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


function crearCheckBoxs(values, contenedor){
    let template = ''
    values.forEach( value => template  += `<div> <input class="form-check-input" type="checkbox" value="${value}" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">${value}
    </label></div>`)
    contenedor.innerHTML = template
    console.log(values)
}

function filtrarCategorias(categoria,categoriaSeleccionadas){
   let fn = arrayCategoriaNoRepetidas => categoriaSeleccionadas.includes(arrayCategoriaNoRepetidas.category) || categoriaSeleccionadas.length == 0
   let filtrados = categoria.filter( fn )
   return filtrados
}

categoriasDiv.addEventListener( 'change', (event) => {
    const checked = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map( input => input.value )
    const categoriasFiltradasBox = filtrarCategorias( categoriasFiltradas, checked )
    
    categoriasFiltradasBox.length !== 0? imprimirTarjetas( categoriasFiltradasBox, tarjetas ): tarjetas.innerHTML = '<h2> Not available </h2>'
    
    // const filtradoDoble = filtrarPorTexto(categoriasFiltradasBox,)
    
    // filtrarPorTexto(arrayEventoNombre,name)
    // imprimirTarjetas( eventosHome, tarjetas )
    // console.log(categoriasFiltradasBox)
 } )
formulario.addEventListener('submit',(e) =>{
        e.preventDefault()
        let eventosFiltrados = filtrarPorTexto(eventosHome,inputBuscar.value)
        if(eventosFiltrados.length !==0)
        {
            // console.log(filtradoDoble)
            imprimirTarjetas(eventosFiltrados,tarjetas)   
            console.log(eventosFiltrados)
        }else{
            tarjetas.innerHTML = `<p> There are no results for your search: "${inputBuscar.value}"</p>`
        }
     })


function filtrarPorTexto(arrayEventoNombre,name){
    let arrayFiltrado = arrayEventoNombre.filter(nombre => nombre.name.toLowerCase().includes(name.toLowerCase()))
    return arrayFiltrado
}