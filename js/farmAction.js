function listarFinca() {
    $.ajax({
        url: "http://localhost:8080/api/Farm/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_finca").empty();
            pintarRespuesta(respuesta);
        }
    })
}

function pintarRespuesta(items) {

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "DIRECCIÓN" + "</td>";
        myTable += "<th>" + "CATEGORIA" + "</td>";
        myTable += "<th>" + "EXTENSIÓN" + "</td>";
        myTable += "<th>" + "NOMBRE" + "</td>";
        myTable += "<th>" + "DESCRIPCIÓN" + "</td>";
        myTable += "</tr>"
    }

    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].address + "</td>";
        myTable += "<td>" + items[i].category.name + "</td>";
        myTable += "<td>" + items[i].extension + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
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
        extension: $("#extension").val(),
        category: {id : $("#categoria_id").val()},
        name: $("#name").val(),
        description: $("#description").val()
    };
    let dataToSend = JSON.stringify(myData);
    console.log("datoToSend", dataToSend)
    $.ajax({
        url: "http://localhost:8080/api/Farm/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        //dataType:'json',
        success: function (respuesta) {
            console.log("response function", respuesta);
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
    $.ajax({
        url: `http://localhost:8080/api/Farm/${idElement}`,
        type: "DELETE",
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
        url: "http://localhost:8080/api/Farm/update",
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
        url: `http://localhost:8080/api/Farm/${id}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta",respuesta)
            $("#detail_finca").empty();
            pintarDetail(respuesta);
            console.log('respuesta',respuesta)
        }
    });
}

function pintarDetail(items) {
    console.log('entre al a pintar detalle')
    console.log("items id", items.id)

           detalle =  "<h4>DETALLES</h4>";
           detalle += "<p> Id: " + items.id + "</p>";
           detalle += "<p>Dirección: " + items.address + "</p>";
           detalle += "<p>Extensión: " + items.extension + "</p>";
           detalle += "<p>Categoría: " + items.category.name + "</p>";
           detalle += "<p>Nombre: " + items.name + "</p>";
        
    console.log('mytable', detalle)
    $("#detail_finca").append(detalle);
}