class Settings {
    constructor() {
        console.log("Settings")
    }

    getSettings() {

        let settings = {
            radius: 200,
            geometry: new THREE.BoxGeometry(1, 1, 1),
            material: new THREE.MeshPhongMaterial({
                specular: 0xffffff,
                map: new THREE.TextureLoader().load('gfx/wallWood.jpg'),
                shininess: 50,
                side: THREE.DoubleSide,
            }),
            geometryFloor: new THREE.CylinderGeometry(1, 1, 1, 6),
            materialFloor: new THREE.MeshPhongMaterial({
                specular: 0xffffff,
                map: new THREE.TextureLoader().load('gfx/wallWood.jpg'),
                shininess: 50,
                side: THREE.DoubleSide,
            }),
            axes: 0,
            testHex: {
                dirOut: 4,
                dirIn: 1,
                x: 0,
                y: 0,
                id: 0,
                type: "LIGHT"
            }
        }

        return settings;
    }
}