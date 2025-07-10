'''def select_from_remote_table(table):
    try:
        # Conecta ao banco remoto
        connection = mysql.connector.connect(
            host= '52.14.177.95',
            port= '3306',
            database= 'cinetickets',
            user= 'admin',
            password= 'EngSoftware25'
        )

        cursor = connection.cursor()
        query = f"SELECT * FROM {table};"
        cursor.execute(query)
        results = cursor.fetchall()

        # Pega os nomes das colunas
        columns = [desc[0] for desc in cursor.description]

        # Fecha a conexão
        cursor.close()
        connection.close()

        # Retorna os dados como uma lista de dicionários
        return [dict(zip(columns, row)) for row in results]

    except Exception as e:
        print(f"Erro ao acessar o banco de dados: {e}")
        return []

dados = select_from_remote_table(
    table="Cinema"
)

for linha in dados:
    print(linha)
___'''
import json
import mysql.connector

def lambda_handler(event, context):
    table = event.get('table', 'Sessao')  # Pegando o nome da tabela via evento, default 'Cinema'

    try:
        connection = mysql.connector.connect(
            host='...',        # Seu host
            port=3306,         # Porta como inteiro
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()
        query = f"SELECT * FROM {table};"
        cursor.execute(query)
        results = cursor.fetchall()

        columns = [desc[0] for desc in cursor.description]

        cursor.close()
        connection.close()

        data = [dict(zip(columns, row)) for row in results]

        return {
            'statusCode': 200,
            'body': json.dumps(data)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }