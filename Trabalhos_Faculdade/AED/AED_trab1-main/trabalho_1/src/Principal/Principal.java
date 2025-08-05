package Principal;
import trab1.Empresa;
import trab1.Passageiro;

import java.util.Date;
/**
 * @author Francisco
 */
public class Principal {
    
    public static void main(String[] args) {
        //Cria Empresa.
        Empresa SLB=new Empresa();
        
        //Criação de 4 Motoristas
        SLB.addMotorista("1", "D. Afonso Henriques", 1500.90);
        SLB.addMotorista("2", "Viriato", 1100.90);
        SLB.addMotorista("3", "Marques de Pombal", 1050.90);
        SLB.addMotorista("4", "D. Sancho I ", 900.90);
        SLB.addMotorista("1", "D. Afonso Henriques", 1500.90);//Motorista ja existe com este NIF
        
        //Criaçao de 4 Viagens
        SLB.addViagem("Bragança","Lisboa" , new Date(), 16.99, 55);
        SLB.addViagem("Porto","Bragança" , new Date(), 7.99, 55);
        SLB.addViagem("Bragança","Porto" , new Date(), 7.99, 55);
        SLB.addViagem("Lisboa","Bragança" , new Date(), 16.99, 55);
        
        //REMOÇOES
            //Motorista
            SLB.removeMotorista("4");
            //Viagem
            SLB.removeViagem(4);
            
        //Criaçao de 6 Passageiros
        Passageiro P1 = new Passageiro("001100110", "Luís de Camões", "917654321");
        Passageiro P2 = new Passageiro("002200220", "Amália Rodrigues", "913456789");
        Passageiro P3 = new Passageiro("003300330", "Salgueiro Maia", "916543210");
        Passageiro P4 = new Passageiro("004400440", "José Saramago", "914567890");
        Passageiro P5 = new Passageiro("005500550", "Vasco da Gama", "917890123");
        Passageiro P6 = new Passageiro("006600660", "Fernando Pessoa", "915678901");
        
        //Venda de Bilhetes
        SLB.vendeBilhete(P1, 1);
        SLB.vendeBilhete(P2, 1);
        SLB.vendeBilhete(P3, 2);
        SLB.vendeBilhete(P4, 2);
        SLB.vendeBilhete(P5, 3);
        SLB.vendeBilhete(P6, 3);
        
        //Receitas Totais
        System.out.println("Receitas totais: [" + SLB.getReceitasTotais() + "€].");
    }
}