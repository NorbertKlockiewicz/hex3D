class Fire extends THREE.Object3D {
    constructor(amount, pWidth) {
        super()
        this.material = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie ze sobą kolorów cząsteczek
        });
        this.light = new THREE.PointLight(0xff6600);
        this.light.intensity = 0.1
        this.x = 0
        this.z = 0
        this.geometry = new THREE.CubeGeometry(settings.getSettings().radius / 200, settings.getSettings().radius / 200, settings.getSettings().radius / 200);
        for (let i = 0; i < amount; i++) {
            var particle = new Particle(this.geometry, this.material.clone());
            let scale = Math.floor((Math.random() * 5) + 1)
            this.x = Math.floor((Math.random() * pWidth + 50) + 50) - 120;
            this.z = Math.floor((Math.random() * pWidth + 50) + 50) - 100;
            let y = Math.floor((Math.random() * 25) + 0);
            particle.position.set(this.x, y, this.z)
            particle.scale.set(scale, scale, scale)
            this.add(particle)
        }
        this.light.position.y = 20

        this.add(this.light)
    }

}