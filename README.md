noaa-metar-feed
===============

Pulls the latest coded METAR collectives from NOAA as described here http://www.nws.noaa.gov/tg/datahelp.php and decodes each embedded METAR to JSON format.

The FTP service provided by NOAA (National Oceanic and Atmospheric Administration) holds the latest weather reports called METARs for the majority of airports around the world.  Each collective file contains data receipt over five (5) minute time period intervals.

This project's purpose is to allow a nodejs service to digest the latest data by calling the following:

nodejs getWeather.js

The code is currently in aplha state and thus incomplete.


