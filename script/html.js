const res = await fetch('./house.json')
const json = Array.from(await res.json())



//checkbox

let jsonTabla = json

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
            jsonTabla = json.filter(x => x.party === "R" || x.party === "D")
            genera_tabla()
        }
        else if (parties.ID.checked) {
            jsonTabla = json.filter(x => x.party === "R" || x.party === "I")
            genera_tabla()
        }
        else if (parties.D.checked && parties.ID.checked) {
            jsonTabla = json
            genera_tabla()
        }

        else {
            jsonTabla = json.filter(x => x.party === "R")
            console.log("solo R")
            genera_tabla()
        }
    }
    else {
        jsonTabla = json
        genera_tabla()
    }
});


parties.D.addEventListener('click', function () {
    if (parties.D.checked) {
        if (parties.R.checked) {
            jsonTabla = json.filter(x => x.party === "R" || x.party === "D")
            genera_tabla()
        }
        else if (parties.ID.checked) {
            jsonTabla = json.filter(x => x.party === "D" || x.party === "I")
            genera_tabla()
        }
        else if (parties.R.checked && parties.ID.checked) {
            jsonTabla = json
            genera_tabla()
        }

        else {
            jsonTabla = json.filter(x => x.party === "D")
            genera_tabla()
        }
    }
    else {
        jsonTabla = json
        genera_tabla()
    }
});

parties.ID.addEventListener('click', function () {
    if (parties.ID.checked) {
        if (parties.R.checked) {
            jsonTabla = json.filter(x => x.party === "R" || x.party === "I")
            genera_tabla()
        }
        else if (parties.D.checked) {
            jsonTabla = json.filter(x => x.party === "D" || x.party === "I")
            genera_tabla()
        }
        else if (parties.R.checked && parties.D.checked) {
            jsonTabla = json
            genera_tabla()
        }

        else {
            jsonTabla = json.filter(x => x.party === "I")
            genera_tabla()
        }
    }
    else {
        jsonTabla = json
        genera_tabla()
    }
});




//TABLA
let cabeceraItems = ["Name", "Party", "State", "Seniority", "Votes with Party"]
let senatorItems = ["first_name", "party", "state", "seniority", "votes_with_party_pct"]

//console.log({ first_name, party, state, seniority, votes_with_party_pct })

function genera_tabla() {

    const borrar = document.querySelector("#tabla")
    borrar.innerHTML = " "

    // Obtener la referencia del elemento body
    const body = document.getElementsByTagName("tabla")[0];

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
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

genera_tabla()