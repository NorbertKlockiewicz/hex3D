$(document).ready(function () {
    class Fireplaces {
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
            var pWidth = 5;
            var amount = 100;
            var speed = 5;
            var firstGenerate = true;
            var lightTab = []
            var fireTab = []
            let geometry1 = new THREE.PlaneGeometry(5000, 5000, 5, 5);
            let material1 = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide, wireframe: false });
            var plane = new THREE.Mesh(geometry1, material1);
            plane.position.set(0, 0, 0)
            plane.rotation.x = Math.PI / 2;
            scene.add(plane)
            var light = new THREE.PointLight(0xff6600);
            light.intensity = 10
            $("#size").off("input").on("input", function () {
                amount = this.value
                pWidth = this.value / 10
                console.log(amount)
                firstGenerate = false;
                generate()
            })
            function generate() {
                console.log(scene)

                for (let j = 0; j < 10; j++) {
                    // if (firstGenerate == false) {
                    //     fireTab.forEach((fire) => {
                    //         scene.remove(fire)
                    //     })
                    //     fireTab = []
                    //     particleTab = []
                    //     lightTab = []
                    // }
                    var fire = new Fire(amount, pWidth, j)
                    scene.add(fire)
                    fireTab.push(fire)
                    fire.position.set(50 * Math.sin(j * Math.PI / 5), 0, 50 * Math.cos(j * Math.PI / 5))
                    fire.children.forEach((particle) => {
                        if (particle.type != "PointLight") {
                            let x = Math.floor((Math.random() * pWidth) + 0);
                            let z = Math.floor((Math.random() * pWidth) + 0);
                            let y = Math.floor((Math.random() * 30) + 1);
                            particle.position.x = particle.parent.position.x + x
                            particle.position.z = particle.parent.position.z + z
                            particle.position.y = y
                        }
                        else {
                            particle.position.x = particle.parent.position.x + pWidth / 2
                            particle.position.z = particle.parent.position.z + pWidth / 2
                        }
                    })
                    fire.children.forEach((particle) => {
                        if (particle.type != "PointLight")
                            particleTab.push(particle)
                        else
                            lightTab.push(particle)
                    })
                }

            }


            generate()

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
            var stats = new Stats();
            stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(stats.dom);

            // monitored code goes here



            function render() {
                stats.begin();
                requestAnimationFrame(render);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.render(scene, camera);
                let update = () => {
                    let maxY = Math.floor((Math.random() * pWidth * 3) + pWidth)
                    particleTab.forEach((particle) => {
                        if (particle.position.y > maxY) {
                            let y = Math.floor((Math.random() * pWidth * 3) + 1);
                            particle.position.y = y
                            particle.material.opacity = 1
                        }

                        let speedR = (Math.floor(((Math.random() * 1) + 5)) / 50) * speed;
                        particle.position.y += speedR
                        particle.material.opacity -= 0.0005

                    })

                }

                update()

                stats.end();
                renderer.render(scene, camera);
            }


            render();
        }
    }
    fireplaces = new Fireplaces()
})