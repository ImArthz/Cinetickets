import json
import mysql.connector

def lambda_handler(event, context):
    nome = event.get('nome')  
    cinema_nome = event.get('cinema_nome')  # Pegando o nome do cinema via evento
    cinema_cidade = event.get('cinema_cidade')  # Pegando a cidade do cinema via evento
    id = event.get('funcionario_cpf')
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
        query = f"INSERT INTO Funcionario VALUES( \"{cinema_nome}\",\"{cinema_cidade}\",\"{id}\",\"{nome}\",\"{email}\",\"{senha}\");"
        cursor.execute(query)
        connection.commit()

        cursor.close()
        connection.close()
        data = {'message': 'Funcionario inserido com sucesso'}

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
# Exemplo de uso da função lambda_handler

event = {
    'funcionario_cpf': '123.123.123.00',
    'cinema_nome': 'Cinehitz',
    'cinema_cidade': 'Divinópolis',
    'nome': 'Maria Oliveira',
    'email': 'a@q.com',
    'senha': '1234567890'
}
print(lambda_handler(event,None))

'''
