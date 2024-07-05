document.addEventListener('DOMContentLoaded', function () {
    var anzeige = document.getElementById("preiseID");
    const eingabefeld2 = document.getElementById("M-m");
    const eingabefeld1 = document.getElementById("KM-H");
    const button = document.getElementById('Ausrechnen');
    const neustartButton = document.getElementById("neu");
    const einheitauswahl = document.getElementById("Auswahl");
    var gesamtpreisfunktion;
    var multiplikator;
    var preis;

    function preisBerechnen(preis, multiplikator, rabatt) {
        var kmH = parseInt(document.getElementById("KM-H").value, 10);
        var mM = parseInt(document.getElementById("M-m").value, 10);
        if (Number.isNaN(mM)) {
            mM = 0;
        }
        else if (Number.isNaN(kmH)) {
            kmH = 0;
        }

        const anfangspreis = (kmH * multiplikator + mM) * preis;
        const rabattpreis = anfangspreis / 100 * rabatt;
        const gesamtpreis = anfangspreis - rabattpreis;
        return [gesamtpreis, anfangspreis, rabattpreis];
    }

    function rabattPrüfen() {
        var rabattProzent;
        const rabattCode = document.getElementById("rabatt").value;
        switch (rabattCode) {
            case "Tec5":
                rabattProzent = 5; // 5% Rabatt 
                break;
            case "Tec15":
                rabattProzent = 15; // 15% Rabatt
                break;
            case "TecFirstTry":
                rabattProzent = 50; // 50% Rabatt
                break;
            case "":
                rabattProzent = 0;
                break;
            default:
                alert('Gib ein gültigen Rabatt Code ein!')
                break;
        }
        return rabattProzent;
    }

    function ErgebnissAnzeigen(gesamtpreis, anfangspreis, rabattpreis) {
        const feldAnfangsPreis = document.getElementById("preis");
        const rabattName = document.getElementById("Rabatt-name");
        const rabattDiffernez = document.getElementById("rabatt-summe");
        const endPreis = document.getElementById("Summe");

        feldAnfangsPreis.innerHTML = "Anfangspreis: " + anfangspreis + " €";
        rabattName.innerHTML = "Rabattcode: " + document.getElementById("rabatt").value;
        rabattDiffernez.innerHTML = "Rabattpreis: -" + rabattpreis.toFixed(2) + " €";
        endPreis.innerHTML = "Endpreis: " + gesamtpreis.toFixed(2) + " €";
    }



    button.addEventListener('click', function () {
        const Aus = document.getElementById("Auswahl").value;
        var rabatt = rabattPrüfen();
        if (rabatt != undefined) {

            if (Aus == 1) {
                preis = 0.001;
                multiplikator = 1000;
            }
            else if (Aus == 2) {
                preis = 0.50;
                multiplikator = 60;

            }
            else {
                alert("Bitte wähle eine Berechnungsart aus!!!!!");
                return; //beendet das Programm
            }
            gesamtpreisfunktion = preisBerechnen(preis, multiplikator, rabatt);
            ErgebnissAnzeigen(gesamtpreisfunktion[0], gesamtpreisfunktion[1], gesamtpreisfunktion[2]);
        }
        else {
            return;
        }

        anzeige.classList.remove('versteckt');
        anzeige.classList.add('preise');


    });

    neustartButton.addEventListener('click', function () { //reset der Seite, durch Reload.
        window.location.reload();
    });


    einheitauswahl.addEventListener("click", function () {
        const Aus = document.getElementById("Auswahl").value;
        console.log(Aus);
        if (Aus == 2) {
            eingabefeld1.placeholder = 'Stunden';
            eingabefeld2.placeholder = 'Minuten';
        }
        else {
            eingabefeld1.placeholder = 'Kilometer';
            eingabefeld2.placeholder = 'Meter';
        }
    });
});
