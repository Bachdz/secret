function copy(obj) {
    navigator.clipboard.writeText(obj).then(function() {
        alert('Link zum Dokument kopiert!');
    }, function(err) {
        console.error('Kopiert-Error: ', err);
    })
}



const words = ["Cockpit",
    "Abgasanlage",
    "Abschlussphase",
    "Absicherungsmanagement",
    "Aerodynamik",
    "Aggregate-Elektrik",
    "Akustik",
    "Anbahnungsphase",
    "Anbauteile",
    "Ansaugung",
    "Arbeitsvorbereitung",
    "Audi AG",
    "Aufbau ZP5",
    "Ausführungsphase",
    "Automobili Lamborghini S.p.A.",
    "Automotive & Industrial",
    "Bahnplanung ",
    "BASF Catalyst Germany GmbH",
    "Bentley Motors Limited",
    "Beschaffung",
    "Betriebsfestigkeit",
    "BMW  Motoren GmbH",
    "BMW AG",
    "BMW M GmbH",
    "Body & Safety Engineering",
    "Bordnetze",
    "Bremssystem",
    "Bugatti Engineering GmbH",
    "CADEA GmbH",
    "CLAAS E-Systems KGaA mbH & Co KG",
    "CLAAS Selbstfahrende",
    "Claas Tractor SAS",
    "Cockpit Electronics",
    "Conti Temic microelectronic GmbH",
    "Continental Automotive GmbH",
    "Continental Reifen Deutschland GmbH",
    "Dachsysteme Schließsysteme",
    "Daimler AG",
    "Dauererprobung",
    "Design",
    "Diesel Motor",
    "Digitale Karte",
    "DMU",
    "Dr. Ing. h.c. F. Porsche AG",
    "Driving Manager",
    "E/E-Architektur",
    "E-Antrieb",
    "EMV",
    "Energie und HV-System",
    "Energiemanamgement",
    "ETAS GmbH",
    "European Commission",
    "Fahrleistungen und Verbrauch",
    "Fahrtenkoordination",
    "Fahrwerk hinten",
    "Fahrwerk vorne",
    "Fahrzeugsicherheit",
    "FuSi",
    "Geometrische und virtuelle Absicherung",
    "GETRAG B.V. & Co. KG",
    "Gewichtsmanagement",
    "GKN Driveline International GmbH",
    "Hitachi Automotive Systems",
    "Honda R&D Co.", "Ltd.",
    "HW-/SW-Entwicklung",
    "Hyundai Motor Company Headquarter",
    "IAV Automotive Engineering",
    "IAV Automotive Engineering Inc.",
    "IAV Co.", "Ltd.",
    "IAV Fahrzeugsicherheit",
    "IAV S.A.S.U.",
    "IAV U.K. Ltd.",
    "Infotainment",
    "Innenverkleidungen",
    "Instrumentierung",
    "ISUZU Motors Limited",
    "Klappen",
    "Klappern",
    "Klimatisierung",
    "KOCH Consulting + Export",
    "Kollisionsvermeidung",
    "Komfortsysteme",
    "Konzeptentwicklung",
    "Kraftstoff",
    "Kraftstoffanlage",
    "Kühlung",
    "KU-Montageträger",
    "Lenksystem",
    "LG Electronics Deutschland GmbH",
    "Licht und Sicht",
    "Liebherr Machines Bulle S.A.",
    "Lieferanten",
    "Logistik",
    "Lokalisierung",
    "MAN Truck & Bus AG",
    "MAN Truck & Bus Österreich GesmbH",
    "manuelles Fahren",
    "Mercedes-AMG GmbH",
    "Mianyang Xinchen Engine Co.", "Ltd.",
    "Mitsubishi Motors Corporation",
    "Montage ZP8",
    "Motor",
    "NIRA Dynamics AB",
    "NISSAN Motor Co.", "Ltd.",
    "Oberflächen und Korrosionsschutz",
    "Otto Motor",
    "Physische Gesamtfahrzeugabsicherung",
    "Powertrain & Power Engineering",
    "Powertrain Mechatronics",
    "Powertrain Systems Development",
    "Preh Car Connect GmbH",
    "Problemmanagemement",
    "Produktionsplanung",
    "Produktmanagement",
    "Projektleitung",
    "Projektträger Jülich",
    "PSA Automobiles S.A.",
    "Qualitätssicherung",
    "Regelung",
    "Robert Bosch GmbH",
    "Rohbau",
    "Sächsisches Staatsministerium für",
    "SAIC Volkswagen",
    "Scania CV AB (publ)",
    "Schaeffler Technologies AG & Co. KG",
    "SEAT", "S.A.",
    "Sitze",
    "ŠKODA AUTO a.s.",
    "Software- und Funktionsentwicklung",
    "SOTIF",
    "Startpase",
    "Stoßfänger",
    "Strak",
    "Subaru Corporation",
    "Systemverifikation und -validierung",
    "Tata Motors Limited",
    "Telematics",
    "Tenneco GmbH",
    "Toyota Motor Corporation",
    "Türen",
    "Türverkleidungen",
    "Typbegleitung",
    "Typprüfung",
    "Umfeldwahrnehmung",
    "Valeo Schalter und Sensoren GmbH",
    "VDI/VDE Innovation + Technik GmbH",
    "Vehicle Dynamics",
    "Vehicle Integrated Functions",
    "Vernetzung",
    "Versuchsträgermanagement",
    "Virtuelle Absicherung",
    "Volkswagen AG",
    "Volkswagen do Brasil Indústria",
    "Volkswagen Osnabrück GmbH",
    "Volkswagen Sachsen GmbH",
    "Volvo Personvagnar Aktiebolag",
    "WABCO GmbH",
    "Werkstatt",
    "Wettbewerbsanalyse",
    "Yanmar Co.", "Ltd.",
    "ZF Friedrichshafen AG",
    "Zonenmanagement",
    "ZP3/ ZP7 Getriebe",
    "ZP8"
];


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        let count =0;
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if ((arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) && (count <8)) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                b.setAttribute("class", "item");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
                count++;
            }
        }

    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function submitSearch() {
    const x = document.getElementById("fill");
    x.parentNode.submit();
}


// Get the button that opens the modal
//let image = document.getElementsByClassName("img3");

// Get the <span> element that closes the modal
//let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function displayModal() {
    // Get the modal
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
function showCard() {
    var a = document.getElementsByClassName("rectangle");
    var b= document.getElementsByClassName("avatar-1");
    var c=document.getElementsByClassName("big-row-contact");
    for (var i = 0; i < a.length; i++) {
        a[i].style.display = "inline-block";
    }
    for (var i = 0; i < b.length; i++) {
        b[i].style.display = "none";
    }
    for (var i = 0; i < c.length; i++) {
        c[i].style.paddingBottom="25px";
    }

}

function closeCard() {
    var a = document.getElementsByClassName("rectangle");
    var b= document.getElementsByClassName("avatar-1");
    var c=document.getElementsByClassName("big-row-contact");
    for (var i = 0; i < a.length; i++) {
        a[i].style.display = "none";
    }
    for (var i = 0; i < b.length; i++) {
        b[i].style.display = "block";
    }
    for (var i = 0; i < c.length; i++) {
        c[i].style.paddingBottom="0";
    }
    for (var i = 0; i < c.length; i++) {
        c[i].style.paddingBottom="10px";
    }
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


window.onload =function () {    
    autocomplete(document.getElementById("myInput"), words);
    // When the user clicks anywhere outside of the modal, close it
};