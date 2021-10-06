function listarFinca() {
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_finca").empty();
            pintarRespuesta(respuesta.items);
        }
    })
}

function pintarRespuesta(items) {

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "ID" + "</th>";
        myTable += "<th>" + "DIRECCIÓN" + "</td>";
        myTable += "<th>" + "EXTENSIÓN" + "</td>";
        myTable += "<th>" + "CATEGORIA" + "</td>";
        myTable += "<th>" + "NOMBRE" + "</td>";
        myTable += "</tr>"
    }

    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].address + "</td>";
        myTable += "<td>" + items[i].exension + "</td>";
        myTable += "<td>" + items[i].category_id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td> <button onclick='eliminarFinca(" + items[i].id + ")'>Borrar</button>";
        myTable += "<td> <button onclick='detalleFinca(" + items[i].id + ")'>Ver</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_finca").append(myTable);
}

function crearFinca() {
    let myData = {
        id: $("#id").val(),
        address: $("#address").val(),
        exension: $("#exension").val(),
        category_id: $("#categoria_id").val(),
        name: $("#name").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend)
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        //dataType:'json',
        success: function (respuesta) {
            console.log(respuesta);
            $("#id").val("");
            $("#address").val("");
            $("#exension").val("");
            $("#categoria_id").val("");
            $("#name").val("");
            $("#list_finca").empty();
            listarFinca();

        }, error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status);

        }
    });
}

function eliminarFinca(idElement) {
    let myData = {
        id: idElement
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#list_finca").empty();
            listarFinca();
        }
    })
}

function editarFinca() {
    let myData = {
        id: $("#id").val(),
        address: $("#address").val(),
        exension: $("#exension").val(),
        category_id: $("#categoria_id").val(),
        name: $("#name").val()
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#list_finca").empty();
            $("#id").val("");
            $("#address").val("");
            $("#exension").val("");
            $("#categoria_id").val("");
            $("#name").val("");
            listarFinca();
        }
    });
}

function detalleFinca(id) {
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta",respuesta)
            $("#detail_finca").empty();
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
           detalle += "<p>Dirección: " + items[0].address + "</p>";
           detalle += "<p>Extensión: " + items[0].exension + "</p>";
           detalle += "<p>Categoría: " + items[0].category_id + "</p>";
           detalle += "<p>Nombre: " + items[0].name + "</p>";
        
    console.log('mytable', detalle)
    $("#detail_finca").append(detalle);
}