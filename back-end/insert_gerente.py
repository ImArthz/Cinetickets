import json
import mysql.connector

def lambda_handler(event, context):
    cpf = event.get('cpf')  # Pegando o CPF via evento
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
        query = f"INSERT INTO Gerente VALUES (\'{cpf}\',\'{nome}\',\'{email}\',\'{senha}\') ;"
        cursor.execute(query)
        connection.commit()

        cursor.close()
        connection.close()

    
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Gerente inserido com sucesso'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
'''

# Exemplo de uso da função lambda_handler

event = {
    'cpf': '123.123.133.12',
    'nome': 'João Silva',
    'email': 'd@g.com.br',
    'senha': '123455666666'
}
print(lambda_handler(event,None))
'''
