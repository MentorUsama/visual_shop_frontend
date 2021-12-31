import { DefaultTheme } from 'react-native-paper';
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FF7465',
      accent: '#FFFFFF',
      background:'#EFEFEF',
      surface:'#FFFFFF',
      text:'#000000',
      disabled:'#828181',
      placeholder:'#828181',
    },
  };
  
export {theme}