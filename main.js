var mario, mario_img;
var fundo, fundo_img;
var chao;
var moeda, moeda_img;
var placar = 0;
var moedaGrupo;
var point;
var obstaculo, obstaculo_img;
var die;

function preload(){
    mario_img = loadImage("mario.png");
    fundo_img = loadImage("fundo2.png");
    moeda_img = loadImage("moeda3.png");
    point = loadSound("vibrant_game.mp3");
    obstaculo_img = loadImage("obstaculo.webp");
    die = loadSound("die.mp3");
}

function setup(){
    createCanvas(400,400);

    fundo = createSprite(50,200);
    fundo.addImage(fundo_img);
    fundo.velocityX = -4;
    chao = createSprite(200,370,400,50);
    chao.visible = false;
    mario = createSprite(150,300);
    mario.addImage(mario_img);
    mario.scale =  0.1; 

    moedaGrupo = new Group();
    obstaculoGrupo = new Group();
}

function draw(){
    background("lightgray");
    if(fundo.x < 0){
        fundo.x = fundo.width/2;
    }
    //mario.x = World.mouseX;
    if(keyDown("up")&& mario.y > 250){
       mario.velocityY = -10;
    }
    // if(mario.collide(obstaculoGrupo)){
    //     die.play();
    // }
    mario.velocityY += 0.5;
    mario.collide(chao);  
    if(mario.isTouching(moedaGrupo)){ 
        placar += 1;
        point.play();
        moedaGrupo.destroyEach();
    }
    if(mario.isTouching(obstaculoGrupo)){ 
        placar -= 1;
        die.play();
        obstaculoGrupo.destroyEach();
    }
    moeda();
    obstaculo();
    drawSprites();
    textSize(12);
    textFont("arial Black");
    text("Pontuação: " + placar, 200,30); 
}

function moeda() {
    if(frameCount%200 === 0){
    var moeda = createSprite(400,Math.round(random(200, 370)), 10, 10);
    moeda.addImage(moeda_img);
    moeda.velocityX = -3;
    //moeda.lifetime = 150;
    moeda.scale = 0.3;
    moedaGrupo.add(moeda);
}
}

function obstaculo() {
    if(frameCount%450 === 0){
    var obstaculo = createSprite(400,Math.round(random(200, 370)), 10, 10);
    obstaculo.addImage(obstaculo_img);
    obstaculo.velocityX = -4;
    obstaculo.scale = 0.2;
    obstaculoGrupo.add(obstaculo);
}
}