/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package RETO3.RETO3;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USUARIO
 */
@Service
public class servicioScore {
    @Autowired
    private ScoreRepositorio metodosCrud;

    public List<Score> getAll(){
        return metodosCrud.getAll();
    }

    public Optional<Score> getScore(int scoreId) {
        return metodosCrud.getScore(scoreId);
    }

    public Score save(Score score){
        if(score.getIdScore()==null){
            return metodosCrud.save(score);
        }else{
            Optional<Score> e= metodosCrud.getScore(score.getIdScore());
            if(e.isEmpty()){
                return metodosCrud.save(score);
            }else{
                return score;
            }
        }
    }

    public Score update(Score score){
        if(score.getIdScore()!=null){
            Optional<Score> e= metodosCrud.getScore(score.getIdScore());
            if(!e.isEmpty()){

                if(score.getScore()!=null){
                    e.get().setScore(score.getScore());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return score;
            }
        }else{
            return score;
        }
    }

    public boolean deleteScore(int scoreId) {
        Boolean aBoolean = getScore(scoreId).map(score -> {
            metodosCrud.delete(score);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}
