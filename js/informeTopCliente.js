
function topCliente() {
    $.ajax({
        url: `http://localhost:8080/api/Reservation/report-clients`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_topcliente").empty();
            pintarRespuesta(respuesta);
            
        }
    })
 }




function pintarRespuesta(items) {

    let myTable = "<table class='table' style='width:50%'>";

        myTable += "<thead>";
        myTable += "<tr>";
        myTable += "<th scope='col'>" + "RESERVAS" + "</th>";
        myTable += "<th scope='col'>" + "CLIENTE" + "</th>";
        myTable += "<th scope='col'>" + "EDAD" + "</td>";
        myTable += "<th scope='col'>" + "EMAIL" + "</td>";
        myTable += "</tr>"
        myTable += "</thead>"
        for(var i = 0; i< items.length; i++){
        myTable += "<tbody>";
        myTable += "<tr>";
        myTable += "<th scope='row'>" + items[i].total + "</th>";
        myTable += "<th scope='row'>" + items[i].cliente.name + "</td>";
        myTable += "<th scope='row'>" + items[i].cliente.age + "</td>";
        myTable += "<th scope='row'>" + items[i].cliente.email + "</td>";
        myTable += "</tr>"
        myTable += "</tbody>"
        }
        
    myTable += "</table>"
    $("#list_topcliente").append(myTable);

}
