import json
import mysql.connector

def lambda_handler(event, context):

    cinema_nome = event.get('cinema_nome')  # Pegando o nome do cinema via evento
    cinema_cidade = event.get('cinema_cidade')  # Pegando a cidade do cinema via evento
    id = event.get('funcionario_cpf')
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
            conditions.append("funcionario_cpf = %s")
            params.append(id)

        if cinema_nome:
            conditions.append("cinema_nome = %s")
            params.append(cinema_nome)

        if cinema_cidade:
            conditions.append("cinema_cidade = %s")
            params.append(cinema_cidade)
        query = "SELECT * FROM Funcionario"
        if nome:
            conditions.append("nome = %s")
            params.append(nome)
        if email:
            conditions.append("email = %s")
            params.append(email)
        if senha:
            conditions.append("senha = %s")
            params.append(senha)
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
'''
event = {
    'cpf': '123.123.222.17'
}
print(lambda_handler(event,None))

'''
# Exemplo de uso da função lambda_handler

event = {
    'funcionario_cpf': '123.123.123.11'
}
print(lambda_handler(event,None))
