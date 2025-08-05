package trab1;

import java.util.Date;
import java.util.LinkedList;
import java.util.TreeMap;

/**
 * @author Francisco
 */

public class Empresa {
    private final LinkedList<Motorista> motoristas;
    private final TreeMap<Integer,Viagem>viagens;
    
    public Empresa(){
        motoristas=new LinkedList<>();
        viagens=new TreeMap<>();
    }
    
    public boolean addMotorista(String n, String name, double s) {
        try {
            for (Motorista m : motoristas) {
                if (m.getNif().equals(n)) {//Compara o nif[n] com o nif de todos os motoristas
                    System.out.println("O motorista com o NIF [" + n + "] já existe.");
                    return false; 
                }
            }
            motoristas.add(new Motorista(n, name, s));//Adiciona Motorista
            System.out.println("Motorista [" + name + "] adicionado com sucesso.");
            return true;
        } catch (Exception e) {
            System.out.println("Erro ao adicionar motorista [" + name + "] : " + e.getMessage());
            return false;
        }
    }
    
    public boolean addViagem(String lp, String ld, Date dp, double p, int nl) {
    int cod ; // Variavel Cod.
    try{
        if (!viagens.isEmpty()) {//Ve se nao esta vazio e incrementa 1 no cod.
            cod=viagens.size()+1;
        }else{
            cod=1; //Caso esteja vazio acrescenta no cod 1.
        }

        if (!viagens.containsKey(cod)) {//Verifica se a viagem existe pelo cod.
            viagens.put(cod, new Viagem(lp, ld, dp, p, nl, motoristas.get(0))); //Cria a Viagem
            System.out.println("Viagem adicionada com sucesso, com o código " + cod);
            return true;
        }else{
            System.out.println("Já existe uma viagem com o código " + cod);
            return false;
        }
        }catch (Exception e){
            System.out.println("Erro ao adicionar viagem: "+e.getMessage());
            return false;
        }
    }
    
    public boolean vendeBilhete(Passageiro p, int codViagem){
        try {
            Viagem viagem = viagens.get(codViagem);
            if (viagem == null) {
                System.out.println("Viagem com código [" + codViagem + "] não existe.");
                return false;
            }
            if (viagem.getLugaresDisponiveis() > 0) { 
                if (viagem.addPassageiro(p)) {
                    System.out.println("Bilhete vendido com sucesso para a Viagem [" + codViagem + "] ao passageiro [" + p.getNome() + "].");
                    return true;   
                }else{
                    System.out.println("Erro ao vender bilhete para a Viagem [" + codViagem + "] ao passageiro [" + p.getNome() + "].");
                    return false;   
                }
            }else{
                System.out.println("Não há lugares disponíveis na Viagem [" + codViagem + "].");
                return false;
            }
        } catch (Exception e) {
            System.out.println("Erro ao vender bilhete: " + e.getMessage());
            return false; 
        }
   }  
    
    public boolean removeMotorista(String nif){
        try{
            for(Motorista m:motoristas){ //Percorre a lista motoristas, m é um iterator; 
                if(m.getNif().equals(nif)){//Verifica se o nif corresponde;
                    System.out.println("Motorista "+m.getNome()+ " removido.");
                    return motoristas.remove(m);//remove o motorista;
                }
            }
            System.out.println("Motorista nao removido. NIF correspondente nao encontrado");
            return false;
        }catch (Exception e){
            System.out.println("Erro ao remover motorista: "+e.getMessage());
            return false;
        }
    }
    
    public boolean removeViagem(int cod){
        try{
            if(viagens.containsKey(cod)){ //Verifica se existe um viagem com o cod correspondente;
                System.out.println("Viagem ["+ cod+"] removida com sucesso.");
                viagens.remove(cod); //Remove a viagem com o cod associado;
                return true;
            }else{
                System.out.println("Viagem nao Removida, codigo invalido.");
                return false;
                }
        }catch (Exception e){
            System.out.println("Erro ao remover viagem: "+e.getMessage());
            return false;
        }        
    }
    
    public double getReceitasTotais(){
        double receitas_totais=0.0;
        for(Viagem v:viagens.values()){
            receitas_totais +=v.getReceitas();
        }
        return receitas_totais;
    }
}