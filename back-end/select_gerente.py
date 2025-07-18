import json
import mysql.connector

def lambda_handler(event, context):
    id = event.get('cpf')  # Pegando o CPF via evento
    nome = event.get('nome')  # Pegando o nome via evento
    email = event.get('email')  # Pegando o email via evento
    senha = event.get('senha')  # Pegando a senha via evento
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

        if id:  # Se numero não for vazio ou None, adiciona condição
            conditions.append("cpf = %s")
            params.append(id)

        if nome:
            conditions.append("nome = %s")
            params.append(nome)

        if email:
            conditions.append("email = %s")
            params.append(email)
        if senha:
            conditions.append("senha = %s")
            params.append(senha)
        query = "SELECT * FROM Gerente"
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
    'nome': 'joao'
}
print(lambda_handler(event,None))


