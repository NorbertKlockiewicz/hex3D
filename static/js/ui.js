class Ui {
    constructor() {
    }
    DrawView(number, level) {
        tab = [];
        $("#table").html(tab)
        console.log(number)
        $("#main").html("")
        size = number
        console.log(size)
        for (let i = 0; i < number; i++) {
            for (let j = 0; j < number; j++) {
                if (i % 2 == 0) {
                    hex.hexcreate((105 * (j + 0.5)) + 125, 105 * i + 420, i, j)
                }
                else {
                    hex.hexcreate((105 * j) + 125, 105 * i + 420, i, j)
                }
            }
        }
        if (level != undefined) {
            console.log("server")
            this.Arrows(level)
        }
    }
    Arrows(level) {
        console.log(level)
        for (let i = 0; i < level.length; i++) {
            let hexagon = $("#" + level[i].x + "x" + level[i].y)
            console.log(hexagon)
            this.arrowdiv = $("<div>")
            this.arrowdiv.attr("id", "r" + level[i].dirOut)
            this.arrowdiv.attr("class", "arrow")
            this.arrowdiv.text(level[i].dirOut)
            this.image = $("<img height:24 width:24 src='gfx/arrow.png'></img>")
            this.arrowdiv.append(this.image)
            this.image.css("transform", "rotate(" + 60 * (level[i].dirOut) + "deg)")
            hexagon.append(this.arrowdiv)
            hex.tabforserver = level
        }
    }
}

