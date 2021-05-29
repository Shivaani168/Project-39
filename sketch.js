var HP,HPImage;
var Nagini,NaginiImage;
var Voldemort,VoldemortImage;
var Snitch,SnitchImage;
var Sky,SkyImage;
var bludger,bludgerImage;
var gameOver,gameOverImage;
var HPMusic;
var gameState=PLAY;      
var gameState;
var redLight,redLightGroup;
var greenLight;
var canvas;
var PLAY=1;
var END=0;
var Score=0;
var win,winImage;

function preload(){
HPImage=loadImage("harry.png");
NaginiImage=loadImage("Nagini-1.png");
VoldemortImage=loadImage("Voldemort.png");
gameOverImage=loadImage("Game over.jpg");
SkyImage=loadImage("Sky.jpg");
SnitchImage=loadImage("Snitch.webp");
bludgerImage=loadImage("Bludger.png");
HPMusic=loadSound("Harry_Potter_Theme_Song-146980.mp3");
winImage=loadImage("You win.jpg")
}

function setup() {
canvas=createCanvas(displayWidth-20,displayHeight-30);
HP=createSprite(80,250);
HP.addImage(HPImage);
HP.scale=0.5;
  
Sky=createSprite(500,240);
Sky.addImage(SkyImage);
Sky.scale=8
Sky.velocityX= -2
  
redLightGroup=new Group();
VoldemortGroup=new Group();
NaginiGroup=new Group();
snitchGroup=new Group();
bludgerGroup=new Group();
  
HPMusic.loop();
}


function draw() {
background("white")
camera.position.x=displayWidth/2
camera.position.y=HP.y
  
HP.depth=Sky.depth;
HP.depth=HP.depth+1;
  
if (gameState===PLAY){          
Sky.velocityX=-3;
}
if (Sky.x<0){
Sky.x=Sky.width/2;
}

if (keyDown("up_arrow")){
HP.y=HP.y-10;
}

if (keyDown("DOWN_ARROW")){
HP.y=HP.y+10;
}

if(keyDown("LEFT_ARROW")){
HP.x=HP.y-10
}

if(keyDown("RIGHT_ARROW")){
HP.x=HP.x+10
}
  
var obstruction=Math.round(random(1,3));
if(World.frameCount%50===0){
if(obstruction == 1) {
spawnVoldemort();
}
else if(obstruction==2) { 
spawnNagini();
}
else if(obstruction==3) {   
spawnBludger();
}
}
  
redlight();
spawnSnitch();

if (VoldemortGroup.isTouching(redLightGroup)) {
Score=Score+2;
Voldemort.destroy();
redLightGroup.destroyEach();
}
  
if (NaginiGroup.isTouching(redLightGroup)) {
Score=Score+2;
Nagini.destroy();
redLightGroup.destroyEach();
}
  
if (bludgerGroup.isTouching(redLightGroup)) {
Score=Score+2;
bludger.destroy();
redLightGroup.destroyEach();
}
  
if (VoldemortGroup.isTouching(HP) || NaginiGroup.isTouching(HP) || bludgerGroup.isTouching(HP)){
gameState="END";
}

if(Score>=20){
gameState="WIN"
}

if(gameState==="WIN"){
clear();
win=createSprite(displayWidth/2,250)
win.addImage(winImage)
win.scale=3
HP.destroy();
NaginiGroup.destroyEach();
VoldemortGroup.destroyEach();
bludgerGroup.destroyEach();
Sky.destroy();
}

  
if(snitchGroup.isTouching(HP)){
snitchGroup.destroyEach();
Score=Score+5;
}
  
drawSprites();
title();

if (gameState==="END"){       
clear();   
gameOver=createSprite(displayWidth/2,250);
gameOver.addImage(gameOverImage);
gameOver.scale=9;
HP.destroy();
NaginiGroup.destroyEach();
VoldemortGroup.destroyEach();
bludgerGroup.destroyEach();
Sky.destroy();
gameState="GAMEENDPIC"
}
}

if(gameState==="GAMEENDPIC"){
gameOver=createSprite(displayWidth/2,250);
gameOver.addImage(gameOverImage);
gameOver.scale=9;  
}

function title(){
textSize(30);
fill("red");
stroke("black");
text("Score:"+Score,1750,-170);
      
textSize(20);
fill("red");
stroke("black");
text("Destroying Voldemort/Nagini/Bludger=2 points",20,-180);
text("Collecting the Snitch=5 points",20,-130);
text("Use the arrows to move Harry Potter",20,-80);
text("Score 20 points to win",20,-30);
text("Refresh the page if you want to try again",20,20)
}
function spawnVoldemort(){
var y;
y=Math.round(random(0,500));
Voldemort=createSprite(900,y);
Voldemort.addImage(VoldemortImage);
Voldemort.scale=0.7;
Voldemort.velocityX=-25;
Voldemort.setCollider("circle",0,0,100);
Voldemort.lifetime=210;
Voldemort.depth=Sky.depth;
Voldemort.depth=Voldemort.depth+1;
VoldemortGroup.add(Voldemort);
if(Voldemort.x<0){
Score=Score-2;
}
}

function spawnNagini(){
var n;
n=Math.round(random(0,500));
Nagini=createSprite(900,n);
Nagini.addImage(NaginiImage);
Nagini.scale=0.3;
Nagini.velocityX=-25;
Nagini.setCollider("circle",0,0,300);
Nagini.lifetime=210;
Nagini.depth=Sky.depth;
Nagini.depth=Nagini.depth+1;
NaginiGroup.add(Nagini);
if(Nagini.x<0){
Score=Score-2;
}
}

function spawnBludger(){
var n;
n=Math.round(random(0,500));
bludger=createSprite(900,n);
bludger.addImage(bludgerImage);
bludger.scale=0.3;
bludger.velocityX=-25;
bludger.setCollider("circle",0,0,150);
bludger.lifetime=210;
bludger.depth=Sky.depth;
bludger.depth=Sky.depth+1;
bludgerGroup.add(bludger);
if(bludger.x<0){
Score=Score-2;
}
}

function redlight(){
if (keyWentDown("space")){
redLight=createSprite(HP.x+225,HP.y+30,200,5);
redLight.velocityX=15;
redLight.shapeColor="red";
redLightGroup.add(redLight);
if (redLight.x>750){
redLight.destroy();
}
}
}

function spawnSnitch(){
if(frameCount%500===0){
var s;
s=Math.round(random(50,450));
snitch =createSprite(600,s,10,10);
snitch.addImage(SnitchImage);
snitch.scale=0.1;
snitch.velocityX=-20;
snitch.depth=Sky.depth;
snitch.depth=snitch.depth+1;
snitch.setCollider("circle",0,0,250);
snitchGroup.add(snitch);
}
}