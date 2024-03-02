noaa-metar-feed
===============
[![CodeFactor](https://www.codefactor.io/repository/github/rheh/noaa-metar-feed/badge/master)](https://www.codefactor.io/repository/github/rheh/noaa-metar-feed/overview/master)

Pulls the latest coded METAR collectives from NOAA as described here http://www.nws.noaa.gov/tg/datahelp.php and decodes each embedded METAR to JSON format.

The FTP service provided by NOAA (National Oceanic and Atmospheric Administration) holds the latest weather reports called METARs for the majority of airports around the world.  Each collective file contains data receipt over five (5) minute time period intervals.

This project's purpose is to allow a node service to digest the latest data by calling the following:

```bash
nvm use
npm run start
```
