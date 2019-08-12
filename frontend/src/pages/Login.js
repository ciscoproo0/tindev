import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import api from '../services/api'
import './Login.css';


export default function Login({history}){
    //o evento useState sempre recebe por padrão dois parâmetros, o primeiro que é o valor e o segundo é um set para alterar aquele valor, get e set
    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {
            username
        });
        
        const {_id} = response.data;

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="tindev"/>
                <input 
                    placeholder="Digite seu usuário do gitHub"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}