function listarMensaje() {
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_mensaje").empty();
            pintarRespuesta(respuesta.items);
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
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].messagetext + "</td>";
        myTable += "<td> <button onclick='eliminarMensaje(" + items[i].id + ")'>Borrar</button>";
        myTable += "<td> <button onclick='detalleMensaje(" + items[i].id + ")'>Ver</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_mensaje").append(myTable);
}

function crearMensaje() {
    let myData = {
        id: $("#id").val(),
        messagetext: $("#mensaje").val()
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
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
    let myData = {
        id: idElement
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "DELETE",
        data: dataToSend,
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
        id: $("#id").val(),
        messagetext: $("#mensaje").val()
    }
    let dataToSend = JSON.stringify(myData);
    console.log("myData", myData)
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
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
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta",respuesta)
            $("#detail_mensaje").empty();
            pintarDetail(respuesta.items);
            console.log('respuesta',respuesta.items)
        }
    });
}

function pintarDetail(items) {
    console.log('entre al a pintar detalle')
    console.log("items id", items[0].id)

           detalle =  "<h4>DETALLES</h4>";
           detalle += "<p> Id: " + items[0].id + "</p>";
           detalle += "<p>Mensaje: " + items[0].messagetext + "</p>";
        
    console.log('mytable', detalle)
    $("#detail_mensaje").append(detalle);
}