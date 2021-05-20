class Ring extends THREE.Mesh {
    constructor(geometry, material) {
        super(geometry, material) // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        console.log(this)
        this.position.y = 25;

    }

}

