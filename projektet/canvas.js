function main() {
  //Canvas-Konstanter
  const canvas = document.getElementById("breakout");
  const ctx = canvas.getContext("2d");

  //Konstanter för spelelement
  const PLAYER_COLOR = "#000";
  const PLAYER_WIDTH = 100;
  const PLAYER_HEIGHT = 20;
  const MOVEMENT_SPEED = 10;

  //Sätter startkoordinater för spelarelementet.
  var playerX = canvas.width * 0.5 - PLAYER_WIDTH / 2;
  var playerY = canvas.height * 0.8;

  //Ritar spelaren enligt angivna vaeiabler & konstanter.
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
}
main();
