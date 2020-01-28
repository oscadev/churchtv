import React, {useState, useEffect} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image

  } from 'react-native';

export const HomePage = (props) => {
    const [thing, setThing] = useState([]);
    const [items, setItems] = useState([]);
    const [focused, setFocused] = useState(0);
    const [description, setDescription] = useState('');

    const makeItems = (arr, range) => {
        console.log(arr)
        const tempItems = [];

        for(let i = range[0]; i<=range[1];i++){
            let link = 'https' + arr[i].attributes.hd_img.slice(4);
           
            tempItems.push(
                <TouchableOpacity 
                removeClippedSubviews={false}
                key={i} 
                style={[styles.item, {zIndex:focused===i?1:0 }]} 
                onPress={()=>{
                    props.setLocation('sub')
                    props.getSub('https' + arr[i].children[0].attributes.feed.slice(4), "feed")}}
                
                hasTVPreferredFocus={focused===i?true:false} 
                activeOpacity={1.0} 
                onFocus={()=>{
                    setFocused(i);
                    setDescription(arr[i].attributes.title)
                }}
                
                tvParallaxProperties={{
                    enabled: true,
                    magnification: 1.2,
                    
                }}>
                    <Text>
                        {arr[i].attributes.title}
                    </Text>
                    <Image
                        style={{width: 290, height: 218}}
                        source={{uri: `${arr[i].attributes.title}`}}
                        source={{uri: link}}
                    />
                    <Text>
                        {arr[i].attributes.description}
                    </Text>
                </TouchableOpacity>
            )
        }
        setItems(tempItems)
    }

    const makeSubItems = (arr, range) => {

        const tempItems = [];

        for(let i = range[0]; i<=range[1];i++){
            let link = 'https' + arr[i].attributes.hdImg.slice(4);
           
            tempItems.push(
                <TouchableOpacity 
                removeClippedSubviews={false}
                key={i} 
                style={[styles.item, {zIndex:focused===i?1:0 }]} 
                onPress={()=>props.playVideo('https' + arr[i].children[5].children[2].value.slice(4), "video")}
                
                hasTVPreferredFocus={focused===i?true:false} 
                activeOpacity={1.0} 
                onFocus={()=>{
                    setFocused(i);
                    setDescription(arr[i].attributes.title)
                }}
                
                tvParallaxProperties={{
                    enabled: true,
                    magnification: 1.2,
                    
                }}>
                    <Text>
                        {arr[i].children[0].value}
                    </Text>
                    <Image
                        style={{width: 290, height: 218}}
                        source={{uri: `${arr[i].attributes.title}`}}
                        source={{uri: link}}
                    />
                    <Text>
                        {arr[i].attributes.description}
                    </Text>
                </TouchableOpacity>
            )
        }
        setItems(tempItems)
    }

    useEffect(()=>{
        if(props.type==='sub' && props.data.length>0){
            makeSubItems(props.data, [2,30])
        }
        else if(props.type==='top' && props.data.length>0){
            makeItems(props.data, [0,30])
        }
        
    },[props.data])

    // useEffect(()=>{
    //     if(props.data.length>0){
    //         makeItems(props.data, [0,7])
    //     }
        
    // },[focused])

    return (
        <>
        <ScrollView removeClippedSubviews={false} style={styles.page} horizontal={true} contentContainerStyle={{display: 'flex', justifyContent: 'center',
        alignItems: 'center',}}>
            {items}
            
        </ScrollView>
        <Text style={styles.desc}>{description}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        width:'100%',
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'row',
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems: 'center',
        height:'100%',
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
        fontFamily: 'Menlo',
        fontSize: 35,
        color: 'lightblue',
        position:'absolute',
        top:200
    }
  });