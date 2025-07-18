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

        conditions = []
        params = []
        if cinema_nome:  # Se numero não for vazio ou None, adiciona condição
            conditions.append("cinema_nome = %s")
            params.append(cinema_nome)

        if cinema_cidade:
            conditions.append("cinema_cidade = %s")
            params.append(cinema_cidade)

        if sala_numero:
            conditions.append("sala_numero = %s")
            params.append(sala_numero)

        if horario:
            conditions.append("horario = %s")
            params.append(horario)

        if filme_titulo:
            conditions.append("filme_titulo = %s")
            params.append(filme_titulo)

        query = "SELECT * FROM Sessao"
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
            'body': json.dumps(data, default=str)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }


# Exemplo de chamada
event = {
    'cinema_cidade': 'Divinópolis3',

}

print(lambda_handler(event, None))
