import json
import mysql.connector

def lambda_handler(event, context):
    numero = event.get('numero')  
    cinema_nome = event.get('cinema_nome')  # Pegando o nome do cinema via evento
    cinema_cidade = event.get('cinema_cidade')  # Pegando a cidade do cinema via evento
    numero_poltronas = event.get('numero_poltronas')  # Pegando o número de poltronas via evento

    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',        # Seu host
            port=3306,         # Porta como inteiro
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()
        #query = f"SELECT * FROM Sala where numero = \"{numero}\" AND cinema_nome = \"{cinema_nome}\" AND cinema_cidade = \"{cinema_cidade}\";"
        conditions = []
        params = []

        if numero:  # Se numero não for vazio ou None, adiciona condição
            conditions.append("numero = %s")
            params.append(numero)

        if cinema_nome:
            conditions.append("cinema_nome = %s")
            params.append(cinema_nome)

        if cinema_cidade:
            conditions.append("cinema_cidade = %s")
            params.append(cinema_cidade)
        if numero_poltronas:
            conditions.append("numero_poltronas = %s")
            params.append(numero_poltronas)
        query = "SELECT * FROM Sala"
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        query += ";"
        print(query)
        print(params)
        print("Executing query...")
        cursor.execute(query, params)
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
    'cpf': '123.123.222.17'
}
print(lambda_handler(event,None))

'''
# Exemplo de uso da função lambda_handler

event = {
    'numero': '1'
}
print(lambda_handler(event,None))
