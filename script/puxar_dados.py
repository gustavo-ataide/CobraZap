import pandas as pd
import json
import datetime
from funcoes import conectar, consultar_table, tratar_dados
from subprocess import run, PIPE

# Configurar a conexão
db_connection = conectar()

# Puxando a table usuarios
df = consultar_table(db_connection)

# Fechar a conexão
db_connection.close()

# Exibir o DataFrame com os dados
data_cobranca = tratar_dados(df)

data_cobranca.drop("data_premio", axis=1, inplace=True)

# Converter o DataFrame em um dicionário
data_cobranca_dict = data_cobranca.to_dict(orient='records')

# Criar um arquivo JSON a partir do dicionário
with open('data_cobranca.json', 'w') as json_file:
    json.dump(data_cobranca_dict, json_file, indent=4)


#chamando autobots
run(["node", "./script/index.js"])



