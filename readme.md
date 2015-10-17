## RobotCar Project

* Web interface in PHP



https://github.com/richardghirst/PiBits/tree/master/ServoBlaster

sudo make install

edit /etc/init.d/servoblaster

--p1pins=21,23

https://github.com/hamishcunningham/pi-tronics/tree/master/blinkip

#### Poweroff feature

The user `www-data` needs rights to shut down the system:

* `sudo visudo`
* ADD: `www-data ALL = NOPASSWD: /sbin/poweroff`