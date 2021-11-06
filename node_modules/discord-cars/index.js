const cars = [
    "https://media.discordapp.net/attachments/796133907803930666/796212995775791114/JDPA_202020Audi20A320Dark20Gray20Front20View.png?width=901&height=676",
    "https://media.discordapp.net/attachments/796133907803930666/796213151678726154/MW-HY837_at_gla_ZH_20200122173813.png",
    "https://media.discordapp.net/attachments/796133907803930666/796214062467907624/home-shopping-image.png",
    "https://media.discordapp.net/attachments/796133907803930666/796214163994574878/JDPA_202020Audi20A320Dark20Gray20Front20View.png?width=901&height=676",
    "https://media.discordapp.net/attachments/796133907803930666/796214316776554506/USC70JES052A021001.png",
    "https://media.discordapp.net/attachments/787059528973287429/796871375415279656/Z.png",
    "https://media.discordapp.net/attachments/787059528973287429/796871452426764328/578e9e4588e4a77c708b8db1.png",
    "https://media.discordapp.net/attachments/787059528973287429/796871541660319794/1078702682_6132640677001_6132637010001-vs.png?width=1202&height=676",
    "https://media.discordapp.net/attachments/787059528973287429/796871658392649788/2017-chevrolet-camaro-side_11393_001_480x240_gaz.png",
    "https://media.discordapp.net/attachments/787059528973287429/796871762548621342/ford-mustang-boss-429-1970-by-simon-clay-news-photo-1598884238.png",
    "https://media.discordapp.net/attachments/787059528973287429/797301093482627082/2018-rolls-royce-phantom-1536152159.png",
    "https://media.discordapp.net/attachments/787059528973287429/797301183387664464/images.png",
    "https://media.discordapp.net/attachments/787059528973287429/797301274252541972/porsche-996-911-carrera-1525093665.png",
    "https://media.discordapp.net/attachments/787059528973287429/797301359703097364/84a25979-1596-41cd-ad27-6d0220d3c115.png",

    
   ];
   
 
 
   /**
    * @returns {string}
    */
 
   function randomCar() {
     return cars[Math.floor(Math.random() * cars.length)];
   }
   
 
   module.exports = {
     randomCar
   };