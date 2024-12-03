#ifndef ARCHIVO2_HPP
#define ARCHIVO2_HPP
#include "HardwareSerial.h"
#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>

struct Sensor {
  int pin;
  bool powered;
};

Sensor s1 = {17, (digitalRead(17) == HIGH)};
Sensor s2 = {4, (digitalRead(4) == HIGH)};

AsyncWebServer server(80);
void InitServer() {

  server.on("/status", HTTP_GET, [](AsyncWebServerRequest *request) {
    DynamicJsonDocument doc(512); // Tamaño ajustado
    JsonArray status = doc.createNestedArray("status");

    JsonObject sensor1Data = status.createNestedObject();
    sensor1Data["pin"] = s1.pin;
    sensor1Data["powered"] = s1.powered;

    JsonObject sensor2Data = status.createNestedObject();
    sensor2Data["pin"] = s2.pin;
    sensor2Data["powered"] = s2.powered;

    String jsonMessage;
    serializeJson(doc, jsonMessage);
    request->send(200, "application/json", jsonMessage);
  });

  server.on("/turno", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (request->hasParam("id")) {
      String param = request->getParam("id")->value();
      int sensorNumber = param.toInt();

      if (sensorNumber == 1) {
        s1.powered = !s1.powered;
        digitalWrite(s1.pin, s1.powered ? HIGH : LOW);
        Serial.println("Estado de s1 alternado: " + String(s1.powered ? "Encendido" : "Apagado"));
        String response = "{\"affected\": \"1\"}";
        request->send(200, "application/json", response);
      } else if (sensorNumber == 2) {
        s2.powered = !s2.powered;
        digitalWrite(s2.pin, s2.powered ? HIGH : LOW);
        Serial.println("Estado de s2 alternado: " + String(s2.powered ? "Encendido" : "Apagado"));
        String response = "{\"affected\": \"2\"}";
        request->send(200, "application/json", response);
      } else {
        String response = "{\"error\": \"ID de sensor no válido\"}";
        Serial.println("Error: ID de sensor no válido");
        request->send(400, "application/json", response);
      }
    } else {
      String response = "{\"error\": \"Parámetro no encontrado\"}";
      request->send(400, "application/json", response);
    }
  });

  server.begin();
  Serial.println("HTTP server started");
}

#endif