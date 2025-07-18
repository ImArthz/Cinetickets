# 🎟️ CineTickets - Engenharia de Software

**Plataforma Web para Venda de Ingressos de Cinema em Pequenos Estabelecimentos**  

A Engenharia de Software é essencial para o desenvolvimento de sistemas confiáveis, seguros e escaláveis. Seu papel vai além da simples programação, abrangendo desde o levantamento de requisitos até o ciclo completo de desenvolvimento, testes, implantação e manutenção.

O projeto **CineTickets** foi desenvolvido no contexto da disciplina de Engenharia de Software do curso de Engenharia de Software do CEFET-MG - Campus Divinópolis. Ele visa demonstrar, na prática, os conceitos aprendidos em sala por meio da criação de uma solução real para venda online de ingressos de cinema, voltada a estabelecimentos de pequeno porte.

Principais propósitos do projeto:

🔹 Aplicar o ciclo completo de Engenharia de Software  
🔹 Utilizar metodologias ágeis (Scrum)  
🔹 Integrar tecnologias modernas e serviços em nuvem  
🔹 Simular um ambiente de produção real  
🔹 Entregar uma solução funcional, testada e documentada

---

## 🎯 Contexto do Sistema

O sistema CineTickets surgiu a partir de uma demanda real observada em pequenos cinemas da cidade de Divinópolis-MG, que ainda não oferecem uma plataforma online para venda de ingressos. A ausência desse recurso compromete a experiência do cliente e a organização da gestão interna do cinema.

Este projeto se propôs a resolver esse problema com uma solução web simples, intuitiva e escalável, explorando os seguintes pilares:

🔹 Compra online de ingressos (experiência do cliente)  
🔹 Interface administrativa para gerentes e funcionários  
🔹 Sistema de backend serverless com AWS Lambda  
🔹 Banco de dados relacional hospedado na nuvem (AWS RDS)

---

## 📦 Módulos Principais do Sistema

| Módulo                        | Status         | Descrição                                                                 |
|------------------------------|----------------|--------------------------------------------------------------------------|
| Catálogo de Filmes           | ✅ Completo     | Exibição de sinopse, trailer e horários disponíveis                      |
| Compra de Ingressos          | ✅ Completo     | Escolha de sessão, categoria, pagamento simulado e geração de PDF        |
| Gestão de Sessões            | ✅ Completo     | Definição de horários e preços diferenciados por categoria               |
| Administração de Filmes      | ✅ Completo     | Cadastro, edição e exclusão lógica de filmes                             |
| Autenticação de Usuários     | ✅ Parcial      | Gerente e funcionário com papéis distintos (cliente não precisa logar)   |
| Verificação de Ingressos     | ✅ Completo     | Conferência de validez do ingresso por chave única                       |
| Infraestrutura Serverless    | ✅ Simulada     | Utilização de AWS Lambda, API Gateway e RDS com Free Tier                |

---

## 🛠️ Tecnologias e Ferramentas

- **Frontend**: HTML5, CSS3, JavaScript (puro)
- **Backend**: Python 3.10 com AWS Lambda
- **Banco de Dados**: MySQL (Amazon RDS)
- **API REST**: Amazon API Gateway
- **Gerenciamento de Tarefas**: Trello
- **Modelagem**: Visual Paradigm, Draw.io
- **Versionamento**: GitHub

---

## 🚀 Como Executar

### Frontend

1. Instale o VS Code (recomendado)
2. Use a extensão Live Server para abrir `index.html`

```bash
# Executar com Live Server
index.html -> clique direito -> Open with Live Server
```

### Backend (Simulado Local)

1. Instale dependências:

```bash
pip install mysql-connector-python
```

2. Execute uma função exemplo:

```bash
python create_ingresso.py
```

> Lembre-se de configurar as credenciais do banco no código.

---

## 👨‍💻 Equipe

| Nome                              | Função                          |
|-----------------------------------|---------------------------------|
| Arthur O. Mendonça                | Backend                         |
| Arthur S. de Mesquita             | Frontend                        |
| Eduardo R. Guimarães              | Banco de Dados e Backend        |
| Eduardo da Silva Torres Grillo   | Documentação e Slides           |
| João Victor Francisco de Barros  | Banco de Dados e Backend        |
| Michael Yoshiaki Todoroki        | Frontend                        |

---
