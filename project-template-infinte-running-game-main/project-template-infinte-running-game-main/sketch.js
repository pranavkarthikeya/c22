var PLAY = 1;
var END = 0;
var gameState = PLAY;
var meat,meatImage

var lion, lion_running, lion_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2

var score;

var gameOverImg,restartImg
var jumpSound,dieSound
var l1,l2,l3,l4,l5


function preload(){
    lion_running = loadAnimation("l1.png","l2.png","l3.png","l4.png","l5.png")
groundImage = loadImage("b.png")
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  lion_collided= loadImage("l1.png")
  meat = loadImage("meat.png")
}

function setup() {
 createCanvas(windowWidth,windowHeight)
 lion = createSprite(50,180,20,50)
 lion.addAnimation("running",lion_running)
 //lion.addAnimation("collided",lion_collided)
 lion.scale = 0.5
 

 ground = createSprite(200,180,400,20);
 ground.addImage("ground",groundImage);
 ground.x = ground.width /2;
 gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.6;
  restart.scale = 0.6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false
  
  
  obstaclesGroup = createGroup()
  
  
  console.log("Hello" + 5)
  
  
  score = 0;
  
 }

 function draw() {
  
    background(180)
    
    text("Score: "+ score, 500,50)
    
    console.log("this is ",gameState)
    
    
    if(gameState === PLAY){
      gameOver.visible = false
      restart.visible = false
      
      ground.velocityX = -(4+2*score/100)
      
      score = score + Math.round(frameCount/60);
      
      if (ground.x < 0){
        ground.x = ground.width/2
      }
      
      
      if(keyDown("up_arrow")&& lion.y >= 100) {
        jumpSound.play ()
          lion.velocityY = -12
      }
      
      
      lion.velocityY = lion.velocityY + 0.8
    
     
      
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(lion)){
         
         lion.velocityY = -10
          dieSound.play()
      }
    }
     else if (gameState === END) {
       console.log("hey")
        gameOver.visible = true;
        restart.visible = true;
       
        ground.velocityX = 0;
        trex.velocityY = 0
       
        
        lion.changeAnimation("collided", lion_collided);
       
        
      obstaclesGroup.setLifetimeEach(-1);
      
       
       obstaclesGroup.setVelocityXEach(0);
       
     }
    
   
    
    lion.collide(invisibleGround);
    
    
    
    drawSprites();
  }
  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,165,10,40);
      obstacle.velocityX = -(6+2*score/100)
      

       var rand = Math.round(random(1,6))
       switch(rand) {
         case 1: obstacle.addImage(obstacle1)
                 break
         case 2: obstacle.addImage(obstacle2)
                 break

                 obstacle.scale = 0.5
                 obstacle.lifetime = 300
                
                
                 obstaclesGroup.add(obstacle)
       }
              }
             } 