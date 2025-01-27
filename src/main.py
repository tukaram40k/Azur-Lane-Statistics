import prettytable as pt
import os
import sys

# default i/o paths
folder_name = './stats'
output_dir = './output'
mode = 'command line'

# set i/o paths
if len(sys.argv) == 3:
    folder_name = f"{sys.argv[1]}"
    output_dir = f"{sys.argv[2]}"
    mode = 'application'

files = []
map_names = []

# read file data
for file_name in os.listdir(folder_name):
    name = os.path.splitext(file_name)[0]
    with open(os.path.join(folder_name, file_name), 'r') as file:
        map_names.append(name.replace('_', ' '))
        files.append(file.read())

# prepare output table
table = pt.PrettyTable()
table.field_names = ['map stage name', 'total runs', 'drop chance', 'runs to get 1 drop']

# generate table
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

# save the table to a file
if mode == 'application':
    with open(os.path.join(output_dir, 'output.txt'), 'w') as output_file:
        output_file.write(f'{table}')
else:
    print(table)