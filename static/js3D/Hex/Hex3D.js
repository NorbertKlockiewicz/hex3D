var allyContainer
var tabForPlayer = [];
class Hex3D {
    constructor() {
        this.allyTab = []
        this.fireTab = []

    }
    drawHex(doors1, doors2, planeX, planeZ, entries, roomType, whichLight, firstDoors) {



        let geometry = settings.getSettings().geometry
        let material = settings.getSettings().material

        if (entries.length > 0) {
            doors2 = entries[entries.length - 1]
        }
        else {
            console.log("TAK")
            doors2 = firstDoors
        }
        let geometryFloor = settings.getSettings().geometryFloor
        let materialFloor = settings.getSettings().materialFloor

        var radius = settings.getSettings().radius // zmienna wielkość hexagona, a tym samym całego labiryntu
        var container = new THREE.Object3D() // kontener na obiekty 3D



        var wall = new THREE.Mesh(geometry, material); // prostopadłościan - ściana hex-a
        wall.scale.x = radius + (radius / 5)
        wall.scale.y = radius
        wall.scale.z = radius / 10

        switch (roomType) {
            case "WALLS":
                //wall.material.color.setHex(0x0000ff)
                break;
            case "ENEMY":
                let obj;
                if (planeX % 2 == 0) {

                    obj = { x: (radius * 1.9 * planeX), z: ((radius * 2.1) * (planeZ + (radius / (radius * 1.89)))) }
                }
                else {
                    obj = {
                        x: (radius * 1.9 * planeX),
                        z: ((radius * 2.1) * planeZ + 1)
                    }
                }
                this.allyTab.push(obj)

                break;
            case "TREASURE":
                var item = new Item()
                container.add(item)
                break;
            case "LIGHT":
                if (whichLight != "notOne") { container.add(light.drawLight()) }
                else {
                    let objF;
                    if (planeX % 2 == 0) {

                        objF = { x: (radius * 1.9 * planeX), z: ((radius * 2.1) * (planeZ + (radius / (radius * 1.89)))) }
                    }
                    else {
                        objF = {
                            x: (radius * 1.9 * planeX),
                            z: ((radius * 2.1) * planeZ + 1)
                        }
                    }
                    this.fireTab.push(objF)
                }
                break;
            default:
        }


        var cylinder = new THREE.Mesh(geometryFloor, materialFloor);
        cylinder.scale.x = radius + (radius / 3.3)
        cylinder.scale.z = radius + (radius / 3.3)
        cylinder.rotation.y = 1 / 2
        cylinder.position.y = radius / 2

        container.add(cylinder);

        for (var i = 0; i < 6; i++) {
            var side = wall.clone()
            if (i == doors1 || i == doors2) {
                var doors = new Doors3D(i)
                side = doors
            }
            side.position.z = (radius + (radius / 15)) * Math.cos(i * (Math.PI / 3))
            side.position.x = (radius + (radius / 15)) * Math.sin(i * (Math.PI / 3))
            side.position.y = 0;
            side.lookAt(container.position)
            container.add(side)
        }
        container.rotation.x = Math.PI
        container.rotation.y = Math.PI
        if (planeX % 2 == 0) {
            container.position.x = (radius * 1.9 * planeX)
            container.position.z = ((radius * 2.1) * (planeZ + (radius / (radius * 1.89))))
            let objM = { x: (radius * 1.9 * planeX), z: ((radius * 2.1) * (planeZ + (radius / (radius * 1.89)))) }
            tabForPlayer.push(objM)

        }
        else {
            container.position.x = (radius * 1.9 * planeX)
            container.position.z = ((radius * 2.1) * planeZ + 1)
            let objM = { x: (radius * 1.9 * planeX), z: ((radius * 2.1) * planeZ + 1) }
            tabForPlayer.push(objM)
        }
        container.position.y = 30
        return container
    }
    getAlly() {
        return this.allyTab;
    }
    getFire() {
        return this.fireTab;

    }
}