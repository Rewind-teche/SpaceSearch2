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
var PLAY = 0
var LEVEL1 = 1
var LEVEL2 = 2
var LEVEL3 = 3
var LEVEL5 = 4
var END = 5
var gameState = PLAY

function preload()
{
  ground1_img = loadImage("images/space.png")
  ground2_img = loadImage("images/pluto.jpg")
  ground3_img = loadImage("images/ura.jpg")
  ground4_img = loadImage("images/mars.jpg")
  ground5_img = loadImage("images/nep.jpg")
  earth_img = loadImage("images/earth.png")
  ship_img = loadImage("images/rocky.png")
  botright_img = loadImage("images/robo_right.png")
  botleft_img = loadImage("images/robo_left.png")
  astroid1_img = loadImage("images/astroid1.png")
  astroid2_img = loadImage("images/astroid2.png")
  astroid3_img = loadImage("images/astroid3.png")
  mon1_img = loadAnimation("images/ghost/ghost1.png","images/ghost/ghost2.png","images/ghost/ghost3.png","images/ghost/ghost4.png","images/ghost/ghost5.png","images/ghost/ghost6.png",)
  mon2_img = loadImage("images/mon2.png")
  mon3_img = loadImage("images/spike_bot.png")
  mon4_img = loadImage("images/fly_bot.png")
  mon5_img = loadImage("images/mon4.png")
  mon6_img = loadImage("images/alienYellow.png")
  mon7_img = loadImage("images/mon1.png")
  mon8_img = loadImage("images/mon2.png")
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

  mon1Grp  
  mon2Grp  
  mon3Grp  
  mon4Grp  
  mon5Grp  
  mon6Grp  
  mon7Grp  
  mon8Grp 

  mon1Grp = new Group()
  mon2Grp = new Group()
  mon3Grp = new Group()
  mon4Grp = new Group()
  mon5Grp = new Group()
  mon6Grp = new Group()
  mon7Grp = new Group()
  mon8Grp = new Group()
  
}

function draw() {
  background(255,255,255);  
  if(gameState === PLAY)
  {
    if(ground.y>800){
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

    if (frameCount % 80 === 0) {
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

    if(life!==0 && astroCount === 5)
    {
      gameState = LEVEL1
    }
  }
      else if(gameState === LEVEL1 && life!==0)
      {
        ground.addImage(ground4_img)
        life = 4
        ship.destroy()
        bot.visible = true
        if(keyCode===LEFT_ARROW )
        {
         // bot.x = bot.x-10
          bot.velocityX = 3
          bot.changeImage("left", botleft_img)
          bot.scale = 0.2
        }
        if(keyCode===RIGHT_ARROW )
        {
          bot.x = bot.x+10
          bot.changeImage("right", botright_img)
          bot.scale = 0.2
        }
        if (frameCount % 100 === 0) {
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
      
    
  }

 // if(life!==0 && gameState === LEVEL2)
    if(life === 0)
    {
      gameState=END
    }
  
  }
  else if(gameState === END)
  {
    
  }
  drawSprites();
  textSize(30)
  fill("white")
  text("Life: "+life,50,100)
  text("AsteroidCount:"+astroCount,50,150)
}

function astroid1()
{
  astro1 = createSprite(Math.round(random(100,500)),0,30,30)
  astro1.addImage("astro1",astroid1_img)
  astro1.velocityY = 10;
  astro1.scale = 0.3;
  astro1.lifetime = 90
  astro1.debug = true
  astro1.setCollider("circle",0,0,70)
  astroid1Grp.add(astro1)
}

function astroid2()
{
  astro2 = createSprite(Math.round(random(100,500)),0,30,30)
  astro2.addImage("astro2",astroid2_img)
  astro2.velocityY = 12;
  astro2.scale = 0.3;
  astro2.lifetime = 70
  astro2.debug = true
  astro2.setCollider("circle",0,0,70)
  astroid2Grp.add(astro2)
}

function astroid3()
{
  astro3 = createSprite(Math.round(random(100,500)),0,30,30)
  astro3.addImage("astro3",astroid3_img)
  astro3.velocityY = 8;
  astro3.scale = 0.3;
  astro3.lifetime = 110
  astro3.debug = true
  astro3.setCollider("circle",0,0,70)
  astroid3Grp.add(astro3)
}

function monster1()
{
  mon1 = createSprite(Math.round(random(100,500)),0,30,30)
  mon1.addAnimation("mon1",mon1_img)
  mon1.velocityY = 12;
  mon1.scale = 0.7;
  mon1.lifetime = 70
  mon1.debug = true
  mon1.setCollider("circle",0,0,70)
  mon1Grp.add(mon1)
}

function monster2()
{
  mon2 = createSprite(Math.round(random(100,500)),0,30,30)
  mon2.addImage("mon1",mon2_img)
  mon2.velocityY = 12;
  mon2.scale = 0.3;
  mon2.lifetime = 70
  mon2.debug = true
  mon2.setCollider("circle",0,0,70)
  mon2Grp.add(mon2)
}
  

