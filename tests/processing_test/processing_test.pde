import processing.serial.*;
Serial serialPort;

int[] button = {0, 0, 0, 0};
float potWinkel1, potWinkel2, potWinkel3, potWinkel4, potWinkel5, potWinkel6;
int potRaw1, potRaw2, potRaw3, potRaw4, potRaw5, potRaw6;
float[] data;
PFont f;

void setup() {
  size(400, 400);
  noStroke();
  //println(Serial.list());
  serialPort = new Serial(this, Serial.list()[0], 9600);  serialPort.bufferUntil('\n');
  f = createFont("Arial", 16, true);
}

void draw() {
  background(200);
  textFont(f, 16);

  // Grafik Poti
  fill(255);

  arc(100, 200, 50, 50, 0, potWinkel6);
  arc(100, 250, 50, 50, 0, potWinkel5);

  arc(200, 200, 50, 50, 0, potWinkel4);
  arc(200, 250, 50, 50, 0, potWinkel3);

  arc(300, 200, 50, 50, 0, potWinkel2);
  arc(300, 250, 50, 50, 0, potWinkel1);

  // Grafik Taster
  for (int i=1; i<5; i++) {
    if (button[i-1]==0) fill(0);
    else fill(255);
    rect(130+30*i, 290, 20, 20);
  }

  fill(0);

  text("KuKuRobot Control", 100, 100);

  text(potRaw6, 100, 210);
  text(potRaw5, 100, 260);
  text(potRaw4, 200, 210);
  text(potRaw3, 200, 260);
  text(potRaw2, 300, 210);
  text(potRaw1, 300, 260);
}

void serialEvent(Serial serialPort) {
  String dataString = serialPort.readStringUntil('\n');
  if (dataString != null) {
    float[] data = float(split(dataString, ","));
    //println(dataString);
    //println(data);
    if (data.length >=10) {
      if (data[0]==0) button[0]=0;
      else button[0]=1;
      if (data[1]==0) button[1]=0;
      else button[1]=1;
      if (data[2]==0) button[2]=0;
      else button[2]=1;
      if (data[3]==0) button[3]=0;
      else button[3]=1;
      potRaw1 = int(data[4]);
      potRaw2 = int(data[5]);
      potRaw3 = int(data[6]);
      potRaw4 = int(data[7]);
      potRaw5 = int(data[8]);
      potRaw6 = int(data[9]);

      potWinkel1=map(data[4], 0, 1023, 0, PI*2);
      potWinkel2=map(data[5], 0, 1023, 0, PI*2);
      potWinkel3=map(data[6], 0, 1023, 0, PI*2);
      potWinkel4=map(data[7], 0, 1023, 0, PI*2);
      potWinkel5=map(data[8], 0, 1023, 0, PI*2);
      potWinkel6=map(data[9], 0, 1023, 0, PI*2);
    }
  }
}