package trab1;

import java.util.Date;
import java.util.LinkedList;

/**
 *
 * @author Francisco
 */

public class Viagem {
    private int cod=0;
    private String localPartida;
    private String localDestino;
    private Date dataPartida;
    private double precoBilhete;
    private int numLugares;
    private Motorista motoristas;
    private LinkedList<Passageiro>passageiros;
    
    public Viagem(String lp,String ld,Date dp,double p,int nl,Motorista m){
        this.cod=cod;
        localPartida=lp;
        localDestino=ld;
        numLugares=nl;
        precoBilhete=p;
        dataPartida=dp;
        motoristas=m;
        passageiros = new LinkedList<>();
    }
    
    public int getCod(){
        return cod++;
    }
    
    public String getLocalPartida() {
        return localPartida;
    }

    public String getLocalDestino() {
        return localDestino;
    }

    public Date getDataPartida() {
        return dataPartida;
    }

    public double getPrecoBilhete() {
        return precoBilhete;
    }

    public int getNumLugares() {
        return numLugares;
    }

    public void setMotoristas(Motorista m) {
        motoristas=m;
    }
   
    public Motorista getMotorista(){
        return motoristas;
    }
    
    public boolean addPassageiro(Passageiro p){
        try{
            if(passageiros.contains(p)){
                System.out.println("Passageiro ["+p.getNome()+"] já existe.");
                return false;
            }else{
                System.out.println("Passageiro ["+p.getNome()+"] adicionado/a");
                this.numLugares--;
                return passageiros.add(p);
            }
        }catch(Exception e){
            System.out.println("Erro ao adicionar passageiro."+ e.getMessage());
            return false;
        } 
    }
    
    public int getLugaresDisponiveis(){
        return numLugares-passageiros.size();
    }
   
    public double getReceitas(){
        return passageiros.size()*precoBilhete;
    }
}