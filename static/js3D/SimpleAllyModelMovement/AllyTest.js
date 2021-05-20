class AllyTest extends THREE.Object3D {

    constructor() {
        super()
        //
        this.container =
            this.mesh = new THREE.Mesh(
                new THREE.SphereGeometry(70, 6, 6),
                new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
            );
        this.name = "TEST"
        console.log(this.mesh)
        this.add(new THREE.AxesHelper(200))
        this.add(this.mesh)
    }

}