# This is a python file used to parse our data.
from csv import reader
from pprint import pprint

my_svg = open("US_Congressional_districts.svg", "r+")
out_put = open("congressional_districts.svg", "a+")

csv_reader = reader(my_svg)
for i in range(0, 50):
	next(csv_reader)

all_districts = {}


# def print_readable_key(key):
#     print(key)


def get_full_key(t_key):
	state_id = t_key[4]
	state_id += t_key[5]
	num_id = t_key[7]
	num_id += t_key[8]
	name_id = ",n:"
	# print(state_id)
	if state_id == "AL":
		name_id += "\"Alabama District: "
	elif state_id == "AK":
		name_id += "\"Alaska District: "
	elif state_id == "AZ":
		name_id += "\"Arizona District: "
	elif state_id == "AR":
		name_id += "\"Arkansas District: "
	elif state_id == "CA":
		name_id += "\"California District: "
	elif state_id == "CO":
		name_id += "\"Colorado District: "
	elif state_id == "CT":
		name_id += "\"Connecticut District: "
	elif state_id == "DE":
		name_id += "\"Delaware District: "
	elif state_id == "FL":
		name_id += "\"Florida District: "
	elif state_id == "GA":
		name_id += "\"Georgia District: "
	elif state_id == "HI":
		name_id += "\"Hawaii District: "
	elif state_id == "ID":
		name_id += "\"Idaho District: "
	elif state_id == "IL":
		name_id += "\"Illinois District: "
	elif state_id == "IN":
		name_id += "\"Indiana District: "
	elif state_id == "IA":
		name_id += "\"Iowa District: "
	elif state_id == "KS":
		name_id += "\"Kansas District: "
	elif state_id == "KY":
		name_id += "\"Kentucky District: "
	elif state_id == "LA":
		name_id += "\"Louisiana District: "
	elif state_id == "ME":
		name_id += "\"Maine District: "
	elif state_id == "MD":
		name_id += "\"Maryland District: "
	elif state_id == "MA":
		name_id += "\"Massachusetts District: "
	elif state_id == "MI":
		name_id += "\"Michigan District: "
	elif state_id == "MN":
		name_id += "\"Minnesota District: "
	elif state_id == "MS":
		name_id += "\"Mississippi District: "
	elif state_id == "MO":
		name_id += "\"Missouri District: "
	elif state_id == "MT":
		name_id += "\"Montana District: "
	elif state_id == "NE":
		name_id += "\"Nebraska District: "
	elif state_id == "NV":
		name_id += "\"Nevada District: "
	elif state_id == "NH":
		name_id += "\"New Hampshire District: "
	elif state_id == "NJ":
		name_id += "\"New Jersey District: "
	elif state_id == "NM":
		name_id += "\"New Mexico District: "
	elif state_id == "NY":
		name_id += "\"New York District: "
	elif state_id == "NC":
		name_id += "\"North Carolina District: "
	elif state_id == "ND":
		name_id += "\"North Dakota District: "
	elif state_id == "OH":
		name_id += "\"Ohio District: "
	elif state_id == "OK":
		name_id += "\"Oklahoma District: "
	elif state_id == "OR":
		name_id += "\"Oregon District: "
	elif state_id == "PA":
		name_id += "\"Pennsylvania District: "
	elif state_id == "RI":
		name_id += "\"Rhode Island District: "
	elif state_id == "SC":
		name_id += "\"South Carolina District: "
	elif state_id == "SD":
		name_id += "\"South Dakota District: "
	elif state_id == "TN":
		name_id += "\"Tennessee District: "
	elif state_id == "TX":
		name_id += "\"Texas District: "
	elif state_id == "UT":
		name_id += "\"Utah District: "
	elif state_id == "VT":
		name_id += "\"Vermont District: "
	elif state_id == "VA":
		name_id += "\"Virgina District: "
	elif state_id == "WA":
		name_id += "\"Washington District: "
	elif state_id == "WV":
		name_id += "\"West Virginia District: "
	elif state_id == "WI":
		name_id += "\"Wisconsin District: "
	elif state_id == "WY":
		name_id += "\"Wyoming District: "
	else:
		name_id += "\"Dividing Lines"
	if state_id != "Di":
		name_id += num_id
	name_id += "\","
	result = t_key + name_id
	return result


for i in range(0, 436):
	current_list = []
	for i in range(0, 4):
		cur = next(csv_reader)
		temp_key = ""
		start_adding_cords = False
		for x in cur:
			if x.strip()[0] == 'd':
				start_adding_cords = True
			if x.strip()[0] == 'i':
				start_adding_cords = False
				temp_key = x.strip()
				# Here is where we can add the code we need to add a function that takes the key, and based on the key
				# build an addition n:StateName_District_Number
				full_key = get_full_key(temp_key)
				all_districts[full_key] = current_list
			if start_adding_cords:
				current_list.append(list(x.strip()))
for key in all_districts:
	i = 0
	while i < len(all_districts[key]):
		j = 0
		while j < len(all_districts[key][i]):
			if all_districts[key][i][j] == ' ':
				all_districts[key][i].remove(' ')
			elif all_districts[key][i][j] == '=':
				all_districts[key][i][j] = ':'
			j += 1
		all_districts[key][i] = "".join(all_districts[key][i])
		i += 1
	current_str = all_districts[key].__str__()
	#current_str = current_str.replace(" ", "")
	# print(current_str)
	# lets add in the post C/L spaces first..
	i = 0
	while i < len(current_str):
		# print("This is i: ", i, "This is length of String: ", len(current_str))
		if current_str[i] == 'C' or current_str[i] == 'L':
			current_str = current_str[:i] + " " + current_str[i] + " " + current_str[i + 1:]
			# print("This is current_str[i]: ", current_str[i])
			i += 1
			# print("This is current_str[i]: ", current_str[i])
		i += 1
		# print("This is the current_str[i]: ", current_str[i])

	current_str = current_str.replace('[', "")
	current_str = current_str.replace(']', "")
	current_str = current_str.replace('\'', "")
	resulting_str = "{"
	key = key.replace('=', ':')
	# print_readable_key(key)
	resulting_str += key + current_str
	resulting_str += "},"
	print(resulting_str)
	out_put.write(resulting_str)
	out_put.write("\n")
