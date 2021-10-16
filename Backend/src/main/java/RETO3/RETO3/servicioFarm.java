
package RETO3.RETO3;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class servicioFarm {
      @Autowired
     private FarmRepositorio metodosCrud;
     
     public List<Farm> getAll(){
        return metodosCrud.getAll();
    }
    public Optional<Farm> getFarm(int idFarm) {
        return metodosCrud.getFarm(idFarm);
    }

    public Farm save(Farm farm){
        if(farm.getId()==null){
            return metodosCrud.save(farm);
        }else{
            Optional<Farm> e=metodosCrud.getFarm(farm.getId());
            if(e.isEmpty()){
                return metodosCrud.save(farm);
            }else{
                return farm;
            }
        }
    }
     public Farm update(Farm farm){
        if(farm.getId()!=null){
            Optional<Farm> e=metodosCrud.getFarm(farm.getId());
            if(!e.isEmpty()){
                if(farm.getAddress()!=null){
                    e.get().setAddress(farm.getAddress());
                }
                if(farm.getExtension()!=null){
                    e.get().setExtension(farm.getExtension());
                }
                if(farm.getDescription()!=null){
                    e.get().setDescription(farm.getDescription());
                }
                if(farm.getName()!=null){
                    e.get().setName(farm.getName());
                }
                if(farm.getCategory()!=null){
                    e.get().setCategory(farm.getCategory());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return farm;
            }
        }else{
            return farm;
        }
    }


    public boolean deleteFarm(int farmId) {
        Boolean aBoolean = getFarm(farmId).map(farm -> {
            metodosCrud.delete(farm);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}
