# Timer
Simple timer built with [svelte](https://svelte.dev/).  
You can create as many counters as you want and run them in the same time. Necessary data is saved in browser's local storage.

## Live
[slavcoder-timer.netlify.app](https://slavcoder-timer.netlify.app/)

## Features
- create simple and more complex counters (check usage below)
- save counters to have quick access
- customize

## Usage
    
In main form you can use special letters `d,h,m,s` to add new counter
(or save it to have quick access). The value can't be lower than 1 second and
higher than 9,999 days.

As a simple example `5d 3h 20m 50s` will create a counter with 5
days, 3 hours, 20 minutes and 50 seconds.
        
### Basic calculations

- `200s` equals 3 minutes and 20 seconds
- `33333s` equals 9 hours, 15 minutes and 44 seconds
- `1m 1m 1m 10s 10s 10s` equals 3 minutes and 30 seconds
- `5d 3d 5h` equals 8 days and 5 hours    

### Negative numbers
You can use negative numbers too, but the result can't be lower than 1 second. The order doesn't matter.
    
- `50s -10m` is invalid (it gives less than one second)
- `1d -10h` equals 14 hours
- `-9d 10d 10m` equals 1 day and 10 minutes

### Fractions
Fractions are rounded to 1 second.
    
- `0.5d` or `.5d` equals 12 hours
- `0.3d` or `.3d` equals 7 hours 12 minutes
- `0.33333d` or `.33333d` equals 8 hours
- `0.31h` or `.31h` equals 18 minutes and 36 seconds    
- `0.2s` or `.2s` is invalid (it can't be less than one second)
- `1.2s` equals 1 seconds
- `1.6s` equals 2 seconds
    
### Dates
To calculate time up to given date you need write it in choosen format (check out settings - default format is "dd/mm/yyyy").
    
- `20/02/2030` equals time from now up to February 20, 2030 00:00
- `02/2030` equals time from now up to February 1, 2030 00:00
- `2030` equals time from now up to January 1, 2030 00:00
- `2010` is invalid, because it gives negative number (2010 is in past)
- `20/02/2030 13/05/2025` is valid, it will calculate time up to both dates and sum it up (remember about the limit 9,999 days)
      
### Specific hour
To calculate time up to given hour you need write it in choosen format (default format is "24h").
    
#### 24h time format
- `13:30` equals time from now up to the nearest 13:30 hour, if it is 13:00 now, it will be 30 minutes, if it is 14:00 now it will be 23 hours and 30 minutes
- `9` equals time from now up to 9:00, you can ommit minutes if you need just specific hour
- `16:3` equals time from now up to nearest 16:03, be aware that 16:3 is interpreted as 16:03 rather than 16:30
      
#### 12h time format
- `1:30pm` equals time from now up to the nearest 01:30 PM, if it is 01:00 PM now, it will be 30 minutes, if it is 02:00 PM now it will be 23 hours and 30 minutes
- `9am` equals time from now up to 09:00 AM, you can ommit minutes if you need just specific hour
- `4:3pm` equals time from now up to nearest 04:03 PM, be aware that 4:3 is interpreted as 04:03 rather than 04:30
      
### Date and hour 
If you want to get time up to specific date and specific hour at that date you can combine date and time elements with a underscore character (date_hour).
    
- `2025_1:30pm` equals time from now up to 01/01/2025 01:30 PM (with a 12h time format)
- `10/05/2025_16:30` equals time from now up to 10/05/2025 16:30 (with a 24h time format)
      
### Blocked counter
Counter can be blocked which means it can't be pauzed, reset or even saved to quick access. Blocked counter starts immediately and it can be only deleted. It have a lock icon in right corner to quickly regonize them. To create one you have to use keyword `block` or it's short version `b`. 

This is very useful to create a counter up to a specific date or hour when you don't want to stop it by any missclick or
have to run it after you create it which can couse time move as the real time won't stop to wait for your click.

- `13:00 b` or `13:00 block` equals time from now up to the nearest 13:00 (if you use 24h time format), the counter is blocked because of used keyword 'b' or 'block'      
- `01/02/2025 10d b` equals time from now up to 01/02/2025, plus 10 days (so the result is time up to 11/02/2025), the counter is blocked because of used keyword 'b'
      
### All methods combined
You can combine all those elements to build more complex counter.
    
- `2d 03/08/2032 20d -5h 333m 5000s .3d` is valid time (try it out if you don't believe me)
- `08/2010 10000d` even though the limit is 9,999 days and there is `10000d` the result is less than 9,999 days because of given past date which makes it a valid value.
- `10.5d 22222s 3333m -1000s` equals 13 days, 1 hour, 26 minutes and 42 seconds
- `05/2033_22:00 .5d 30s 5m -10h b` equals time up to 01/05/2033 22:00 plus 12 hours, plus 30 seconds, plus 5 minutes, minus 5 hours and it is a blocked counter (using time format "24h" and date format "dd/mm/yyyy")

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