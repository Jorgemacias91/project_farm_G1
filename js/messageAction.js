function listarMensaje() {
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_mensaje").empty();
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
        myTable += "<th scope='col'>" + "MENSAJE" + "</th>";
        myTable += "<th scope='col'>" + "CLIENTE" + "</th>";
        myTable += "<th scope='col'>" + "FINCA" + "</th>";
        myTable += "<th scope='col'>" + "BORRAR" + "</th>";
        myTable += "<th scope='col'>" + "VER" + "</th>";
        myTable += "</tr>"
        myTable += "</thead>"
    };

    for (i = 0; i < items.length; i++) {
        myTable += "<tbody>";
        myTable += "<tr>";
        myTable += "<th scope='row'>" + items[i].idMessage + "</th>";
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "<td>" + items[i].farm.name + "</td>";
        myTable += "<td> <button onclick='eliminarMensaje(" + items[i].idMessage + ")' type='button' class='btn btn-danger'>Borrar</button>";
        myTable += "<td> <button onclick='detalleMensaje(" + items[i].idMessage + ")' type='button' class='btn btn-info'>Ver</button>";
        myTable += "</tr>"
        myTable += "</tbody>"
    }
    myTable += "</table>"
    $("#list_mensaje").append(myTable);
}

function crearMensaje() {
    let myData = {
        idMessage: $("#id").val(),
        messageText: $("#mensaje").val(),
        client: { idClient: $("#client_id").val() },
        farm: { id: $("#farm_id").val() },
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Message/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        //dataType:'json',
        success: function (respuesta) {
            console.log(respuesta);
            $("#id").val("");
            $("#mensaje").val("");
            $("#client_id").val("");
            $("#farm_id").val("");
            $("#list_cliente").empty();
            listarMensaje();

        }, error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status);
        }
    });
}

function eliminarMensaje(idElement) {
    $.ajax({
        url: `http://localhost:8080/api/Message/${idElement}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#list_mensaje").empty();
            listarMensaje();
        }
    })
}

function editarMensaje() {
    let myData = {
        idMessage: $("#id").val(),
        messageText: $("#mensaje").val(),
        client: { idClient: $("#client_id").val() },
        farm: { id: $("#farm_id").val() }
    }
    let dataToSend = JSON.stringify(myData);
    console.log("myData", myData)
    $.ajax({
        url: `http://localhost:8080/api/Message/update`,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#list_mensaje").empty();
            $("#id").val("");
            $("#client_id").val("");
            $("#farm_id").val("");
            listarMensaje();
        }
    });
}

function detalleMensaje(id) {
    $.ajax({
        url: `http://localhost:8080/api/Message/${id}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta", respuesta)
            $("#detail_mensaje").empty();
            pintarDetail(respuesta);
            console.log('respuesta', respuesta)
        }
    });
}

function pintarDetail(items) {
    console.log('entre al a pintar detalle')
    console.log("items id", items.id)
    var detalle = "<div class='card-header'> Detalles </div>";
    detalle += "<div class='card-body'>";
    detalle += "<h5 class='card-title'>Mensaje Creado</h5>";
    detalle += "<p class='card-text'> Mensaje: " + items.messageText + "</p>";
    detalle += "<p class='card-text'> Cliente: " + items.client.name + "</p>";
    detalle += "<p class='card-text'> Finca: " + items.farm.name + "</p>";
    detalle += "</div>"; 

    console.log('mytable', detalle)
    $("#detail_mensaje").append(detalle);
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
    })

    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            pintarRespuesta(respuesta);
            console.log("respuesta", respuesta)
            var select = document.getElementById("id");

            for (var i = 0; i < respuesta.length; i++) {
                var option = document.createElement("option");
                option.value = respuesta[i].idMessage
                option.text = respuesta[i].idMessage
                console.log("option", option)
                select.appendChild(option);
            }

            console.log("select", select)

        }
    });
};

function getDetails(id) {
    $.ajax({
        url: `http://localhost:8080/api/Message/${id.value}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("detail", respuesta)
            $("#mensaje").val(respuesta.messageText),
            $("#client_id").val(respuesta.client.idClient),
            $("#farm_id").val(respuesta.farm.id);
        }
    });
}