<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:4285F4,50:34A853,100:0070f3&height=200&section=header&text=Imers%C3%A3o%20IA%20%E2%80%94%20Alura&fontSize=48&fontColor=ffffff&fontAlignY=35&desc=Construindo%20software%20com%20as%20IAs%20do%20Google&descAlignY=55&descSize=18" alt="Imersão IA — Alura" width="100%"/>

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Google AI Studio](https://img.shields.io/badge/Google%20AI%20Studio-Prototipação-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Google Antigravity](https://img.shields.io/badge/Google%20Antigravity-Pair%20Programming-34A853?style=for-the-badge&logo=google&logoColor=white)
![Alura](https://img.shields.io/badge/Imersão-Alura-0070f3?style=for-the-badge)

**[🎯 Desafios](#-trilha-de-desafios) · [🔄 Jornada](#-a-jornada-do-código) · [🖥️ Demonstração](#%EF%B8%8F-demonstração) · [🛠️ Como rodar](#%EF%B8%8F-pré-requisitos-e-execução)**

</div>

---

## 📖 Sobre

Repositório dedicado ao acompanhamento prático dos desafios da **Imersão IA da Alura**, explorando as ferramentas do ecossistema do Google: **Google AI Studio** e **Google Antigravity**.

O projeto central é uma aplicação de calculadora em Python, desenvolvida iterativamente com o auxílio de inteligência artificial: gerada no AI Studio e evoluída/refatorada via Antigravity.

> [!NOTE]
> O código é escrito pelas IAs. O que é meu está em [`anotacoes/`](anotacoes/): os prompts usados, as perguntas respondidas e o que aprendi em cada etapa.

---

## 🔄 A jornada do código

```mermaid
flowchart TB
    subgraph D1["Dia 1 · Google AI Studio"]
        direction LR
        A["💬 Prompt"] --> B["✨ AI Studio<br/>gera o código"] --> C["🧮 4 operações<br/>+ − × ÷"]
    end
    subgraph D2["Dia 2 · Google Antigravity"]
        direction LR
        D["🛸 Explora<br/>o projeto"] --> E["➕ Porcentagem"] --> F["✅ Testes"]
    end
    subgraph D3["Dia 3"]
        G["🚀 Próximo desafio"]
    end
    D1 --> D2 --> D3

    classDef studio fill:#4285F4,stroke:#1a5fd0,color:#fff
    classDef anti fill:#34A853,stroke:#1e7e34,color:#fff
    classDef next fill:#0070f3,stroke:#0050b3,color:#fff
    class A,B,C studio
    class D,E,F anti
    class G next
```

---

## 🎯 Trilha de Desafios

| Dia | Tema | Ferramenta | Anotações | Status |
|:---:|:---|:---:|:---:|:---:|
| **1** | Criando sua primeira aplicação com IA | ✨ Google AI Studio | [dia1.md](anotacoes/dia1.md) | 🔄 Em andamento |
| **2** | Evoluindo a aplicação e adicionando features | 🛸 Google Antigravity | [dia2.md](anotacoes/dia2.md) | ⏳ A iniciar |
| **3** | Desafio 3 | — | [dia3.md](anotacoes/dia3.md) | ⏳ A iniciar |

---

## 🖥️ Demonstração

```console
$ python calculadora/calculadora-python.py

=========================
   CALCULADORA SIMPLES
=========================
1. Soma (+)
2. Subtração (-)
3. Multiplicação (*)
4. Divisão (/)
5. Sair
=========================
Escolha uma opção (1-5): 1
Digite o primeiro número: 12
Digite o segundo número: 30

 Resultado: 12.0 + 30.0 = 42.0
```

<details>
<summary><b>🛡️ E se eu tentar dividir por zero?</b></summary>

<br/>

```console
Escolha uma opção (1-5): 4
Digite o primeiro número: 7
Digite o segundo número: 0

Erro: Não é possível dividir por zero.
```

A calculadora não quebra: a função `dividir` lança o erro e o laço principal o captura, mostra a mensagem e volta ao menu.

</details>

---

## 📂 Estrutura do Repositório

```text
imersao_alura/
├── 🧮 calculadora/         # Código-fonte da aplicação (Python)
├── 📝 anotacoes/           # Registros dos desafios, prompts e aprendizados
│   ├── dia1.md             # Desafio 1: Prototipação com Google AI Studio
│   ├── dia2.md             # Desafio 2: Evolução no Google Antigravity
│   └── dia3.md             # Desafio 3: Próximos passos
├── 🐍 .python-version      # Definição de versão do Python
└── 📖 README.md            # Documentação principal
```

---

## 🛠️ Pré-requisitos e Execução

> [!IMPORTANT]
> É preciso **Python 3.11 ou superior**. O código usa `match-case`, que não existe antes do 3.10; numa versão mais antiga o programa falha com `SyntaxError` antes de abrir o menu.

**1. Criar e ativar o ambiente virtual**

<table>
<tr><th>🐧 Linux / 🍎 macOS</th><th>🪟 Windows</th></tr>
<tr>
<td>

```bash
python3.11 -m venv .venv
source .venv/bin/activate
```

</td>
<td>

```powershell
py -3.11 -m venv .venv
.venv\Scripts\activate
```

</td>
</tr>
</table>

**2. Executar a aplicação**

```bash
python calculadora/calculadora-python.py
```

---

## 💡 Ferramentas Exploradas

| | Ferramenta | Papel no projeto |
|:---:|:---|:---|
| ✨ | **[Google AI Studio](https://aistudio.google.com/)** | Prototipação rápida, experimentação de prompts e geração inicial da lógica de software. |
| 🛸 | **Google Antigravity** | IDE agêntica de desenvolvimento assistido por IA para exploração de contexto, refatoração, testes e evolução contínua da base de código. |

---

<div align="center">

Feito durante a **Imersão IA da Alura** 💙

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0070f3,50:34A853,100:4285F4&height=100&section=footer" alt="" width="100%"/>

</div>
