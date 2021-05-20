$(document).ready(function () {
    class Particles {
        constructor() {
            console.log("ZAŁADOWANO PARTICLES")
            this.drawFirePlace()
        }
        drawFirePlace() {
            var scene = new THREE.Scene();
            var axes = new THREE.AxesHelper(5000)
            scene.add(axes)
            var particleTab = []
            var camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                10000
            );
            var pWidth = 20;
            var amount = 50
            var speed = 10;
            let geometry1 = new THREE.PlaneGeometry(5000, 5000, 5, 5);
            let material1 = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide, wireframe: true });
            $("#width").on("input", function () {
                pWidth = this.value
                console.log(pWidth)
                generate()
            })
            $("#amount").on("input", function () {
                amount = this.value
                console.log(amount)
                generate()
            })
            $("#speed").on("input", function () {
                speed = this.value
                console.log(amount)

            })
            var material = new THREE.MeshBasicMaterial({
                color: 0x0055ff,
                transparent: true,
                opacity: 0.5,
                depthWrite: false,
                blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie ze sobą kolorów cząsteczek
            });
            var geometry = new THREE.TetrahedronGeometry(1, 1);
            function generate() {
                particleTab.forEach((particle) => {
                    scene.remove(particle)
                })
                for (let i = 0; i < amount; i++) {
                    scene.remove(particleTab[i])
                    console.log(pWidth)
                    var particle = new Particle(geometry, material.clone())
                    let scale = Math.floor((Math.random() * 5) + 1)
                    let x = Math.floor((Math.random() * pWidth) + 1);
                    let z = Math.floor((Math.random() * pWidth) + 1);
                    let y = Math.floor((Math.random() * 50) + 1);
                    particle.position.set(x, y, z)
                    particle.scale.set(scale, scale, scale)
                    particleTab.push(particle)
                    scene.add(particle)
                }
            }
            generate(pWidth)
            var plane = new THREE.Mesh(geometry1, material1);
            plane.position.set(0, 0, 0)
            plane.rotation.x = Math.PI / 2;

            var renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0x000000);
            renderer.setSize(window.innerWidth, window.innerHeight);
            $("#root").append(renderer.domElement);
            camera.position.set(100, 100, 100)
            camera.lookAt(0, 0, 0)

            var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
            orbitControl.addEventListener('change', function () {
                renderer.render(scene, camera)
            });

            function render() {

                requestAnimationFrame(render);

                let update = () => {
                    particleTab.forEach((particle) => {
                        let maxY = Math.floor((Math.random() * 60) + 45)
                        if (particle.position.y > maxY) {
                            let y = Math.floor((Math.random() * 30) + 1);
                            particle.position.y = y
                            particle.material.opacity = 1
                        }
                        let color1 = Math.floor((Math.random() * 1) + 1)
                        let color2 = Math.floor((Math.random() * 255) + 1)
                        let color3 = Math.floor((Math.random() * 255) + 1)
                        var color = new THREE.Color("rgb(" + color1 + "," + color2 + "," + color3 + ")")
                        particle.material.color = color
                        let speedR = (Math.floor(((Math.random() * 1) + 5)) / 100) * speed;
                        particle.position.y += speedR
                        particle.material.opacity -= 0.007

                    })
                }
                update()
                renderer.render(scene, camera);
            }


            render();
        }
    }
    particles = new Particles()
})