function main() {
  //Variabler definieras
  var name;
  var crack;
  var inputStr;
  var inputBool;
  var ending = 0;

  //Funktioner som körs flera gånger definieras.
  function testCrack() {
    if (Math.random() < crack) {
      alert('Sprickan som du inte lagade sprider sig i skrovet tills det spricker. \nGame over!');
      return true;
    } else {return false;}
  }

  //Användarprompts
  name = prompt("Vad heter du?");

  alert('"Hej ' + name + ' och välkommen till ubåten Atlantis2."');
  alert('"Du har blivit hitkallad på ett väldigt enkelt uppdrag."');
  alert('"Ta dig ner till havsbottnen, hitta den magiska röda stenen, och återvänd sedan upp till ytan med den."');
  alert('"Är du redo att ta dig an detta uppdrag?"');
  alert('"Toppen. Då påbörjar vi vår färd ner i det blå."');
  alert('Båten börjar rusa ner i havet.');

  //Om du väljer att försöka laga sprickan är chansen 70% att du lyckas och 30% att du lyckas halvt.
  //Om du ignorerar sprickan så misslyckas du stort.
  //Om du lyckas, försöker men inte lyckas, eller ignorerar sprickan påverkas värdet av variablen 'crack'.
  //Senare vid olika tillfällen körs ett test för om sprickan håller eller inte.
  //Allt ligger i en while-loop för att hantera felaktiga inputs från användaren.
  while(true) {
    inputStr = prompt('Du upptäcker en liten spricka i skrovet på ubåten. \n 1) Försök laga skrovet med ett nöd-lagningskit\n 2) Ignorera sprickan och fortsätt dyka');
    if (inputStr == 1) {
      if (Math.random() > 0.3) {
        alert('Du lyckas laga läckan och allt ser ut att hålla ihop.');
        crack = 0;
      } else {
        alert('Du försöker laga läckan, men lagningskitet räcker inte till helt. \nIngen återvändo nu, du får helt enkelt hoppas att den håller.');
        crack = 0.15;
      }
      break;
    } else if (inputStr == 2) {
      alert('Du ignorerar sprickan och fortsätter dyka djupare ner i havet.');
      crack = 0.5;
      break;
    } else {
      alert('Ogiltig input:\nSvara bara med den siffra som korresponderar med svarsalternativet.');
    }
  }

  alert('Du fortsätter dyka ner i djupet.');
  if (testCrack()) {
    while(true) {
      inputStr = prompt('Tack för att ha spelat Ubåtsäventyret på Atlantis2! \nVill du spela igen? \n 1)Ja\n 2)Nej');
      if (inputStr == 1) {
        main();
        break;
      }
      else if (inputStr == 2) {
        return;
      } else {
        alert('Ogiltig input:\nSvara bara med den siffra som korresponderar med svarsalternativet.');
      }
    }
  }

  while(true) {
    inputStr = prompt('Plötsligt upptäcker du en mystisk SOS-signal nerifrån djupet. \n 1) Undersök signalen genom att följa efter. \n 2) Ignorera signalen och fokusera på uppdraget. \n3) Försök kontakta vad det nu är som har skickat signalen.  ');
    if (inputStr == 3) {
      alert('Du skickar iväg en signal för att försöka få kontakt. \nEfter några minuter passerat plockar du återigen upp samma SOS-signal.');
      inputStr = prompt('1) Följ efter signalen \n2) Ignorera signalen och fortsätt att dyka.');
    }
    if (inputStr == 1) {
      //Side-quest
      alert('Du följer efter signalen och hittar fram till en undervattensgrotta.');
      inputBool = confirm('Det är becksvart i grottan och dina lampor lyckas inte riktigt nå in.\n OK) Åk in i grottan och leta närmare. \n Avbryt) Överge grottan och fortsätt dyka.');
      if (inputBool) {
        alert('Du fortsätter in i grottan. Efter att ha letat dig fram genom olika gångar hittar du en annan ubåt.');
        alert('Den har en stor spricka i skrovet och har blivit begravd av stenar. Den ser ut att ha legat här länge.');
        alert('Till följd av vad det nu var som hände har skrovet öppnatts upp och båten blivit fylld med vatten.');
        alert('På skrovet kan du utläsa namnet "Atlantis". Farkosten verkar inte ha kommit längre än hit.');
        alert('Du lämnar grottan förundrad över vad som hänt här.');
        ending += 3;
      } else if (!inputBool) {
        alert('Du blir skraj och överger grottan och fortsätter dyka istället.');
        break;
      }
      break;
    } else if (inputStr == 2) {
      alert('Du ignorerar signalen och fortsätter att dyka djupare.');
      break;
    }
    else {
      alert('Ogiltig input:\nSvara bara med den siffra som korresponderar med svarsalternativet.');
    }
  }

  alert('Du fortsätter dyka djupare och börjar dig närma botten.\nDu märker att tryckmätaren visar att trycket blir allt större.');
  if (testCrack()) {
    while(true) {
      inputStr = prompt('Tack för att ha spelat Ubåtsäventyret på Atlantis2! \nVill du spela igen? \n 1)Ja\n 2)Nej');
      if (inputStr == 1) {
        main();
        break;
      }
      else if (inputStr == 2) {
        return;
      } else {
        alert('Ogiltig input:\nSvara bara med den siffra som korresponderar med svarsalternativet.');
      }
    }
  }

  alert('Du kommer nu ner till botten och i mörkret kan du se ett svagt rött sken...');
  alert('När du närmar dig ser du att det är den magiska röda stenens skimmer du ser.');

  while(true){
    inputStr = prompt('Du ser att stenen sitter fast i en bergsspricka. \n 1) Använd båtens mekaniska robotarm för att försöka dra ut stenen. \n 2) Testa att spränga bort stenen med undervattensdynamit. (+10 poäng för coolhet)');
    if (inputStr == 1) {
      //Allt går bra.
      alert('Du lyckas dra ut den magiska röda stenen ur sprickan utan problem. Det visade sig att den inte satt fast speciellt hårt.');
      alert('Efter att ha fått tag i diamanten så återvänder du tillbaka upp till ytan igen.');
      ending += 1;
      break;
    } else if (inputStr == 2) {
      //Lavin
      inputStr = prompt('Den starka explosionen sprider sig genom berget och snart börjar tusentals tunga stenar falla mot Ubåten. \n 1) Försök fly undan lavinen. \n 2) Acceptera ditt öde.');
      if (inputStr == 1) {
        var x = Math.random();
        if (x < 0.3) {
          alert('Du lyckas fly undan alla stenar och greppar tag i diamanten som nu lossnat. \nDu skyndar dig tillbaka upp till ytan igen.');
          ending += 1;
        } else {
          alert('Du försöker fly undan ravinen, men blir träffad av en stor sten ovanifrån och sjunker snabbt till botten.');
          ending += 2;
        }
      } else if (inputStr == 2) {
        alert('Du accepterar ditt öde och blir träffad av stenar ovanifrån, och snart har du sjunkit till botten.');
        ending += 2;
      }
      break;
    } else {
      alert('Ogiltig input:\nSvara bara med den siffra som korresponderar med svarsalternativet.');
    }
  }

  if (ending == 1) {
    alert('Med den magiska röda stenen till ditt förfogande kan du nu uppfylla ditt livs största önskningar.');
    prompt('Vad är din första önskan?\n(Skriv in ditt svar)');
    alert('Vilken bra önskan! Den blir uppfylld på en gång.');
  } else if (ending == 2) {
    alert('Du ligger nu begravd under en hög med stenar på havsbottnen.');
    alert('Syret håller långsamt på att ta slut utan räddning i sikte.');
    alert('Game Over');
  } else if (ending == 4) {
    alert('Du klarade dig bättre undan än den förra expeditionen som skickades ner.');
    alert('Med den magiska röda stenen till ditt förfogande kan du nu uppfylla ditt livs största önskningar.');
    prompt('Vad är din första önskan?\n(Skriv in ditt svar)');
    alert('Vilken bra önskan! Den blir uppfylld på en gång.');
  } else if (ending == 5) {
    alert('Du är nu, likt den första Atlantis, begravd på havsbotten utan hjälp inom räckhåll.');
    alert('Det verkar vila någon förbannelse över alla de som försöker få tag i den magiska röda stenen');
    alert('Syret börjar långsamt ta slut i båten.');
    alert('Game Over');
  }

  while(true) {
    inputStr = prompt('Tack för att ha spelat Ubåtsäventyret på Atlantis2! \nVill du spela igen? \n 1)Ja\n 2)Nej');
    if (inputStr == 1) {
      main();
      break;
    }
    else if (inputStr == 2) {
      return;
    } else {
      alert('Ogiltig input:\nSvara bara med den siffra som korresponderar med svarsalternativet.');
    }
  }
}
main();
