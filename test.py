def ordenar(dado):
    cont = 0
    for passnum in range(len(dado)-1, 0, -1):
        for i in range(passnum):
            if dado[i] > dado[i + 1]:
                temp = dado[i]
                dado[i] = dado[i + 1]
                dado[i + 1] = temp
                cont += 1
    return cont

dado = [16, 18, 15, 37, 13]

contador = ordenar(dado)
print(dado)
print(contador)