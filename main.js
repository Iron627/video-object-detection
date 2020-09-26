function setup(){
    canvas = createCanvas(640,500);
    canvas.center();
    video.hide()   
    objectDetector = ml5.objectDetector("cocossd", modelLoaded) 
    statusElement.innerHML = "Status: Detecting Objects"
}
statusElement = document.getElementById("status")
status = ""
img = ""
objects = [];

function preload(){
 video = createVideo("video.mp4");
 video.hide()
}
function draw(){
    image(video,0,0,640,500);
    objectDetector.detect(video,getResults);
    if(status != ""){
   for (i = 0; i < objects.length; i++){
    fill("#ff0000");
  statusElement.innerHTML = "Status: Objects Detected"
  document.getElementById("obj_number").innerHTML = "No. of objects detected = " + objects.length;
  percent = Math.floor(objects[i].confidence * 100);
  text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
  noFill();
  stroke("#FF0000")
  rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
  
   }

    }
}
function modelLoaded(){
status = true;

}
function getResults(error,results){
if (error){
    console.error(error)
}
else{
    console.log(results)
    objects = results;
}
}
function start(){
    video.play()
}