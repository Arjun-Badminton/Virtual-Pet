//Create variables here
var dog, happyDog, dogImg, happyDogImg, database, foodS, foodStock; 

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
 
  dog = createSprite(250,250,20,20);
 dog.addImage(dogImg);
 dog.scale = 0.1;

database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readstock);
}


function draw() {  
  background(46,139,87);
  
  //add styles here
  textSize(15);
  stroke(20);
  text("Note : Press UP_ARROW Key To Feed Drago Milk",100,20);
  fill("Green")

  if(keyWentDown(UP_ARROW)){
  dog.addImage(happyDogImg);
  writeStock(foodS);
}

if(keyWentDown(DOWN_ARROW)){
  dog.addImage(dogImg);
  writeStock(foodS);
}

drawSprites();
}

function readstock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}