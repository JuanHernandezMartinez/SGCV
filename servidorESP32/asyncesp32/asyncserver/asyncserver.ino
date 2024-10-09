#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include "config.h"
#include "ESP32_Utils.hpp"
#include <OneWire.h>                
#include <DallasTemperature.h>
#include "Server.hpp"

OneWire ourWire1(5);
DallasTemperature sensor1(&ourWire1);

OneWire ourWire2(21);
DallasTemperature sensor2(&ourWire1);

OneWire ourWire3(19);
DallasTemperature sensor3(&ourWire1);

void setup(void) {
  Serial.begin(115200);
  sensor1.begin();
  sensor2.begin();
  sensor3.begin();
  SPIFFS.begin();
  ConnectWiFi_STA();
  InitServer();
}

void loop(void) {
}