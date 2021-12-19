var ball, db;
var position;


function setup(){
  db = firebase.database();//creating nickname for the firebase
  console.log(db);
  createCanvas(500,500);

  ball = createSprite(250,250,10,10);
  ball.shapeColor = "red";

  db.ref('ball/position').on("value", read)
  //.on is a function that creates a listener for the refered property in the database
//.ref-make a reference
//refering the position property to the ball property
//.on will report the changes ocorring inside the refered property to the read function(callback)
//when one fuction is used as a paremerter of another function is as called as callback

  /*var ballPosition = db.ref('ball/position');
  ballPosition.on("value", read);*/
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      write(-1,0);
      //changePosition(-1,0)
    }
    else if(keyDown(RIGHT_ARROW)){
      write(1,0);
      //changePosition(1,0)
    }
    else if(keyDown(UP_ARROW)){
      write(0,-1);
      //changePosition(0,-1)
    }
    else if(keyDown(DOWN_ARROW)){
      write(0,+1);
      //changePosition(0,+1)
    }
    drawSprites();
  
}

function changePosition(a,b){
  ball.x = ball.x + a
  ball.y = ball.y + b
}
function write(a,b){
  db.ref('ball/position').update({
    //the paramerter of update function is a object(JSON also)
    'x': ball.x + a,
    'y': ball.y + b
  })
}

function read(ReceivedData){
  //the paramerter of read is the information recieved from .on
  p = ReceivedData.val();
  //storing the value of RecievedData inside "p"
  console.log(p.x);
  ball.x = p.x;
  ball.y = p.y;
}

