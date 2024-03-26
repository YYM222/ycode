    
    (function () {
        let a = document.createElement("canvas");
        a.id = "SpaceShuttle";
        a.innerHTML = `<style>
                            body {
                                background-color: transparent;
                                color: rgb(255, 255, 255);
                            }

                            #SpaceShuttle {
                                position: fixed;
                                top: 0px;
                                right: 0px;
                                z-index: -1;
                            }
                        </style>`;
        document.body.appendChild(a);


        var PARTICLE_NUM = 500;
        var PARTICLE_BASE_RADIUS = 0.5;
        var FL = 500;
        var DEFAULT_SPEED = 2;
        var BOOST_SPEED = 300;
        var canvas;
        var canvasWidth, canvasHeight;
        var context;
        var centerX, centerY;
        var mouseX, mouseY;
        var speed = DEFAULT_SPEED;
        var targetSpeed = DEFAULT_SPEED;
        var particles = [];
        (function () {
            canvas = document.querySelector("#SpaceShuttle");
            console.log(canvas);
            var c = function () {
                canvasWidth = canvas.width = window.innerWidth;
                canvasHeight = canvas.height = window.innerHeight;
                centerX = canvasWidth * 0.5;
                centerY = canvasHeight * 0.5;
                context = canvas.getContext("2d");
                context.fillStyle = "rgb(255, 255, 255)"
            };
            document.addEventListener("resize", c);
            c();
            mouseX = centerX;
            mouseY = centerY;
            for (var a = 0, b; a < PARTICLE_NUM; a++) {
                particles[a] = randomizeParticle(new Particle());
                particles[a].z -= 500 * Math.random()
            }
            document.addEventListener("mousemove", function (d) {
                mouseX = d.clientX;
                mouseY = d.clientY
            }, false);
            document.addEventListener("mousedown", function (d) {
                targetSpeed = BOOST_SPEED
            }, false);
            document.addEventListener("mouseup", function (e) {
                targetSpeed = DEFAULT_SPEED
            }, false);
            window.SpaceShuttle_time = setInterval(loop, 1000 / 60);
        })();
        function loop() {
            context.save();
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.restore();
            speed += (targetSpeed - speed) * 0.01;
            var n;
            var h, j;
            var v, w;
            var k, A, B, u;
            var o, s, t, q;
            var b, c, d;
            var l = Math.PI * 0.5;
            var e = Math.atan2;
            var g = Math.cos;
            var z = Math.sin;
            context.beginPath();
            for (var m = 0; m < PARTICLE_NUM; m++) {
                n = particles[m];
                n.pastZ = n.z;
                n.z -= speed;
                if (n.z <= 0) {
                    randomizeParticle(n);
                    continue
                }
                h = centerX - (mouseX - centerX) * 1.25;
                j = centerY - (mouseY - centerY) * 1.25;
                v = n.x - h;
                w = n.y - j;
                k = FL / n.z;
                A = h + v * k;
                B = j + w * k;
                u = PARTICLE_BASE_RADIUS * k;
                o = FL / n.pastZ;
                s = h + v * o;
                t = j + w * o;
                q = PARTICLE_BASE_RADIUS * o;
                b = e(t - B, s - A);
                c = b + l;
                d = b - l;
                context.moveTo(s + q * g(c), t + q * z(c));
                context.arc(s, t, q, c, d, true);
                context.lineTo(A + u * g(d), B + u * z(d));
                context.arc(A, B, u, d, c, true);
                context.closePath()
            }
            context.fill()
        }
        function randomizeParticle(a) {
            a.x = Math.random() * canvasWidth;
            a.y = Math.random() * canvasHeight;
            a.z = Math.random() * 1500 + 500;
            return a
        }
        function Particle(a, b, c) {
            this.x = a || 0;
            this.y = b || 0;
            this.z = c || 0;
            this.pastZ = 0
        }

    })()
