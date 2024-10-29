#ifndef ARCHIVO2_HPP
#define ARCHIVO2_HPP

#include "HardwareSerial.h"
#include "Sensor.h"
#include <Arduino.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>

extern DallasTemperature sensor1;
extern DallasTemperature sensor2;
extern DallasTemperature sensor3;


// bool prendido = false;
// Sensor s1(1, 4, false);
// Sensor s2(2, 5, false);
// Sensor s3(3, 6, false);
// Sensor s4(4, 7, false);
// Sensor s5(5, 8, false);
// Sensor* sensorslist[] = { &s1, &s2, &s3, &s4, &s5 };


AsyncWebServer server(80);

// String getSensorsJson() {
//   DynamicJsonDocument doc(1024);
//   JsonArray sensorArray = doc.createNestedArray("sensors");

//   // for (Sensor* sensor : sensorslist) {
//   //   JsonObject sensorObj = sensorArray.createNestedObject();
//   //   sensorObj["id"] = sensor->id;
//   //   sensorObj["pin"] = sensor->pin;
//   //   sensorObj["powered"] = sensor->powered;
//   // }

//   // Agregamos la temperatura al JSON
//   sensors.requestTemperatures();
//   JsonObject tempSensorObj = doc.createNestedObject("tempSensor");
//   tempSensorObj["temperature"] = sensors.getTempCByIndex(0);  // Suponemos que hay un sensor en el índice 0

//   String output;
//   serializeJson(doc, output);
//   return output;
// }

void InitServer() {

  // server.on("/sensors", HTTP_GET, [](AsyncWebServerRequest *request) {
  //   String jsonResponse = getSensorsJson();
  //   request->send(200, "application/json", jsonResponse);
  // });

  server.on("/temperaturas", HTTP_GET, [](AsyncWebServerRequest *request) {
    sensor1.requestTemperatures();
    sensor2.requestTemperatures();
    sensor3.requestTemperatures();
    DynamicJsonDocument doc(1024);
    JsonArray temperatures = doc.createNestedArray("temperatures");
    temperatures.add(sensor2.getTempCByIndex(0));
    temperatures.add(sensor3.getTempCByIndex(0));
    temperatures.add(sensor1.getTempCByIndex(0));

    // Serializar el documento JSON en un string
    String jsonResponse;
    serializeJson(doc, jsonResponse);

    // Enviar la respuesta en formato JSON
    request->send(200, "application/json", jsonResponse);
  });

  server.on(
    "/turn", HTTP_POST, [](AsyncWebServerRequest *request) {},
    NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
      // Imprimir el cuerpo de la solicitud
      String body;
      body += String((char *)data, len);
      Serial.println("Cuerpo de la solicitud:");
      Serial.println(body);
      // s1.powered = !s1.powered;
      // digitalWrite(s1.pin, s1.powered ? HIGH : LOW);

      request->send(200, "text/plain", "Hola mundo (desde ESP32)");
    });



  server.onNotFound([](AsyncWebServerRequest *request) {
    request->send(400, "text/plain", "Not found");
  });

  server.begin();
  Serial.println("HTTP server started");
}

#endif