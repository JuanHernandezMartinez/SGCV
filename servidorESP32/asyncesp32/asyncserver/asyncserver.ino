#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include "config.h"
#include "ESP32_Utils.hpp"
#include <OneWire.h>
#include <DallasTemperature.h>
#include "Server.hpp"
#include <ArduinoWebsockets.h>
using namespace websockets;

const char* websockets_server_host = "192.168.1.109";
const uint16_t websockets_server_port = 4000;
WebsocketsClient client;
unsigned long lastSendTime = 0;
const unsigned long sendInterval = 2000;
const unsigned long reconnectInterval = 5000;
unsigned long lastReconnectAttempt = 0;

OneWire ourWire1(5);
DallasTemperature sensor1(&ourWire1);

OneWire ourWire2(21);
DallasTemperature sensor2(&ourWire2);

OneWire ourWire3(19);
DallasTemperature sensor3(&ourWire3);

void setup(void) {
  Serial.begin(115200);

  // Configuración inicial de pines
  pinMode(17, OUTPUT);
  pinMode(4, OUTPUT);
  digitalWrite(17,1);
  digitalWrite(4,1);

  sensor1.begin();
  sensor2.begin();
  sensor3.begin();
  SPIFFS.begin();
  ConnectWiFi_STA();
  InitServer();
  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);
  connectWebSocket();
}


void loop(void) {
  client.poll();

  unsigned long currentMillis = millis();

  // Enviar temperaturas periódicamente
  if (client.available() && currentMillis - lastSendTime >= sendInterval) {
    lastSendTime = currentMillis;
    sendTemperature();
  }

  // Intentar reconectar si la conexión se ha cerrado
  if (!client.available() && currentMillis - lastReconnectAttempt >= reconnectInterval) {
    lastReconnectAttempt = currentMillis;
    Serial.println("Intentando reconectar...");
    connectWebSocket();
  }
}

void connectWebSocket() {
  if (client.connect(websockets_server_host, websockets_server_port, "/")) {
    Serial.println("Conexión WebSocket establecida");
  } else {
    Serial.println("Fallo al conectar WebSocket");
  }
}

void sendTemperature() {
  sensor1.requestTemperatures();
  sensor2.requestTemperatures();
  sensor3.requestTemperatures();

  DynamicJsonDocument doc(256);
  JsonArray mediciones = doc.createNestedArray("mediciones");

  JsonObject sensor1Data = mediciones.createNestedObject();
  sensor1Data["basicName"] = "sensor 1";
  sensor1Data["temperature"] = sensor1.getTempCByIndex(0);

  JsonObject sensor2Data = mediciones.createNestedObject();
  sensor2Data["basicName"] = "sensor 2";
  sensor2Data["temperature"] = sensor2.getTempCByIndex(0);


  JsonObject sensor3Data = mediciones.createNestedObject();
  sensor3Data["basicName"] = "sensor 3";
  sensor3Data["temperature"] = sensor3.getTempCByIndex(0);


  String jsonMessage;
  serializeJson(doc, jsonMessage);

  String message = String(jsonMessage);
  client.send(message);
  // Serial0.println("Temperatura enviada");
}

void onMessageCallback(WebsocketsMessage message) {
}

void onEventsCallback(WebsocketsEvent event, String data) {
  if (event == WebsocketsEvent::ConnectionOpened) {
    Serial.println("Conexión WebSocket abierta");
  } else if (event == WebsocketsEvent::ConnectionClosed) {
    Serial.println("Conexión WebSocket cerrada");
  } else if (event == WebsocketsEvent::GotPing) {
    Serial.println("Ping recibido");
  } else if (event == WebsocketsEvent::GotPong) {
    Serial.println("Pong recibido");
  }
}