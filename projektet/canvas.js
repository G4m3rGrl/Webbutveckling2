function main() {
  //Canvas-Konstanter
  const canvas = document.getElementById("breakout");
  const ctx = canvas.getContext("2d");

  //Konstanter för spelelement
  const PLAYER_COLOR = "#000";
  const PLAYER_WIDTH = 100;
  const PLAYER_HEIGHT = 20;
  const MOVEMENT_SPEED = 20;

  const BLOCK_HEIGHT = 25;
  const BLOCK_COLOR = "#000";
  const BLOCK_GAP = 3;
  const BLOCK1_AMOUNT = 7;
  const BLOCK2_AMOUNT = 5;
  const BLOCK3_AMOUNT = 3;

  const BALL_SIZE = 10;
  const BALL_COLOR = "#000";
  const BALL_REFRESH_RATE = 5;

  //Sätter startkoordinater för spelaren.
  var playerX = canvas.width * 0.5 - PLAYER_WIDTH / 2;
  var playerY = canvas.height * 0.8;

  //Klass för block.
  class Block {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  }
  var blockY = 100;
  var blockLayer1 = [];
  var blockLayer2 = [];
  var blockLayer3 = [];

  //Variabler för Boll.
  var ballX = playerX + (PLAYER_WIDTH / 2) - (BALL_SIZE/2);
  var ballY = playerY - canvas.height * 0.1;
  var ballMoveX = 1;
  var ballMoveY = 1;

  //Funktion för initiering av variabler, så att de enkelt ska gå att justera.
  function initBlock (layer, amount) {
    for (i = 0; i < amount; i++) {
      layer.push(true);
    }
  }

  initBlock(blockLayer1, BLOCK1_AMOUNT);
  initBlock(blockLayer2, BLOCK2_AMOUNT);
  initBlock(blockLayer3, BLOCK3_AMOUNT);

  //En funktion som ritar alla block från arrayerna.
  function drawBlock(layer) {
    ctx.fillStyle = BLOCK_COLOR;
    let blockWidth = (canvas.width - BLOCK_GAP) / layer.length - BLOCK_GAP;
    let blockX = BLOCK_GAP;
    for (i = 0; i < layer.length; i++) {
      ctx.fillRect(blockX, blockY, blockWidth, BLOCK_HEIGHT);
      blockX += blockWidth + BLOCK_GAP;
      layer[i] = new Block(blockX, blockY, blockWidth, BLOCK_HEIGHT);
    }
    blockY += BLOCK_HEIGHT + BLOCK_GAP;
  }
  //Kör funktionerna för varje array
  drawBlock(blockLayer1);
  drawBlock(blockLayer2);
  drawBlock(blockLayer3);

  console.log(blockLayer1);
  console.log(blockLayer2);
  console.log(blockLayer3);

  //Ritar spelaren enligt angivna variabler & konstanter.
  function drawPlayer() {
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
  drawPlayer();

  //Kör funktion om spelare trycker på tangent.
  window.onkeypress = function (e) {
    //Om trycker på z
    if (e.keyCode == 122) {
      ctx.clearRect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
      playerX -= MOVEMENT_SPEED;
      drawPlayer();
    } else if (e.keyCode == 120) {
      ctx.clearRect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
      playerX += MOVEMENT_SPEED;
      drawPlayer();
    }
  }

  function breakBlock(block) {
    ctx.clearRect(block.x - block.width - BLOCK_GAP - 1, block.y, block.width + 2, block.height);
    console.log(block.x);
    console.log(block.y);
    console.log(block.width);
    console.log(block.height);
    block.x = 0;
    block.width = 0;
    block.height = 0;
  }

  function detectBlockBottomTop (blockLayer) {
    if ((ballY > blockLayer[0].y && ballY < blockLayer[0].y + BLOCK_HEIGHT) || (ballY + BALL_SIZE > blockLayer[0].y && ballY + BALL_SIZE < blockLayer[0].y + BLOCK_HEIGHT)) {
      for (i = 0; i < blockLayer.length; i++) {
        if ((ballX < blockLayer[i].x && ballX > blockLayer[i].x - blockLayer[i].width) || (ballX + BALL_SIZE < blockLayer[i] && ballX + BALL_SIZE > blockLayer[i].x - blockLayer[i].width)){
          breakBlock(blockLayer[i]);
          return true;
        }
      }
    }
  }

  function detectBlockSide(blockLayer) {
    if ((ballY > blockLayer[0].y && ballY < blockLayer[0].y + BLOCK_HEIGHT) || (ballY + BALL_SIZE > blockLayer[0].y && ballY + BALL_SIZE < blockLayer[0].y + BLOCK_HEIGHT)) {
      for (i = 0; i < blockLayer.length; i++) {
        if ((ballX + BALL_SIZE < blockLayer[i].x + ballMoveX && ballX + BALL_SIZE > blockLayer[i].x - ballMoveX) || (ballX < blockLayer[i].x - blockLayer[i].width + ballMoveX && ballX > blockLayer[i].x - blockLayer[i].width - ballMoveX)) {
          breakBlock(blockLayer[i]);
          return true;
        }
      }
    }
  }

  function ball() {
    ctx.clearRect(ballX, ballY, BALL_SIZE, BALL_SIZE);

    ballX += ballMoveX;
    ballY += ballMoveY;



    //Hit-detection mot spelaren
    if ((ballX + BALL_SIZE) > playerX && (ballX + BALL_SIZE) < (playerX + PLAYER_WIDTH) && (ballY + BALL_SIZE) > playerY && (ballY + BALL_SIZE) < (playerY + PLAYER_HEIGHT)) {
      //Kollar vilken sida av spelaren bollen räffar. Om det är vänstersidan går bollen vänster, annars höger.
      if (ballX + BALL_SIZE/2 > playerX && ballX + BALL_SIZE/2 < playerX + PLAYER_WIDTH/2) {
        ballMoveX = Math.abs(ballMoveX) * -1;
      }
      else {
        ballMoveX = Math.abs(ballMoveX);
      }
      ballMoveY *= -1;
    }
    //Hit-detection för kanterna
    else if (ballX + BALL_SIZE > canvas.width || ballX < 0) {
      ballMoveX *= -1;
    }
    else if (ballY < 0) {
      ballMoveY *= -1;
    }
    //Kör hit-detection för blocks undersida och ovansida
    else if (detectBlockBottomTop(blockLayer1)) {
      ballMoveY *= -1;
    }
    else if (detectBlockBottomTop(blockLayer2)) {
      ballMoveY *= -1;
    }
    else if (detectBlockBottomTop(blockLayer3)) {
      ballMoveY *= -1;
    }
    else if (detectBlockSide(blockLayer1)) {
      ballMoveX *= -1;
    }
    else if (detectBlockSide(blockLayer2)) {
      ballMoveX *= -1;
    }
    else if (detectBlockSide(blockLayer3)) {
      ballMoveX *= -1;
    }

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
- Göra bollen rund
- Poängsystem?
*/
