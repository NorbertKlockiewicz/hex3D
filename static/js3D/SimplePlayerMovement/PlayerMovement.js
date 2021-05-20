class PlayerMovement {
    constructor() {
        this.display()
    }

    display() {


        var x = false;
        var y = false;

        var player = new Player();
        console.log(player)
        var scene = new THREE.Scene();
        var axes = new THREE.AxesHelper(5000)

        scene.add(axes)
        var z;
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2()
        var geometry = new THREE.SphereGeometry(15, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        var directionVect = new THREE.Vector3(0, 0, 0);
        var clickedVect = new THREE.Vector3(0, 0, 0);
        $("#root").on("contextmenu", (ev) => {
            ev.preventDefault();
        })
        $("#root").on("mousedown", () => {
            z = true;

            move()
            $("#root").on("mousemove", () => {

                if (z == true) {
                    move()

                }
            })

        })
        $("#root").on("mouseup", () => {
            z = false;

        })

        let move = () => {
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                clickedVect = intersects[0].point
                clickedVect.y = 0;
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
        }

        var camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        let geometry1 = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        let material1 = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide, wireframe: true });
        var plane = new THREE.Mesh(geometry1, material1);
        plane.position.set(0, 0, 0)
        plane.rotation.x = Math.PI / 2;
        scene.add(plane)
        scene.add(player.getPlayerCont())
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x333333);
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(renderer)
        $("#root").append(renderer.domElement);
        console.log($("#root"))
        camera.position.set(1000, 1000, 1000)
        camera.lookAt(0, 0, 0)
        function render() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
            requestAnimationFrame(render);
            if (x == true) {
                console.log(Math.floor(Math.round((player.getPlayerCont().position.clone().distanceTo(clickedVect)))))
                if (Math.floor(Math.round((player.getPlayerCont().position.clone().distanceTo(clickedVect)))) < 10) {
                    x = false
                }
                player.getPlayerCont().rotation.y = directionVect.y
                player.getPlayerCont().translateOnAxis(directionVect, 10)  // 5 - przewidywany speed czyli względna szybkość ruchu po planszy

                camera.position.x = player.getPlayerCont().position.x + 1000
                camera.position.z = player.getPlayerCont().position.z + 1000
                camera.position.y = player.getPlayerCont().position.y + 1000
                camera.lookAt(player.getPlayerCont().position)
            }
            renderer.render(scene, camera);
        }
        render();


    }

}
$(document).ready(function () {
    var playerMovement = new PlayerMovement()
})