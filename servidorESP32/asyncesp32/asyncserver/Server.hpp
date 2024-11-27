#ifndef ARCHIVO2_HPP
#define ARCHIVO2_HPP

#include "HardwareSerial.h"
#include <Arduino.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// extern DallasTemperature sensor1;
// extern DallasTemperature sensor2;
// extern DallasTemperature sensor3;

struct Sensor {
  int pin;
  bool powered;
};

Sensor s1 = { 2, false };
Sensor s2 = { 4, false };

AsyncWebServer server(80);
void InitServer() {

  server.on(
    "/turno", HTTP_GET, [](AsyncWebServerRequest *request) {
      if (request->hasParam("id")) {                      // Busca el parámetro "id" en la query string
        String param = request->getParam("id")->value();  // Obtén el valor del parámetro "id"
        Serial.printf("Parámetro recibido: %s\n", param.c_str());

        // Convertir sensorId a número entero
        int sensorNumber = param.toInt();

        // Alternar el estado del LED correspondiente
        String response = "{\"afected\": \"" + param + "\"}";
        if (sensorNumber == 2) {
          s1.powered = !s1.powered;
          digitalWrite(s1.pin, s1.powered ? HIGH : LOW);
          Serial.println("Estado de s1 alternado: " + String(s1.powered ? "Encendido" : "Apagado"));
          return request->send(200, "application/json", response);
        } else if (sensorNumber == 4) {
          s2.powered = !s2.powered;
          digitalWrite(s2.pin, s2.powered ? HIGH : LOW);
          Serial.println("Estado de s2 alternado: " + String(s2.powered ? "Encendido" : "Apagado"));
          return request->send(200, "application/json", response);
        } else {
          Serial.println("sensorId no válido: " + param);
          String response = "{\"error\": \"Parámetro no encontrado\"}";
          request->send(400, "application/json", response);
        }
      } else {
        String response = "{\"error\": \"Parámetro no encontrado\"}";
        request->send(400, "application/json", response);
      }
    });

  // String sensorId = request->pathArg(0);

  //     // Convertir sensorId a número entero
  //     int sensorNumber = sensorId.toInt();

  //     // Alternar el estado del LED correspondiente
  //     if (sensorNumber == 2) {
  //       s1.powered = !s1.powered;
  //       digitalWrite(s1.pin, s1.powered ? HIGH : LOW);
  //       Serial.println("Estado de s1 alternado: " + String(s1.powered ? "Encendido" : "Apagado"));
  //     } else if (sensorNumber == 4) {
  //       s2.powered = !s2.powered;
  //       digitalWrite(s2.pin, s2.powered ? HIGH : LOW);
  //       Serial.println("Estado de s2 alternado: " + String(s2.powered ? "Encendido" : "Apagado"));
  //     } else {
  //       Serial.println("sensorId no válido: " + sensorId);
  //     }

  // server.on("/sensors", HTTP_GET, [](AsyncWebServerRequest *request) {
  //   String jsonResponse = getSensorsJson();
  //   request->send(200, "application/json", jsonResponse);
  // });

  // server.on("/temperaturas", HTTP_GET, [](AsyncWebServerRequest *request) {
  //   sensor1.requestTemperatures();
  //   sensor2.requestTemperatures();
  //   sensor3.requestTemperatures();
  //   DynamicJsonDocument doc(1024);
  //   JsonArray temperatures = doc.createNestedArray("temperatures");
  //   temperatures.add(sensor2.getTempCByIndex(0));
  //   temperatures.add(sensor3.getTempCByIndex(0));
  //   temperatures.add(sensor1.getTempCByIndex(0));

  //   // Serializar el documento JSON en un string
  //   String jsonResponse;
  //   serializeJson(doc, jsonResponse);

  //   // Enviar la respuesta en formato JSON
  //   request->send(200, "application/json", jsonResponse);
  // });

  server.begin();
  Serial.println("HTTP server started");
}

#endif