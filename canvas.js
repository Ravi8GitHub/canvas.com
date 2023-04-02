var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillStyle = "#00ff0f";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "#00fff0";
// c.fillRect(300, 300, 100, 100);
// c.fillStyle = 'rgba(9, 0, 225, 0.5)';
// c.fillRect(0, 10, 100, 100);
// c.fillStyle = 'rgba(0, 200, 0, 0.5)';
// c.fillRect(400, 200, 100, 100);
// console.log(canvas);

//line
// c.beginPath();
// c.moveTo(100, 100);
// c.lineTo(400, 100);
// c.lineTo(300, 500);
// c.strokeStyle = "#ff0000";
// c.stroke();

//arc

// for(var i = 0; i < 50; i++){
    //     var x = Math.random() * window.innerWidth;
    //     var y = Math.random() * window.innerHeight;
    //     c.beginPath();
    //     c.arc(x, y, 30, 0, Math.PI * 2, false);
    //     c.strokeStyle = "orange";
    //     c.stroke();
    // }

var mouse = {
    x:undefined,
    y:undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9',
    '#f0f00f',
]

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(event);
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        // c.clearRect(0, 0, innerWidth, innerHeight);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius <0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius){
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius ) {
            this.radius -= 1;
        }

        this.draw();
    }
}  


var circleArray = [];
function init() {
    for (var i = 0; i < 1000; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius)) 
    }
}
init();


// var circle = new Circle(200, 200, 3, 3, 30);
// console.log(circleArray);
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    // circle.update();
    // c.beginPath();
    // c.arc(x, y, radius, 0, Math.PI * 2, false);
    // c.strokeStyle = "orange";
    // c.stroke();
}
animate();