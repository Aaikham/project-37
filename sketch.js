var database;
var dog,dogfeeding;
var store;
var milk;
var dogsprite;
var livingroom,bathroom,garden,foodstock,feed,refill,lastfeed
function preload()
{
  
  dog=loadImage("images/dogImg.png")
  dogfeeding=loadImage("images/dogImg1.png")
  livingroom=loadImage("images/Living Room - Copy.png")
  garden=loadImage("images/Garden - Copy.png")
  foodstock=loadImage("images/Food Stock - Copy.png")
  bathroom=loadImage("images/Wash Room - Copy.png")

}

function setup() {
  createCanvas(800, 800);
  database=firebase.database()
  feed=createButton("feed");
  feed.position(400,400)
  refill=createButton("refill");
  refill.position(400,370);
  var foodvalue=database.ref('food/count')
  
  foodvalue.on("value",readvalue,error)
  var time=database.ref('food/Time')
  time.on("value",readtime,error)
  
}


function draw() { 
  background(foodstock) 
feed.mousePressed(function(){
  write()
})
  var currenttime=hour()
  if(lastfeed+2==currenttime){
    background(livingroom)
    feed.hide()
      refill.hide()
    
  }
 else if(lastfeed+3==currenttime)

{
  background(bathroom)
  feed.hide()
  refill.hide()
}
else if(lastfeed+4==currenttime){
  background(garden)
  feed.hide()
  refill.hide()
}
  drawSprites();
  if(store!=undefined){
  text("remaining food:"+store,150,150)}

}
function readvalue(data)
{
store=data.val()

}
function error(){
  console.log("read operation was unsuccessfull")
}
function write(){
database.ref('food').set({
  'count':store-1,
  'Time':hour()
})
}
 function readtime(data){
   lastfeed=data.val()
 } 

