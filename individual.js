import bg from './assets/background-screen-1.jpeg';
import bg2 from './assets/background-screen-2.jpeg';

const config = {
  URL: 'https://streamingchurch.tv/roku/alive_church/xml/categories_new.xml', // This is where the top URL for the church goes
  logo: require('./assets/header.png'), // This is where the logo that shows on the top white bar comes from. To change the logo, go to assets folder and add new picture named logo.png
  notLive: require('./assets/not-live.png'), // This is where the logo that shows on the top white bar comes from. To change the logo, go to assets folder and add new picture named logo.png
  backgroundFirstScreen: bg, // The background that shows on the first screen. To change, add picture named background-screen-1.jpeg to assets folder
  backgroundSecondScreen: bg2, // The background that shows on the second screen. To change, add picture named background-screen-2.jpeg to assets folder
  blue: '#203955',
  lightBlue: '#2A63A8',
  grey: '#141414',
  tan: '#FBEEC4',
  tanTransparent: '#FBEEC4cc',
  tanDark: '#AC8138',
  red: '#480E14',
  newBlue: '#8C9DB5',
  API_KEY: 'oscaranguianoapikeyforjslsolutions',
};

export default config;
