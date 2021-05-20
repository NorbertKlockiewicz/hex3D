class Net {
    constructor() {

    }
    Send(s) {
        console.log(size)
        window.alert("Level saved in database")
        $.ajax({
            url: s,
            data: { size: size, level: tab },
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(data)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    Get() {

        $.ajax({
            url: "/handlePost",
            data: {},
            type: "POST",
            success: function (data) {
                console.log(data[0].level);
                ui.DrawView(data[0].size, data[0].level)
                $("#table").text(JSON.stringify(data[0].level, null, 2))
                tab = data[0].level
                window.alert("Level downloaded from database")

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}