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

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "ID" + "</th>";
        myTable += "<th>" + "NAME" + "</td>";
        myTable += "<th>" + "DESCRIPTION" + "</td>";
        myTable += "</tr>"
    }
    
   
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable+="<td> <button onclick='eliminarCategoria("+items[i].id+")'>Borrar</button>";
        myTable += "<td> <button onclick='detalleCategoria(" + items[i].id + ")'>Ver</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_categoria").append(myTable);
}

function crearCategoria(){
    let myData= {
        id:$("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    };
    let dataToSend = JSON.stringify(myData);        
    console.log(dataToSend)
    $.ajax({
        url:"http://localhost:8080/api/Category/save",
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#name").val("");
            $("#description").val("");
            $("#list_categoria").empty();
            listarCategoria();

        },error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status );
            
        }
    }); 
}

function eliminarCategoria(idElement){
    $.ajax({
        url: `http://localhost:8080/api/Category/${idElement}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta){
            $("#list_categoria").empty();
            listarCategoria();
        }
    })
}

function editarCategoria(){
    let myData = {
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
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
            console.log('respuesta1',respuesta)
            $("#detail_categoria").empty();
            pintarDetail(respuesta);
            console.log('respuesta',respuesta)
        }
    });
}

function pintarDetail(items) {

           detalle =  "<h4>DETALLES</h4>";
           detalle += "<p> Id: " + items.id + "</p>";
           detalle += "<p>Email: " + items.name + "</p>";
           detalle += "<p>Password: " + items.description + "</p>";
        
    console.log('mytable', detalle)
    $("#detail_categoria").append(detalle);
}

function setData() {

    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
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