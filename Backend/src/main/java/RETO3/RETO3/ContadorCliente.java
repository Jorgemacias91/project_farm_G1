package RETO3.RETO3;

public class ContadorCliente {
    private Long total;
    private Cliente cliente;

    public ContadorCliente(Long total, Cliente cliente) {
        this.total = total;
        this.cliente = cliente;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    
    
    
}
