var backgroundImg, candyImg, boyImg, ballImg, rockImg, injuredImg
var backgroundSprite, candy, boy, ball, rock, injured, invisibleGround
var gameOver, checkpoint, music, jump

var rocks
var candies
var edges

var score = 0
var gameState = "play"

function preload(){
    backgroundImg = loadImage("background.png")
    boyImg = loadImage("running boy.png")
    candyImg = loadImage("candy.png")
    rockImg = loadImage("rock.png")
    ballImg = loadImage("volleyball.png")
    injuredImg = loadImage("injured.png")

    gameOver = loadSound("over.wav")
    checkpoint = loadSound("check.wav")
    music = loadSound("music.wav")
    jump = loadSound("jump.wav")
}

function setup() {
    createCanvas(600,300)

    music.loop()

    candies = new Group()
    rocks = new Group()

    backgroundSprite = createSprite(375,100)
    backgroundSprite.addImage(backgroundImg)
    backgroundSprite.scale = 0.4

    boy = createSprite(100,250)
    boy.addImage(boyImg)
    boy.scale = 0.2

    ball = createSprite(400,265)
    ball.addImage(ballImg)
    ball.scale = 0.02

    invisibleGround = createSprite(300,290,600,15)
    invisibleGround.visible = false

    edges = createEdgeSprites()
}

function draw() {
    background(0)

    if (gameState == "play") {
        backgroundSprite.velocityX = -3
        score += 1

        if (score % 1000 == 0) {
            checkpoint.play()
        }

        spawnRocks()
        spawnCandies()
    
        if (backgroundSprite.x < 225) {
            backgroundSprite.x = 375
        }
        if (keyWentDown("space")) {
            jump.play()
            boy.velocityY = -13
        }
        if (boy.isTouching(rocks)) {
            rocks.destroyEach()
            gameOver.play()
            gameState = "end"
        }
        if (boy.isTouching(candies)) {
            candies.destroyEach()
            score += 300
        }

        boy.velocityY += 0.5
    }

    boy.collide(invisibleGround)
    boy.collide(edges)
    
    drawSprites()

    fill("black")
    textSize(30)
    text("Score: " + score,250,50)

    if (gameState == "end") {
        fill("red")
        textSize(30)
        text("GAME OVER",250,100)

        backgroundSprite.velocityX = 0
        rocks.setVelocityXEach(0)
        candies.setVelocityXEach(0)
    }
}

function spawnRocks() {
    if (frameCount % 250 == 0) {        
        rock = createSprite(700,265)
        rock.addImage(rockImg)
        rock.scale = 0.1
        rock.velocityX = -3
        rock.lifetime = 800
        rock.depth = ball.depth
        ball.depth += 1
        rocks.add(rock)
    }
}

function spawnCandies() {
    if (frameCount % 400 == 0) {
        candy = createSprite(700,265)
        candy.addImage(candyImg)
        candy.scale = 0.2
        candy.velocityX = -3
        candy.lifetime = 800
        candy.depth = ball.depth
        ball.depth += 1
        candies.add(candy)
    }
}
