import datetime
import mysql.connector
import pandas as pd
from datetime import datetime, timedelta

def formata_data(coluna):
    for i in range(len(coluna)):
        coluna[i] = datetime.fromtimestamp(int(coluna[i]))
    return coluna

def formata_num(coluna):
    for i in range(len(coluna)):
        if len(coluna[i]) != 0:
            coluna[i] = '55'+coluna[i]
            coluna[i] = coluna[i].replace('(', '')
            coluna[i] = coluna[i].replace(')','')
            coluna[i] = coluna[i].replace(' ','')
            coluna[i] = coluna[i].replace('-','')
    return coluna

def conectar():
    db_connection = mysql.connector.connect(
    host="clubetv.xyz",
    port=3306,
    user="whatsapp",
    password="whatsapp",
    database="zap_user"
    )

    if db_connection.is_connected():
        print("Conexão bem-sucedida!")
    else:
        print("Falha na conexão.")

    return db_connection

def consultar_table(db_connection):
    # Definir a consulta SQL
    sql_query = "SELECT * FROM usuario"

    # Executar a consulta e armazenar o resultado em um DataFrame
    df = pd.read_sql(sql_query, con=db_connection)

    return df

def tratar_dados(df):
    data = df[['nome', 'data_premio', 'celular', 'CadUser']].copy()
    data['data_premio'] = formata_data(data['data_premio'])
    
    #formatar numeros
    data['celular'] = formata_num(data['celular'])

    # Suponha que 'data' seja o seu DataFrame
    # Convertendo a coluna 'data_premio' para o formato datetime
    data['data_premio'] = pd.to_datetime(data['data_premio'])
    print(data['data_premio'])

    # Calculando a data daqui a 5 dias a partir de hoje
    hoje = datetime.now()
    data_debtor_threshold = hoje + timedelta(days=1)

    # Aplicando o filtro para criar a nova coluna 'data_debtor'
    data['data_debtor'] = data[(data['data_premio'] >= hoje) & (data['data_premio'] < data_debtor_threshold)]['data_premio']

    # Exibindo o DataFrame com a nova coluna 'data_debtor'
    data_cobranca = data.dropna(subset=['data_debtor'])

    # Exibindo o novo DataFrame
    data_cobranca = data_cobranca.drop('data_debtor', axis= 1)
    data_cobranca.reset_index(drop=True, inplace=True)
    return data_cobranca
