import json
import mysql.connector
'''
nome VARCHAR(64),
cidade VARCHAR(64),
gerente_id CHAR(14) NOT NULL,
num_salas INT NOT NULL,

'''

def lambda_handler(event, context):
    cidade = event.get('cidade')  # Pegando o CPF via evento
    nome = event.get('nome')  # Pegando o nome via evento
    gerente_id = event.get('gerente_id')  # Pegando o email via evento
    num_salas = event.get('num_salas')  # Pegando a senha via evento
    try:
        connection = mysql.connector.connect(
            host='52.14.177.95',        # Seu host
            port=3306,         # Porta como inteiro
            database='cinetickets',
            user='admin',
            password='EngSoftware25'
        )

        cursor = connection.cursor()
        query = f"INSERT INTO Cinema VALUES (\'{nome}\',\'{cidade}\',\'{gerente_id}\',\'{num_salas}\') ;"
        cursor.execute(query)
        connection.commit()

        cursor.close()
        connection.close()

    
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Cinema inserido com sucesso'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
'''


'''

# Exemplo de uso da função lambda_handler

event = {
    'cidade': 'Sao Carlos',
    'nome': 'Joao Silva',
    'gerente_id': '123.123.123.13',
    'num_salas': '6'
}
print(lambda_handler(event,None))