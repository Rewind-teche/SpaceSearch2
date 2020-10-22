var ground, ground1_img, ground2_img, ground3_img, ground4_img, ground5_img
var ship, ship_img
var bot, botleft_img, botright_img
var earth, earth_img
var astro1,astro2,astro3,astroid1Grp,astroid2Grp,astroid3Grp, astroid1_img, astroid2_img, astroid3_img
var rand
var astroCount = 0
var life = 5
var mon1, mon2, mon3, mon4, mon5, mon6, mon7, mon8, mon1Grp, mon2Grp, mon3Grp, mon4Grp, mon5Grp, 
mon6Grp, mon7Grp, mon8Grp, mon1_img, mon2_img, mon3_img, mon4_img, mon5_img, mon6_img, mon7_img, mon8_img
var monCount = 0
var red, blue, purple, white, redGrp, blueGrp, purpleGrp, whiteGrp, red_img, blue_img, purple_img, 
cwhite_img
var stonesCollected = 0
var PLAY = 0
var LEVEL1 = 1
var LEVEL2 = 2
var LEVEL3 = 3
var LEVEL5 = 4
var END = 5
var gameState = PLAY

function preload()
{
  ground1_img = loadImage("images/bg/space.png")
  ground2_img = loadImage("images/bg/pluto.jpg")
  ground3_img = loadImage("images/bg/ura.jpg")
  ground4_img = loadImage("images/bg/mars.jpg")
  ground5_img = loadImage("images/bg/nep.jpg")
  earth_img = loadImage("images/bg/earth.png")
  ship_img = loadImage("images/rocky.png")
  botright_img = loadImage("images/bot/robo_right.png")
  botleft_img = loadImage("images/bot/robo_left.png")
  astroid1_img = loadImage("images/astroids/astroid1.png")
  astroid2_img = loadImage("images/astroids/astroid2.png")
  astroid3_img = loadImage("images/astroids/astroid3.png")
  mon1_img = loadAnimation("images/ghost/ghost1.png","images/ghost/ghost2.png","images/ghost/ghost3.png","images/ghost/ghost4.png","images/ghost/ghost5.png","images/ghost/ghost6.png",)
  mon2_img = loadImage("images/monsters/mon2.png")
  mon3_img = loadImage("images/monsters/mon2.png")
  mon4_img = loadAnimation("images/flybot/flybot1.png","images/flybot/flybot2.png")
  mon5_img = loadImage("images/monsters/mon4.png")
  mon6_img = loadAnimation("images/alienYellow/alienYellow1.png","images/alienYellow/alienYellow2.png")
  mon7_img = loadImage("images/monsters/mon1.png")
  mon8_img = loadAnimation("images/spike/spike1.png","images/spike/spike2.png")
  red_img = loadImage("images/stones/red.png")
  blue_img = loadImage("images/stones/blue.png") 
  purple_img = loadImage("images/stones/pur.png")
  white_img = loadImage("images/stones/whi.png")
}

function setup() {
  createCanvas(600,800);
  ground = createSprite(300,400,600,800)
  ground.addImage(ground1_img)

  earth = createSprite(300,900,100,100)
  earth.addImage("earth", earth_img)
  earth.scale = 1.15

  ship = createSprite(300,650,50,50)
  ship.addImage("ship", ship_img)
  ship.scale = 0.4
  ship.debug = true
  ship.setCollider("rectangle",0,0,(ship.width/2)-20,ship.height)

  astroid1Grp = new Group()
  astroid2Grp = new Group()
  astroid3Grp = new Group()

  bot = createSprite(300,650,50,50)
  bot.addImage("left",botleft_img)
  bot.addImage("right",botright_img)
  bot.scale = 0.2
  bot.debug = true
  bot.setCollider("rectangle",0,0,(bot.width/2)-20,bot.height)
  bot.visible = false

  mon1Grp = new Group()
  mon2Grp = new Group()
  mon3Grp = new Group()
  mon4Grp = new Group()
  mon5Grp = new Group()
  mon6Grp = new Group()
  mon7Grp = new Group()
  mon8Grp = new Group()

  redGrp = new Group()
  
}

function draw() {
  background(255,255,255);  
  if(gameState === PLAY)
  {
    
    if(ground.y>800)
    {
      ground.y = 400
    }
    ground.velocityY = 1
    earth.velocityY = 1
    earth.lifetime = 70
   
    if(keyIsDown(LEFT_ARROW) && ship.x>0)
    {
      ship.x = ship.x-10
    }
    if(keyIsDown(RIGHT_ARROW) && ship.x<600)
    {
      ship.x = ship.x+10
    }

    if (frameCount % 80 === 0) 
    {
      var rand = Math.round(random(1,3));
      astroCount++ 
      if(rand===1)
      {
        astroid2()
      }
      else if(rand===2)
      {
        astroid1()
      }
      else
      {
        astroid3()
      }
    }

    if(ship.isTouching(astroid1Grp))
    {
       astroid1Grp.destroyEach()
       life--;
    }

    if(ship.isTouching(astroid2Grp))
    {
       astroid2Grp.destroyEach()
       life--;
    }

    if(ship.isTouching(astroid3Grp))
    {
       astroid3Grp.destroyEach()
       life--;
    }

    if(life!==0 && astroCount === 2)
    {
      gameState = LEVEL1
      life = 4
    }
  }
  
  else if(gameState === LEVEL1 && life!==0)
  {
    
    ground.addImage(ground4_img)
    if(ground.y>800)
    {
      ground.y = 400
    }
    ground.velocityY = 1
    
    ship.destroy()
    bot.visible = true
    bot.setCollider("rectangle",0,0,(bot.width/2)+100,bot.height)
    if(keyDown(LEFT_ARROW) && bot.x>0)
    {
      bot.x = bot.x-10
      bot.changeImage("left", botleft_img)
      bot.scale = 0.2
    }
    if(keyDown(RIGHT_ARROW) && bot.x<600)
    {
      bot.x = bot.x+10
      bot.changeImage("right", botright_img)
      bot.scale = 0.2
    }

    if(keyDown(UP_ARROW) && bot.y>0)
    {
      bot.y = bot.y-10
      bot.changeImage("left", botleft_img)
      bot.scale = 0.2
    }
    if(keyDown(DOWN_ARROW) && bot.y<700)
    {
      bot.y = bot.y+10
      bot.changeImage("right", botright_img)
      bot.scale = 0.2
    }
    if (frameCount % 100 === 0) 
    {
      var rand = Math.round(random(1,2));
      monCount++ 
      if(rand===1)
      {
        monster2()
      }
      else
      {
        monster1()
      
      }
    }
        
    if(bot.isTouching(mon1Grp))
    {
        mon1Grp.destroyEach()
        life--;
    }
    
    if(bot.isTouching(mon2Grp))
    {
        mon2Grp.destroyEach()
        life--;
    }

    if (frameCount % 80 === 0) 
    {
      var rand = Math.round(random(1,2));
      
      if(rand===1)
      {
        redStone()
      }
    }

    if(bot.isTouching(redGrp))
    {
        redGrp.destroyEach()
        stonesCollected++;
    }
      
    if(life === 0)
    {
      gameState=END
    }
  }

 // if(life!==0 && gameState === LEVEL2)
    
  
  
  else(gameState === END)
  {
    
  }
  drawSprites();
  if(gameState === PLAY)
  {
    textSize(30)
    fill("white")
    text("AsteroidCount:"+astroCount,50,50)
    text("Life :"+life,50,100)
  }
  if(gameState === LEVEL1)
  {
    textSize(30)
    fill("white")
    text("Stones Collected:"+stonesCollected,50,50)
    text("Life: "+life,50,100)
  }
}

function astroid1()
{
  astro1 = createSprite(Math.round(random(100,500)),0,30,30)
  astro1.addImage("astro1",astroid1_img)
  astro1.velocityY = 12;
  astro1.scale = 0.3;
  astro1.lifetime = 70
  astro1.debug = true
  astro1.setCollider("circle",0,0,120)
  astroid1Grp.add(astro1)
}

function astroid2()
{
  astro2 = createSprite(Math.round(random(100,500)),0,30,30)
  astro2.addImage("astro2",astroid2_img)
  astro2.velocityY = 14;
  astro2.scale = 0.3;
  astro2.lifetime = 50
  astro2.debug = true
  astro2.setCollider("circle",0,0,120)
  astroid2Grp.add(astro2)
}

function astroid3()
{
  astro3 = createSprite(Math.round(random(100,500)),0,30,30)
  astro3.addImage("astro3",astroid3_img)
  astro3.velocityY = 16;
  astro3.scale = 0.3;
  astro3.lifetime = 30
  astro3.debug = true
  astro3.setCollider("circle",0,0,120)
  astroid3Grp.add(astro3)
}

function monster1()
{
  mon1 = createSprite(Math.round(random(100,500)),0,30,30)
  mon1.addAnimation("mon1",mon1_img)
  mon1.velocityY = 12;
  mon1.scale = 1.2;
  mon1.lifetime = 70
  mon1.debug = true
  mon1.setCollider("circle",0,0,50)
  mon1Grp.add(mon1)
}

function monster2()
{
  mon2 = createSprite(Math.round(random(100,500)),0,30,30)
  mon2.addImage("mon1",mon2_img)
  mon2.velocityY = 12;
  mon2.scale = 0.4;
  mon2.lifetime = 70
  mon2.debug = true
  mon2.setCollider("circle",0,0,70)
  mon2Grp.add(mon2)
}
  
function redStone()
{
  red = createSprite(Math.round(random(100,500)),random(100,600),30,30)
  red.addImage("redStone",red_img)
  red.velocityY = ground.velocityY;
  red.scale = 0.1;
  red.lifetime = 70
  red.debug = true
  red.setCollider("circle",0,0,80)
  redGrp.add(red)
}
  

