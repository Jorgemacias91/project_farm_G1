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

    let myTable = "<table class='table'>";
    if (items.length > 0) {

        myTable += "<thead>";
        myTable += "<tr>";
        myTable += "<th scope='col'>" + "ID" + "</td>";
        myTable += "<th scope='col'>" + "DIRECCIÓN" + "</td>";
        myTable += "<th scope='col'>" + "CATEGORIA" + "</td>";
        myTable += "<th scope='col'>" + "EXTENSIÓN" + "</td>";
        myTable += "<th scope='col'>" + "NOMBRE" + "</td>";
        myTable += "<th scope='col'>" + "DESCRIPCIÓN" + "</td>";
        myTable += "<th scope='col'>" + "BORRAR" + "</td>";
        myTable += "<th scope='col'>" + "VER" + "</td>";
        myTable += "</tr>"
        myTable += "</thead>"
    }

    for (i = 0; i < items.length; i++) {
        myTable += "<tbody>";
        myTable += "<tr>";
        myTable += "<th scope='row'>" + items[i].id + "</th>";
        myTable += "<td>" + items[i].address + "</td>";
        myTable += "<td>" + items[i].category.name + "</td>";
        myTable += "<td>" + items[i].extension + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td> <button onclick='eliminarFinca(" + items[i].id + ")' type='button' class='btn btn-danger'>Borrar</button>";
        myTable += "<td> <button onclick='detalleFinca(" + items[i].id + ")' type='button' class='btn btn-info'>Ver</button>";
        myTable += "</tr>"
        myTable += "</tbody>"
    }
    myTable += "</table>"
    $("#list_finca").append(myTable);
}

function crearFinca() {
    let myData = {
        id: $("#id").val(),
        address: $("#address").val(),
        extension: $("#extension").val(),
        category: { id: $("#categoria_id").val() },
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
            $("#extension").val("");
            $("#categoria_id").val("");
            $("#name").val("");
            $("#description").val("");
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
        extension: $("#extension").val(),
        category_id: $("#categoria_id").val(),
        name: $("#name").val(),
        description: $("#description").val()
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
            $("#extension").val("");
            $("#categoria_id").val("");
            $("#name").val("");
            $("#description").val("");
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
            console.log("respuesta", respuesta)
            $("#detail_finca").empty();
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
    detalle += "<h5 class='card-title'>" + items.name + "</h5>";
    detalle += "<p class='card-text'>Dirección: " + items.address + "</p>";
    detalle += "<p class='card-text'>Extensión: " + items.extension + "</p>";
    detalle += "<p class='card-text'>Categoría: " + items.category.name + "</p>";
    detalle += "<p class='card-text'>Descripción: " + items.description + "</p>";
    detalle += "</div>";

    console.log('mytable', detalle)
    $("#detail_finca").append(detalle);
}

function setData() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("respuesta", respuesta)
            var select = document.getElementById("categoria_id");

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
        url: "http://localhost:8080/api/Farm/all",
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
        url: `http://localhost:8080/api/Farm/${id.value}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("detail", respuesta)
            $("#address").val(respuesta.address);
            $("#extension").val(respuesta.extension);
            $("#name").val(respuesta.name);
            $("#description").val(respuesta.description);
            $("#categoria_id").val(respuesta.category.id);
        }
    });
}