class AllyMovement {
    constructor() {
        this.display()
    }

    display() {
        var x = false;
        var y = false;
        var alliesTab = [];
        var player = new Player();
        var allyTest = new AllyTest()
        var z;
        var v;

        var scene = new THREE.Scene();
        var axes = new THREE.AxesHelper(5000)
        scene.add(allyTest)
        allyTest.position.x = 100
        allyTest.rotation.y = 0
        scene.add(axes)

        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2()
        var geometry = new THREE.SphereGeometry(15, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        var directionVect = new THREE.Vector3(0, 0, 0);
        var clickedVect = new THREE.Vector3(0, 0, 0);
        var playerPos = new THREE.Vector3(0, 0, 0);
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


        let move = () => {
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);


            if (intersects.length > 0) {
                if (intersects[0].object.parent.name != "TEST") {

                    clickedVect = intersects[0].point
                    clickedVect.y = 0

                    directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia

                    sphere.position.set(clickedVect.x, 0, clickedVect.z)
                    var angle = Math.atan2(
                        player.getPlayerCont().position.clone().x - clickedVect.x,
                        player.getPlayerCont().position.clone().z - clickedVect.z
                    )

                    player.getPlayerMesh().rotation.y = angle
                    player.getPlayerAxes().rotation.y = angle + Math.PI
                    x = true;
                }
                else if (intersects[0].object.parent.name == "TEST" && v != true) {
                    intersects[0].object.parent.name = "CLICKEDTEST"

                    alliesTab.push(intersects[0].object.parent)
                    playerPos = player.getPlayerCont().position.clone().sub(alliesTab[alliesTab.length - 1].position).normalize()
                    var angle = Math.atan2(
                        intersects[0].object.parent.position.clone().x - player.getPlayerCont().position.x,
                        intersects[0].object.parent.position.clone().z - player.getPlayerCont().position.z
                    )
                    intersects[0].object.parent.children[0].rotation.y = angle + Math.PI;
                    intersects[0].object.parent.rotation.y = angle + Math.PI;
                    y = true;

                }
            }
        }

        var camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        let geometry1 = new THREE.PlaneGeometry(5000, 5000, 5, 5);
        let material1 = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide, wireframe: true });
        var plane = new THREE.Mesh(geometry1, material1);
        plane.position.set(0, 0, 0)
        plane.rotation.x = Math.PI / 2;
        scene.add(plane)
        alliesTab.push(player.getPlayerCont())
        scene.add(player.getPlayerCont())
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x333333);
        renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(renderer.domElement);
        camera.position.set(1000, 1000, 1000)
        camera.lookAt(0, 0, 0)
        function render() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
            requestAnimationFrame(render);
            if (x == true) {
                if (Math.floor(Math.round((player.getPlayerCont().position.clone().distanceTo(clickedVect)))) < 10) {
                    x = false
                }

                player.getPlayerCont().rotation.y = directionVect.y
                player.getPlayerCont().translateOnAxis(directionVect, 10)  // 5 - przewidywany speed czyli względna szybkość ruchu po planszy
                for (let i = 1; i < alliesTab.length; i++) {

                    playerPos = alliesTab[i - 1].position.clone().sub(alliesTab[i].position).normalize()

                    if (x == true) {
                        console.log("INUAFU(DSUFN(b")
                        var angle = Math.atan2(
                            alliesTab[i].position.clone().x - alliesTab[i - 1].position.x,
                            alliesTab[i].position.clone().z - alliesTab[i - 1].position.z
                        )
                        alliesTab[i].children[0].rotation.y = angle + Math.PI;
                        alliesTab[i].children[1].rotation.y = angle + Math.PI;
                        if (Math.floor(Math.round(alliesTab[i].position.clone().distanceTo(alliesTab[i - 1].position))) > 150) {
                            alliesTab[i].translateOnAxis(playerPos, 10)
                        }
                    }
                }

                camera.position.x = player.getPlayerCont().position.x + 1000
                camera.position.z = player.getPlayerCont().position.z + 1000
                camera.position.y = player.getPlayerCont().position.y + 1000
                camera.lookAt(player.getPlayerCont().position)
            }
            if (y == true && alliesTab.length > 1) {
                console.log(alliesTab[alliesTab.length - 1].position.clone().distanceTo(player.getPlayerCont().position))
                if (Math.floor(Math.round(alliesTab[alliesTab.length - 1].position.clone().distanceTo(alliesTab[alliesTab.length - 2].position))) < 150) {
                    y = false
                }
                alliesTab[alliesTab.length - 1].rotation.y = playerPos.y
                alliesTab[alliesTab.length - 1].translateOnAxis(playerPos, 10)

            }
            renderer.render(scene, camera);
        }
        render();


    }

}
$(document).ready(function () {
    settings = new Settings()
    light = new Light()
    allyMovement = new AllyMovement()

})