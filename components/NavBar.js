import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'

export const NavBar = () => {
    return (
        <View style={styles.nav}>
            <TouchableOpacity style={styles.bar} activeOpacity={0.8} tvParallaxProperties={{
                magnification: 1.2
            }}>
                <Text style={styles.desc}>GO BACK</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        width:'100%',
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'row',
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems: 'center',
        height:'5%',
        overflow:'visible'
        
    },
    bar: {
        width:'100%',
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'row',
        
        justifyContent: 'center',
        alignItems: 'center',
        // height:'10%',
        fontFamily: 'Menlo',
        fontSize: 35,
        color: 'lightblue',
        // position:'absolute',
        // top:200,
        overflow:'visible'
        
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
        width: 300,
        height: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin:32,
    },
    desc: {
        justifyContent:'center',
        alignItems:'center',
        fontFamily: 'Menlo',
        fontSize: 35,
        color: 'lightblue',
        backgroundColor: 'black',
        

    }
  });