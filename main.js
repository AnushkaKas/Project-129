song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scorerightWrist = 0;
scoreleftWrist = 0;

function preload() 
{
    song1 = loadSound("harrypotter.mp3");
    song2 = loadSound("tinkerbell.mp3");
}

function setup() 
{
    canvas = createCanvas(400, 400);
    canvas.center();
    canvas.position(400, 250);

    video = createCapture(400, 400);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() 
{
    console.log('Model Loaded');
}

function gotPoses(results) 
{
    if (results.length > 0) 
    {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoint[9].score;
        scorerightWrist = results[0].pose.keypoint[10].score;
        console.log("Score Left Wrist = " + scoreleftWrist + "Score Right Wrist = " + scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY); 

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
    }
}

function play() 
{
    song1.play();
    song2.play();
    song1.setVolume(1);
    song2.setVolume(1);
    song1.rate(1);
    song2.rate(1);
}


function draw() 
{
    image(video, 0, 0, 400, 400);
    fill("#FF0000");
    stroke("#FF0000");
    if (scorerightWrist > 0.2) 
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if (song1_status == false) 
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing Harry Potter Song";
        }
    }
    if (scoreleftWrist > 0.2) 
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if (song2_status == false) 
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing Tinker Bell Song";
        }
    }
}