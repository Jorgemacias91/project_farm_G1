function listarCategoria() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_categoria").empty();
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
        myTable += "<th scope='col'>" + "NAME" + "</td>";
        myTable += "<th scope='col'>" + "DESCRIPTION" + "</td>";
        myTable += "<th scope='col'>" + "BORRAR" + "</td>";
        myTable += "<th scope='col'>" + "VER" + "</td>";
        myTable += "</tr>";
        myTable += "</thead>"
    }


    for (i = 0; i < items.length; i++) {
        myTable += "<tbody>";
        myTable += "<tr>";
        myTable += "<th scope='row'>" + items[i].id + "</th>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td> <button onclick='eliminarCategoria(" + items[i].id + ")' type='button' class='btn btn-danger'>Borrar</button>";
        myTable += "<td> <button onclick='detalleCategoria(" + items[i].id + ")' type='button' class='btn btn-info'>Ver</button>";
        myTable += "</tr>"
        myTable += "</tbody>"
    }
    myTable += "</table>"
    $("#list_categoria").append(myTable);
}

function crearCategoria() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend)
    $.ajax({
        url: "http://localhost:8080/api/Category/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#name").val("");
            $("#description").val("");
            $("#list_categoria").empty();
            listarCategoria();

        }, error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status);

        }
    });
}

function eliminarCategoria(idElement) {
    $.ajax({
        url: `http://localhost:8080/api/Category/${idElement}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#list_categoria").empty();
            listarCategoria();
        }
    })
}

function editarCategoria() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            listarCategoria();
        }
    });
}

function detalleCategoria(id) {
    $.ajax({
        url: `http://localhost:8080/api/Category/${id}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log('respuesta1', respuesta)
            $("#detail_categoria").empty();
            pintarDetail(respuesta);
            console.log('respuesta', respuesta)
        }
    });
}

function pintarDetail(items) {

    var detalle = "<div class='card-header'> Detalles </div>";
    detalle += "<div class='card-body'>";
    detalle += "<h5 class='card-title'>" + items.name + "</h5>";
    detalle += "<p>" + items.description + "</p>";
    detalle += "</div>";

    console.log('mytable', detalle)
    $("#detail_categoria").append(detalle);
}

function setData() {

    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            pintarRespuesta(respuesta);
            console.log("respuesta", respuesta)
            var select = document.getElementById("id");

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
}

function getDetails(id) {
    $.ajax({
        url: `http://localhost:8080/api/Category/${id.value}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("detail", respuesta)
            $("#name").val(respuesta.name),
                $("#description").val(respuesta.description)
        }
    });
}