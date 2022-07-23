import axios_init from "@/utils/axios_init";

export default {
    state: {
        token: null
    },
    getters: {

    },
    mutations: {
        set_auth(state, payload) {
            state.token = payload;
            console.log(state.token);
            console.log(payload);
        }
    },
    actions: {
        auth: async function({ commit }, payload) {
            try {
                const _res = await axios_init.post('/authenticate', payload);
                const token = _res.body.token;
                localStorage.setItem('token', token);
                console.log(token);
                return _res;
                commit('set_auth', token);
            } catch (err) {
                console.error('Err', err);
                throw new Error(err);
            }
        }
    }
}