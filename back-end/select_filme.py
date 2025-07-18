import json
import mysql.connector

def lambda_handler(event, context):
    nome = event.get('cinema_nome', None)  # Pegando o nome da cidade via evento
    cidade = event.get('cinema_cidade', None)  # Pegando o nome da cidade do cinema via evento
    titulo = event.get('titulo', None)  # Pegando o nome do cinema via evento
    trailer = event.get('trailer', None)  # Pegando o trailer do filme via evento
    poster = event.get('poster', None)  # Pegando o poster do filme via evento
    sinopse = event.get('sinopse', None)  # Pegando a sinopse do filme via evento
    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',        # Seu host
            port=3306,         # Porta como inteiro
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()
        conditions = []
        params = []
        if nome:  # Se numero não for vazio ou None, adiciona condição
            conditions.append("cinema_nome = %s")
            params.append(nome)

        if cidade:
            conditions.append("cinema_cidade = %s")
            params.append(cidade)

        if titulo:
            conditions.append("titulo = %s")
            params.append(titulo)

        if trailer:
            conditions.append("trailer = %s")
            params.append(trailer)

        if poster:
            conditions.append("poster = %s")
            params.append(poster)

        if sinopse:
            conditions.append("sinopse = %s")
            params.append(sinopse)

        query = "SELECT * FROM Filme"
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        query += ";"
        print(query)
        print(params)
        print("Executing query...")
        cursor.execute(query,params)
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

event = {
    'cinema_nome': 'Cinehitz',
    
}
print(lambda_handler(event,None))