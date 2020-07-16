//Create variables here
var dogimg, happydogimg, database, foodS, foodStock;
var dog;

function preload()
{
  //load images here
  dogimg=loadImage('images/dogImg.png');
  happydogimg=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,300,10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  console.log(foodStock);
  
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happydogimg);
    dog.scale=0.2;
  }
  drawSprites();
  fill("red");
  textSize(30);
  text("foodLeft: "+foodS,100,100);
  //add styles here
   noFill();
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x<=0){
  x=0;
}
else{
  x=x-1;
}
  database.ref('/').update({Food:x})
}