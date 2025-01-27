import prettytable as pt
import os

folder_name = "./stats" 
files = []
map_names = []

for file_name in os.listdir(folder_name):
    name = os.path.splitext(file_name)[0]
    with open(os.path.join(folder_name, file_name), 'r') as file:
        map_names.append(name.replace('_', ' '))
        files.append(file.read())

table = pt.PrettyTable()
table.field_names = ['map stage name', 'total runs', 'drop chance', 'runs to get 1 drop']

for file, map in zip(files, map_names):
    stats = file.splitlines()
    if stats == []:
        drops = '0'
        runs = '0'
        result = float(0)
    else:
        drops, runs = zip(*(i.split(',') for i in stats))
        result = sum(int(i) for i in drops)/sum(int(i) for i in runs)
    
    if result == 0:
        table.add_row([map, sum(int(i) for i in runs), f'{round(result*100, 2)}%', 'inf'])
    else:
        table.add_row([map, sum(int(i) for i in runs), f'{round(result*100, 2)}%', round(1/result, 2)])
    
print(table)