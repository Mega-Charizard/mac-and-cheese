status_1 = "";
objects = [];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function modelLoaded()
{
    console.log("model has loaded");
    status_1 = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else 
    {
        console.log(results);
        objects = results
    }
}

function draw()
{
    image(video,0,0,380,380);
    if (status_1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "status: objects detected";
        for (i = 0; i < objects.length; i++)
        {
            fill(r,g,b)
            document.getElementById("number_of_objects").innerHTML = " number of objects detected are: " + objects.length;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function leave()
{
    window.location = "index.html";
}