/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package RETO3.RETO3;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author USUARIO
 */
@Repository
public class ReservacionRepositorio {
     @Autowired
    private intefaceReservacion crud4;

    public List<Reservacion> getAll(){
        return (List<Reservacion>) crud4.findAll();
    }
    public Optional<Reservacion> getReservation(int id){
        return crud4.findById(id);
    }
    public Reservacion save(Reservacion reservation){
        return crud4.save(reservation);
    }
    public void delete(Reservacion reservation){
        crud4.delete(reservation);
    }
    public List<Reservacion> reservacionStatus(String status){
        return crud4.findAllByStatus(status);
    }

    public List<Reservacion> reservacionDate(Date dateOne, Date dateTwo){
        return crud4.findAllByStartDateAfterAndStartDateBefore(dateOne, dateTwo);
    }

    public List<ContadorCliente> getTopClientes(){
        List<ContadorCliente> res=new ArrayList<>();
        List<Object[]>report = crud4.CountTotalReservationsByClient();
        for(int i=0; i<report.size(); i++){
            res.add(new ContadorCliente((Long)report.get(i)[1], (Cliente) report.get(i)[0]));
        }
        return res;
    }
}
