import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView,View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';

import api from '../src/services/api';

import logo from '../src/assets/logo.png';
import like from '../src/assets/like.png';
import dislike from '../src/assets/dislike.png';

export default function Main({navigation}){
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([]);


    //chamada no backend para listar todos os usuários, conforme regra de negócio setada no backend
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: id
                }
            });
            setUsers(response.data);
        }
    loadUsers();
    }, [id]);

    //chama api e inclui no array de like
    async function handleLike(){
        const [user, ... rest] = users;

        await api.post(`/devs/${user._id}/likes`, null,{
            headers:{user: id}
        });

        //da refresh na lista quando houver dislike
        setUsers(rest);
    }

    //chama api e inclui no array de dislike
    async function handleDislike(){
        const [user, ... rest] = users;

        await api.post(`/devs/${user._id}/dislikes`, null,{
            headers:{user: id}
        });

        //da refresh na lista quando houver dislike
        setUsers(rest);
    }

    async function handleLogout(){
        //vai limpar o cache local
        await AsyncStorage.clear();

        navigation.navigate('Login')
    }

    return (
        //SafeAreaView no lugar de View, para não ocupar espaço do notch
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logo} style={styles.logo}/>
            </TouchableOpacity>
            {/* //area do card de perfil */}
            <View style={styles.cardsContainer}>
                { users.length === 0
                    ? <Text style={styles.empty}>Acabou =\</Text>
                    : (
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, {zIndex: users.length - index }]}>
                                <Image style={styles.avatar} source={{uri: user.avatar}}/>
                                    <View style={styles.footer}>
                                        <Text style={styles.name}>{user.name}</Text>
                                        <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                    )}
            </View>
                {
                    users.length > 0 && (
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleDislike}>
                                <Image source={dislike}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleLike}>
                                <Image source={like}></Image>
                            </TouchableOpacity>
                        </View>
                    )
                }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    empty:{
        alignSelf:'center',
        color: '#999',
        fontSize:24,
        fontWeight:'bold'
    },
    logo:{
        marginTop: 50
    },
    container:{
        flex:1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardsContainer:{
        flex: 1,
        alignSelf:'stretch',
        justifyContent:'center',
        maxHeight: 500,
    },
    card:{
        borderWidth: 1,
        borderColor:'#DDD',
        borderRadius: 8,
        margin: 30,
        overflow:'hidden',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0        
    },
    avatar:{
        flex:1,
        height:300
    },
    footer:{
        backgroundColor:'#FFF',
        paddingHorizontal:20,
        paddingVertical:15
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#333'
    },
    bio:{
        fontSize: 14,
        color: '#999',
        marginTop:5,
        lineHeight:18

    },
    buttonsContainer:{
        flexDirection:'row',
        marginBottom: 30,
    },
    button:{
        width:60,
        height:60,
        borderRadius: 30,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        //válidos apenas para IOS
        shadowColor:'#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset:{
            width:0,
            height:2
        }
    }
})