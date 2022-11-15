
const tarjetas = document.getElementById("tarjetas")
const categoriasDiv = document.getElementById("categoriasData")
const inputBuscar = document.getElementById('buscar')
const checkFiltroDoble = document.getElementById('flexCheckDefault')
let eventosHome;
let categorias;
let categoriasFiltradas;
let categoriasBoxs;
let categoriaNoRepetidas;
let arrayCategoriaNoRepetidas;
const formulario = document.getElementById('form')
let url = "https://amazing-events.herokuapp.com/api/events"

traerDatos(url)

function traerDatos (url){
    fetch (url)
        .then(response => response.json())
            .then(data => {
                eventosHome = data.events
                categorias = eventosHome
                const fn = ( categoria ) => categoria.category
                categoriasFiltradas = categorias.filter(fn)
                categoriasBoxs = categoriasFiltradas.map(fn)
                categoriaNoRepetidas = new Set(categoriasBoxs)
                arrayCategoriaNoRepetidas = Array.from(categoriaNoRepetidas)
                imprimirTarjetas(eventosHome,tarjetas)
                crearCheckBoxs(arrayCategoriaNoRepetidas,categoriasDiv)

                console.log(eventosHome)
            })      
            .catch(error => console.error(error.message))
}


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
            <small class="text-muted">Price: $<span class="numeros">${eventos.price}</span></small>
            <small class="text-muted">${eventos.date}</small>
                <div class="btn-group">
                <a href="./assets/pages/details.html?id=${eventos._id}"><button type="button" class="btn btn-sm btn-outline-secondary text-white">View more</button></a>
                </div>
            </div>
        </div>
    </div>`
            return div
    }
    
function imprimirTarjetas(eventos,contenedor){ //Imprime las cards en el main
        contenedor.innerHTML = ''
        let fragment = document.createDocumentFragment()
        eventos.forEach( evento => fragment.appendChild(crearEventos(evento)))
        contenedor.appendChild(fragment)
    }

function crearCheckBoxs(values, contenedor){ //Crea e imprime los checkbox en el banner
    let template = ''
    values.forEach( value => template  += `<div> <input class="form-check-input" type="checkbox" value="${value}" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">${value}
    </label></div>`)
    contenedor.innerHTML = template
    console.log(values)
}

function filtrarCategorias(categoria,categoriaSeleccionadas){ //recibe la o las categorias seleccionadas y devuelve sus nombres
   let fn = arrayCategoriaNoRepetidas => categoriaSeleccionadas.includes(arrayCategoriaNoRepetidas.category) || categoriaSeleccionadas.length == 0
   let filtrados = categoria.filter( fn )
   return filtrados
}
function filtrarPorTexto(arrayEventoNombre,name){
    let arrayFiltrado = arrayEventoNombre.filter(nombre => nombre.name.toLowerCase().includes(name.toLowerCase()))
    return arrayFiltrado
}

categoriasDiv.addEventListener( 'change', (e) => { // Listener de los checkboxs
    const checked = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map( input => input.value )
    const categoriasFiltradasBox = filtrarCategorias( categoriasFiltradas, checked )
    const filtradoDoble = filtrarPorTexto(categoriasFiltradasBox, inputBuscar.value)
    if (filtradoDoble.length !==0){
        imprimirTarjetas(filtradoDoble, tarjetas)
    }else{
        tarjetas.innerHTML = `<p> There are no matches in your search, try an other filter"</p>`
    }
    } )


formulario.addEventListener('submit',(e) =>{ //Listener del formulario, boton buscar
        e.preventDefault()
        const checked = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map( input => input.value )
        const categoriasFiltradasBox = filtrarCategorias(eventosHome, checked )
        const filtradoDoble = filtrarPorTexto(categoriasFiltradasBox, inputBuscar.value)
    if(filtradoDoble.length !==0)
        {
            imprimirTarjetas(filtradoDoble,tarjetas)
        }else{
            tarjetas.innerHTML = `<p> There are no matches in your search: "${inputBuscar.value}"</p>`
            }
     })

inputBuscar.addEventListener('input', (e)=>{
    if(inputBuscar.value == '') {
        const checked = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map( input => input.value )
        const categoriasFiltradasBox = filtrarCategorias( categoriasFiltradas, checked )
        imprimirTarjetas(categoriasFiltradasBox ,tarjetas)
    }
}
)
