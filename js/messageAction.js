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

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "ID" + "</th>";
        myTable += "<th>" + "MENSAJE" + "</td>";
        myTable += "</tr>"
    };

    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idMessage + "</td>";
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable += "<td> <button onclick='eliminarMensaje(" + items[i].idMessage + ")'>Borrar</button>";
        myTable += "<td> <button onclick='detalleMensaje(" + items[i].idMessage + ")'>Ver</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_mensaje").append(myTable);
}

function crearMensaje() {
    let myData = {
        idMessage: $("#id").val(),
        messageText: $("#mensaje").val()
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
        messageText: $("#mensaje").val()
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
            console.log("respuesta",respuesta)
            $("#detail_mensaje").empty();
            pintarDetail(respuesta);
            console.log('respuesta',respuesta)
        }
    });
}

function pintarDetail(items) {
    console.log('entre al a pintar detalle')
    console.log("items id", items.id)

           detalle =  "<h4>DETALLES</h4>";
           detalle += "<p> Id: " + items.idMessage + "</p>";
           detalle += "<p>Mensaje: " + items.messageText + "</p>";
        
    console.log('mytable', detalle)
    $("#detail_mensaje").append(detalle);
}