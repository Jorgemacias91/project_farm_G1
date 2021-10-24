function listarReservacion() {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_reservacion").empty();
            pintarRespuesta(respuesta);
        }
    })
}

function pintarRespuesta(items) {

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "ID" + "</th>";
        myTable += "<th>" + "START DATE" + "</td>";
        myTable += "<th>" + "END DATE" + "</td>";
        myTable += "<th>" + "SCORE" + "</td>";
        myTable += "</tr>"
    }


    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idReservation + "</td>";
        myTable += "<td>" + items[i].startDate + "</td>";
        myTable += "<td>" + items[i].devolutionDate + "</td>";
        myTable += "<td>" + items[i].score + "</td>";
        myTable += "<td> <button onclick='eliminarReserva(" + items[i].idReservation + ")'>Borrar</button>";
        myTable += "<td> <button onclick='detalleReserva(" + items[i].idReservation + ")'>Ver</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_reservacion").append(myTable);
}

function crearReservacion() {
    let myData = {
        idReservation: $("#id").val(),
        startDate: $("#startdate").val(),
        devolutionDate: $("#enddate").val(),
        client: { idClient: $("#client_id").val() },
        farm: { id: $("#farm_id").val() },
    };
    console.log("startDATE", myData.startDate);
    console.log("devolutionDate", myData.devolutionDate)
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend)
    $.ajax({
        url: "http://localhost:8080/api/Reservation/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#startdate").val("");
            $("#enddate").val("");
            $("#score").val("");
            $("#client_id").val("");
            $("#farm_id").val("");
            $("#list_reservacion").empty();
            listarReservacion();

        }, error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status);

        }
    });
}

function eliminarReserva(idElement) {
    $.ajax({
        url: `http://localhost:8080/api/Reservation/${idElement}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#list_reservacion").empty();
            listarReservacion();
        }
    })
}

function editarReservacion() {
    let myData = {
        idReservation: $("#id").val(),
        startDate: $("#startdate").val(),
        devolutionDate: $("#enddate").val(),
        client: { idClient: $("#client_id").val() },
        farm: { id: $("#farm_id").val() }
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: `http://localhost:8080/api/Reservation/update`,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#startdate").val("");
            $("#enddate").val("");
            $("#client_id").val();
            $("#farm_id").val();
            listarReservacion();
        }
    });
}

function detalleReserva(id) {
    $.ajax({
        url: `http://localhost:8080/api/Reservation/${id}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log('respuesta1', respuesta)
            $("#detail_reservacion").empty();
            pintarDetail(respuesta);
            console.log('respuesta', respuesta)
        }
    });
}

function pintarDetail(items) {

    detalle = "<h4>DETALLES</h4>";
    detalle += "<p> Id: " + items.idReservation + "</p>";
    detalle += "<p>Fecha de Inicio: " + items.startDate + "</p>";
    detalle += "<p>Fecha de Regreso: " + items.devolutionDate + "</p>";
    detalle += "<p>Score: " + items.score + "</p>";

    console.log('mytable', detalle)
    $("#detail_reservacion").append(detalle);
}

function setData() {
    $.ajax({
        url: "http://localhost:8080/api/Farm/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta", respuesta)
            var select = document.getElementById("farm_id");

            for (var i = 0; i < respuesta.length; i++) {
                var option = document.createElement("option");
                option.value = respuesta[i].id
                option.text = respuesta[i].name
                console.log("option", option)
                select.appendChild(option);
            }

            console.log("select", select)

        }
    });

    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta", respuesta)
            var select = document.getElementById("client_id");

            for (var i = 0; i < respuesta.length; i++) {
                var option = document.createElement("option");
                option.value = respuesta[i].idClient
                option.text = respuesta[i].name
                console.log("option", option)
                select.appendChild(option);
            }

            console.log("select", select)

        }
    });

    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta", respuesta)
            var select = document.getElementById("id");

            for (var i = 0; i < respuesta.length; i++) {
                var option = document.createElement("option");
                option.value = respuesta[i].idReservation
                option.text = respuesta[i].startDate
                console.log("option", option)
                select.appendChild(option);
            }

            console.log("select", select)

        }
    });

}

function getDetails(id) {
    $.ajax({
        url: `http://localhost:8080/api/Reservation/${id.value}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("detail", respuesta)
            $("#startdate").val(respuesta.startDate),
            $("#enddate").val(respuesta.devolutionDate),
            $("#client_id").val(respuesta.client.idClient),
            $("#farm_id").val(respuesta.farm.id) 
    }
    });
}