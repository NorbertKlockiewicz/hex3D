class Level3D {
    constructor() {

        this.getData()
    }
    getData() {
        $.ajax({
            url: "/handlePost",
            data: {},
            type: "POST",
            success: function (data) {
                console.log(data)
                level.drawLevel(data[0].level)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });

    }
    drawLevel(game) {
        var container = new THREE.Object3D()
        console.log(game)
        var entries = []
        game.forEach((level) => {
            container.add(hex3D.drawHex(parseInt(level.dirOut), parseInt(level.dirIn), parseInt(level.x), parseInt(level.y), entries, level.type, "notOne", game[game.length - 1].dirIn))
            entries.push(parseInt(level.dirIn))
        })
        base.draw3D(container, game[0].x)
        let ui3D = new Ui3D()
    }
}