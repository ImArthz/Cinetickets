import json
import mysql.connector

def lambda_handler(event, context):
    cinema_nome = event.get('cinema_nome')
    cinema_cidade = event.get('cinema_cidade')
    sala_numero = event.get('sala_numero')
    sessao_horario = event.get('sessao_horario')
    filme_titulo = event.get('filme_titulo')
    ingresso_id = event.get('ingresso_id')

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
            INSERT INTO Ingresso (cinema_nome, cinema_cidade, sala_numero, sessao_horario, filme_titulo, ingresso_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        valores = (cinema_nome, cinema_cidade, sala_numero, sessao_horario, filme_titulo, ingresso_id)
        cursor.execute(query, valores)
        connection.commit()

        cursor.close()
        connection.close()

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Ingresso inserido com sucesso'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Exemplo de uso
event = {
    'cinema_nome': 'Cinehitz',
    'cinema_cidade': 'Divinópolis',
    'sala_numero': 1,
    'sessao_horario': '2025-07-11 20:00:00',
    'filme_titulo': 'LOST',
    'ingresso_id': 12345671#exatament 8 digitos 
}

print(lambda_handler(event, None))
