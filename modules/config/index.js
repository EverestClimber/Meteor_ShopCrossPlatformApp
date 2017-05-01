import { Platform } from 'react-native';
import { Constants } from 'expo';

// setup fonts to be used in styles config
let regularFont = Platform.OS === 'android' ? 'proximanovasoft-regular' : 'proximanovasoft-regular';
let semiboldFont = Platform.OS === 'android' ? 'proximanovasoft-semibold' : 'proximanovasoft-semibold';
let boldFont = Platform.OS === 'android' ? 'proximanovasoft-bold' : 'proximanovasoft-bold';

//setup stylesConfig to be used throughout app
export const stylesConfig =  {
    titleStyle:{
        fontFamily: boldFont,
        fontSize: 20
    },
    basicHeaderStyle: {
        
        backgroundColor: '#fff',
    },
    regularFont,
    semiboldFont,
    boldFont,
}



export const appConfig =  {
    appName:'GrowLab',
    supportEmail: 'support@growlab.io'
}

export const colorConfig =  {
    primary: '#34495e',
    accent: '#5fcf80',
    'finance':'#2c9676',
    'support':'#F8E81C',
    'procurement':'#993c50',
    'events':'#4990E2',
    'competitions':'#c38cd4',
    'incentives':'#95D26C',
    'ecosystem':'#e59a13',
    'business':'#5fcf80',
    //basic theme colors
    'lightGrey': '#d3d3d3',
    'darkGrey': '#666'
}