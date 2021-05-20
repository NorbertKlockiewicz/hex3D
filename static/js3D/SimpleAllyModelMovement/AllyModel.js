class AllyModel extends THREE.Object3D {

    constructor() {
        super()
        this.mesh = null
        this.mixer = null
        this.clock = new THREE.Clock();
        this.settings = settings.getSettings()
        this.axes = new THREE.AxesHelper(200 * this.settings.axes)
        this.ring = null
    }

    loadModel(url, callback) {

        let that = this
        let loader = new THREE.JSONLoader();

        loader.load(url, function (geometry) {
            var modelMaterial = new THREE.MeshBasicMaterial(
                {
                    map: new THREE.TextureLoader().load("../AllyModel/scarlet.png"),
                    morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
                });

            var geometryR = new THREE.RingGeometry(settings.getSettings().radius / 10, settings.getSettings().radius / 6, 6);
            var materialR = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
            var geometryC = new THREE.BoxGeometry(settings.getSettings().radius / 10, settings.getSettings().radius, settings.getSettings().radius / 10);
            var materialC = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0, transparent: true, });
            var cube = new THREE.Mesh(geometryC, materialC);
            that.ring = new Ring(geometryR, materialR)
            that.ring.rotation.x = Math.PI / 2
            that.ring.position.y = 0
            that.mesh = new THREE.Mesh(geometry, modelMaterial) // w materiale morphTargets:true
            that.ring.visible = false;
            that.mesh.name = "Ally"
            that.mesh.rotation.y = -50
            setInterval(() => {
                that.ring.rotation.z += Math.PI / 5
            }, 100)


            that.mesh.scale.set(settings.getSettings().radius / 100, settings.getSettings().radius / 100, settings.getSettings().radius / 100);

            that.mixer = new THREE.AnimationMixer(that.mesh);

            that.mixer.clipAction("stand").play();

            that.mixer.timeScale = 1 // szybkość wykonywania animacji, można ją dostosować do projektu
            //
            that.add(that.mesh)
            that.add(that.axes)
            that.add(that.ring)
            that.add(light.drawAllyLight())
            that.add(cube)
            callback(that);

        });
    }

    // funkcja aktualizująca animację modelu

    updateModel() {
        var delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta)
    }

    //funkcja do zmiany animacji

    setAnimation(animationName) {
        if (this.mixer) {
            this.mixer.uncacheRoot(this.mesh)
            this.mixer.clipAction(animationName).play();
        }
    }

}