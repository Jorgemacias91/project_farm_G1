// http://localhost:8080/api/Reservation/report-dates/2020-01-01/2020-12-31
function informeReservaStatus() {
    $.ajax({
        url: `http://localhost:8080/api/Reservation/report-status`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_reservastatus").empty();
            pintarRespuesta(respuesta);
            
        }
    })
 }




function pintarRespuesta(items) {

    let myTable = "<table class='table' style='width:50%'>";

        myTable += "<thead>";
        myTable += "<tr>";
        myTable += "<th scope='col'>" + "RESERVAS CANCELADAS" + "</th>";
        myTable += "<th scope='col'>" + "RESERVAS COMPLETADAS" + "</th>";
        myTable += "</tr>"
        myTable += "</thead>"
        myTable += "<tbody>";
        myTable += "<tr>";
        myTable += "<th scope='row'>" + items.cancelled + "</th>";
        myTable += "<th scope='row'>" + items.completed + "</td>";
        myTable += "</tr>"
        myTable += "</tbody>"
    myTable += "</table>"
    $("#list_reservastatus").append(myTable);

}


