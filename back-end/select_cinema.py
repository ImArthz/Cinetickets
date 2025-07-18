import json
import mysql.connector

def lambda_handler(event, context):
    nome = event.get('nome')  # Pegando o CPF via evento
    cidade = event.get('cidade')
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
        conditions = []
        params = []

        if gerente_id:  # Se numero não for vazio ou None, adiciona condição
            conditions.append("gerente_id = %s")
            params.append(gerente_id)

        if nome:
            conditions.append("nome = %s")
            params.append(nome)

        if cidade:
            conditions.append("cidade = %s")
            params.append(cidade)

        if num_salas:
            conditions.append("num_salas = %s")
            params.append(num_salas)

        query = "SELECT * FROM Cinema"
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        query += ";"
        print(query)
        print(params)
        print("Executing query...")
        #query = f"SELECT * FROM Cinema where nome = \"{nome}\" AND cidade = \"{cidade}\";"
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
    'cidade': 'Divinópolis2'
}
print(lambda_handler(event,None))

