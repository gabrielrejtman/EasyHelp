#include <stdio.h>
#include <stdlib.h>
#include <time.h>

long long int comparisons = 0;  // Contador para o número de comparações
long long int movements = 0;    // Contador para o número de movimentações

// Função para imprimir o array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d, ", arr[i]);
    }
    printf("\n");
}

// Algoritmo de ordenação: Bubble Sort
void bubbleSort(int arr[], int size) {
    clock_t start = clock();  // Inicia a contagem do tempo

    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            comparisons++;
            if (arr[j] > arr[j + 1]) {
                movements += 3;  // Contabiliza as movimentações
                // Realiza troca
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    clock_t end = clock();  // Finaliza a contagem do tempo
    printf("Tempo de execucao: %f segundos\n", (double)(end - start) / CLOCKS_PER_SEC);
}

// Algoritmo de ordenação: Selection Sort
void selectionSort(int arr[], int size) {
    clock_t start = clock();

    for (int i = 0; i < size - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < size; j++) {
            comparisons++;
            if (arr[j] < arr[minIndex]) {
                movements += 3;
                // Realiza troca
                int temp = arr[j];
                arr[j] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }

    clock_t end = clock();
    printf("Tempo de execução: %f segundos\n", (double)(end - start) / CLOCKS_PER_SEC);
}

// Algoritmo de ordenação: Insertion Sort
void insertionSort(int arr[], int size) {
    clock_t start = clock();

    for (int i = 1; i < size; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            comparisons++;
            movements++;
            // Realiza troca
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }

    clock_t end = clock();
    printf("Tempo de execução: %f segundos\n", (double)(end - start) / CLOCKS_PER_SEC);
}

// Algoritmo de ordenação: Shell Sort
void shellSort(int arr[], int size) {
    clock_t start = clock();

    for (int gap = size / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < size; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                comparisons++;
                movements++;
                // Realiza troca
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }

    clock_t end = clock();
    printf("Tempo de execução: %f segundos\n", (double)(end - start) / CLOCKS_PER_SEC);
}

// Partição do Quick Sort
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j <= high - 1; j++) {
        comparisons++;
        if (arr[j] < pivot) {
            i++;
            movements += 3;
            // Realiza troca
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    movements += 3;
    // Realiza troca
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

// Algoritmo de ordenação: Quick Sort
void quickSort(int arr[], int low, int high) {


    if (low < high) {
        int pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Heapify para o Heap Sort
void heapify(int arr[], int size, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        comparisons++;
        movements += 3;
        // Realiza troca
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        heapify(arr, size, largest);
    }
}

// Algoritmo de ordenação: Heap Sort
void heapSort(int arr[], int size) {
    clock_t start = clock();

    for (int i = size / 2 - 1; i >= 0; i--) {
        heapify(arr, size, i);
    }

    for (int i = size - 1; i > 0; i--) {
        comparisons++;
        movements += 3;
        // Realiza troca
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        heapify(arr, i, 0);
    }

    clock_t end = clock();
    printf("Tempo de execução: %f segundos\n", (double)(end - start) / CLOCKS_PER_SEC);
}

// Merge para o Merge Sort
void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;

    int L[n1], R[n2];

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2) {
        comparisons++;
        if (L[i] <= R[j]) {
            movements++;
            arr[k] = L[i];
            i++;
        } else {
            movements++;
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        movements++;
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        movements++;
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Algoritmo de ordenação: Merge Sort
void mergeSort(int arr[], int l, int r) {

    if (l < r) {
        int m = l + (r - l) / 2;

        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }

}

// Interface de menu para o usuário
void menuInterface(void) {
    int choice, n;

    // Solicita ao usuário o número de elementos no array
    printf("Digite o numero de elementos no array: ");
    scanf("%d", &n);

    int arr[n];

    // Solicita ao usuário os elementos do array
    printf("Digite os elementos do array:\n");
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    do {
        // Apresenta o menu de escolha
        printf("\n1. Bubble Sort\n");
        printf("2. Selection Sort\n");
        printf("3. Insertion Sort\n");
        printf("4. Shell Sort\n");
        printf("5. Quick Sort\n");
        printf("6. Heap Sort\n");
        printf("7. Merge Sort\n");
        printf("8. Sair\n");

        // Solicita ao usuário a escolha
        printf("\nDigite sua escolha: ");
        scanf("%d", &choice);

        comparisons = 0;  // Reinicia o contador de comparacoes
        movements = 0;    // Reinicia o contador de movimentacoes

        switch (choice) {
            case 1:
                bubbleSort(arr, n);
                printf("Array ordenado usando Bubble Sort: ");
                //printArray(arr, n);
                printf("Tamanho do vetor: %d\n", n);
                printf("Numero de comparacoes: %lld\n", comparisons);
                printf("Numero de movimentacoes: %lld\n", movements);
                break;

            case 2:
                selectionSort(arr, n);
                printf("Array ordenado usando Selection Sort: ");
                //printArray(arr, n);
                printf("Tamanho do vetor: %d\n", n);
                printf("Numero de comparacoes: %lld\n", comparisons);
                printf("Numero de movimentacoes: %lld\n", movements);
                break;

            case 3:
                insertionSort(arr, n);
                printf("Array ordenado usando Insertion Sort: ");
                //printArray(arr, n);
                printf("Tamanho do vetor: %d\n", n);
                printf("Numero de comparacoes: %lld\n", comparisons);
                printf("Numero de movimentacoes: %lld\n", movements);
                break;

            case 4:
                shellSort(arr, n);
                printf("Array ordenado usando Shell Sort: ");
                //printArray(arr, n);
                printf("Tamanho do vetor: %d\n", n);
                printf("Numero de comparacoes: %ld\n", comparisons);
                printf("Numero de movimentacoes: %ld\n", movements);
                break;


            case 5:
                clock_t start_quick = clock();

                quickSort(arr, 0, n - 1);

                clock_t end_quick = clock();
                printf("Tempo de execucao: %f segundos\n", (double)(end_quick - start_quick) / CLOCKS_PER_SEC);

                printf("Array ordenado usando Quick Sort: ");
                //printArray(arr, n);
                printf("Tamanho do vetor: %d\n", n);
                printf("Numero de comparacoes: %ld\n", comparisons);
                printf("Numero de movimentacoes: %ld\n", movements);
                break;

            case 6:
                heapSort(arr, n);
                printf("Array ordenado usando Heap Sort: ");
                //printArray(arr, n);
                printf("Tamanho do vetor: %d\n", n);
                printf("Numero de comparacoes: %ld\n", comparisons);
                printf("Numero de movimentacoes: %ld\n", movements);
                break;

            case 7:

                clock_t start_merge = clock();

                mergeSort(arr, 0, n - 1);

                clock_t end_ = clock();
                printf("Tempo de execucao: %f segundos\n", (double)(end_ - start_merge) / CLOCKS_PER_SEC);

                printf("Array ordenado usando Merge Sort: ");
                //printArray(arr, n);
                printf("Tamanho do vetor: %d\n", n);
                printf("Numero de comparacoes: %ld\n", comparisons);
                printf("Numero de movimentacoes: %ld\n", movements);
                break;

            case 8:
                printf("Encerrando o programa.\n");
                break;

            default:
                printf("Escolha invalida. Por favor, digite uma opcao valida.\n");
        }

    } while (choice != 8);
}


int main() {
    menuInterface();
    return 0;
}