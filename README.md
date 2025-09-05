# K6 JokeAPI Performance Test

![K6 Performance](https://img.shields.io/badge/K6-Performance-blue)
![Test Status](https://img.shields.io/badge/Test-Passed-brightgreen)

Este projeto contém um teste de performance utilizando [K6](https://k6.io/) para a API pública de piadas ([JokeAPI](https://v2.jokeapi.dev/)).

O objetivo é realizar a validação de respostas, métricas de performance e geração de relatórios automatizados\*\*.

---

## 🏆 Objetivos do teste

1. Chamar a API de piadas em diferentes categorias:
   - `Programming`
   - `Misc`
   - `Pun`
2. Validar o retorno da API, garantindo:
   - Status HTTP 200
   - Conteúdo JSON válido
   - Presença do campo `joke` como string
3. Medir métricas de performance:
   - Tempo de resposta (`joke_duration`)
   - Taxa de sucesso (`joke_success_rate`)
   - Percentis (p95, p99)
4. Gerar **relatórios automáticos**:
   - HTML visual
   - JSON com métricas completas

---

## 📁 Estrutura do projeto

´´´
k6-jokeapi-test/
├─ scripts/
│ └─ jokeapi_test.js # Script principal do K6
├─ results/ # Relatórios gerados automaticamente
│ ├─ jokeapi_report.html
│ └─ jokeapi_results.json
├─ README.md # Este arquivo
└─ .gitignore # Ignora results/ e node_modules/

´´´

---

## ⚙️ Como rodar o teste

### Pré-requisitos

- [K6](https://k6.io/docs/getting-started/installation/) instalado
- Node.js (opcional, caso use pacotes adicionais)

### Comando para execução

```bash
k6 run scripts/jokeapi_test.js

´´´
| Métricas            | Tipo      | Descrição                                |
| ------------------- | --------- | ---------------------------------------- |
| `joke_duration`     | Trend     | Tempo de resposta das requisições (ms)   |
| `joke_success_rate` | Rate      | Taxa de sucesso das requisições          |
| Percentis p95/p99   | Percentil | Identificação de outliers de performance |

´´´
👨‍💻 Autor
Edu – Quality Engineer / Test Automation

```
