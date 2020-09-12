title: Project 006 - ISS Tracker
subtitle: Can't track my movements if I'm tracking your movements first!
date: 2020-08-27
author: Josh
category: general
featureimage: /static/img/Blog_006_Dudes.gif
pagename: 006_ISSTracker


They say there are satellites that are tracking our every movement.
Well two can play at that game.

### Project Synopsis
For this project, I want to device that can passively sit on my shelf
and warn me if the International Space Station (ISS) is overhead. I
want it to be accurate, I want it to not need to be connected to my
computer, and I want it to be attention grabbing enough if the ISS is
overhead. In short, I hate trying to plan to catch the ISS ahead of
time, and want to simply be able to glance at my shelf, see that it
is, grab a jacket and head outside. Educated improvisation has always
been more fun than rigorous planning!

Whilst I trust my maths skills, the ISS frequently makes small
adjustments to its orbit. So I don't think I can do this by just
finding its position once, and then predicting ahead of time
forevermore. I also don't want to have to update the position manually
every time the ISS does move its orbit, so I needed something that
could connect occasionally to the internet to update the precise
position. I also wanted my device to be usable anywhere, not just
cable-connected to my computer.

Finally, after a few weeks of work, here is the result!

![alt text](../static/img/Blog_006_NextPass.gif)

### How does it work?

The board I used was an ESP8266 NodeMCU V1.0 ESP-12E WiFI Module

On first startup, the code makes a request to [the open notify ISS Location API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/) and [next pass api.](http://open-notify.org/Open-Notify-API/ISS-Pass-Times/)

This gets information about the ISS current latitude, longitude, the
unix timestamp of when the next pass ovehead (defined as being > 10
degrees above the horizon) will start , and the duration of that pass
in seconds. After 5 seconds, it then polls the current location API
once again. It then calculates the approximate velocity of the ISS in
terms of latitude and longitude, and uses this information to update
the position every 0.5 seconds. This is to prevent my board polling
open-notify too frequently.

![](../static/img/Blog_006_NodeMCU.jpg)

It only polls the next-pass API once the current pass has been
completed, typically every 90 minutes or so. I had to add in a random
number to this API call though, as the API seems to store the previous
result and then return that if you call the API again using the same
settings.

The board updates its internal state every 10 seconds, flipping
between displaying the current ISS position, and the time till the
next pass. If the board thinks the ISS is overhead, based on the
information given in the next-pass API result, it flips to a state
where it flashes up that the ISS is overhead! A little comet symbol
at the top of the screen updates its position across the screen to let
you know how far into its passover the ISS is.

![](../static/img/Blog_006_Overhead.gif)

I used an I2C OLED Display Module I2C SSD1306 Screen with 128x32
pixels to display the results. I additionally use the excellent
Adafruit library to write the actual display to the board. This
library is great fun, and already I've got several neat ideas for
other projects. Getting this wired up correctly was one of the harder
parts of this project!

![](../static/img/Blog_006_Dudes.gif)

### What to improve?

One obvious improvement is that the the tracker currently ahs zero
casing, so all the wires are exposed ^^. I have a friend who owns a 3D
printer, so I might spend a bit of time learning how to print a simple
case for this so it doesn't expose so many wires! I also want to update the
software slightly; whilst the ISS passes overhead pretty frequently
(every 90 minutes or so), most of the time it's not visible. This can
be because it's daytime, or because both you and the ISS are in the
shadow of the earth. The best time to see it is when you are in the
dark and the ISS is in the light (usually around sunset or dawn).
Having an extra attention-grabbing mechanism for when those passovers
occur would be neat!

### So what's next?

I haven't figured out how to add a comments section to these pages
yet. Feel free to drop me a line though and i'll happily respond!
Given the difficulty I had in writing this blog post, I think updating
my webpage to be a bit more user friendly might be the next steps
though! Am sure I can add in a comments section at the same time.

_All the code for the NodeMCU board I made can be found [here](https://github.com/JoshGreenslade/IssTracker/blob/master/ESP_Code/IssTracker/IssTracker.ino)_.