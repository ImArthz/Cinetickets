import json
import mysql.connector

def lambda_handler(event, context):
    cinema_nome = event.get('cinema_nome')
    cinema_cidade = event.get('cinema_cidade')
    sala_numero = event.get('sala_numero')
    sessao_horario = event.get('sessao_horario')
    filme_titulo = event.get('filme_titulo')
    ingresso_id = event.get('ingresso_id')
    numero_poltrona = event.get('numero_poltrona')

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

        if sessao_horario:
            conditions.append("sessao_horario = %s")
            params.append(sessao_horario)

        if filme_titulo:
            conditions.append("filme_titulo = %s")
            params.append(filme_titulo)

        if ingresso_id:
            conditions.append("ingresso_id = %s")
            params.append(ingresso_id)
        if numero_poltrona:
            conditions.append("numero_poltrona = %s")
            params.append(numero_poltrona)

        query = "SELECT * FROM Ingresso"
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
            'body': json.dumps(data, default=str)  # default=str para lidar com datetime
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Exemplo de chamada
event = {
    'ingresso_id': '12345608',

}

print(lambda_handler(event, None))
