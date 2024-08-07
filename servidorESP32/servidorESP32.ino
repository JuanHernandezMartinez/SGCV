#include <HTTPClient.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

const char* ssid = "wifiesp";
const char* password = "12345678";

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

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  server.on("/", handleRoot);
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
  makeApiRequest();
  delay(10000);
}