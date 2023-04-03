/*
 Connections to be made: 
  1. LDR is on pin d33 relay for light bulb on ln1 port 18 still to work on the amount of light 
  2. Ultrasonic is on pin echo d22 and trigger d23 then relay dc pump ln2 on port 19
  3. Turbdity sensor is on pin d4 
  4. Ph meter on A0 which is Vp on module 

 Tatenda Bako 
 Raymond Nyakudanga 
 Emmanuel Damba 
 Lawrence Takaendesa

 Date:- 28/03/23
*/
#include "WiFi.h"
#include "DHT.h"
#include <HTTPClient.h>
#include <WebServer.h>
#include <ArduinoJson.h>

// defining sensor pins
#define LIGHT_SENSOR_PIN 33
#define ULTRASONIC_SENSOR_PIN_ECHO 22
#define ULTRASONIC_SENSOR_PIN_TRIGGER 23
#define TURBIDITY_SENSOR_PIN 4
#define PH_SENSOR_PIN A0

// for conneting to wifi or hotspot
const char *ssid = "tatendaZw";
const char *pass = "12345677";
IPAddress ip;

// function to connect eps32 to hotspot
void connect_to_hotspot() {
  WiFi.begin(ssid, pass);  //Connect to WiFi

  // run loop below while trying to connect to hotspot
  Serial.print("Connecting.");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("IP address: ");
  ip = WiFi.localIP();
  Serial.println(WiFi.localIP());
}

int lightVal;
int distance;
long duration;
float ph;
float Value = 0;

// defing relay pins
int LIGHT_RELAY_PORT = 18;  // ln1 is light
int PUMP_RELAY_PORT =  19;// LN2 is pump

// median filtering algorithm
int getMedianNum(int bArray[], int iFilterLen) {
  int bTab[iFilterLen];
  for (byte i = 0; i < iFilterLen; i++)
    bTab[i] = bArray[i];
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++) {
    for (i = 0; i < iFilterLen - j - 1; i++) {
      if (bTab[i] > bTab[i + 1]) {
        bTemp = bTab[i];
        bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
      }
    }
  }
  if ((iFilterLen & 1) > 0) {
    bTemp = bTab[(iFilterLen - 1) / 2];
  } else {
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
  }
  return bTemp;
}

// values for connectibng to webserver
WebServer server(5000);  // connecting webserver on port 80

void setup() {
  Serial.begin(115200);
  connect_to_hotspot();

  // initilise sensor ports
  pinMode(ULTRASONIC_SENSOR_PIN_TRIGGER, OUTPUT); 
  pinMode(ULTRASONIC_SENSOR_PIN_ECHO, INPUT); 
  pinMode(PH_SENSOR_PIN, INPUT);

  // setup relay ports 
  pinMode(LIGHT_RELAY_PORT, OUTPUT);
  pinMode(PUMP_RELAY_PORT, OUTPUT);
 
  // initialise relay ports
  digitalWrite(LIGHT_RELAY_PORT, HIGH);  
  digitalWrite(PUMP_RELAY_PORT, HIGH);

  // SERVER ROUTES
  server.on("/", handle_OnConnect);
  server.onNotFound(handle_NotFound);
  server.begin();
  Serial.println("HTTP Server started!!!");
  delay(1000);

}

// function to get disatance cleatrajce from ultrasonic
int get_Distance() {
  digitalWrite(ULTRASONIC_SENSOR_PIN_TRIGGER, LOW);  //set trigger signal low for 2us
  delayMicroseconds(2);

  /*send 10 microsecond pulse to trigger pin of HC-SR04 */
  digitalWrite(ULTRASONIC_SENSOR_PIN_TRIGGER, HIGH);  // make trigger pin active high
  delayMicroseconds(10);            // wait for 10 microseconds
  digitalWrite(ULTRASONIC_SENSOR_PIN_TRIGGER, LOW);   // make trigger pin active low

  /*Measure the Echo output signal duration or pulss width */
  duration = pulseIn(ULTRASONIC_SENSOR_PIN_ECHO, HIGH);  // save time duration value in "duration variable
  distance = duration * 0.034 / 2;     //Convert pulse duration into distance
  Serial.print("Ultrasonic sensor value: ");
  Serial.println(distance);

  if(distance<1000){
    digitalWrite(PUMP_RELAY_PORT, LOW);
  }else if(distance>1000){
    digitalWrite(PUMP_RELAY_PORT, HIGH);
  }
  
  delay(500);
  return distance;
}

// function to get light alue from ldr
int getLightValue(){
  //Read and print the sensor pin value
  lightVal = analogRead(LIGHT_SENSOR_PIN);
  Serial.print("LDR Value:");
  Serial.println(lightVal);
  if (lightVal<1500){
    digitalWrite(LIGHT_RELAY_PORT, LOW);
  }else if(lightVal > 1500){
    digitalWrite(LIGHT_RELAY_PORT, HIGH);
  }

  return lightVal;
}

// read  value from turbidty sensor
float getTurbidityValue(){
  int sensorValue = analogRead(TURBIDITY_SENSOR_PIN);// read the input on analog pin 0:
  float voltage = sensorValue * (5.0 / 1024.0); // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
  Serial.print("Tutbidity Value:");
  Serial.println(voltage);

  return voltage;
}

// read value from ph sensor

float getPhValue() {
  Value = analogRead(PH_SENSOR_PIN);
  float voltage = Value * (3.3 / 4095.0);
  Serial.print("PH Value: ");
  Serial.println(ph);
  delay(500);

  return ph;
}

// html to distplay if default router port is hit
String SendHTML() {
  String ptr = "<!DOCTYPE html> <html>\n";
  ptr += "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n";
  ptr += "<title>ESP32 for hydropinics is READY!!!</title>\n";
  ptr += "<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}\n";
  ptr += "body{margin-top: 50px;} h1 {color: #444444;margin: 50px auto 30px;}\n";
  ptr += "p {font-size: 24px;color: #444444;margin-bottom: 10px;}\n";
  ptr += "</style>\n";
  ptr += "</head>\n";
  ptr += "<body>\n";
  ptr += "<div id=\"webpage\">\n";
  ptr += "<h1>ESP32 for hydropinics is READY!!</h1>\n";
  ptr += "</div>\n";
  ptr += "</body>\n";
  ptr += "</html>\n";
  return ptr;
}

// default route for server
void handle_OnConnect() {
  server.send(200, "text/html", SendHTML());
}

// not found handler
void handle_NotFound() {
  server.send(404, "text/plain", "Not found");
}


void loop() {
  Serial.print("Ip Address is: ");
  Serial.println(ip);
  // setup items for sending to sercver -- diff variables for diff items
  server.handleClient();
  
  // call function to get light value
  getLightValue();
  
  // call the function to get distance
  get_Distance();

  // call the function to get turbidity
  getTurbidityValue();

  // call function to get PH
  getPhValue();

  Serial.println("-------------------------------------------------------------------------------------------------------------");

  delay(1000);
}
