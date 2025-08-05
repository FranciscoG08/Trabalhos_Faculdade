package trab1;

/**
 *
 * @author Francisco
 */
public class Passageiro extends Pessoa {
    private String telefone;
    public Passageiro(String n,String name,String tel){
        super(n,name);
        telefone=tel;
    }

    public String getTelefone() {
        return telefone;
    }
    
}
