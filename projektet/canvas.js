function main() {
  //Canvas-Konstanter
  const canvas = document.getElementById("breakout");
  const ctx = canvas.getContext("2d");
  //Konstanter för spelelement
  //Spelaren
  const PLAYER_COLOR = "#000";
  const PLAYER_WIDTH = 100;
  const PLAYER_HEIGHT = 20;
  const MOVEMENT_SPEED = 20;
  //Blocken
  const BLOCK_HEIGHT = 25;
  const BLOCK_COLOR = "#000";
  const BLOCK_GAP = 3;
  const BLOCK1_AMOUNT = 7;
  const BLOCK2_AMOUNT = 5;
  const BLOCK3_AMOUNT = 3;
  //Bollen
  const BALL_SIZE = 10;
  const BALL_COLOR = "#000";
  const BALL_REFRESH_RATE = 5;

  //Sätter startkoordinater för spelaren i mitten.
  var playerX = Math.floor(canvas.width * 0.5 - PLAYER_WIDTH/2);
  var playerY = Math.floor(canvas.height * 0.8);

  //Variabler för Boll.
  var ballX = playerX + (PLAYER_WIDTH / 2) - (BALL_SIZE/2);
  var ballY = playerY - canvas.height * 0.1;
  var ballMoveX = 1;
  var ballMoveY = 1;

  //Variabel för block samt 3 arrayer där block läggs efter de skapats.
  var blockY = 100;
  var blockLayer1 = [];
  var blockLayer2 = [];
  var blockLayer3 = [];

  //Klass för block med 4 egenskaper.
  class Block {
    constructor(x, y, width, height) {
      this.x = Math.floor(x);
      this.y = Math.floor(y);
      this.width = Math.floor(width);
      this.height = Math.floor(height);
    }
  }

  //En funktion som ritar alla block och skapar instanser av block-klassen
  //som sedan läggs till i arrayerna.
  function drawBlock(layer, amount) {
    ctx.fillStyle = BLOCK_COLOR;
    let blockWidth = (canvas.width - BLOCK_GAP) / amount - BLOCK_GAP;
    let blockX = BLOCK_GAP;
    for (i = 0; i < amount; i++) {
      ctx.fillRect(blockX, blockY, blockWidth, BLOCK_HEIGHT);
      layer.push(new Block(blockX, blockY, blockWidth, BLOCK_HEIGHT));
      blockX += blockWidth + BLOCK_GAP;
    }
    blockY += BLOCK_HEIGHT + BLOCK_GAP;
  }
  //Kör funktionerna för varje array
  drawBlock(blockLayer1, BLOCK1_AMOUNT);
  drawBlock(blockLayer2, BLOCK2_AMOUNT);
  drawBlock(blockLayer3, BLOCK3_AMOUNT);

  //Ritar spelaren enligt angivna variabler & konstanter.
  function drawPlayer() {
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
  drawPlayer();

  //Kör funktion om spelare trycker på tangent. Styr spelaren.
  window.onkeypress = function (e) {
    //Om trycker på z
    if (e.keyCode == 122) {
      ctx.clearRect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
      playerX -= MOVEMENT_SPEED;
      drawPlayer();
    }
    //Om trycker på x
    else if (e.keyCode == 120) {
      ctx.clearRect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
      playerX += MOVEMENT_SPEED;
      drawPlayer();
    }
  }

  //Clearar det ritade blocket, samt sätter blockinstansens storleksegenskaper
  //till -100 utom för. De har då ingen storlek och kan därför inte bli träffade
  //x-egenskapen sätts också till 0, så att detectBlockSide inte ska kunna
  //kollidera med blocket.
  function breakBlock(block) {
    ctx.clearRect(block.x - 1, block.y, block.width + 2, block.height);
    block.x = -100;
    block.width = 0;
    block.height = 0;
  }

  //Känner av ifall bollen rör toppen eller botten av ett block. Den kollar bara
  //ifall bollens topp rör blockets botten, eller ifall bollens botten rör
  //blockets topp. Detta för att den bara kan kollidera på dessa 2 sätt.
  function detectBlockBottomTop (blockLayer) {
    if ((ballY >= blockLayer[0].y &&
        ballY <= blockLayer[0].y + BLOCK_HEIGHT) ||
        (ballY + BALL_SIZE >= blockLayer[0].y &&
        ballY + BALL_SIZE <= blockLayer[0].y + BLOCK_HEIGHT)) {
      for (i = 0; i < blockLayer.length; i++) {
        if ((ballX >= blockLayer[i].x &&
            ballX <= blockLayer[i].x + blockLayer[i].width) ||
            (ballX + BALL_SIZE >= blockLayer[i] &&
            ballX + BALL_SIZE <= blockLayer[i].x + blockLayer[i].width)){
          breakBlock(blockLayer[i]);
          return true;
        }
      }
    }
  }

  //Funktion som känner av ifall bollen rör blockets sida. Kollar bara ifall
  //bollens högersida rör blockets vänstersida och vice versa. Har en buffer på
  //2 MOVEMENT_SPEED för att undvika buggen att bollen rör sig igenom
  //hit-detectionen.
  function detectBlockSide(blockLayer) {
    if ((ballY >= blockLayer[0].y &&
        ballY <= blockLayer[0].y + BLOCK_HEIGHT) ||
        (ballY + BALL_SIZE >= blockLayer[0].y &&
        ballY + BALL_SIZE <= blockLayer[0].y + BLOCK_HEIGHT)) {
      for (i = 0; i < blockLayer.length; i++) {
        if ((ballX + BALL_SIZE >= blockLayer[i].x + ballMoveX &&
            ballX + BALL_SIZE <= blockLayer[i].x - ballMoveX) ||
            (ballX >= blockLayer[i].x + blockLayer[i].width + ballMoveX &&
            ballX <= blockLayer[i].x + blockLayer[i].width - ballMoveX)) {
          breakBlock(blockLayer[i]);
          return true;
        }
      }
    }
  }

  //Funktion som hanterar all logik för hur bollen ska röra sig. Den körs
  //repeterat för varje litet "steg" som bollen tar, med en kort delay för att
  //inte overloada programmet.
  function ball() {
    //Raderar den gamla instansen av bollen.
    ctx.clearRect(ballX, ballY, BALL_SIZE, BALL_SIZE);

    //Uppdaterar bollens koordinater
    ballX += ballMoveX;
    ballY += ballMoveY;

    //Hit-detection mot spelaren som gör att bollen studsar ifall den kolliderar
    if ((ballX + BALL_SIZE) >= playerX &&
        (ballX) <= (playerX + PLAYER_WIDTH) &&
        (ballY + BALL_SIZE) >= playerY &&
        (ballY + BALL_SIZE) <= (playerY + PLAYER_HEIGHT)) {
      //Kollar vilken sida av spelaren bollen räffar. Om det är vänstersidan går
      //bollen vänster, annars höger.
      if (ballX + BALL_SIZE/2 >= playerX &&
          ballX + BALL_SIZE/2 <= playerX + PLAYER_WIDTH/2) {
        ballMoveX = Math.abs(ballMoveX) * -1;
      }
      else {
        ballMoveX = Math.abs(ballMoveX);
      }
      ballMoveY = Math.abs(ballMoveY) * -1;
    }
    //Hit-detection för kanterna av canvas-sidan. Om den rör kanten studsar
    //bollen genom att ballMove variablen inverteras
    if (ballX + BALL_SIZE >= canvas.width || ballX <= 0) {
      ballMoveX *= -1;
    }
    if (ballY < 0) {
      ballMoveY *= -1;
    }
    //Kör hit-detection för blocks undersida och ovansida. Om den returnar true
    //så "studsar" bollen på ett passande sätt, genom att ballMove variablen
    //inverteras (positivt tal blir negativt och vice versa)
    if (detectBlockSide(blockLayer1)) {
      ballMoveX *= -1;
    }
    if (detectBlockSide(blockLayer2)) {
      ballMoveX *= -1;
    }
    if (detectBlockSide(blockLayer3)) {
      ballMoveX *= -1;
    }
    if (detectBlockBottomTop(blockLayer1)) {
      ballMoveY *= -1;
    }
    if (detectBlockBottomTop(blockLayer2)) {
      ballMoveY *= -1;
    }
    if (detectBlockBottomTop(blockLayer3)) {
      ballMoveY *= -1;
    }
    //Ritar ut den nya bollen.
    ctx.fillStyle = BALL_COLOR;
    ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);

    setTimeout(function(){
      ball();
    }, BALL_REFRESH_RATE);
  }
  ball();
}
main();

/*
Att göra:
- Fixa budd där boll fastnar i spelare (ingen hit-etextion på sidorna är problemet)
*/
