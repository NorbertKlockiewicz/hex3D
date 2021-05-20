class Item extends THREE.Object3D {
    constructor() {
        super()
        this.radius = settings.getSettings().radius / 2
        this.geometry = settings.getSettings().geometry
        this.material = settings.getSettings().material
        this.item = new THREE.Mesh(this.geometry, this.material); // prostopadłościan - ściana hex-a
        this.item.scale.x = this.radius
        this.item.scale.y = this.radius
        this.item.scale.z = this.radius
        this.item.position.y = this.radius / 2
        this.add(this.item)
        return this
    }




}