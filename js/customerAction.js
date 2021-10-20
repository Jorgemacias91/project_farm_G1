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

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "ID" + "</th>";
        myTable += "<th>" + "EMAIL" + "</td>";
        myTable += "<th>" + "PASSWORD" + "</td>";
        myTable += "<th>" + "NOMBRE" + "</td>";
        myTable += "<th>" + "EDAD" + "</td>";
        myTable += "</tr>"
    }
    
   
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idClient + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].password + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable+="<td> <button onclick='eliminarCliente("+items[i].idClient+")'>Borrar</button>";
        myTable += "<td> <button onclick='detalleCliente(" + items[i].idClient + ")'>Ver</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_cliente").append(myTable);
}

function crearCliente(){
    let myData= {
        id:$("#id").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#edad").val(),
    };
    let dataToSend = JSON.stringify(myData);        
    console.log(dataToSend)
    $.ajax({
        url:"http://localhost:8080/api/Client/save",
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            console.log(respuesta);
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            $("#edad").val("");
            $("#list_cliente").empty();
            listarCliente();

        },error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status );
            
        }
    }); 
}

function eliminarCliente(idElement){
    $.ajax({
        url: `http://localhost:8080/api/Client/${idElement}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta){
            $("#list_client").empty();
            listarCliente();
        }
    })
}

function editarCliente(){
    let myData = {
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#edad").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: `http://localhost:8080/api/Client/uptade`,
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
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
            console.log('respuesta1',respuesta)
            $("#detail_cliente").empty();
            pintarDetail(respuesta);
            console.log('respuesta',respuesta)
        }
    });
}

function pintarDetail(items) {

           detalle =  "<h4>DETALLES</h4>";
           detalle += "<p> Id: " + items.idClient + "</p>";
           detalle += "<p>Email: " + items.email + "</p>";
           detalle += "<p>Password: " + items.password + "</p>";
           detalle += "<p>Nombre: " + items.name + "</p>";
           detalle += "<p>Edad: " + items.age + "</p>";
        
    console.log('mytable', detalle)
    $("#detail_cliente").append(detalle);
}