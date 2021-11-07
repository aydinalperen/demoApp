import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    Dimensions,
    Pressable, Image
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";

const Detail = ({route}) => {

    const [loading, setLoading] = useState(true)
    const [characterLoading, setCharacterLoading] = useState(true)
    const [data, setData] = useState({})
    const [selected, setSelected] = useState(null)
    const [characterData, setCharacterData] = useState({})

    async function getData() {
        await fetch(route.params.url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(async response => {
            setData(response)
            setLoading(false)
        });
    }

    useEffect(function () {
        getData()
    }, [])

    async function getCharacterData() {
        await fetch(data['characters'][selected], {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(async response => {
            characterData[selected] = response
            setCharacterLoading(false)
        });
    }

    useEffect(function () {
        if (selected !== null) {
            if (characterData[selected]) {
                setCharacterLoading(false)
            } else {
                getCharacterData()
            }
        }
    }, [selected])

    function listRender({item, index}) {
        return (
            <View style={styles.characterCard}>
                <Pressable
                    style={styles.characterCardTopRow}
                    onPress={() => {
                        setCharacterLoading(true)
                        setSelected(index === selected ? null : index)
                    }}
                >
                    <Text style={styles.characterTitleText}>Character #{index + 1}</Text>
                    <Icon name={index === selected ? 'arrow-up' : 'arrow-down'} size={30} color={'#02b1c8'}/>
                </Pressable>
                {selected === index &&
                <View style={styles.characterCardInside}>
                    {characterLoading ?
                        <ActivityIndicator size="large" color={'#02b1c8'} style={{marginVertical: 20}}/> :
                        <View>
                            <View style={styles.imageRow}>
                                <Image
                                    source={{uri: characterData[index]['image']}}
                                    style={{
                                        width: '40%',
                                        height: 150,
                                        borderRadius: 100
                                    }}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <View style={styles.nameView}>
                                    <Text style={styles.nameText}>{characterData[index]['name']}</Text>
                                    <Text>{characterData[index]['species']}</Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.infoSecondRow}>
                                    <View style={styles.infoRound}></View>
                                    <Text style={styles.infoText}>{characterData[index]['gender']}</Text>
                                </View>
                                <View style={styles.infoSecondRow}>
                                    <View style={styles.infoRound}></View>
                                    <Text style={styles.infoText}>{characterData[index]['status']}</Text>
                                </View>
                            </View>
                        </View>
                    }
                </View>}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size="large" color={'#02b1c8'} style={{marginVertical: 20}}/> :
                <View>
                    <FlatList
                        contentContainerStyle={styles.listContent}
                        data={data.characters}
                        renderItem={listRender}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={() => (
                            <View>
                                <View style={styles.header}>
                                    <View style={styles.episode}>
                                        <Text style={styles.episodeText}>#{data.id}</Text>
                                    </View>
                                    <View style={styles.headerInside}>
                                        <Text style={styles.episodeNameText}>{data.name}</Text>
                                        <Text style={styles.episodeDateText}>{data.air_date}</Text>
                                    </View>
                                </View>
                                <Text style={styles.title}>Characters</Text>
                            </View>
                        )}
                    />
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 70
    },
    header: {
        backgroundColor: '#fff',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        flexDirection: 'row',
    },
    episode: {
        backgroundColor: '#02b1c8',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    episodeText: {
        color: '#fff',
        fontSize: 18
    },
    headerInside: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    episodeNameText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    episodeDateText: {
        color: '#8a817c',
        marginTop: 4
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        margin: 10,
        color: '#f77f00'
    },
    characterCard: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 7,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    characterCardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    characterTitleText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    characterCardInside: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameView: {
        padding: 20
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#f77f00'
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 10
    },
    infoSecondRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    infoRound: {
        backgroundColor: '#f77f00',
        width: 10,
        height: 10,
        borderRadius: 5
    },
    infoText: {
        marginLeft: 5,
        fontSize: 15
    }
})

export default Detail;
