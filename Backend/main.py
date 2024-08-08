from flask import Flask, jsonify
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['Recycle_Device']
collection = db['Devices']

@app.route('/data', methods=['GET'])
def insertdata():
    mobile_data = [
        {'company': 'Samsung', 'device': 'Galaxy S21', 'battery': '4000mAh', 'ram': '8GB'},
        {'company': 'Samsung', 'device': 'iPhone 139', 'battery': '3095mAh', 'ram': '6GB'},
       
    ]

    # Insert data into the collection
    collection.insert_many(mobile_data)
    return jsonify("helloworld")

@app.route('/fetch/<string:Company>', methods=['GET'])
def fetchdata(Company):
    devices = collection.find({'company': Company}, {'_id': 0})
    devices_list = list(devices)
    return jsonify(devices_list)


@app.route('/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello World")



if __name__ == '__main__':
    app.run(debug=True)
