import json
import mysql.connector

def lambda_handler(event, context):

    cinema_nome = event.get('cinema_nome')  # Pegando o nome do cinema via evento
    cinema_cidade = event.get('cinema_cidade')  # Pegando a cidade do cinema via evento
    id = event.get('funcionario_cpf')
    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',        # Seu host
            port=3306,         # Porta como inteiro
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()
        query = f"SELECT * FROM Funcionario where funcionario_cpf = \"{id}\" AND cinema_nome = \"{cinema_nome}\" AND cinema_cidade = \"{cinema_cidade}\";"
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

# Exemplo de uso da função lambda_handler
'''
event = {
    'cpf': '123.123.222.17'
}
print(lambda_handler(event,None))

'''
# Exemplo de uso da função lambda_handler

event = {
    'funcionario_cpf': '123.123.123.11',
    'cinema_nome': 'Cinehitz',
    'cinema_cidade': 'Divinópolis'
}
print(lambda_handler(event,None))