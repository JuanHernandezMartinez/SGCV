#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include "config.h"
#include "Server.hpp"
#include "ESP32_Utils.hpp"
const int sensor1 = 1;
const int sensor2 = 2;
const int sensor3 = 3;
const int sensor4 = 4;
const int sensor5 = 5;


void setup(void) {
  Serial.begin(115200);
  pinMode(4, OUTPUT);
  digitalWrite(4, LOW);
  SPIFFS.begin();

  ConnectWiFi_STA();

  InitServer();
}

void loop(void) {
}