import json
import mysql.connector

def lambda_handler(event, context):
    nome = event.get('nome')  # Pegando o CPF via evento
    cidade = event.get('cidade')
    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',        # Seu host
            port=3306,         # Porta como inteiro
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()
        query = f"SELECT * FROM Cinema where nome = \"{nome}\" AND cidade = \"{cidade}\";"
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
    'nome': 'CineHitz',
    'cidade': 'Divinópolis'
}
print(lambda_handler(event,None))

'''
