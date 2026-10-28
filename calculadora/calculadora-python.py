import sys


# 1. Funções de conversão e formatação no padrão pt-BR
def converter_ptbr(texto: str) -> float:
    """Converte uma string numérica para float, aceitando tanto vírgula (pt-BR) quanto ponto decimal."""
    texto_limpo = texto.strip()
    if "." in texto_limpo and "," in texto_limpo:
        # Ex: "1.000,50" -> remove separador de milhar e troca vírgula decimal por ponto
        texto_limpo = texto_limpo.replace(".", "").replace(",", ".")
    else:
        # Ex: "10,5" -> "10.5"
        texto_limpo = texto_limpo.replace(",", ".")
    return float(texto_limpo)


def formatar_ptbr(valor: float) -> str:
    """Formata um float para exibição com vírgula como separador decimal (padrão pt-BR)."""
    if valor.is_integer():
        return f"{valor:.1f}".replace(".", ",")
    # Se tiver decimais não nulos, remove zeros redundantes à direita (até 4 casas)
    texto = f"{valor:.4f}".rstrip("0")
    return texto.replace(".", ",")


# 2. Funções para as operações matemáticas com Type Hints
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


def porcentagem(valor: float, taxa: float) -> float:
    """Calcula a taxa percentual sobre um valor (ex: 15% de 200 = 30)."""
    return (valor * taxa) / 100


def exibir_menu() -> None:
    print("\n" + "=" * 25)
    print("   CALCULADORA SIMPLES")
    print("=" * 25)
    print("1. Soma (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Porcentagem (%)")
    print("6. Sair")
    print("=" * 25)


# 3. Função principal para gerenciar o fluxo do programa
def calculadora():
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-6): ").strip()

        if opcao == "6":
            print("Encerrando a calculadora. Até mais!")
            sys.exit()

        if opcao not in ("1", "2", "3", "4", "5"):
            print("Opção inválida! Tente novamente.")
            continue

        # Coleta dos números com suporte ao padrão pt-BR (vírgula como decimal)
        try:
            if opcao == "5":
                num1 = converter_ptbr(input("Digite o valor principal: "))
                num2 = converter_ptbr(input("Digite a porcentagem (%): "))
            else:
                num1 = converter_ptbr(input("Digite o primeiro número: "))
                num2 = converter_ptbr(input("Digite o segundo número: "))
        except ValueError:
            print("Erro: Entrada inválida. Por favor, digite números válidos (ex: 10 ou 10,5).")
            continue

        # 4. Uso do 'match-case' moderno do Python
        try:
            match opcao:
                case "1":
                    resultado = somar(num1, num2)
                    expressao = f"{formatar_ptbr(num1)} + {formatar_ptbr(num2)}"
                case "2":
                    resultado = subtrair(num1, num2)
                    expressao = f"{formatar_ptbr(num1)} - {formatar_ptbr(num2)}"
                case "3":
                    resultado = multiplicar(num1, num2)
                    expressao = f"{formatar_ptbr(num1)} * {formatar_ptbr(num2)}"
                case "4":
                    resultado = dividir(num1, num2)
                    expressao = f"{formatar_ptbr(num1)} / {formatar_ptbr(num2)}"
                case "5":
                    resultado = porcentagem(num1, num2)
                    expressao = f"{formatar_ptbr(num2)}% de {formatar_ptbr(num1)}"

            print(f"\n Resultado: {expressao} = {formatar_ptbr(resultado)}")

        except ZeroDivisionError as erro:
            print(f"\n{erro}")


# Ponto de entrada do script
if __name__ == "__main__":
    calculadora()