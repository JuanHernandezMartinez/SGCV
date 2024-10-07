class Sensor {
public:
  int id;
  int pin;
  bool powered;
  
  Sensor(int i, int p, bool pow) {
    id = i;
    pin = p;
    powered = pow;
  }
};