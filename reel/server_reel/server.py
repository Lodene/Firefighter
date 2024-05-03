import serial
import requests
import json
import time

SERIALPORT = "COM11" 
BAUDRATE = 115200
broker="localhost"
port=1883

ser = serial.Serial()
    
def initUART():
    ser.port = SERIALPORT
    ser.baudrate = BAUDRATE
    ser.bytesize = serial.EIGHTBITS
    ser.parity = serial.PARITY_NONE
    ser.stopbits = serial.STOPBITS_ONE
    ser.timeout = None
    ser.xonxoff = False
    ser.rtscts = False
    ser.dsrdtr = False  
    print("Starting Up Serial Monitor")
    try:
        ser.open()
    except serial.SerialException as e:
        print("Serial {} port not available".format(SERIALPORT))
        print("Error opening serial port: {}".format(e))
        exit()

def readUARTMessage():
    message = ser.readline().strip().decode('utf-8')
    message = json.loads(message)
    return message.get('message')

def update_sensors(id, intensity):
    print('fonction update_sensors, id :' + str(id) + " intensity : " + str(intensity))
    data = {"sensor": { "id": int(id), "intensity": int(intensity) } }
    try:
        response = requests.put("http://localhost:3000/api/sensor", json=data)
        if response.status_code == 200:
            print("Mise à jour des capteurs réussie. Réponse:", response.json())
            return response
        print("Échec de la mise à jour des capteurs. Code d'état:", response.status_code)
        return None
    except requests.exceptions.RequestException as e:
        print("Une erreur s'est produite lors de l'envoi de la requête:", e)
        return None

def parse_string_to_object(input_string):
    if input_string.startswith(':'):
        input_string = 'id' + input_string
    
    # Diviser la chaîne en segments basés sur ';'
    segments = input_string.split(';')

    # Créer un dictionnaire pour stocker les valeurs
    objet = {}

    # Traiter chaque segment pour extraire les clés et les valeurs
    for segment in segments:
        if ':' in segment:
            key, value = segment.split(':', 1)
            objet[key] = value

    return objet
    
def update_all_sensor():
    response = requests.get("http://localhost:3000/api/sensor/active")
    if response.status_code == 200:
        data = response.json()
        for i in range(len(data)):
            intensity = int(data[i]['intensity']) + 1
            update_sensors((data[i]['id']), intensity)
            print('capteur update')
    
if __name__ == "__main__":
    try:
        initUART()
        temps_debut = time.time()
        while True:
            print('\n\PREMIERE PARTIE\n')
            new_fire = True
            data = readUARTMessage()
            print(data)
            obj= parse_string_to_object(data)
            update_sensors(obj.get('id'), obj.get('intensity'))
            print(obj)
            temps_actuel = time.time()
            if temps_actuel - temps_debut >= 10:
                update_all_sensor()
                temps_debut = temps_actuel
    
    except KeyboardInterrupt:
        print("Keyboard interrupt detected. Exiting...")
    finally:
        ser.close()