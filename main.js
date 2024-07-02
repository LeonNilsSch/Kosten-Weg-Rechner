function preisBerechnungStrecke(){
    const PreisStrecke= 0.10 //pro m
    const KM = parseInt(document.getElementById("KM-H").value, 10);
    const M= parseInt(document.getElementById("M-m").value,10);
    const StreckenPreis = (KM*1000 + M)*PreisStrecke;
    console.log(StreckenPreis);
}

function preisBerechnungZeit(){
    const PreisZeit = 0.20 //pro Minute
    const H = parseInt(document.getElementById("KM-H").value, 10);
    const Min= parseInt(document.getElementById("M-m").value,10);
    const ZeitPreis = (H*60 + Min)*PreisZeit;
    console.log(ZeitPreis);
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('Ausrechnen');
    const Einheitauswahl = document.getElementById("Auswahl");
    const Eingabefeld1=document.getElementById("KM-H")
    const Eingabefeld2=document.getElementById("M-m")
    
    button.addEventListener('click', function() {
        const Aus = document.getElementById("Auswahl").value;
        if (Aus==1){
            preisBerechnungStrecke();
        }
        else{
            preisBerechnungZeit();
        }
        
    });

    Einheitauswahl.addEventListener("click", function() {
        const Aus = document.getElementById("Auswahl").value;
        console.log(Aus);
        if (Aus ==2){
            Eingabefeld1.placeholder = 'Stunden';
            Eingabefeld2.placeholder = 'Minuten';
        }
        else{
            Eingabefeld1.placeholder = 'Kilometer';
            Eingabefeld2.placeholder = 'Meter'; 
        }
    });
   
});



    

