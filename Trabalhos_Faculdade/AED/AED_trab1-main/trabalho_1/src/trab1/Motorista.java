package trab1;

/**
 *
 * @author Francisco
 */
public class Motorista extends Pessoa{
    private double salario;
    
    public Motorista(String n,String name,double s){
        super(n,name);
        salario=s;
    }
    public double getSalario(){
        return salario;
    }
    public void setSalario(double s){
        salario=s;
    }
    
}