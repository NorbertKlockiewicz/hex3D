class Hex {

    constructor() {
        this.i = 0;
        this.tabforserver = []
    }

    hexcreate(top, left, x, y) {
        this.hex = $('<div>')
        this.hex.attr("class", "hexagon")
        this.hex.attr("id", x + "x" + y)
        this.hex.css("position", "absolute")
        this.hex.css("top", top + "px")
        this.hex.css("left", left + "px")
        $("#main").append(this.hex)
        this.hexClick()

    }
    hexClick() {
        let check = -1;
        let num = 0;
        let num2 = 0;
        this.hex.on("click", function () {
            console.log(tab)
            let clickedhex = $(this)
            let child = clickedhex.children().attr("id")
            if (child == undefined) {
                num = 0;
                num2 = 3;
            }
            else {
                let tabChild = child.split("r");
                num = parseInt(tabChild[1]) + 1;
                num2++
                if (num > 5) {
                    num = 0
                    num2 = 3
                }
                else if (num2 > 5) {
                    num2 = 0
                }
                console.log(num2)
            }
            clickedhex.html("")
            let arrowdiv = $("<div>")
            arrowdiv.attr("id", "r" + num)
            arrowdiv.attr("class", "arrow")
            arrowdiv.text(num)
            let image = $("<img height:24 width:24 src='gfx/arrow.png'></img>")
            arrowdiv.append(image)
            image.css("transform", "rotate(" + 60 * (num) + "deg)")
            console.log(arrowdiv)
            console.log(clickedhex)
            clickedhex.append(arrowdiv)
            let id = clickedhex.attr("id")
            let helper = id.split("x")
            console.log(num2)
            let obj = { dirOut: num, dirIn: num2, x: helper[0], y: helper[1], id: id, type: blocktype }
            for (let i = 0; i < tab.length; i++) {
                if (tab[i].id == obj.id) {
                    check = i;
                }
            }
            if (check != -1)
                tab[check] = obj
            else
                tab.push(obj)

            console.log(tab)
            $("#table").html(JSON.stringify(tab, null, 2))
        })

    }
}