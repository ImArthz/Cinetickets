import json
import mysql.connector

def lambda_handler(event, context):
    cinema_nome = event.get('cinema_nome')
    cinema_cidade = event.get('cinema_cidade')
    sala_numero = event.get('sala_numero')
    horario = event.get('horario')
    filme_titulo = event.get('filme_titulo')

    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',
            port=3306,
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()

        query = """
            INSERT INTO Sessao (cinema_nome, cinema_cidade, sala_numero, horario, filme_titulo)
            VALUES (%s, %s, %s, %s, %s)
        """
        valores = (cinema_nome, cinema_cidade, sala_numero, horario, filme_titulo)
        cursor.execute(query, valores)
        connection.commit()

        cursor.close()
        connection.close()

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Sessão inserida com sucesso'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Exemplo de uso
event = {
    'cinema_nome': 'Cinehitz2',
    'cinema_cidade': 'Divinópolis',
    'sala_numero': 1,
    'horario': '2025-07-11 20:15:00',
    'filme_titulo': 'LOST'
}

print(lambda_handler(event, None))
