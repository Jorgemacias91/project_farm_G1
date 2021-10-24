function listarCliente() {
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_cliente").empty();
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
        myTable += "<th scope='col'>" + "NOMBRE" + "</td>";
        myTable += "<th scope='col'>" + "EDAD" + "</td>";
        myTable += "<th scope='col'>" + "EMAIL" + "</td>";
        myTable += "<th scope='col'>" + "PASSWORD" + "</td>";
        myTable += "<th scope='col'>" + "BORRAR" + "</td>";
        myTable += "<th scope='col'>" + "VER" + "</td>";
        myTable += "</tr>"
        myTable += "</thead>"
    }


    for (i = 0; i < items.length; i++) {
        myTable += "<tbody>";
        myTable += "<tr>";
        myTable += "<th scope='row'>" + items[i].idClient + "</th>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].password + "</td>";
        myTable += "<td> <button onclick='eliminarCliente(" + items[i].idClient + ")' type='button' class='btn btn-danger'>Borrar</button>";
        myTable += "<td> <button onclick='detalleCliente(" + items[i].idClient + ")' type='button' class='btn btn-info'>Ver</button>";
        myTable += "</tr>"
        myTable += "</tbody>"
    }
    myTable += "</table>"
    $("#list_cliente").append(myTable);
}

function crearCliente() {
    let myData = {
        id: $("#id").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#edad").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend)
    $.ajax({
        url: "http://localhost:8080/api/Client/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        //dataType:'json',
        success: function (respuesta) {
            console.log(respuesta);
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            $("#edad").val("");
            $("#list_cliente").empty();
            listarCliente();

        }, error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status);

        }
    });
}

function eliminarCliente(idElement) {
    $.ajax({
        url: `http://localhost:8080/api/Client/${idElement}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#list_client").empty();
            listarCliente();
        }
    })
}

function editarCliente() {
    let myData = {
        idClient: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#edad").val(),
        password: $("#password").val()
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: `http://localhost:8080/api/Client/update`,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#edad").val("");
            $("#password").val("");
            listarCliente();
        }
    });
}

function detalleCliente(id) {
    $.ajax({
        url: `http://localhost:8080/api/Client/${id}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log('respuesta1', respuesta)
            $("#detail_cliente").empty();
            pintarDetail(respuesta);
            console.log('respuesta', respuesta)
        }
    });
}

function pintarDetail(items) {
    var detalle = "<div class='card-header'> Detalles </div>";
    detalle += "<div class='card-body'>";
    detalle += "<h5 class='card-title'>" + items.name + "</h5>";
    detalle += "<p class='card-text'>Email: " + items.email + "</p>";
    detalle += "<p class='card-text'>Password: " + items.password + "</p>";
    detalle += "<p class='card-text'>Edad: " + items.age + "</p>";
    detalle += "</div>";
    console.log('mytable', detalle)
    $("#detail_cliente").append(detalle);
}

function setData() {
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            pintarRespuesta(respuesta);
            console.log("respuesta", respuesta)
            var select = document.getElementById("id");

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
}

function getDetails(id) {
    $.ajax({
        url: `http://localhost:8080/api/Client/${id.value}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log("detail", respuesta)
                $("#name").val(respuesta.name),
                $("#email").val(respuesta.email),
                $("#edad").val(respuesta.age),
                $("#password").val(respuesta.password)
        }
    });
}