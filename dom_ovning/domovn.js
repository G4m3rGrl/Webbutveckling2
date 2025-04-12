//Varje deluppgift läggs i varsin funktion.

function uppgift1() {
  //Hämtar alla p-element och lägger i en array
  var pList = document.getElementsByTagName("p");

  //Sätter klassnamn för alla element i listan.
  for (i in pList) {
    pList[i].className = "bodyCopy";
  }
}

function uppgift2() {
  //Väljer först ut alla footer-element och väljer sedan det första då det
  //returnerar en array, trots att det bara finns en. Sedan görs det samma
  //för p-elementet, och dess className sätts till "footerp".
  var footerP = document.getElementsByTagName("footer")[0]
    .getElementsByTagName("p")[0].className = "footerp";
}

function uppgift3() {
  //Hämtar alla object med className "navigation" och lägger i en array
  var navList = document.getElementsByClassName("navigation");

  //Itererar navList och ändrar dess innerHTML till denna sträng som ser olika
  //ut beroende på vilket objekt. För t.ex li-elementet med värde HTML kommer
  //innerHTML se ut som <a href='#HTML'>HTML</a>
  for (i in navList) {
    navList[i].innerHTML = "<a href='#" + navList[i].innerHTML + "'>" +
      navList[i].innerHTML + "</a>";
  }
}

function uppgift4() {
  //Väljer ut elementet med id "lista2"s parent och sätter dess
  //style.backgroundColor till "#cfd8dc".
  document.getElementById("lista2").parentNode.style.backgroundColor =
    "#cfd8dc";
}

function uppgift5() {
  //Hämtar alla li objekt med id "lista1" och lägger de i en array.
  var lista1 = document.getElementById("lista1").getElementsByTagName("li");

  //Itererar arrayen lista1 i ordning. Kollar sedan om i är jämt. Om i är jämt
  //betyder det att lista[i] ärr udda iom att li-objekten börjar räkna vid 1
  //men arrayen börjar räkna vid 0. Om i är jämnt, alltså om li-objektet är udda
  //sätts dess style.color till "red".
  for (let i = 0; i < lista1.length; i++) {
    if (i % 2 == 0) {
      lista1[i].style.color = "red";
    }
  }
}

//Här kör alla olika funktioner. De går att testa en i taget.
uppgift1();
uppgift2();
uppgift3();
uppgift4();
uppgift5();
