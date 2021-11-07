import React, {useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    Pressable
} from 'react-native';

const Home = ({navigation}) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [nextUrl, setNextUrl] = useState(null)

    async function getData() {
        await fetch(nextUrl ? nextUrl : 'https://rickandmortyapi.com/api/episode', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(async response => {
            setData(data.concat(response.results))
            setNextUrl(response.info.next ? response.info.next : null)
            setLoading(false)
        });
    }

    useEffect(function () {
        getData()
    }, [])

    function listRender({item,index}){
        return(
            <Pressable
                style={styles.card}
                onPress={() => navigation.navigate('Detail',{url:item.url})}
            >
                <View style={styles.cardEpisode}>
                    <Text style={styles.cardEpisodeText}>#{item.id}</Text>
                </View>
                <View style={styles.cardInside}>
                    <Text style={styles.cardEpisodeNameText}>{item.name}</Text>
                    <Text style={styles.cardEpisodeDateText}>{item.air_date}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContent}
                data={data}
                renderItem={listRender}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => {return (nextUrl && <ActivityIndicator size="large" color={'#02b1c8'}/>)}}
                onEndReached={() => nextUrl && getData()}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent:{
        paddingTop:10,
        paddingBottom:30
    },
    card:{
        backgroundColor: '#fff',
        marginHorizontal:10,
        marginVertical:7,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection:'row',
    },
    cardEpisode:{
        backgroundColor:'#02b1c8',
        borderTopLeftRadius:7,
        borderBottomLeftRadius:7,
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
        paddingVertical:20
    },
    cardEpisodeText:{
        color:'#fff',
        fontSize:16
    },
    cardInside:{
        flex:6,
        padding: 7,
        justifyContent: 'center'
    },
    cardEpisodeNameText:{
        fontWeight:'bold',
        fontSize:15
    },
    cardEpisodeDateText:{
        color:'#8a817c',
        marginTop:4
    }
});

export default Home;
