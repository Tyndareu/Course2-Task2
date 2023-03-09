//SENATORS JSON
const senators = await fetch('./house.json')
const jsonSenators = Array.from(await senators.json())

//STATES JSON

//SENATORS JSON
const states = await fetch('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json')
const jsonStates = await states.json()


//checkbox

let jsonTabla = jsonSenators




let checkboxes = Array.from(document.getElementsByClassName("party"))
let checkBox = []
checkboxes.forEach(element => {
    element.addEventListener('change', function (event) {
        if (element.checked) {
            checkBox.push(element.value)
        }
        if (!element.checked) {
            checkBox = checkBox.filter(x => x != element.value)
        }
        checkBox.sort()
        let key = checkBox.length
        switch (key) {
            case 2:
                let push = []
                checkBox.forEach(element => {
                    push.push(Array.from(jsonSenators.filter(x => x.party === element)))
                });
                jsonTabla = push[0].concat(push[1])
                genera_tabla()
                break;
            case 1:
                jsonTabla = jsonSenators.filter(x => x.party === checkBox.toString())
                genera_tabla()
                break;
            default:
                jsonTabla = jsonSenators
                genera_tabla()
                break;
        }
    })
})


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
            } else {
                borra_deplegable()
                contador = 1
            }
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
    let states;
    for (const prop in jsonStates) {
        let button = document.createElement("input");
        button.type = 'button';
        //button.id = 'submit';
        button.value = jsonStates[prop];
        button.className = prop

        const p = document.createElement("a");
        states = jsonStates[prop]

        p.appendChild(document.createTextNode(states));
        document.querySelector("#dropdown").appendChild(button).appendChild(p);
    }
}

function borra_deplegable() {
    const borrarDesplegable = document.querySelector("#dropdown")
    borrarDesplegable.innerHTML = " "
}