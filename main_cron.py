from subprocess import run, PIPE
run(["pip3", "install","crontab"])
from crontab import CronTab

run(["pip3", "install","pandas"])
run(["pip3", "install","mysql-connector-python"])



cron = CronTab(user='root') 

job = cron.new(command='python3 CobraZap/script/puxar_dados.py')

horas = "00"
minutos = "00"
job.setall(f'{minutos} {horas} * * *')  

# Grave a tarefa no crontab
cron.write()
