function listarReservacion() {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_reservacion").empty();
            pintarRespuesta(respuesta);
        }
    })
}

function pintarRespuesta(items) {

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "ID" + "</th>";
        myTable += "<th>" + "START DATE" + "</td>";
        myTable += "<th>" + "END DATE" + "</td>";
        myTable += "<th>" + "SCORE" + "</td>";
        myTable += "</tr>"
    }
    
   
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idReservation + "</td>";
        myTable += "<td>" + items[i].startDate + "</td>";
        myTable += "<td>" + items[i].devolutionDate + "</td>";
        myTable += "<td>" + items[i].score + "</td>";
        myTable+="<td> <button onclick='eliminarReserva("+items[i].idReservation+")'>Borrar</button>";
        myTable += "<td> <button onclick='detalleReserva(" + items[i].idReservation + ")'>Ver</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_reservacion").append(myTable);
}

function crearReservacion(){
    let myData= {
        idReservation:$("#id").val(),
        startDate: $("#startdate").val(),
        devolutionDate: $("#enddate").val()
    };
    console.log("startDATE", myData.startDate);
    console.log("devolutionDate", myData.devolutionDate)
    let dataToSend = JSON.stringify(myData);        
    console.log(dataToSend)
    $.ajax({
        url:"http://localhost:8080/api/Reservation/save",
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#startdate").val("");
            $("#enddate").val("");
            $("#score").val("");
            $("#list_reservacion").empty();
            listarReservacion();

        },error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status );
            
        }
    }); 
}

function eliminarReserva(idElement){
    $.ajax({
        url: `http://localhost:8080/api/Reservation/${idElement}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta){
            $("#list_reservacion").empty();
            listarReservacion();
        }
    })
}

function editarReservacion(){
    let myData = {
        idReservation:$("#id").val(),
        startDate:$("#startdate").val(),
        devolutionDate:$("#enddate").val(),
        score:$("#score").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: `http://localhost:8080/api/Reservation/uptade`,
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#startdate").val("");
            $("#enddate").val("");
            $("#score").val("");
            listarReservacion();
        }
    });
}

function detalleReserva(id) {
    $.ajax({
        url: `http://localhost:8080/api/Reservation/${id}`,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log('respuesta1',respuesta)
            $("#detail_reservacion").empty();
            pintarDetail(respuesta);
            console.log('respuesta',respuesta)
        }
    });
}

function pintarDetail(items) {

           detalle =  "<h4>DETALLES</h4>";
           detalle += "<p> Id: " + items.idReservation + "</p>";
           detalle += "<p>Fecha de Inicio: " + items.startDate + "</p>";
           detalle += "<p>Fecha de Regreso: " + items.devolutionDate + "</p>";
           detalle += "<p>Score: " + items.score + "</p>";
        
    console.log('mytable', detalle)
    $("#detail_reservacion").append(detalle);
}