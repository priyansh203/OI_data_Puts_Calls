import requests
from bs4 import BeautifulSoup

index="banknifty"
num="23" #for banknifty num="23"
expiry="2023-09-20"
CEPE="PE"
strikePrice="46100.00"

url = "https://www.moneycontrol.com/india/indexfutures/"+ index+"/"+num+"/"+expiry+"/OPTIDX/"+CEPE+"/"+strikePrice+"/true"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
cell_data=["a","","","","","","","",""]
i=0

# Find the div element with class "FR PA10"
div_element = soup.find('div', class_='FR PA10')

if div_element:
    # Find the table element within the div
    table_element = div_element.find('table')
    
    if table_element:
        # Process and extract data from the table as needed
        for row in table_element.find_all('tr'):
            columns = row.find_all('td')
            for column in columns:
                cell_data[i] = column.text
                i=i+1

        print(cell_data[4])    
    else:
        print("Table not found within the div.")
else:
    print("Div element with class 'FR PA10' not found.")



