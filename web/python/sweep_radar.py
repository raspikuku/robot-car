import RPi.GPIO as GPIO
import time
import os

GPIO.setmode(GPIO.BOARD)

TRIG = 22 
ECHO = 18

GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)

GPIO.output(TRIG, False)

for angle in range(0, 110, 10):
  os.system("echo 1=" + angle + " > /dev/servoblaster")
  time.sleep(100)

  GPIO.output(TRIG, True)
  time.sleep(0.00001)
  GPIO.output(TRIG, False)

  while GPIO.input(ECHO)==0:
    pulse_start = time.time()

  while GPIO.input(ECHO)==1:
    pulse_end = time.time()

  if 'pulse_end' in locals():
    pulse_duration = pulse_end - pulse_start

    distance = pulse_duration * 17150

    distance = round(distance, 2)
  else :
    distance = 0

  print str(angle) + ' ' + str(distance)

GPIO.cleanup()

