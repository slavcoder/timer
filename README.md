# Timer
Simple timer built with [svelte](https://svelte.dev/).  
You can create as many counters as you want and run them in the same time. Necessary data is saved in browser's local storage.

## Features
- create simple counters (days, hours, minutes, seconds)
- calculate time up to given date
- combine both date and time given by days, hours, minutes, seconds
- save counters to have quick access
- customize

## Examples
- `5d 20m 10m 30s` will be calculated as 5 days, 30 minutes and 30 seconds
- `0.2d` or simply `.2d` will be calculated as 4 hours and 48 minutes
- `1d -10h` will be calculated as 14 hours
- `-10s` will be **invalid**, the minimum time is 1 second and maximum is 9999 days
- `20/02/2025` will be calculated as time up tu that date
- `-5h 20/02/2025 30m -4444s` will be still a valid time (time up to that date, minus 5 hours, plus 30 minutes, minus 4444 seconds) 

## Settings
You can set various options:
- theme
- font
- font size
- time variant (there are two variants)
- progress bar (enabled/ disabled)
- alarm (enabled/ disabled)
- select alarm sound
- alarm volume
- date format (used in creating new counter)
- clock (enabled/ disabled)
- digital clock (enabled/ disabled)

## Sources
- Alarm sounds - [soundbible](soundbible.com)
- Icons - [feathericons](feathericons.com)

## Screenshots

![mirage](/screenshots/mirage.png "Mirage theme")
![mirage - settings](/screenshots/mirage-settings-1.png "Mirage theme - settings")
![mirage - settings](/screenshots/mirage-settings-2.png "Mirage theme - settings")
![mirage - history](/screenshots/mirage-history.png "Mirage theme - history")

![dark grey](/screenshots/dark-grey.png "Dark-grey theme")
![dark purple](/screenshots/dark-purple.png "Dark-purple theme")
![dark purple - mobile](/screenshots/dark-purple-mobile.png "Dark-purple theme - mobile")
![dead blue - mobile](/screenshots/dead-blue-mobile.png "Dead-blue theme - mobile")
![light grey - mobile](/screenshots/light-grey-mobile.png "Light-grey theme - mobile")