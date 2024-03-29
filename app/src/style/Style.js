/**
 * Created by Dominik Schwarz on 13.09.2017.
 */
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

export default StyleSheet.create({
    contentView: {
        backgroundColor: 'white',
        flex: 1
    },
    placeholderView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
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
        resizeMode: 'cover',
        justifyContent: 'flex-end'
    },
    detailsTitle: {
        fontSize: 37,
        lineHeight: 42,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingVertical: 10,
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
    },
    profileBackground: {
        width: null,
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#4f3603'
    },
    profileAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    profileNameText: {
        fontSize: 32,
        lineHeight: 42,
        fontWeight: "bold",
        color: "#fff",
        paddingVertical: 10
    },
    profileCol: {
        alignItems: 'center'
    },
    profileElement: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileElementNumber: {
        paddingTop: 5
    }
});
