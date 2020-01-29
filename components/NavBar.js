import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';


export const NavBar = () => {
    return (
        <View style={styles.bar}><Image resizeMode="contain" style={{height:128, marginLeft:64}} source={require('../assets/logo2-white.png')}></Image>
        {/* <Text style={{fontSize:48, fontFamily: 'Avenir-Medium', padding:16, color: 'black'}}>STREAMINGCHURCH.tv</Text> */}
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
        

    },
    bar: {
        width:'100%',
        height:128,
        backgroundColor:'rgb(39, 86, 138)',
        backgroundColor:'white',
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    }
  });