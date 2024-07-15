document.addEventListener('DOMContentLoaded', function () { 
    // Wartet, bis das DOM vollständig geladen ist, bevor der folgende Code ausgeführt wird.
    
    var anzeige = document.getElementById("preiseID"); // Holt das Element für die Preisanzeige
    const eingabefeld2 = document.getElementById("M-m"); // Holt das Eingabefeld für Meter/Minuten
    const eingabefeld1 = document.getElementById("KM-H"); // Holt das Eingabefeld für Kilometer/Stunden
    const button = document.getElementById('Ausrechnen'); // Holt das Berechnungsbutton-Element
    const neustartButton = document.getElementById("neu"); // Holt das Neustartbutton-Element
    const einheitauswahl = document.getElementById("Auswahl"); // Holt das Auswahlmenü-Element für die Einheit
    var gesamtpreisfunktion; // Variable für die Gesamtkostenberechnung
    var multiplikator; // Variable für den Multiplikator (zur Umrechnung von Einheiten)
    var preis; // Variable für den Preis pro Einheit

    function preisSetzung(auswahl){
        // Setzt den Preis und Multiplikator basierend auf der Auswahl
        if (auswahl == 1) {
            preis = 0.001;
            multiplikator = 1000;
        }
        else if (auswahl == 2) {
            preis = 0.50;
            multiplikator = 60;
        }
        return [preis, multiplikator]; // Gibt den Preis und Multiplikator als Array zurück
    }

    function preisBerechnen(preis, multiplikator, rabatt) {
        // Berechnet den Gesamtpreis unter Berücksichtigung des Rabatts
        var kmH = parseInt(document.getElementById("KM-H").value, 10); // Holt und konvertiert den Wert von Kilometer/Stunden
        var mM = parseInt(document.getElementById("M-m").value, 10); // Holt und konvertiert den Wert von Meter/Minuten
        console.log(mM, kmH); // Debugging: Loggt die Werte in die Konsole

        if (Number.isNaN(mM) && Number.isNaN(kmH)){
            // Zeigt eine Fehlermeldung an, wenn beide Werte nicht eingegeben wurden
            alert("Bitte gebe mindestes einen Wert ein!");
            location.reload(); // Lädt die Seite neu
        }
        else if (Number.isNaN(mM)) {
            // Setzt mM auf 0, wenn kein Wert eingegeben wurde
            mM = 0;
        }
        else if (Number.isNaN(kmH)) {
            // Setzt kmH auf 0, wenn kein Wert eingegeben wurde
            kmH = 0;
        }

        const anfangspreis = (kmH * multiplikator + mM) * preis; // Berechnet den Anfangspreis
        const rabattpreis = anfangspreis / 100 * rabatt; // Berechnet den Rabattpreis
        const gesamtpreis = anfangspreis - rabattpreis; // Berechnet den Gesamtpreis nach Rabatt
        return [gesamtpreis, anfangspreis, rabattpreis]; // Gibt die Preise als Array zurück
    }

    function rabattPrüfen() {
        // Überprüft und setzt den Rabatt basierend auf dem eingegebenen Rabattcode
        var rabattProzent;
        const rabattCode = document.getElementById("rabatt").value; // Holt den Rabattcode

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
                rabattProzent = 0; // Kein Rabatt
                break;
            default:
                alert('Gib ein gültigen Rabatt Code ein!') // Zeigt eine Fehlermeldung an, wenn der Rabattcode ungültig ist
                break;
        }
        return rabattProzent; // Gibt den Rabattprozentsatz zurück
    }

    function ErgebnissAnzeigen(gesamtpreis, anfangspreis, rabattpreis) {
        // Zeigt die Ergebnisse der Berechnung auf der Webseite an
        const feldAnfangsPreis = document.getElementById("preis"); // Holt das Element für den Anfangspreis
        const rabattName = document.getElementById("Rabatt-name"); // Holt das Element für den Rabattcode
        const rabattDifferenz = document.getElementById("rabatt-summe"); // Holt das Element für den Rabattbetrag
        const endPreis = document.getElementById("Summe"); // Holt das Element für den Endpreis

        feldAnfangsPreis.innerHTML = "Anfangspreis: " + anfangspreis.toFixed(2) + " €"; // Setzt den Anfangspreis
        rabattName.innerHTML = "Rabattcode: " + document.getElementById("rabatt").value; // Setzt den Rabattcode
        rabattDifferenz.innerHTML = "Rabattpreis: -" + rabattpreis.toFixed(2) + " €"; // Setzt den Rabattbetrag
        endPreis.innerHTML = "Endpreis: " + gesamtpreis.toFixed(2) + " €"; // Setzt den Endpreis
    }

    button.addEventListener('click', function () {
        // Event-Listener für den Berechnungsbutton
        const auswahl = document.getElementById("Auswahl").value; // Holt die Auswahl
        console.log(auswahl); // Debugging: Loggt die Auswahl in die Konsole
        var rabatt = rabattPrüfen(); // Überprüft den Rabatt

        if (rabatt != undefined) {
            // Überprüft, ob ein gültiger Rabattcode eingegeben wurde
            if (auswahl == 0){
                // Zeigt eine Fehlermeldung an, wenn keine Berechnungsart ausgewählt wurde
                alert("Bitte wähle eine Berechnungsart aus!");
                return; // Beendet das Programm
            }
            else {
                // Setzt den Preis und Multiplikator und berechnet den Gesamtpreis
                preisUndMultiplikator = preisSetzung(auswahl);
                gesamtpreisfunktion = preisBerechnen(preisUndMultiplikator[0], preisUndMultiplikator[1], rabatt);
                ErgebnissAnzeigen(gesamtpreisfunktion[0], gesamtpreisfunktion[1], gesamtpreisfunktion[2]); // Zeigt das Ergebnis an
            }
        }
        else { 
            // Bricht das Programm ab, wenn der Rabattcode falsch ist
            return;
        }

        // Zeigt die Preisanzeige an
        anzeige.classList.remove('versteckt');
        anzeige.classList.add('preise');
    });

    neustartButton.addEventListener('click', function () { 
        // Event-Listener für den Neustartbutton - lädt die Seite neu
        window.location.reload();
    });

    einheitauswahl.addEventListener("click", function() {
        // Event-Listener für die Einheitauswahl
        const aus = document.getElementById("Auswahl").value; // Holt die Auswahl
        const einzelpreis = document.getElementById("preisAnzeige"); // Holt das Element für die Preisanzeige
        var einheitausgabe; // Variable für die Einheitsanzeige
        console.log(aus); // Debugging: Loggt die Auswahl in die Konsole

        if (aus == 2) {
            // Ändert die Platzhalter und Einheitenanzeige basierend auf der Auswahl
            eingabefeld1.placeholder = 'Stunden';
            eingabefeld2.placeholder = 'Minuten';
            einheitausgabe = "/min.";
        }
        else {
            eingabefeld1.placeholder = 'Kilometer';
            eingabefeld2.placeholder = 'Meter';
            einheitausgabe = "/meter";
        }
        preisAnzeige = preisSetzung(aus); // Setzt den Preis basierend auf der Auswahl
        einzelpreis.innerHTML = "Preis: " + preisAnzeige[0] + "€" + einheitausgabe; // Zeigt den Preis pro Einheit an
    });
});
