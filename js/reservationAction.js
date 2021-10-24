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

    let myTable = "<table class='table'>";
    if (items.length > 0) {
        myTable += "<thead>";
        myTable += "<tr>";
        myTable += "<th scope='col'>" + "ID" + "</th>";
        myTable += "<th scope='col'>" + "FECHA INICIO" + "</th>";
        myTable += "<th scope='col'>" + "FECHA FIN" + "</th>";
        myTable += "<th scope='col'>" + "FINCA" + "</th>";
        myTable += "<th scope='col'>" + "CLIENTE" + "</th>";
        myTable += "<th scope='col'>" + "SCORE" + "</th>";
        myTable += "<th scope='col'>" + "BORRAR" + "</th>";
        myTable += "<th scope='col'>" + "VER" + "</th>";
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
        myTable += "<td>" + items[i].farm.name + "</td>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "<td>" + items[i].score + "</td>";
        myTable += "<td> <button onclick='eliminarReserva(" + items[i].idReservation + ")' type='button' class='btn btn-danger'>Borrar</button>";
        myTable += "<td> <button onclick='detalleReserva(" + items[i].idReservation + ")' type='button' class='btn btn-info'>Ver</button>";
        myTable += "</tr>"
        myTable += "</tbody>"
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
            $("#client_id").val("");
            $("#farm_id").val("");
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
    var dateStart = dateFormat(items).dateStart;
    var dateDevolution = dateFormat(items).dateDevolution;

    var detalle = "<div class='card-header'> Detalles </div>";
    detalle += "<div class='card-body'>";
    detalle += "<h5 class='card-title'>Reserva Creada</h5>";
    detalle += "<p class='card-text'>Fecha de Inicio: " + dateStart + "</p>";
    detalle += "<p class='card-text'>Fecha de Regreso: " + dateDevolution + "</p>";
    detalle += "<p class='card-text'> Cliente: " + items.client.name + "</p>";
    detalle += "<p class='card-text'> Finca: " + items.farm.name + "</p>";
    detalle += "<p class='card-text'>Score: " + items.score + "</p>";

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
            pintarRespuesta(respuesta);
            console.log("respuesta", respuesta)
            var select = document.getElementById("id");

            for (var i = 0; i < respuesta.length; i++) {
                var option = document.createElement("option");
                option.value = respuesta[i].idReservation
                option.text = respuesta[i].idReservation
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
            var dateStart = dateFormat(respuesta).dateStartAMD;
            var dateDevolution = dateFormat(respuesta).dateDevolutionAMD;
                console.log("id_start", dateStart)
                console.log("id_end", dateDevolution)
                $("#startdate").val(dateStart),
                $("#enddate").val(dateDevolution),
                $("#client_id").val(respuesta.client.idClient),
                $("#farm_id").val(respuesta.farm.id)
        }
    });
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