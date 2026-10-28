import sys


# 1. Funções para as operações básicas com Type Hints
def somar(a: float, b: float) -> float:
    return a + b


def subtrair(a: float, b: float) -> float:
    return a - b


def multiplicar(a: float, b: float) -> float:
    return a * b


def dividir(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Erro: Não é possível dividir por zero.")
    return a / b


def exibir_menu() -> None:
    print("\n" + "=" * 25)
    print("   CALCULADORA SIMPLES")
    print("=" * 25)
    print("1. Soma (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair")
    print("=" * 25)


# 2. Função principal para gerenciar o fluxo do programa
def calculadora():
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-5): ").strip()

        if opcao == "5":
            print("Encerrando a calculadora. Até mais!")
            sys.exit()

        if opcao not in ("1", "2", "3", "4"):
            print("Opção inválida! Tente novamente.")
            continue

        # Coleta dos números com tratamento de erro
        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Erro: Entrada inválida. Por favor, digite apenas números.")
            continue

        # 3. Uso do 'match-case' moderno do Python
        try:
            match opcao:
                case "1":
                    resultado = somar(num1, num2)
                    operacao = "+"
                case "2":
                    resultado = subtrair(num1, num2)
                    operacao = "-"
                case "3":
                    resultado = multiplicar(num1, num2)
                    operacao = "*"
                case "4":
                    resultado = dividir(num1, num2)
                    operacao = "/"

            print(f"\n Resultado: {num1} {operacao} {num2} = {resultado}")

        except ZeroDivisionError as erro:
            print(f"\n{erro}")


# Ponto de entrada do script
if __name__ == "__main__":
    calculadora()