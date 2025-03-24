//Användarvariabler
var name;


//Användarprompts
name = prompt("Vad heter du?");

alert('"Hej " + name + " och välkommen till ubåten Atlantis2."');
alert('"Du har blivit hitkallad på ett väldigt enkelt uppdrag."');
alert('"Ta dig ner till havsbottnen, hitta den magiska röda stenen, och återvända upp till ytan med den."');

//Gör det till en funktion för att kunna använda setTimeout.
function mission(){
  if (confirm('"Är du redo att ta dig an detta uppdrag?"\nOm ja tryck OK, om nej tryck Avbryt"') == false) {
    alert('"Okej, då frågar jag snart igen."');
    setTimeout(mission, 5000);
  }
}
mission();

alert('"Toppen. Då påbörjar vi vår färd ner i det blå."');
alert('Båten börjar rusa ner i havet.');

if comfirm()
