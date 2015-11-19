## RobotCar Project

### Solution #1 - Wifi - Web server, interface in PHP and JS

* Install a web server on the Pi and point it to the repos folder `web/www`
* Open the Pis IP on any device that supports web browsing
* Controls are implemented as click(tap)able buttons

### Solution #2 - Wifi - node.js server, Browser interface in HTML and JS

This one is meant to work with an Arduino containing pots and buttons connected to a PC acting as a remote control.

* Install a web server on the Pi and point it to the repos folder `web/www`

#### Istallation

`npm install`

#### Usage

`node node/app.js`

Open your browser at http://localhost:4000

### Solution #3 - XBee

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
