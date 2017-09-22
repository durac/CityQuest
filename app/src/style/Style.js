/**
 * Created by Dominik Schwarz on 13.09.2017.
 */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    cardItem: {
        marginLeft: 0,
        paddingLeft: 0,
        marginTop: 0,
        paddingTop: 0,
        marginBottom: 0,
        paddingBottom: 0
    },
    thumbnail: {
        width: 125,
        height: 125,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    cardArrow: {
        fontSize: 30
    },
    cardInfoText: {
        fontSize: 14
    },
    headerImage: {
        height: 200,
        resizeMode: 'cover'
    },
    detailsTitle: {
        fontSize: 37,
        lineHeight: 42,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 140,
        color: "#fff"
    },
    description: {
        paddingTop: 10,
        color: "grey"
    },
    detailsInfoView: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        padding: 10
    },
    detailsInfoText: {
        fontSize: 23,
    },
    detailsInfoIcon: {
        fontSize: 22,
        lineHeight: 25
    },
    difficultyIcon: {
        fontSize: 18
    },
    h3: {
      lineHeight: 24
    },
    popupMenuEntry: {
        padding: 10
    },
    placeholderText: {
        fontSize: 18,
        color: 'grey', 
        textAlign: 'center'
    }
});
