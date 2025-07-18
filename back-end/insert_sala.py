import json
import mysql.connector

def lambda_handler(event, context):
    numero = event.get('numero')  
    cinema_nome = event.get('cinema_nome')  # Pegando o nome do cinema via evento
    cinema_cidade = event.get('cinema_cidade')  # Pegando a cidade do cinema via evento
    numero_poltronas = event.get('numero_poltronas')
   
    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',        # Seu host
            port=3306,         # Porta como inteiro
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()
        query = f"INSERT INTO Sala VALUES( \"{cinema_nome}\",\"{cinema_cidade}\",\"{numero}\",\"{numero_poltronas}\");"
        cursor.execute(query)
        connection.commit()

        cursor.close()
        connection.close()
        data = {'message': 'Sala inserida com sucesso'}

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


'''
# Exemplo de uso da função lambda_handler

event = {
    'numero': '3',
    'cinema_nome': 'Cinehitz',
    'cinema_cidade': 'Divinópolis',
    'numero_poltronas': '100'
}
print(lambda_handler(event,None))
