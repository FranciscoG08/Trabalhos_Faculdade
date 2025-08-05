package lists;

/**
 * Interface para coleções com o comportameto típico de uma lista.
 * Os elementos são acedidos pela sua posição (indíce inteiro).
 * @param <E> tipo de elemento a colecionar.
 * @since 21/12/2023
 */
public interface List<E> extends Iterable<E>{
    /**
     * Devolve a quantidade de elementos contidos na lista.
     * @return número de elementos da lista.
     */
    int size();    
    /**
     * Verifica se a lista não contém elementos.
     * @return true se a lista está vazia; false caso contrário.
     */
    boolean isEmpty();   
    /**
     * Adiciona o elemento específico no fim da lista.
     * @param e elemento a adicionar à lista.
     */
    void add(E e);
    /**
     * Adiciona o elemento específico na i-ésima posição da lista, deslocando para a frente todos os elementos que já existam a partir dessa posição.
     * @param i posição de inserção (começa em zero).
     * @param e elemento a adicionar à lista.
     * @return true se inserção for bem sucedida; false caso a posição i seja inválida.
     */
    boolean add(int i, E e);
    /**
     * Substitui o elemento da i-ésima posição da lista pelo novo elemento.
     * @param i posição da substituição.
     * @param e novo elemento.
     * @return o elemento original, ou null caso a posição i seja inválida.
     */
    E set(int i, E e);
    /**
     * Adiciona à lista todos os elementos contidos noutra lista, sem clonar os objetos copiados.
     * @param outra lista com os elementos a serem adicionados à lista atual.
     */
    void addAll(List<E> outra);
    /**
     * Verifica se a lista contém o elemento específico.
     * @param e elemento cuja presença na lista é verificada.
     * @return true se o elemento específico estiver presente; false caso contrário.
     */
    boolean contains(E e);
    /**
     * Retorna, sem remover, o elemento da posição i.
     * @param i posição do elemento (começa em zero).
     * @return o elemento da posição i, ou null caso a posição i seja inválida.
     */
    E get(int i);
     /**
     * Devolve a posição da primeira ocorrência do elemento específico.
     * @param e o elemento cuja posição na lista é verificada.
     * @return a posição do elemento, ou -1 caso esse elemento não exista.
     */
    int indexOf(E e);
    /**
     * Remove da lista o elemento da posição i.
     * @param i posição do elemento a ser removido.
     * @return o elemento removido, ou null caso a posição i seja inválida.
     */
    E remove(int i);  
    /**
    * Remove todos os elementos da lista, deixando-a vazia.
    */
    void clear();
    
    /**
     * Devolve uma string com uma representação de todos os elementos colecionados.
     * @return a string com a representação dos elementos.
     */ 
    @Override
    String toString();
    /**
     * Verifica se o objeto específico é considerado igual à lista.
     * @param obj objeto a ser comparado com a lista atual.
     * @return true se listas forem consideradas iguais; false caso contrário.
     */ 
    @Override
    boolean equals(Object obj);    
    /**
     * Devolve uma cópia da lista, sem clonar os elementos colecionados.
     * @return uma lista com os mesmos elementos da lista atual.
     */ 
    
    LinkedList<E> clone();
}
