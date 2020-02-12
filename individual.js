import bg from './assets/background-screen-1.jpeg'
import bg2 from './assets/background-screen-2.jpeg'


const config = {
    URL: "https://streamingchurch.tv/roku/alive_church/xml/categories_new.xml", // This is where the top URL for the church goes
    logo: require("./assets/logo.png"), // This is where the logo that shows on the top white bar comes from. To change the logo, go to assets folder and add new picture named logo.png
    notLive: require("./assets/not-live.png"), // This is where the logo that shows on the top white bar comes from. To change the logo, go to assets folder and add new picture named logo.png
    backgroundFirstScreen: bg, // The background that shows on the first screen. To change, add picture named background-screen-1.jpeg to assets folder
    backgroundSecondScreen: bg2, // The background that shows on the second screen. To change, add picture named background-screen-2.jpeg to assets folder

}

export default config;