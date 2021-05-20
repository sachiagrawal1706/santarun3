var santa,santaRun,santaStand,santaHurt,santaJump
var snowman, snowmanImage
var tree,treeImage
var ob1,ob2,ob3,ob4
var ground
var counter=0
var gameState = 0
var button
var score=0
function preload(){
  santaRun=loadAnimation("santa/Run (1).png","santa/Run (3).png","santa/Run (5).png")
  santaJump=loadAnimation("santa/Jump (6).png")
  santaStand=loadAnimation("santa/Idle (1).png")
  santaHurt=loadAnimation("santa/Dead (17).png")
santaSleep=loadAnimation('santa/santa sleep.png')
  snowmanImage=loadImage("bg/SnowMan.png")
  tree1=loadImage("bg/Tree_1.png")
  tree1=loadImage("bg/Tree_1.png")
bg1=loadImage('bg/bg1.jpg')
bg2=loadImage('bg/bg2.jpg')
bg3=loadImage('bg/BG.png')
icebox=loadImage('bg/IceBox.png')
Crystal=loadImage('bg/Crystal.png')
Igloo=loadImage('bg/Igloo.png')
stone=loadImage('bg/Stone.png')
sign1=loadImage('bg/Sign_1.png')
sign2=loadImage('bg/Sign_2.png')  
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  santa=createSprite(200,500)
  santa.addAnimation('sleep',santaSleep)
    santa.addAnimation('stand',santaStand)
  santa.addAnimation('run',santaRun)
  santa.addAnimation('jump',santaJump)
  santa.addAnimation('hurt',santaHurt)
santa.setCollider('rectangle',-50,0,200,450)
  ground= createSprite(displayWidth/2, displayHeight-100,width,10)
  ground.visible=false
  button=createButton('next')
button.position(50,50)
button.size(150,80)
baseGroup=createGroup()
groundGroup=createGroup()
obstaclesGroup=createGroup()
edges=createEdgeSprites()
}


function draw() {
   background(bg1);
  textSize(50);
  strokeWeight(7)
  
  fill("black")
  

  if(gameState===0){
    text("CLICK ON NEXT TO SEE THE STORY",200,80)
  
    button.mouseClicked(function(){  counter++})
    
      
      if(counter ===1){
        textSize(50);  
        stroke("pink") 
        strokeWeight(4) 
        text("Zzzzzzzz\n Zzzzzzzz\n Zzzzzzzzzzz",50,200)
        console.log(counter)
      }
      else if(counter ===2){
        santa.changeAnimation('stand',santaStand)
        textSize(50);
        stroke("lightblue") 
        strokeWeight(4)  
        text("oh my god\n it's fifteen minutes to twelve O'clock \n i have deliver so many gifts\n i don't know how i fell a sleep",200,200)
        console.log(counter)
      }
      else if(counter ===3){
        textSize(50); 
        stroke("pink") 
        strokeWeight(4)  
        text("there is no time to waste\n i need to hurry up and start start the deliveries soon\n I would like to try some sir",200,450)
        console.log(counter)
      }
      else if(counter === 4){
        textSize(50); 
        stroke("lightblue") 
        strokeWeight(4) 
        text("will you help me deliver?\n come along it will be fun ride ",500,200)
       
        console.log(counter)
      }
      else if(counter ===5) {
        console.log(counter)
        gameState =1
       
      }
      
      
  
  }
   if (gameState===1) {
     background(bg2)
         button.mouseClicked(function(){  gameState=2})

   }     
   if (gameState===2) {
     background(bg3)
      textSize(50); 
        stroke("lightblue") 
        strokeWeight(4) 
        text("ohh no i fell down from my sleigh\n now i will have to deliver all the gifts by foot\n please help me over come all the obstacles \n on my way so that i can deliver all gifts before time",500,200)
       
         button.mouseClicked(function(){  gameState=3})

   }     
   if (gameState===3) {
     background(bg3)
      textSize(50); 
        stroke("lightblue") 
        strokeWeight(4) 
        text("to make santa press space\n to make santa slide press S\n goodluck all the best hope you overcome all the obstacles ",500,200)
     button.mouseClicked(function(){  gameState=4})

   }     
   if (gameState===4) {
     background(bg3)
     button.hide()
spawnGround()
spawnObstacles()
santa.scale=0.5
santa.collide(ground)
ground.visible=true
santa.changeAnimation('run',santaRun)
 if(keyDown("space") && santa.y >= 159) {
      santa.velocityY = -20;
    }
  santa.bounceOff(edges)
    santa.velocityY = santa.velocityY + 0.8
  ground.debug=true
  santa.debug=true
   }     
  obstaclesGroup.collide(ground)
  santa.collide(groundGroup)
  drawSprites()
}

function spawnGround() {
  //write code here to spawn the ground
  if (frameCount % 380 === 0) {
    var ground = createSprite(displayWidth,120,200,10);
    ground.y = Math.round(random(displayHeight-500,displayHeight-300));
    //ground.addImage(cloudImage);
    //cloud.scale = 0.5;
    ground.velocityX = -3;
    ground.debug=true
     //assign lifetime to the variable
    ground.lifetime = 600;
    
    //adjust the depth
    ground.depth = santa.depth;
    santa.depth = santa.depth + 1;
    base=createSprite(ground.x,ground.y-10,ground.width,ground.height)
    base.debug=true
    base.depth=ground.depth
    base.lifetime=ground.lifetime
    base.velocityX=-3
    //add each cloud to the group
    groundGroup.add(ground);
    baseGroup.add(base)
  }
  
}


function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight-200,10,40);
    obstacle.velocityY+=0.8
    obstacle.collide(ground)
    obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(snowmanImage);
              break;
      case 2: obstacle.addImage(tree1);
              break;
      case 3: obstacle.addImage(Crystal);
              break;
      case 4: obstacle.addImage(icebox);
              break;
      case 5: obstacle.addImage(Igloo);
              break;
      case 6: obstacle.addImage(sign1);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    obstacle.setCollider('rectangle',0,0,100,100)
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

