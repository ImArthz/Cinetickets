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
            SELECT * FROM Ingresso 
            WHERE cinema_nome = %s 
              AND cinema_cidade = %s 
              AND sala_numero = %s 
              AND sessao_horario = %s 
              AND filme_titulo = %s 
              AND ingresso_id = %s
        """
        valores = (
            cinema_nome, 
            cinema_cidade, 
            sala_numero, 
            sessao_horario, 
            filme_titulo, 
            ingresso_id
        )

        cursor.execute(query, valores)
        results = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]

        cursor.close()
        connection.close()

        data = [dict(zip(columns, row)) for row in results]

        return {
            'statusCode': 200,
            'body': json.dumps(data, default=str)  # default=str para lidar com datetime
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Exemplo de chamada
event = {
    'cinema_nome': 'Cinehitz2',
    'cinema_cidade': 'Divinópolis',
    'sala_numero': 1,
    'sessao_horario': '2025-07-11 20:00:00',
    'filme_titulo': 'LOST',
    'ingresso_id': 12345678
}

print(lambda_handler(event, None))
