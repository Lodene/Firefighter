import time
import serial
import requests

SERIALPORT = "COM12"
BAUDRATE = 115200
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
    except serial.SerialException:
        print("Serial {} port not available".format(SERIALPORT))
        exit()

def sendUARTMessage(msg):
    ser.write(msg.encode())
    print("Message <" + msg + "> sent to micro:bit.")

if __name__ == '__main__':
    initUART()
    while(True):
        time.sleep(1)
        response = requests.get("http://localhost:3000/api/sensor/active")
        if response.status_code == 200:
            data = response.json()

            for i in range(len(data)):
                data_str = "id:" + str(data[i]['id']) + ";intensity:" + str(data[i]['intensity']) + ";idDestination:cxf2153sd9r6qsw1qysfdi957\n"
                sendUARTMessage(data_str)
            print("Réponse de l'API : ", data)
        else:
            print("Échec de la requête. Code d'état : ", response.status_code)
            
        

    ser.close()


    