## RobotCar Project

### Solution #1 - Wifi - Web server, Browser interface in PHP, HTML and JS

* Install a web server with support for PHP on the vehicle and point it to the repos folder `web/www`
* Open the vehicles IP on any device that supports web browsing
* Controls are implemented as click(tap)able buttons

**Solution #1a - A dead simple web page - Meant as a first start, just for demo.**

* Install a web server with support for PHP on the vehicle and point it to the repos folder `web/www-simple`

### Solution #2 - Wifi - node.js server, Browser interface in HTML and JS

This one is meant to work with an Arduino containing pots and buttons connected to a PC acting as a remote control.

On the vehicle:
* Install a web server and point it to the repos folder `web/www`

On the control:
* Install nodejs
* Execute: `npm install` from the repo root
* Start the server: `node node/app.js`
* Open a browser at http://localhost:4000

### Solution #3 - XBee

TBD

Uh... f#ckng expensives :(

### Solution #4 - RF 2.4 Ghz

TBD

### Solution #5 - RF 433 Mhz

TBD

### General setup

#### Servos

Install https://github.com/richardghirst/PiBits/tree/master/ServoBlaster

Install it globally and make it run on startup:

`sudo make install`

Edit `/etc/init.d/servoblaster`

`--p1pins=21,23`

#### Blinkip

If using the WiFi variant, you may want to install Blinkip and connect a 4 digits 7 segment display.

* install https://github.com/hamishcunningham/pi-tronics/tree/master/blinkip
* clone https://github.com/raspikuku/ip-7seg and follow the instructions in the readme.

#### Poweroff feature

The user `www-data` needs rights to shut down the system:

* `sudo visudo`
* ADD: `www-data ALL = NOPASSWD: /sbin/poweroff`

#### Webcam

Use motion:

And adjust the config to stream video.

#### Nachhilfe

* http://www.arndt-bruenner.de/mathe/scripts/dreiecksberechnungrw.htm
