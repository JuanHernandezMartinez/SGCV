#include <HTTPClient.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

const char* ssid = "wifiesp";
const char* password = "12345678";
const int fan1 =1;
const int fan2 =2;

IPAddress local_IP(192, 168, 1, 184);  // La IP que deseas asignar al Arduino
IPAddress subnet(255, 255, 255, 0);

WebServer server(80);

void handleRoot() {
  server.send(200, "text/plain", "Hello from ESP32");
}

void makeApiRequest() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://192.168.37.173:4000/");

    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;
    doc["sensor"] = "Sensor" + random(0,3);
    doc["temperature"] = random(30,41);
    String jsonString;
    serializeJson(doc, jsonString);

    int httpResponseCode = http.POST(jsonString);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.println("Error on HTTP request");
      Serial.println(http.errorToString(httpResponseCode));
    }
    http.end();
  }
}

void getInfoSensors(){}

void addCORSHeaders() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Endpoint para manejar solicitudes GET en la raíz "/"
// Endpoint para manejar solicitudes OPTIONS (necesario para CORS preflight)
void handleOptions() {
  addCORSHeaders();
  server.send(204);  // Responder sin cuerpo
}

void turnFan(){
  addCORSHeaders();
  if (server.hasArg("plain")) {
    String body = server.arg("plain");
    Serial.println("Received POST request with body: " + body);

    // Parsear el cuerpo JSON
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);

    if (!error) {
      int param1 = doc["fan"];
      int param2 = doc["on"];

    Serial.print("param1: ");
    Serial.println(param1);

    Serial.print("param2: ");
    Serial.println(param2);

      server.send(200, "application/json", "{\"message\":\"Cambiado con exito\"}");
    } else {
      server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Invalid JSON\"}");
    }
  } else {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"No body found\"}");
  }
}

void setup() {
  Serial.begin(9600);

  if (!WiFi.config(local_IP, INADDR_NONE, subnet)) {  // INADDR_NONE significa sin gateway
    Serial.println("Error al configurar la IP estática");
  }

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  //server.on("/", HTTP_GET, handleRoot);
  //server.on("/status", HTTP_GET, handleStatus);
  //.on("/post-data", HTTP_POST, handlePostData);
  //server.on("/sensor", HTTP_GET, handleSensor);
  server.on("/turn",HTTP_POST, turnFan);
  server.on("/", HTTP_OPTIONS, handleOptions);
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
  // makeApiRequest();
  delay(10000);
}