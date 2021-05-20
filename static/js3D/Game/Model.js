
var container = new THREE.Object3D()
var mixer = null
class Model {

    constructor() {

    }

    loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();

        loader.load(url, function (geometry) {
            console.log(geometry)
            console.log(container)


            var modelMaterial = new THREE.MeshBasicMaterial(
                {
                    map: new THREE.TextureLoader().load("../Model/LadyDeath1.png"), // dowolny plik png, jpg
                    morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
                });
            // ładowanie modelu jak poprzednio
            var meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.name = "LadyDeath";
            meshModel.position.y = -settings.getSettings().radius / 9.3
            meshModel.rotation.y = Math.PI
            meshModel.scale.set(settings.getSettings().radius / 100, settings.getSettings().radius / 100, settings.getSettings().radius / 100); // ustaw skalę modelu
            //utworzenie mixera jak poprzednio
            //dodanie modelu do kontenera (na poprzednich zajęciach był to testowy sześcian)
            var axes = new THREE.AxesHelper(200 * settings.getSettings().axes)
            container.add(meshModel)
            container.add(axes)

            // zwrócenie kontenera
            mixer = new THREE.AnimationMixer(meshModel)
            callback(container);

        });
    }


    // update mixera

    updateModel(delta) {
        if (mixer) mixer.update(delta)
    }

    //animowanie postaci

    setAnimation(clip, model) {
        mixer.uncacheRoot(model)
        mixer.clipAction(clip).play();
    }

}
