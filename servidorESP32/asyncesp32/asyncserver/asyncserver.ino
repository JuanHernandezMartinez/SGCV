#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>

#include "config.h"
#include "Server.hpp"
#include "ESP32_Utils.hpp"
#include "Sensor.h"
const int sensor1 = 1;
const int sensor2 = 2;
const int sensor3 = 3;
const int sensor4 = 4;
const int sensor5 = 5;

Sensor s1(4, false);

void setup(void) {
   Serial.begin(115200);
  pinMode(sensor4, OUTPUT);
  digitalWrite(s1.pin, LOW);
  SPIFFS.begin();

  ConnectWiFi_STA();

  InitServer();
}

void loop(void) {
}