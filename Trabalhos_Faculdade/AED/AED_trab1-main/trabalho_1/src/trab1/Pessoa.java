package trab1;

/**
 *
 * @author Francisco
 */

public class Pessoa {
    private String nif;
    private String nome;
    public Pessoa(String n,String name){
        nif=n;
        nome=name;
    }

    public String getNif() {
        return nif;
    }

    public String getNome() {
        return nome;
    }
}