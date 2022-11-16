let url = "https://amazing-events.herokuapp.com/api/events"
const mayorPrimero = document.getElementById('mayorPrimero')
const mayorSegundo = document.getElementById('mayorSegundo')
const mayorTercero = document.getElementById('mayorTercero')
const menorPrimero = document.getElementById('menorPrimero')
const menorSegundo = document.getElementById('menorSegundo')
const menorTercero = document.getElementById('menorTercero')
const capacidadPrimero = document.getElementById('capacidadPrimero')
const capacidadSegundo = document.getElementById('capacidadSegundo')
const capacidadTercero = document.getElementById('capacidadTercero')
const MENORAUD = document.getElementById('menorAudiencia')
const CAPALARGO = document.getElementById('capacidadLarga')
let categoriaFiltrada = []
const tableUP = document.getElementById('tableUpcoming')
const tableLast = document.getElementById('tablepasado')



traerDatos(url)

function traerDatos (url){
    fetch (url)
        .then(response => response.json())
            .then(data => {
                eventos = data.events
                pasados =  data.events.filter((element) => (element.date < data.currentDate))
                futuro = data.events.filter((element) => (element.date > data.currentDate))
                eventos.forEach(evento => !categoriaFiltrada.includes(evento.category)? categoriaFiltrada.push(evento.category): "")
                mayorCapacidad(eventos)
                calcularMenorAudiencia(eventos)
                calcularMayorAudiencia(eventos)
                listarTabla(futuro, tableUP) //listaUpcoming
                listarTabla(pasados, tableLast)
                
            })      
            // .catch(error => console.error(error.message))
}

function calcularMayorAudiencia(array){
    let asistencia = []
    array.map(evento => asistencia.push(parseFloat(evento.assistance? evento.assistance : evento.estimate)))
    let mayoresTres = asistencia.sort(function(num1,num2){return num2 - num1;}).slice(0,3)

    const TodoSumado = asistencia.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    })

    for (let i = 0; i < 3 ; i++){
        let nombreEventoAsist = eventos.find(elemento => ((elemento.assistance? elemento.assistance : elemento.estimate) == mayoresTres[i]))
        let Porcentaje = (((nombreEventoAsist.assistance? nombreEventoAsist.assistance : nombreEventoAsist.estimate) * 100) / (TodoSumado)).toFixed(2)

        if (i == 0){
            mayorPrimero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an asistance of ${Porcentaje} %`
        }else if(i == 1){
            mayorSegundo.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an asistance of ${Porcentaje} %`
        }else{
            mayorTercero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an asistance of ${Porcentaje} %`
        }
    }
}

function calcularMenorAudiencia(array){
    let asistencia = []
    array.map(evento => asistencia.push(parseFloat(evento.assistance? evento.assistance : evento.estimate)))
    let mayoresTres = asistencia.sort(function(num1,num2){return num1 - num2;}).slice(0,3)
    // let minimo = Math.min(...asistencia)
    
    const TodoSumado = asistencia.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    })
    
    for (let i = 0; i < 3 ; i++){
        let nombreEventoAsist = eventos.find(elemento => ((elemento.assistance? elemento.assistance : elemento.estimate) == mayoresTres[i]))
        let Porcentaje = (((nombreEventoAsist.assistance? nombreEventoAsist.assistance : nombreEventoAsist.estimate) * 100) / ( TodoSumado )).toFixed(3)
        console.log(mayoresTres)
        console.log(TodoSumado)
        if (i == 0){
            menorTercero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an asistance of ${Porcentaje} %`
        }else if(i == 1){
            menorSegundo.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an asistance of ${Porcentaje} %`
        }else{
            menorPrimero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an asistance of ${Porcentaje} %`
        }
    }
}

function mayorCapacidad(array){
    let capacidad = []
    array.map(evento => capacidad.push(parseFloat(evento.capacity)))
    let mayoresTres = capacidad.sort(function(num1,num2){return num2 - num1;}).slice(0,3)
    // let Ultimatum = Math.max(...capacidad)

    for (let i = 0; i < 3 ; i++){
        let nombreEventoAsist = eventos.find(elemento => ((elemento.capacity) == mayoresTres[i]))
        // let Porcentaje = ((nombreEventoAsist.capacity) / TodoSumado * 100).toFixed(2)
        
        if (i == 0){
            capacidadPrimero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: with a capacity of ${nombreEventoAsist.capacity} people`
        }else if(i == 1){
            capacidadSegundo.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: with a capacity of ${nombreEventoAsist.capacity} people`
        }else{
            capacidadTercero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: with a capacity of ${nombreEventoAsist.capacity} people`
        }
    }

} 

function listarTabla(array, presion){
    catego = []
    array.forEach(item => !catego.includes(item.category)? catego.push(item.category) : "")
    let categoOrdenada = catego.sort()
    console.log(categoOrdenada)
    categoOrdenada.forEach(eventos=>{
        let lista = document.createElement('tr')
        lista.innerHTML = `<td>${eventos}</td>
        <td class="text-start">$ ${revenues(array, eventos).toFixed()}</td>
        <td class="text-start">${attendanceFuturo(array, eventos)}%</td>`
        presion.appendChild(lista)
    })
}

function revenues(array, valor){
    categoria = array.filter(eventos => eventos.category === valor)
    ganancias = categoria.map(categoria => categoria.price * categoria.estimate? categoria.price * categoria.estimate : categoria.price * categoria.assistance)
    totalGanancias = ganancias.reduce(function (previousValue, currentValue){
        return previousValue + currentValue;
    })
    return totalGanancias
}

function attendanceFuturo(array, valor){
    asistencia = array.filter(eventos => eventos.category === valor)
    asistencia2 = asistencia.map(eventos => parseFloat(eventos.estimate? eventos.estimate : eventos.assistance))
    let Ultimatum = Math.max(...asistencia2)
    const TodoSumado = asistencia2.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    })
    let Porcentaje = (Ultimatum / TodoSumado * 100).toFixed(2)
    return Porcentaje
}