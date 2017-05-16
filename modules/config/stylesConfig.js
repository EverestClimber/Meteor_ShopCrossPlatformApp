import { Platform, Dimensions } from 'react-native';
import { Constants } from 'expo';
import { colorConfig } from './colorConfig';

// setup fonts to be used in styles config
let regularFont = Platform.OS === 'android' ? 'proximanovasoft-regular' : 'proximanovasoft-regular';
let semiboldFont = Platform.OS === 'android' ? 'proximanovasoft-semibold' : 'proximanovasoft-semibold';
let boldFont = Platform.OS === 'android' ? 'proximanovasoft-bold' : 'proximanovasoft-bold';

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
