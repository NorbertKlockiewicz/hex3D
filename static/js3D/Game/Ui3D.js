class Ui3D {
    constructor() {
        this.controlLights()
    }
    controlLights() {
        let lights = light.getLights()
        let containers = light.getContainers()
        $("#cam_pos").on("input", function () {
            base.setCamera(this.value)
        })
    }
}