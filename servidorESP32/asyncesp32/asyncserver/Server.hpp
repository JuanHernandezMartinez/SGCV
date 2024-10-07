#include "HardwareSerial.h"
#include "Sensor.h"
#include <Arduino.h>
#include <ArduinoJson.h>

bool prendido = false;
Sensor s1(1, 4, false);
Sensor s2(2, 5, false);
Sensor s3(3, 6, false);
Sensor s4(4, 7, false);
Sensor s5(5, 8, false);
Sensor* sensors[] = { &s1, &s2, &s3, &s4, &s5 };


AsyncWebServer server(80);

String getSensorsJson() {
  // Utilizamos ArduinoJson para generar el JSON
  DynamicJsonDocument doc(1024);
  
  JsonArray sensorArray = doc.createNestedArray("sensors");

  for (Sensor* sensor : sensors) {
    JsonObject sensorObj = sensorArray.createNestedObject();
    sensorObj["id"] = sensor->id;
    sensorObj["pin"] = sensor->pin;
    sensorObj["powered"] = sensor->powered;
  }

  String output;
  serializeJson(doc, output);
  return output;
}

void InitServer() {

  server.on("/sensors", HTTP_GET, [](AsyncWebServerRequest *request) {
    String jsonResponse = getSensorsJson();
    request->send(200, "application/json", jsonResponse);
  });

  server.on(
    "/turn", HTTP_POST, [](AsyncWebServerRequest *request) {
      // No se procesará la respuesta aquí, solo se usará para obtener el cuerpo
    },
    NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
      // Imprimir el cuerpo de la solicitud
      String body;
      body += String((char *)data, len);
      Serial.println("Cuerpo de la solicitud:");
      Serial.println(body);
      s1.powered = !s1.powered;
      digitalWrite(s1.pin, s1.powered ? HIGH : LOW);

      request->send(200, "text/plain", "Hola mundo (desde ESP32)");
    });

  

  server.onNotFound([](AsyncWebServerRequest *request) {
    request->send(400, "text/plain", "Not found");
  });

  server.begin();
  Serial.println("HTTP server started");
}