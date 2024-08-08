from flask import Flask, jsonify
import pymongo
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['Recycle_Device']
collection = db['Devices']

company_base_prices = {
    'Apple': 15000, #Apple
    'Samsung': 8000, #Samsumg
    'Oneplus': 6000, #Oneplus
    'Xiaomi': 4000, #xiaomi
    'Oppo': 3500, #oppo
    'Vivo': 3000, #vivo
    'Poco': 2500, #poco
    'Nokia': 2000 #nokia
}
ram_weight = 50
storage_weight = 30
battery_weight = 0.01


@app.route('/data', methods=['GET'])
def insertdata():
    base_url = "https://cdn.recycledevice.com/device/"
    start_id = 4888  # Starting ID for the URLs

    mobile_data = [
        {'company': 'Apple', 'device': 'iPhone 11', 'battery': '3110mAh', 'ram': '4GB', 'processor': 'A13 Bionic', 'storage': '64GB', 'url': f'{base_url}{start_id}.jpeg'},
        {'company': 'Apple', 'device': 'iPhone 11 Pro', 'battery': '3046mAh', 'ram': '4GB', 'processor': 'A13 Bionic', 'storage': '64GB', 'url': f'{base_url}{start_id + 1}.jpeg'},
        {'company': 'Apple', 'device': 'Sell old iPhone 11 Pro', 'battery': '3046mAh', 'ram': '4GB', 'processor': 'A13 Bionic', 'storage': '64GB', 'url': f'{base_url}{start_id + 2}.jpeg'},
        {'company': 'Apple', 'device': 'iPhone 11 Pro Max', 'battery': '3969mAh', 'ram': '4GB', 'processor': 'A13 Bionic', 'storage': '64GB', 'url': f'{base_url}{start_id + 3}.jpeg'},
        {'company': 'Apple', 'device': 'Sell old iPhone 11 Pro Max', 'battery': '3969mAh', 'ram': '4GB', 'processor': 'A13 Bionic', 'storage': '64GB', 'url': f'{base_url}{start_id + 4}.jpeg'},
        {'company': 'Apple', 'device': 'iPhone 4', 'battery': '1420mAh', 'ram': '512MB', 'processor': 'Apple A4', 'storage': '8GB', 'url': f'{base_url}{start_id + 5}.jpeg'},
        {'company': 'Apple', 'device': 'Sell old iPhone 4', 'battery': '1420mAh', 'ram': '512MB', 'processor': 'Apple A4', 'storage': '8GB', 'url': f'{base_url}{start_id + 6}.jpeg'}
    ]

    # Insert data into the collection
    collection.insert_many(mobile_data)
    return jsonify("Data inserted successfully")

@app.route('/del', methods=['GET'])
def delete():
    

    collection.delete_many({})
    return jsonify("helloworld")

@app.route('/db', methods=['GET'])
def showdb():
    data = collection.find({} , {'_id': 0})
    data = list(data)
    return jsonify(data)

@app.route('/fetch/<string:Company>', methods=['GET'])
def fetchdata(Company):
    devices = collection.find({'company': Company}, {'_id': 0})
    devices_list = list(devices)
    return jsonify(devices_list)

@app.route('/<string:Mobile>', methods=['GET'])
def fetchMobile(Mobile):
    devices = collection.find({'device': Mobile}, {'_id': 0})
    devices_list = list(devices)
    return jsonify(devices_list)

@app.route('/predict/<string:Mobile>', methods=['GET'])
def predict(Mobile):
    device = collection.find({'device': Mobile}, {'_id': 0})
    device_list = list(device)
    battery = device_list[0]['battery']
    ram = device_list[0]['ram']
    storage = device_list[0]['storage']
    company = device_list[0]['company']

    battery_num = int(battery.replace('mAh', ''))
    ram_num = int(ram.replace('GB', ''))
    storage_num = int(storage.replace('GB', ''))
    
    price = estimate_price(ram_num , storage_num , battery_num , company)



    return jsonify(price)

def estimate_price(ram , storage , battery , company):
    base_price = company_base_prices.get(company)
    ram_price = ram * ram_weight *3
    storage_price = storage * storage_weight*2
    battery_price = (battery - 3000) * battery_weight*2  
    return base_price + ram_price + storage_price + battery_price


def parse_num(str , torem):
    str.replace(torem ,'')
    return int(str)
    

if __name__ == '__main__':
    app.run(debug=True)
