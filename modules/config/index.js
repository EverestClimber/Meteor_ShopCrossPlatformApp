import { Platform, Dimensions } from 'react-native';
import { Constants } from 'expo';

// setup fonts to be used in styles config
let regularFont = Platform.OS === 'android' ? 'proximanovasoft-regular' : 'proximanovasoft-regular';
let semiboldFont = Platform.OS === 'android' ? 'proximanovasoft-semibold' : 'proximanovasoft-semibold';
let boldFont = Platform.OS === 'android' ? 'proximanovasoft-bold' : 'proximanovasoft-bold';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const DEFAULT_HOUSEHOLD_IMAGE = 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/house-icon.png'

export const DEFAULT_AVATAR = 'https://www.mautic.org/media/images/default_avatar.png'

export const DEFAULT_MAP_IMAGE = 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Google_maps_screenshot.png/300px-Google_maps_screenshot.png'


export const colorConfig =  {
    screenBackground: '#f5f5f5',
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



// setup stylesConfig to be used throughout app
// ========================================
export const stylesConfig =  {
    titleStyle:{
        fontFamily: boldFont,
        fontSize: 20,
        color: '#fff'
    },
    textHeader: {
        fontFamily: boldFont,
        fontSize: 20,
    },
    textSubHeader: {
        fontFamily: semiboldFont,
        fontSize: 15,
    },
    textBody: {
        color: '#7b8b8e', 
        fontSize: 13
    },
    basicHeaderStyle: {
        borderColor: colorConfig.business,
        backgroundColor: colorConfig.business, //'#fff',
    },
    emptyStateIcon: {
        marginBottom: 18, 
        width: 75, 
        height: 75
    },
    regularFont,
    semiboldFont,
    boldFont,
}



export const appConfig =  {
    appName:'PV-Safe',
    supportEmail: 'support@pvsafe.com'
}
