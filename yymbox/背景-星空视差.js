
(function () {
    const canvas = document.createElement("canvas");
    canvas.id = "space";
    canvas.innerHTML = `
    <style>
        body {
            background-color: transparent;
            color: #ffeb3b;
        }

        #space {
            width: 100vw;
            position: fixed;
            top: 0px;
            right: 0px;
            z-index: -1;
            background-color: #000;
        }
    </style>
    `;

    // var canvas = document.querySelector("#space");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var stars = [];
    var numStars = 100;
    var speed = 10;
    function makeStar() {
        return {
            x: Math.random(),
            y: Math.random(),
            distance: Math.sqrt(Math.random()),
            color:
                "hsl(" +
                Math.random() * 40 +
                ",100%," +
                (70 + Math.random() * 30) +
                "%)",
        };
    }
    for (i = 0; i < numStars; i++) {
        stars[i] = makeStar();
    }
    function updateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < numStars; i++) {
            stars[i].x -= (Math.pow(stars[i].distance, 2) / canvas.width) * speed;
            if (stars[i].x <= 0) {
                stars[i] = makeStar();
                stars[i].x = 1;
            }
            ctx.beginPath();
            ctx.arc(
                stars[i].x * canvas.width,
                stars[i].y * canvas.height,
                stars[i].distance * 2,
                0,
                2 * Math.PI,
                false
            );
            ctx.lineWidth = stars[i].distance * 4;
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.stroke();
            ctx.fillStyle = stars[i].color;
            ctx.fill();
        }
    }
    setInterval(function () {
        updateStars();
    }, 30);
})()
