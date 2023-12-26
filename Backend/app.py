import numpy as np
from flask import Flask, request, jsonify, render_template
from tensorflow import keras
from keras.models import load_model
from flask_cors import CORS
from flask_cors import cross_origin
from PIL import Image
import io
import pandas as pd


model1 = load_model('medecinal_plant_identify_cnn.h5') # Neural Network Model
model2 = load_model('ponp.h5') # Not plant Model
model3 = load_model('poison1.h5') # Poison Model

cn=['Aloevera', 'Avaram', 'Black-HoneyShrub-karupu_nelli', 'Eucalyptus', 'Hibiscus', 'IndianStingingNettle-kangerisondathi', 'IvyGourd-kovaikai', 'SmallWaterClover-arraikirai', 'Turmeric', 'asthmaplant-toothuvalai', 'baloonvine-mudakathan', 'butterflypea-sungupuspham', 'capegooseberry-pillaithakali', 'coconut', 'corainder', 'crownflower-erukam', 'curryleaves', 'indiancopperleaf-kuppaimeni', 'indianmustard', 'jackfruit', 'jamun', 'jasmine', 'leamon', 'mango', 'mint', 'neem', 'tobacco', 'tulasi', 'waterapple']
app = Flask(__name__)

CORS(app, resources={r'/*': {'origins':"*"}})
print("started")

def function(file):
    if file:
        file_contents = file.read()
        image = Image.open(io.BytesIO(file_contents))
        image = image.resize((224, 224))
        img_array1 = np.array(image,dtype=np.float32)
        img_array2 = np.expand_dims(img_array1, axis=0) 
        return img_array2


@app.route('/')
def home():
    return render_template('index.html')

print("before predict")
@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    print("in predict")

    file = request.files['image']
    img_array2 = function(file)
    # print(file)
    y = {}

    # Check the prediction
    predictions2 = model2.predict(img_array2)

    print(predictions2)
    res = np.argmax(predictions2)
    print(res)

    img_array2 /= 255.0
    predictions1 = model1.predict(img_array2) # NN 
    fp = ["{:.2f}".format(prob) for prob in predictions1[0]]
    predicted_class = np.argmax(predictions1)
    predicted_label = cn[predicted_class]

    df=pd.read_csv("Details.csv")
    print(predicted_label);

    if(predicted_label == "coconut"):
        predicted_label = "tobacco"

    a=df[df['Plant Name']==predicted_label]
    x=((a.to_dict()))
    print(x)

    if(res == 1):

        print("Predicted class label:", predicted_label)
        print(fp)
        key = list(x['Plant Name'].keys())[0];
        print(key)
        y["Plant Name"]=x["Plant Name"][key]
        y["Biological Name"]=x['Biological Name'][key]
        y["Medicinal Uses"]=x["Medicinal Uses"][key]
        y["latitude and longitude"]=""
        return jsonify({'prediction': y})

    elif(res==0):

        y["Plant Name"]=""
        y["Biological Name"]=""
        y["Medicinal Uses"]=""
        y["latitude and longitude"]=""
        return jsonify({'prediction': y})


@app.route('/suspect', methods=['POST'])
@cross_origin()
def suspect():
    print("In Suspect")
    file = request.files['image']
    img_array2 = function(file)
    predictions3 = model3.predict(img_array2)
    op = np.argmax(predictions3)
    if(op == 0):
        return jsonify({"prediction": {"type" : "NON_TOXIC"}})

    elif(op == 1):
        return jsonify({"prediction": {"type": "TOXIC"}})


@app.route('/plant-details')
@cross_origin()
def fetchPlantDetails():
    df = pd.read_csv('Details.csv')
    locations = []
    for i in df.to_dict()['latitude and longitude']:
        dict1={}
        res = df.to_dict()['latitude and longitude'][i].replace("[",'').replace(']','').split(',')
        key = 0
        inner_location = []
        for j in res:
            tmp = j.replace("[",'').replace(']','').replace('"','')
            if(key == 0):
                dict1['lat'] = float(tmp)
                key = 1
            else:
                dict1['long'] = float(tmp)
                inner_location.append(dict1)
                print(inner_location)
                dict1={}
                key = 0
        print(df.to_dict()['Plant Name'][i])
        if(df.to_dict()['Plant Name'][i]) == 'coconut':
            continue;
        elif(df.to_dict()['Plant Name'][i]) != 'coconut':
            temp_dict={
                'name':df.to_dict()['Plant Name'][i],
                'points':inner_location
            }
        locations.append(temp_dict)
    return jsonify({'data':locations})

if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 5000)  