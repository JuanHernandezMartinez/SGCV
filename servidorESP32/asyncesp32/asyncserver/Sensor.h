class Sensor {
public:
  int id;
  int pin;
  bool powered;
  
  Sensor(int id, int p, bool pow) {
    this.id = id;
    this.pin = p;
    this.powered = pow;
  }
};