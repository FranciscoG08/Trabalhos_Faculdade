package main;

import lists.LinkedList;


public class main {
    public static void main(String[] args) {
        
        // Cria uma instância da LinkedList
        LinkedList<String> minhaLista = new LinkedList<>();

        // Adiciona elementos à lista
        minhaLista.add("Elemento 1");
        minhaLista.add("Elemento 2");
        minhaLista.add("Elemento 3");

        // Imprime o tamanho da lista
        System.out.println("Tamanho da lista: " + minhaLista.size());

        // Imprime os elementos da lista usando o método toString
        System.out.println("Elementos da lista: " + minhaLista);

        // Testa o método get
        System.out.println("Elemento na posição 1: " + minhaLista.get(1));

        // Testa o método set
        minhaLista.set(1, "Novo Elemento 2");
        System.out.println("Elementos da lista após modificar: " + minhaLista);

        // Testa o método indexOf
        System.out.println("Posição do elemento 'Novo Elemento 2': " + minhaLista.indexOf("Novo Elemento 2"));

        // Testa o método remove
        minhaLista.remove(0);
        System.out.println("Elementos da lista após remoção: " + minhaLista);

        // Testa o método clear
        minhaLista.clear();
        System.out.println("Elementos da lista após limpeza: " + minhaLista);
        
    }
}
