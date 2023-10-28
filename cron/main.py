from crontab import CronTab

cron = CronTab(user='root') 

job = cron.new(command='python3 /root/lucasaeloa/arq.py')
job.setall('52 14 * * *')  

# Grave a tarefa no crontab
cron.write()
