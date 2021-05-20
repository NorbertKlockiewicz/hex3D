class Light {
    constructor() {

        this.arrayOfContainers = []
        this.arrayOfLights = []
        this.allyLights = []
    }
    drawLight() {

        let container = new THREE.Object3D()
        var light = new THREE.PointLight(0xffffff);
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
        var sphere = new THREE.Mesh(geometry, material);
        light.intensity = 1
        container.add(light)
        container.add(sphere)
        this.arrayOfLights.push(light)
        this.arrayOfContainers.push(container)
        container.position.y = -40;
        return container;
    }

    drawAllyLight() {
        var light = new THREE.PointLight(0x0000ff);
        light.intensity = 0.2
        light.position.y = 0
        this.allyLights.push(light)
        return light;
    }
    drawSpotLight() {
        var light = new THREE.SpotLight(0xff0000);
        light.intensity = 0.2
        return light;
    }

    getContainers() {
        return this.arrayOfContainers;
    }
    getLights() {
        return this.arrayOfLights;
    }
    getAllyLights() {
        return this.allyLights;
    }
}