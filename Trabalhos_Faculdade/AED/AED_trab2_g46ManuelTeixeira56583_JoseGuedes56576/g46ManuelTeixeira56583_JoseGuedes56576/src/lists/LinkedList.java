package lists;

import java.util.Iterator;

public class LinkedList<E> extends DoublyLinkedList<E> implements List<E> {
    @Override
    public int size() {
        
        return super.size();
        
    }

    @Override
    public boolean isEmpty() {
        
        return super.isEmpty();
        
    }

    @Override
    public void add(E e) {
        
        addLast(e);
        
    }

    @Override
    public void addAll(List<E> outra) {
        
        for (E element : outra) {
            
            addLast(element);
            
        }
    }

    @Override
    public boolean contains(E e) {
        
        Node<E> atual = header.getNext();
        
        while (atual != trailer) {
            if (atual.getElement().equals(e)) {
                return true;
            }
            atual = atual.getNext();
        }
        
        return false;
        
    }

    @Override
    public int indexOf(E e) {
        
        Node<E> atual = header.getNext();
        
        int i = 0;
        while (atual != trailer) {
            if (atual.getElement().equals(e)) {
                return i;
            }
            atual = atual.getNext();
            i++;
        }
        return -1;
    }

    @Override
    public boolean add(int i, E e) {
        
        if (i < 0 || i > super.size()) {
            
            throw new IndexOutOfBoundsException("Índice apresentado fora dos limites da lista.");
            
        }
    
        if (i == 0) {
            
        super.addFirst(e);
           
        return true;
        
        } else if (i == super.size()) {
            
            super.addLast(e);
            
            return true;
            
        } else {
            
            Node<E> atual = super.header.getNext();
            
            int pos = 0;

            while (pos < i - 1) {
                
                atual = atual.getNext();
                pos++;
                
            }

            super.addBetween(e, atual, atual.getNext());
            
            return true;
        }
    }

    @Override
    public E set(int i, E e) {
        
        int j;
        
        try {
            
            if (i < 0 || i >= size()) {
                
                throw new IndexOutOfBoundsException("Índice inválido: " + i);
                
            }

            Node<E> atual = header.getNext();
            
            for (j = 0; j < i; j++) { 
                
                atual = atual.getNext();
                
            }

            E Elemento_Original = atual.getElement();
            remove(atual);
            add(i, e);

            return Elemento_Original;
            
        } catch(IndexOutOfBoundsException ex) {    
            
            System.out.println("Erro ao modificar o elemento na posição " + i);
            
            return null;
            
        }
    }
    

    @Override
    public E get(int i) {
        
        int j;
        
        if (i < 0 || i >= size()) {
             
            throw new IndexOutOfBoundsException("Índice inválido: " + i);
            
        }
         
        Node<E> atual = header.getNext();    
        
        for (j = 0; j < i; j++) {
           
            atual = atual.getNext();
            
        }   
        
        return atual.getElement();       
        
    }

    @Override
    public E remove(int i) {
        
        int j;
        
        if (i < 0 || i >= size()) {
            
            throw new IndexOutOfBoundsException("Índice inválido: " + i);
            
        }

        Node<E> atual = header.getNext();
        for (j = 0; j < i; j++) {
            
            atual = atual.getNext();
            
        }

    return remove(atual);
    
    }

    @Override
    public void clear() {
        
        Node<E> atual = header.getNext();
        
        while (atual!=trailer){
            
            Node<E> next = atual.getNext(); 
            remove(atual); 
            atual = next; 
            
        }
    }

    @Override
    public Iterator<E> iterator() {
        
        return new LinkedListIterator();
    
    }

    private class LinkedListIterator implements Iterator<E> {
        
        private Node<E> atual = header.getNext();

        @Override
        public boolean hasNext() {
            return atual != trailer;
        }

        @Override
        public E next() {
            
            if (!hasNext()) {
                
                throw new UnsupportedOperationException("Não ha elementos posteriormente!"); 
                
            }

            E elemento = atual.getElement();
            atual = atual.getNext();
            return elemento;
        }
    }

    @Override
    public String toString() {
        
        String string_met = "[";
        Node<E>  atual = header.getNext();

        while (atual != trailer) {
            
            string_met += atual.getElement();
            
            if (atual.getNext() != trailer) {
                
                string_met += ", ";
                
            }
            
            atual = atual.getNext();
            
        }

        string_met += "]";
        return string_met;
    
    }

    @Override
    public boolean equals(Object obj){
        
        throw new UnsupportedOperationException("Método não implementado!");
        
    }    
    
    @Override
    public LinkedList<E> clone() {
        
        LinkedList<E> ListaClonada = new LinkedList<>();
        for (E element : this) {
            
            ListaClonada.addLast(element);
            
        }
        
        return ListaClonada;
    }
}
