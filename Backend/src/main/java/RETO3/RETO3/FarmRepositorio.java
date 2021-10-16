
package RETO3.RETO3;




import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FarmRepositorio {
     @Autowired
    private interfaceFarm crud;

    public List<Farm> getAll(){
        return (List<Farm>) crud.findAll();
    }
    public Optional<Farm> getFarm(int id){
        return crud.findById(id);
    }


    public Farm save(Farm farm){
        return crud.save(farm);
    }
    public void delete(Farm farm){
        crud.delete(farm);
    }
   
    
}
