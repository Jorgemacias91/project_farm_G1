// http://localhost:8080/api/Reservation/report-dates/2020-01-01/2020-12-31
function informeReservaDate() {
    let startDate = $("#startdate").val();
    let endDate = $("#enddate").val();

    $.ajax({
        url: `http://localhost:8080/api/Reservation/report-dates/${startDate}/${endDate}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_reservadate").empty();
            pintarRespuesta(respuesta);
        }
    })
}




function pintarRespuesta(items) {

    let myTable = "<table class='table'>";
    if (items.length > 0) {
        myTable += "<thead>";
        myTable += "<tr>";
        myTable += "<th scope='col'>" + "ID" + "</th>";
        myTable += "<th scope='col'>" + "FECHA INICIO" + "</th>";
        myTable += "<th scope='col'>" + "FECHA FIN" + "</th>";
        myTable += "<th scope='col'>" + "STATUS" + "</th>";
        myTable += "<th scope='col'>" + "FINCA" + "</th>";
        myTable += "<th scope='col'>" + "CLIENTE" + "</th>";
        myTable += "<th scope='col'>" + "SCORE" + "</th>";
        myTable += "</tr>"
        myTable += "</thead>"
    }

    for (i = 0; i < items.length; i++) {

        var dateStart = dateFormat(items[i]).dateStart;
        var dateDevolution = dateFormat(items[i]).dateDevolution;

        myTable += "<tbody>";
        myTable += "<tr>";
        myTable += "<th scope='row'>" + items[i].idReservation + "</th>";
        myTable += "<td>" + dateStart + "</td>";
        myTable += "<td>" + dateDevolution + "</td>";
        myTable += "<td>" + items[i].status + "</td>";
        myTable += "<td>" + items[i].farm.name + "</td>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "<td>" + items[i].score + "</td>";
        myTable += "</tr>"
        myTable += "</tbody>"
    }
    myTable += "</table>"
    $("#list_reservadate").append(myTable);
}


function dateFormat(items) {
    var sDate = items.startDate.split("T");
    var sDateSplit = sDate[0].split("-")
    var dateStart = `${sDateSplit[2]}/${sDateSplit[1]}/${sDateSplit[0]}`;
    var eDate = items.devolutionDate.split("T");
    var eDateSplit = eDate[0].split("-");
    var dateDevolution = `${eDateSplit[2]}/${eDateSplit[1]}/${eDateSplit[0]}`;

    const result = {
        dateStart,
        dateDevolution,
        dateStartAMD : sDate[0],
        dateDevolutionAMD: eDate[0]
    }

    return result
}