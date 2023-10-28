from crontab import CronTab

# Crie um objeto CronTab
cron = CronTab(user='root')  # Substitua 'seu_usuario' pelo nome de usuário correto

# Adicione uma nova tarefa ao cron
job = cron.new(command='/root/lucasaeloa/arq.py')
job.setall('35 23 * * *')  # Defina a programação (executará todos os dias à meia-noite)

# Grave a tarefa no arquivo de cron
cron.write()
