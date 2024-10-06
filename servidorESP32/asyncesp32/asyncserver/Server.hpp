#include "HardwareSerial.h"
#include "Sensor.h"
bool prendido = false;
Sensor s1(1, 4, false);

AsyncWebServer server(80);

void InitServer() {
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
      s2.powered = !s2.powered;
      digitalWrite(s2.pin, s2.powered ? HIGH : LOW);

      request->send(200, "text/plain", "Hola mundo (desde ESP32)");
    });

  server.on("/sensors", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", "Hola get");
  });

  server.onNotFound([](AsyncWebServerRequest *request) {
    request->send(400, "text/plain", "Not found");
  });

  server.begin();
  Serial.println("HTTP server started");
}