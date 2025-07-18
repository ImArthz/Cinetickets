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
            DELETE FROM Sessao
            WHERE cinema_nome = %s
              AND cinema_cidade = %s
              AND sala_numero = %s
              AND horario = %s
              AND filme_titulo = %s
        """
        valores = (cinema_nome, cinema_cidade, sala_numero, horario, filme_titulo)

        cursor.execute(query, valores)
        connection.commit()
        affected_rows = cursor.rowcount

        cursor.close()
        connection.close()

        if affected_rows > 0:
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Sessão deletada com sucesso'})
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Sessão não encontrada'})
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Exemplo de chamada
event = {
    'cinema_nome': 'Cinehitz',
    'cinema_cidade': 'Divinópolis3',
    'sala_numero': 1,
    'horario': '2025-07-11 20:00:01',
    'filme_titulo': 'LOST2'
}

print(lambda_handler(event, None))
