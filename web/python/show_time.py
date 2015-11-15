#!/usr/bin/python

import sys
import time
from tm1637 import TM1637

hour = int(sys.argv[1])
minute = int(sys.argv[2])

pin_clk = 26
pin_dio = 16
brightness = 2

Display = TM1637(pin_clk, pin_dio, brightness)

Display.Clear()

if hour < 10:
  Display.Show1(1, hour)
else:
  d = 0
  for n in str(hour):
    Display.Show1(d, int(n))
    d = d + 1

if minute < 10:
  Display.Show1(2, 0)
  Display.Show1(3, minute)
else:
  d = 2
  for n in str(minute):
    Display.Show1(d, int(n))
    d = d + 1

for n in range(0, 5):
  Display.ShowDoublepoint(True)
  time.sleep(0.5)
  Display.ShowDoublepoint(False)
  time.sleep(0.5)

Display.Clear()

print str(hour) + ':' + str(minute)
