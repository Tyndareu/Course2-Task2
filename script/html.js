//SENATORS JSON
const senators = await fetch("./house.json");
const jsonSenators = Array.from(await senators.json());


//STATES JSON
const states = await fetch(
    "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json"
);
const jsonStates = await states.json();

//checkbox

let jsonTabla = jsonSenators;

let checkboxes = Array.from(document.getElementsByClassName("party"));
let checkBox = [];
checkboxes.forEach((element) => {
    element.addEventListener("change", function (event) {
        if (element.checked) {
            checkBox.push(element.value);
        }
        if (!element.checked) {
            checkBox = checkBox.filter((x) => x != element.value);
        }
        let key = checkBox.length;
        switch (key) {
            case 2:
                let push = [];
                checkBox.forEach((element) => {
                    push.push(
                        Array.from(jsonSenators.filter((x) => x.party === element))
                    );
                });
                jsonTabla = push[1].concat(push[0]);
                generate_table();
                break;
            case 1:
                jsonTabla = jsonSenators.filter((x) => x.party === checkBox.toString());
                generate_table();
                break;
            default:
                jsonTabla = jsonSenators;
                generate_table();
                break;
        }
    });
});

//DESPLEGABLE

// Close all dropdown lists if the user clicks outside of it

let counter = 1;
window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropdown-btn")) {
        delete_dropdown();
        Array.from(document.querySelectorAll(".dropdown")).forEach((elt) => {
            elt.classList.remove("show");
            counter = 1;
        });
    }
});

// set all dropdown buttons to open their associated dropdown list on click
Array.from(document.querySelectorAll(".dropdown-btn")).forEach((btn) => {
    const dropdown = btn.closest(".dropdown");

    if (dropdown) {
        btn.addEventListener("click", (evt) => {
            evt.preventDefault();
            dropdown.classList.toggle("show");
            counter++;
            if (counter % 2 === 0) {
                generate_dropdown();
            } else {
                delete_dropdown();
                counter = 1;
            }
        });
    }
});

//TABLA
let cabeceraItems = [
    "Name",
    "Party",
    "State",
    "Seniority",
    "Votes with Party"
];
let senatorItems = [
    "first_name",
    "party",
    "state",
    "seniority",
    "votes_with_party_pct",
];

function generate_table() {
    const deleteTable = document.querySelector("#tabla");
    deleteTable.innerHTML = " ";

    // Crea un elemento <table> y un elemento <tbody>
    const tabla = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // Header
    const rowHeader = document.createElement("tr");
    rowHeader.className = "table-header";

    senatorItems.forEach((element) => {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(element);

        cell.appendChild(cellText);
        rowHeader.appendChild(cell);
        // agrega la row al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(rowHeader);
    });
    // Header End

    // Create cells
    jsonTabla.forEach((element) => {
        // Crea las rows de la tabla
        const row = document.createElement("tr");
        row.className = "table-row";

        senatorItems.forEach((element2) => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(element[element2]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        });

        // agrega la row al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(row);
    });

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    document.querySelector("#tabla").appendChild(tabla);
}

generate_table();

//DESPLEGABLE

function generate_dropdown() {
    delete_dropdown();
    let states;
    for (const prop in jsonStates) {
        let button = document.createElement("input");
        button.type = "button";
        //button.id = 'submit'
        button.value = jsonStates[prop];
        button.className = prop;

        let a = document.createElement("a");
        states = jsonStates[prop];

        a.appendChild(document.createTextNode(states));
        document.querySelector("#dropdown").appendChild(button).appendChild(a);
    }
}

function delete_dropdown() {
    const borrarDesplegable = document.querySelector("#dropdown");
    borrarDesplegable.innerHTML = " ";
}
