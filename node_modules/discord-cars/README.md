# Discord-Cars
It does exactly what you think. Maybe... anyways! 
This very simple npm package is just like discord-trucks, but it's cars instead!
I have an array, full of car images, that will be updated daily! Err... maybe.
# Intstallation 
`npm install discord-cars`
# Example 
```js 
    const discordCars = require('discord-cars') // Of course this variable can be changed to whatever. I suggest using 'cars' instead of discordCars because it will make it much cleaner.
    message.channel.send(discordCars.randomCar())
```
# Usage 
This package is intended to be used in discord itself. This is because the array that is full of car images has discord links. So if you were to include this in say a webpage, and a user were to run it, the output would be a generic discord image link.