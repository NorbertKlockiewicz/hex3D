class Player {

    constructor() {

        this.container = new THREE.Object3D()

        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            wireframe: true,
        });
        this.player = new THREE.Mesh(geometry, material);
        this.container.add(this.player) // kontener w którym jest player

        this.axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu

        this.container.add(this.axes)
        //funkcja zwracająca cały kontener
    }
    getPlayerCont() {
        return this.container
    }

    //funkcja zwracająca playera czyli sam sześcian

    getPlayerMesh() {
        return this.player
    }
    getPlayerAxes() {
        return this.axes
    }

}