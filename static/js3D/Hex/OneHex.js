class OneHex {
    constructor() {
        this.display()
    }

    display() {
        var hex3D = new Hex3D()
        var scene = new THREE.Scene();
        var axes = new THREE.AxesHelper(5000)
        var hexData = settings.getSettings().testHex
        console.log(hexData)
        var hex = hex3D.drawHex(hexData.dirOut, hexData.dirIn, hexData.x, hexData.y, [], hexData.type, "oneHex")
        hex.position.y = 100
        scene.add(axes)
        scene.add(hex)

        var camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        let geometry1 = new THREE.PlaneGeometry(5000, 5000, 5, 5);
        let material1 = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, wireframe: true });
        var plane = new THREE.Mesh(geometry1, material1);
        plane.position.set(0, 0, 0)
        plane.rotation.x = Math.PI / 2;
        scene.add(plane)


        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x333333);
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(renderer)

        $("#root").append(renderer.domElement);

        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });


        camera.position.set(1000, 1000, 1000)
        camera.lookAt(0, 0, 0)
        function render() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
            requestAnimationFrame(render);

            renderer.render(scene, camera);
        }
        render();


    }

}
$(document).ready(function () {
    settings = new Settings()
    light = new Light()
    oneHex = new OneHex()

})