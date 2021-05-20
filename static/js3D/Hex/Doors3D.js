class Doors3D extends THREE.Object3D {
    constructor(i) {
        super()
        this.geometry = settings.getSettings().geometry
        this.material = settings.getSettings().material
        this.wall = new THREE.Mesh(this.geometry, this.material); // prostopadłościan - ściana hex-a
        this.radius = settings.getSettings().radius
        this.wall.scale.x = this.radius / 4
        this.wall.scale.y = this.radius
        this.wall.scale.z = this.radius / 10
        for (let i = 0; i < 2; i++) {
            var side = this.wall.clone()
            if (i == 1) {
                side.position.x = this.radius / 2.1
                this.add(side)
            }
            else {
                side.position.x = -(this.radius / 2.1)
                this.add(side)
            }
        }


        // nakierowanie ściany na środek kontenera 3D  
        return this;
    }



}