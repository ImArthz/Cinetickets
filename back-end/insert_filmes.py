import json
import mysql.connector

def lambda_handler(event, context):
    nome_cinema = event.get('cinema_nome')
    nome_cidade = event.get('cinema_cidade')
    titulo = event.get('titulo')
    trailer = event.get('trailer')
    poster = event.get('poster')
    sinopse = event.get('sinopse')

    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',
            port=3306,
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()

        # Inserindo com segurança (evita SQL injection)
        query = """
            INSERT INTO Filme (cinema_nome, cinema_cidade, titulo, trailer, poster, sinopse)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        valores = (nome_cinema, nome_cidade, titulo, trailer, poster, sinopse)
        cursor.execute(query, valores)
        connection.commit()

        cursor.close()
        connection.close()

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Filme inserido com sucesso'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Exemplo de uso
event = {
    'cinema_nome': 'Cinehitz',
    'cinema_cidade': 'Divinópolis 3',
    'titulo': 'Matrix Reloaded',
    'trailer': 'https://youtube.com/matrix',
    'poster': 'https://imglink.com/matrix.jpg',
    'sinopse': 'A história continua com Neo, Trinity e Morpheus...'
}

print(lambda_handler(event, None))
