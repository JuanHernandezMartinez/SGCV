class Sensor {
public:
  int pin;
  bool powered;

  // Constructor para inicializar el sensor
  Sensor(int p, bool pow) {
    pin = p;
    powered = pow;
  }
};