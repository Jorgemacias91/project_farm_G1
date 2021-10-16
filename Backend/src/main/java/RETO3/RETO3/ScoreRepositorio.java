/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package RETO3.RETO3;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author USUARIO
 */
@Repository
public class ScoreRepositorio {
     @Autowired
    private interfaceScore crud4;

    public List<Score> getAll(){
        return (List<Score>) crud4.findAll();
    }
    public Optional<Score> getScore(int id){
        return crud4.findById(id);
    }
    public Score save(Score score){
        return crud4.save(score);
    }
    public void delete(Score score){
        crud4.delete(score);
    }
}
