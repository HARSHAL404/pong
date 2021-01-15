var playerPaddle, computerPaddle, ball, edges;
 var computerScore = 0;
var playerScore = 0;
var gameState = "serve";
var ballImage;

function preload(){
   ballImage=loadImage("soccer.png");
}

function setup(){
  playerPaddle = createSprite(390, 200, 10, 70);
  computerPaddle = createSprite(10, 200, 10, 70);
  ball = createSprite(200,200,10,10);
  ball.addImage(ballImage);
  ball.scale=0.03;
  
  edges = createEdgeSprites(); 
 
}

function draw(){
  background("green");
  
  //display Scores
  text(computerScore,170,20);
  text(playerScore, 230,20);
  
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  } 
  
  //draw dotted lines
  for (var i = 0; i < 400; i+=20) {
     line(200,i,200,i+10);
  }
  
  if(keyDown("space") && gameState == "serve"){
    ball.velocityX = 5;
    ball.velocityY = 5  ;
    gameState = "play";
  }
  
  playerPaddle.y = mouseY;
  computerPaddle.y = ball.y;
  
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[2]);
       
       ball.bounceOff(playerPaddle);
       ball.bounceOff(computerPaddle);
  
  if(ball.x > 400 || ball.x < 0){
    if (ball.x < 0) {
      playerScore++;
    }
    else if(ball.x > 400) {
      computerScore++;
    }
    
    ball.velocityX = 0;
    ball.velocityY = 0;
    
    ball.x = 200;
    ball.y = 200;
    
    gameState = "serve";
  }
  
  if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
    if (gameState === "over") {
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
   if (keyDown("r")) {
     gameState = "serve";
     computerScore = 0;
     playerScore = 0;
  }
  
  drawSprites();
}