import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from '../pages/Login'
import Main from '../pages/Main'

    //boa prática fazer um wrapper com appContainer e SwitchNavigator
export default createAppContainer(
    //páginas serão carregadas conforme ordem listada e não é possível voltar, navegar para a próxima pagina elimina a anterior
    createSwitchNavigator({
        Login,
        Main
    })
);