int potPin1 = 5;
int potPin2 = 4;
int potPin3 = 3;
int potPin4 = 2;
int potPin5 = 1;
int potPin6 = 0;

int button1 = 2;
int button2 = 3;
int button3 = 4;
int button4 = 5;

void setup(){
  Serial.begin(9600);
  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  pinMode(button3, INPUT_PULLUP);
  pinMode(button4, INPUT_PULLUP);
}

void loop(){
  Serial.print(digitalRead(button1));
  Serial.print(",");
  Serial.print(digitalRead(button2));
  Serial.print(",");
  Serial.print(digitalRead(button3));
  Serial.print(",");
  Serial.print(digitalRead(button4));
  Serial.print(",");
  Serial.print(analogRead(potPin1));
  Serial.print(",");
  Serial.print(analogRead(potPin2));
  Serial.print(",");
  Serial.print(analogRead(potPin3));
  Serial.print(",");
  Serial.print(analogRead(potPin4));
  Serial.print(",");
  Serial.print(analogRead(potPin5));
  Serial.print(",");
  Serial.println(analogRead(potPin6));
  delay(10);
}
