import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Main.css'

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from '../services/api';

export default function Main({match}){
    const [users, setUsers] = useState([]);

    //chamada no backend para listar todos os usuários, conforme regra de negócio setada no backend
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });
            setUsers(response.data);
        }
    loadUsers();
    }, [match.params.id]);

    //chama api e inclui no array de like
    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null,{
            headers:{user: match.params.id}
        });

        //da refresh na lista quando houver dislike
        setUsers(users.filter(user=>user._id !== id));
    }

    //chama api e inclui no array de dislike
    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null,{
            headers:{user: match.params.id}
        });

        //da refresh na lista quando houver dislike
        setUsers(users.filter(user=>user._id !== id));
    }

    //carrega os elementos html com o array de usuários buscado
   return(
        <div className="main-container">
            <Link to="/">
            <img src={logo} alt="tindev" />
            </Link>
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>                  
                                <div className="buttons">
                                    <button type="button">
                                        <img
                                            onClick={()=>handleDislike(user._id)}
                                            src={dislike}
                                            alt="dislike">
                                        </img>
                                    </button>
                                    <button type="button">
                                        <img
                                            onClick={()=>handleLike(user._id)}
                                            src={like}
                                            alt="like">
                                        </img>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">Acabou =\</div>
                ) }
        </div>
   );
}