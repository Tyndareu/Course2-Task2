//SENATORS JSON
const senators = await fetch('./house.json')
const jsonSenators = Array.from(await senators.json())

//STATES JSON

//SENATORS JSON
const states = await fetch('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json')
const jsonStates = await states.json()


//checkbox

let jsonTabla = jsonSenators

let parties = {
    D: 'democrata',
    R: 'Republican',
    ID: 'Independent'
}



parties.R = document.getElementById('R');
parties.D = document.getElementById('D');
parties.ID = document.getElementById('I');


parties.R.addEventListener('click', function () {
    if (parties.R.checked) {
        if (parties.D.checked) {
            jsonTabla = jsonSenators.filter(x => x.party === "R" || x.party === "D")
            genera_tabla()
        }
        else if (parties.ID.checked) {
            jsonTabla = jsonSenators.filter(x => x.party === "R" || x.party === "I")
            genera_tabla()
        }
        else if (parties.D.checked && parties.ID.checked) {
            jsonTabla = jsonSenators
            genera_tabla()
        }

        else {
            jsonTabla = jsonSenators.filter(x => x.party === "R")
            genera_tabla()
        }
    }
    else {
        jsonTabla = jsonSenators
        genera_tabla()
    }
});


parties.D.addEventListener('click', function () {
    if (parties.D.checked) {
        if (parties.R.checked) {
            jsonTabla = jsonSenators.filter(x => x.party === "R" || x.party === "D")
            genera_tabla()
        }
        else if (parties.ID.checked) {
            jsonTabla = jsonSenators.filter(x => x.party === "D" || x.party === "I")
            genera_tabla()
        }
        else if (parties.R.checked && parties.ID.checked) {
            jsonTabla = jsonSenators
            genera_tabla()
        }

        else {
            jsonTabla = jsonSenators.filter(x => x.party === "D")
            genera_tabla()
        }
    }
    else {
        jsonTabla = jsonSenators
        genera_tabla()
    }
});

parties.ID.addEventListener('click', function () {
    if (parties.ID.checked) {
        if (parties.R.checked) {
            jsonTabla = jsonSenators.filter(x => x.party === "R" || x.party === "I")
            genera_tabla()
        }
        else if (parties.D.checked) {
            jsonTabla = jsonSenators.filter(x => x.party === "D" || x.party === "I")
            genera_tabla()
        }
        else if (parties.R.checked && parties.D.checked) {
            jsonTabla = jsonSenators
            genera_tabla()
        }

        else {
            jsonTabla = jsonSenators.filter(x => x.party === "I")
            genera_tabla()
        }
    }
    else {
        jsonTabla = jsonSenators
        genera_tabla()
    }
});

//DESPLEGABLE

// Close all dropdown lists if the user clicks outside of it

let contador = 1
window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropdown-btn')) {
        borra_deplegable()
        Array.from(document.querySelectorAll('.dropdown')).forEach((elt) => {
            elt.classList.remove('show');
            contador = 1
        })
    }
});

// set all dropdown buttons to open their associated dropdown list on click
Array.from(document.querySelectorAll('.dropdown-btn')).forEach((btn) => {
    const dropdown = btn.closest('.dropdown');

    if (dropdown) {
        btn.addEventListener('click', (evt) => {
            evt.preventDefault()
            dropdown.classList.toggle('show')
            contador++
            if (contador % 2 === 0) {
                genera_desplegable()
            } else { borra_deplegable() 
            contador = 1}
        })
    }
});


//TABLA
let cabeceraItems = ["Name", "Party", "State", "Seniority", "Votes with Party"]
let senatorItems = ["first_name", "party", "state", "seniority", "votes_with_party_pct"]


function genera_tabla() {

    const borrarTabla = document.querySelector("#tabla")
    borrarTabla.innerHTML = " "

    // Crea un elemento <table> y un elemento <tbody>
    const tabla = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // Cabecera
    const cabeceraHilera = document.createElement("tr");
    cabeceraHilera.className = "table-header"

    for (let j = 0; j < senatorItems.length; j++) {

        const celda = document.createElement("td");
        const textoCelda = document.createTextNode(cabeceraItems[j])

        celda.appendChild(textoCelda);
        cabeceraHilera.appendChild(celda);
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(cabeceraHilera);
    }
    // Cabecera FIN

    // Crea las celdas
    for (let i = 0; i < jsonTabla.length; i++) {
        // Crea las hileras de la tabla
        const hilera = document.createElement("tr");
        hilera.className = "table-row"


        for (let j = 0; j < senatorItems.length; j++) {

            const celda = document.createElement("td");
            const textoCelda = document.createTextNode(jsonTabla[i][senatorItems[j]])

            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    document.querySelector("#tabla").appendChild(tabla);
}

genera_tabla()


//DESPLEGABLE


function genera_desplegable() {
    borra_deplegable()
    let stados;
    for (const prop in jsonStates) {
        let li = document.createElement("li");
        li.className = "optionDesplegableStados"
        const p = document.createElement("a");
        stados = jsonStates[prop]

        p.appendChild(document.createTextNode(stados));
        document.querySelector("#dropdown").appendChild(li).appendChild(p);

    }
}

function borra_deplegable() {
    const borrarDesplegable = document.querySelector("#dropdown")
    borrarDesplegable.innerHTML = " "
}