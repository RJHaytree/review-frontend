import axios from 'axios';
import { createStore } from 'vuex';
import cookie from 'vue-cookies';
const url = 'https://electro-review-api-backend.azurewebsites.net';

export default createStore({
    state: {
        user: '',
        subscriptions: [],
        apiKeys: [],
        items: []
    },
    getters: {
        user: (state) => {
            return state.user
        },
        token: () => cookie.get('auth-token'),
        subscriptions: (state) => {
            return state.subscriptions;
        },
        activeSubscription: (state) => {
            return state.subscriptions.filter(s => s.active == true)
        },
        cancelledSubscriptions: (state) => {
            return state.subscriptions.filter(s => s.active == false)
        },
        apiKeys: (state) => {
            return state.apiKeys;
        },
        items: (state) => {
            return state.items;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(_, token) {
            if (cookie.isKey('auth-token')) {
                cookie.remove('auth-token');
            }

            cookie.set('auth-token', token, '24h');
        },
        setSubscriptions(state, subscriptions) {
            state.subscriptions = []
            subscriptions.forEach(s => {
                state.subscriptions.push(s) 
            });
        },
        addSubscription(state, subscription) {
            state.subscriptions.push(subscription);
        },
        cancelSubscription(state, subscription) {
            state.subscriptions.pop();
            state.subscriptions.push(subscription)
        },
        setApiKeys(state, apiKeys) {
            state.apiKeys = [];
            apiKeys.forEach(a => {
                state.apiKeys.push(a);
            })
        },
        toggleApiKey(state, key) {
            for (let i = 0; i < state.apiKeys.length; i++) {
                if (state.apiKeys[i].id == key.id) {
                    state.apiKeys[i].enabled = key.enabled;
                }
            }
        },
        addApiKey(state, key) {
            state.apiKeys.push(key);
        },
        setItems(state, items) {
            state.items = [];
            items.forEach(i => {
                state.items.push(i)
            });
        },
        addItem(state, item) {
            state.items.push(item);
        }
    },
    actions: {
        async authenticate({ commit }, user) {
            await axios.post(url + '/user/auth', {
                uid: user.uid,
                password: user.password
            }).then(response => {
                commit('setUser', response.data.success.payload);
                commit('setToken', response.headers['auth-token'])
            });
        },
        async register(_, user) {
            await axios.post(url + '/user/register', {
                username: user.username,
                password: user.password,
                email: user.email,
                organisation: user.organisation
            });
        },
        async getUser({ commit }) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.get(url + '/user/get', {
                headers: headers
            }).then(response => {
                commit('setUser', response.data.success.payload);
            })
        },
        async getSubscription({ commit }) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.get(url + '/user/subscription/all', {
                headers: headers
            }).then(response => {
                commit('setSubscriptions', response.data.success.payload)
            });
        },
        async addSubscription({ commit }, interval) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.post(url + '/user/subscription/add', {
                interval: interval
            }, {
                headers: headers
            }).then(response => {
                commit('addSubscription', response.data.success.payload)
            });
        },
        async cancelSubscription({ commit }, id) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.put(url + '/user/subscription/cancel/' + id, { id: id }, {
                headers: headers
            }).then(response => {
                commit('cancelSubscription', response.data.success.payload)
            });
        },
        async getApiKeys({ commit }) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.get(url + '/user/keys/all', {
                headers: headers
            }).then(response => {
                commit('setApiKeys', response.data.success.payload)
            })
        },
        async toggleApiKey({ commit }, id) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.put(url + '/user/keys/' + id, { id: id }, {
                headers: headers
            }).then(response => {
                commit('toggleApiKey', response.data.success.payload)
            })
        },
        async addApiKey({ commit }) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.post(url + '/user/keys/new', {},  {
                headers: headers
            }).then(response => {
                commit('addApiKey', response.data.success.payload)
            });
        },
        async getItems({ commit }) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.get(url + '/items/item/all', {
                headers: headers
            }).then(response => {
                commit('setItems', response.data.success.payload);
            })
        },
        async addItem({ commit }, item) {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            };

            await axios.post(url + '/items/item', { 
                name: item.name,
                brand: item.brand
            }, {
                headers: headers
            }).then(response => {
                commit('addItem', response.data.success.payload.item);
            });
        }
    },
    modules: {
    }
})
