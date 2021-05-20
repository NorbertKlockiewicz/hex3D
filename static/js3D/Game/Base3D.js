
class Base3D {
    constructor() {
        this.settings = settings.getSettings()
        this.cameraPos = 5;
    }
    draw3D(container) {
        var scene = new THREE.Scene();


        var axes = new THREE.AxesHelper(1000 * this.settings.axes)
        scene.add(axes)
        var clock = new THREE.Clock();

        var camera = new THREE.PerspectiveCamera(
            45,    // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maksymalna renderowana odległość od kamery
        );
        var friends = [];
        var mymodel;
        var mymodelcont;
        var model = new Model()
        var axesModel;
        var sphere;
        var fireTab = []
        var amount = 300;
        var widthP = this.settings.radius / 8
        var speed = this.settings.radius / 6;


        model.loadModel("../Model/tris.js", (modeldata) => {
            mymodel = modeldata.children[0];
            axesModel = modeldata.children[1];
            var spotlight = light.drawSpotLight()
            modeldata.add(spotlight)
            var geometry = new THREE.SphereGeometry(5, 32, 32);
            var material = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0 });
            sphere = new THREE.Mesh(geometry, material);
            sphere.position.x = this.settings.radius / this.settings.radius / 10;
            sphere.position.y = -this.settings.radius;
            spotlight.target = sphere
            modeldata.add(sphere);
            modeldata.position.x = tabForPlayer[0].x
            modeldata.position.z = tabForPlayer[0].z
            mymodelcont = modeldata
            scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
            model.setAnimation("stand", mymodel);
            friends.push(mymodelcont)
            mymodelcont.position.y = 0
        })

        var allymodel;
        var allycont;
        var ally;
        var allyTab = []

        hex3D.getAlly().forEach((pos) => {

            ally = new AllyModel()
            allyTab.push(ally)
            ally.loadModel("../AllyModel/tris.js", (allydata) => {
                console.log("model został załadowany", allydata)
                allymodel = allydata.children[0];
                allymodel.name = "Ally"
                allydata.name = "Scarlet"
                allycont = allydata
                scene.add(allydata) // data to obiekt kontenera zwrócony z Model.js
                allydata.position.x = pos.x
                allydata.position.z = pos.z
                allydata.position.y = 0
                allymodel.rotation.y = Math.PI / 2
                ally.setAnimation("stand", allymodel);
            })
        })
        var fires = hex3D.getFire()


        for (let i = 0; i < fires.length; i++) {
            var fire = new Fire(amount, widthP)
            fire.position.set(fires[i].x, -this.settings.radius / 5, fires[i].z)
            fire.visible = false;
            scene.add(fire)
            fireTab.push(fire)
            console.log(fire)
        }
        var x = false;
        var z = false;
        var y = false;
        var v = false;
        var clickedAllyRing = null;

        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2()

        var directionVect = new THREE.Vector3(0, 0, 0);
        var clickedVect = new THREE.Vector3(0, 0, 0);

        scene.add(container)
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x222222);
        renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(renderer.domElement);
        camera.position.set(this.settings.radius * -1, this.settings.radius * 2.5, this.settings.radius * 1)
        camera.lookAt(scene.position)
        $("#root").on("contextmenu", (ev) => {
            ev.preventDefault();
        })
        $("#root").on("mousedown", () => {
            z = true;
            v = false;
            move()
            $("#root").on("mousemove", () => {
                v = true;
                if (z == true) {
                    move()

                }
            })

        })
        $("#root").on("mouseup", () => {
            z = false;
            v = false;
        })

        $("#root").on("mousemove", () => {
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {

                if (intersects[0].object.parent.name == "Scarlet" && intersects[0].object.parent.clicked != true) {

                    intersects[0].object.parent.children[2].visible = true
                    clickedAllyRing = intersects[0].object.parent.children[2]
                }
                else if (clickedAllyRing != null && intersects[0].object.parent.name != "Scarlet") {
                    clickedAllyRing.visible = false;
                }
            }
        })


        var playerPos;
        var clickedAllyCont;
        function move() {
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                if (intersects[0].object.parent.name != "Scarlet") {
                    if (x == false) {
                        model.setAnimation("run", mymodel);
                        if (friends.length > 1) {
                            for (let i = 1; i < friends.length; i++) {
                                friends[i].setAnimation("run")
                            }
                        }
                    }
                    clickedVect = intersects[0].point
                    clickedVect.y = 0
                    directionVect = clickedVect.clone().sub(mymodelcont.position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
                    directionVect.y = 0;

                    var angle = Math.atan2(
                        mymodelcont.position.clone().x - clickedVect.x,
                        mymodelcont.position.clone().z - clickedVect.z
                    )

                    axesModel.rotation.y = angle + Math.PI
                    mymodel.rotation.y = angle - Math.PI / 2;
                    x = true;

                }
                else if (intersects[0].object.parent.name == "Scarlet" && v == false) {
                    y = true
                    clickedAllyCont = intersects[0].object.parent
                    console.log(clickedAllyCont)
                    friends.push(clickedAllyCont)
                    playerPos = friends[friends.length - 2].position.clone().sub(friends[friends.length - 1].position).normalize()
                    var angle = Math.atan2(
                        intersects[0].object.parent.position.clone().x - mymodelcont.position.x,
                        intersects[0].object.parent.position.clone().z - mymodelcont.position.z
                    )
                    clickedAllyCont.remove(clickedAllyCont.children[2])
                    clickedAllyCont.name = "ClickedScar"
                    clickedAllyCont.children[1].rotation.y = angle + Math.PI;
                    clickedAllyCont.children[0].rotation.y = angle - Math.PI / 2;
                    clickedAllyCont.setAnimation("run")
                }
            }
        }
        var stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);
        var ang = 0;

        let render = () => {
            stats.begin();
            requestAnimationFrame(render);
            if (sphere != undefined) {
                sphere.position.x = Math.sin(ang / 20) * 60;
                sphere.position.z = Math.cos(ang / 20) * 60;
                ang += 0.5;
            }
            let update = () => {

                fireTab.forEach((fire) => {
                    if (mymodelcont) {
                        if (Math.floor(Math.round((mymodelcont.position.clone().distanceTo(fire.position)))) < this.settings.radius * 1.5) {
                            fire.visible = true;
                            fire.children.forEach((particle) => {
                                if (particle.type != "PointLight") {
                                    let maxY = Math.floor((Math.random() * this.settings.radius / 6) + this.settings.radius / 11)
                                    if (particle.position.y > maxY) {
                                        let y = Math.floor((Math.random() * this.settings.radius / 11) + 0);
                                        particle.position.y = y - this.settings.radius / 9
                                        particle.material.opacity = 1
                                    }
                                    let speedR = (Math.floor(((Math.random() * 1) + 5)) / 100) * speed;
                                    particle.position.y += speedR
                                    particle.material.opacity -= 0.007
                                }

                            })
                        }
                        else {
                            fire.visible = false;
                        }
                    }
                })

            }
            update()
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
            var delta = clock.getDelta();
            if (x == true) {
                if (Math.floor(Math.round((mymodelcont.position.clone().distanceTo(clickedVect)))) < this.settings.radius / 30) {
                    x = false
                    model.setAnimation("stand", mymodel);
                    if (friends.length > 1) {
                        for (let i = 1; i < friends.length; i++) {
                            friends[i].setAnimation("stand")
                        }
                    }
                }

                mymodelcont.rotation.y = directionVect.y
                mymodelcont.translateOnAxis(directionVect, this.settings.radius / 30)


                for (let i = 1; i < friends.length; i++) {

                    playerPos = friends[i - 1].position.clone().sub(friends[i].position).normalize()
                    if (x == true) {

                        var angle = Math.atan2(
                            friends[i].position.clone().x - friends[i - 1].position.x,
                            friends[i].position.clone().z - friends[i - 1].position.z
                        )
                        friends[i].children[1].rotation.y = angle + Math.PI;
                        friends[i].children[0].rotation.y = angle - Math.PI / 2;
                        if (Math.floor(Math.round(friends[i].position.clone().distanceTo(friends[i - 1].position))) > this.settings.radius / 3) {
                            friends[i].translateOnAxis(playerPos, this.settings.radius / 30)
                        }

                    }

                }
            }
            if (mymodelcont) {
                camera.position.x = mymodelcont.position.x + this.settings.radius * -this.cameraPos / 5
                camera.position.z = mymodelcont.position.z + this.settings.radius * this.cameraPos / 5
                camera.position.y = mymodelcont.position.y + this.settings.radius * this.cameraPos / 2
                camera.lookAt(mymodelcont.position)
            }
            if (y == true && friends.length > 1) {
                if (Math.floor(Math.round(friends[friends.length - 1].position.clone().distanceTo(friends[friends.length - 2].position))) < this.settings.radius / 3) {
                    if (x == false) {
                        friends[friends.length - 1].setAnimation("stand")
                    }
                    y = false
                }
                friends[friends.length - 1].rotation.y = playerPos.y
                friends[friends.length - 1].translateOnAxis(playerPos, this.settings.radius / 30)


            }
            model.updateModel(delta)
            allyTab.forEach((scar) => {
                scar.updateModel()
            })
            stats.end();
        }
        render();
    }

    setCamera(camPos) {
        this.cameraPos = camPos
    }
}