Google Chrome Print Extension
=============================

I created this extension to allow for easy printing from my own
little webgis, called Mappu which you can find at:

https://github.com/unicolet/mappu

This extension solves the problem of printing OpenLayers-based
maps by moving all the logic into the client and exploiting
the developer-friendly APIs that Chrome offers.

How does it work?
-----------------

This extension basically captures a screenshot of the current tab,
injects a little (unobtrusive) js to find out the coordinates on screen of the
OL map which it then uses to crop the screenshot so that only the OL
map is shown on the print screen.

It has been tested on recent versions of Chrome (do 'old versions' of chrome
exist anyway?) and is developed mainly on Linux and used mostly on Windows.

License
-------

The source of this extension is licensed under the LGPL.

