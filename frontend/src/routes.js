import Home from './Home.vue';
import ClientControl from './ClientControl.vue'
import CreateClient from './components/CreateClient.vue'
import UpdateClient from './components/UpdateClient.vue'
import Points from './components/Points.vue'
import UsersList from './components/UsersList.vue'
import UpdateUser from './components/UpdateUser.vue'
import Logs from './components/Logs.vue'

export default [
    { path: '/', component: Home, name: 'Home' },
    { path: '/ClientControl', component: ClientControl, name: 'ClientControl' },
    { path: '/CreateClient', component: CreateClient, name: 'CreateClient' },
    { path: '/UpdateClient', component: UpdateClient, name: 'UpdateClient' },
    { path: '/Points', component: Points, name: 'Points' },
    { path: '/UsersList', component: UsersList, name: 'UsersList' },
    { path: '/UpdateUser', component: UpdateUser, name: 'UpdateUser' },
    { path: '/Logs', component: Logs, name: 'Logs' },

]