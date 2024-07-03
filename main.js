function Preisberechnen(Preis,multiplikator,rabatt){
    const KMH = parseInt(document.getElementById("KM-H").value, 10);
    const Mm= parseInt(document.getElementById("M-m").value,10);
    const Gesamtpreis = ((KMH*multiplikator + Mm)*Preis)* rabatt;
    console.log(Gesamtpreis);
    return Gesamtpreis;
}

function rabattPrüfen(){
    var rabattProzent;
    const rabattCode=document.getElementById("rabatt").value;
    switch (rabattCode){
        case "Tec5":
            rabattProzent = 0.95; //5% Rabatt 
            break;
        case "Tec15":
            rabattProzent = 0.75; // 15% Rabatt
            break;
        case "TecFirstTry":
            rabattProzent = 0.50; //50% Rabatt
            break;
        default:
            rabattProzent = 0.0; 
    }
    console.log(rabattProzent);
    return rabattProzent;
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('Ausrechnen');
    const Einheitauswahl = document.getElementById("Auswahl");
    const Eingabefeld1 = document.getElementById("KM-H")
    const Eingabefeld2 = document.getElementById("M-m")
    var Preis;
    var multiplikator;
    
    button.addEventListener('click', function() {
        const Aus = document.getElementById("Auswahl").value;
        var rabatt = rabattPrüfen();
        if (Aus == 1){
            Preis = 0.10;
            multiplikator = 1000;
            Preisberechnen(Preis,multiplikator,rabatt);

        }
        else if(Aus == 2){
            Preis = 0.20;
            multiplikator = 60;
            Preisberechnen(Preis,multiplikator,rabatt);
        }
        else{
            alert("Bitte wähle eine Berechnungsart aus!!!!!");
        }
    });

    Einheitauswahl.addEventListener("click", function() {
        const Aus = document.getElementById("Auswahl").value;
        console.log(Aus);
        if (Aus == 2){
            Eingabefeld1.placeholder = 'Stunden';
            Eingabefeld2.placeholder = 'Minuten';
        }
        else{
            Eingabefeld1.placeholder = 'Kilometer';
            Eingabefeld2.placeholder = 'Meter'; 
        }
    });
   
});