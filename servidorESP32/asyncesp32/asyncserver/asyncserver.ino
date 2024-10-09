#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include "config.h"
#include "ESP32_Utils.hpp"
#include <OneWire.h>                
#include <DallasTemperature.h>
#include "Server.hpp"

OneWire ourWire(4);
DallasTemperature sensors(&ourWire);

void setup(void) {
  Serial.begin(115200);
  sensors.begin();
  SPIFFS.begin();
  ConnectWiFi_STA();
  InitServer();
}

void loop(void) {
}