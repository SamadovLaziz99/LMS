import axios_init from "@/utils/axios_init";

export default {
    state: {
        students: [],
        loader: false,
        isEdit: false,
        index: null,
        deletedUser: [],
        level: [],
        total: null
    },
    getters: {
        students: state => state.students,
        set_loader: state => state.loader,
        set_deletedUser: state => state.deletedUser,
        set_level: state => state.level,
        set_total: state => state.total
    },
    mutations: {
        STUDENTS_LIST(state, payload) {
            state.students = payload;
        },
        LEVELS_LIST(state, payload) {
            state.level = payload;
        },
        SET_LOADER(state, payload) {
            state.loader = payload;
        },
        EDIT_STUDENT(state, payload) {
            state.index = payload.catchQuery;
            state.isEdit = true;
            console.log(state.isEdit);
        },
        DELETED_USER(state, payload) {
            state.deletedUser = payload;
        },
        SET_TOTAL(state, payload) {
            state.total = payload;
        }
    },
    actions: {
        students_list: async function({ commit }, payload) {
            const _res = await axios_init.get('/v1/admin/learning-centre/student', {
                page: payload,
                size: 10
            });
            commit('STUDENTS_LIST', _res.body.list);
            commit('SET_TOTAL', _res.body.total);
        },
        levels_list: async function({ commit }) {
            const _level = await axios_init.get('/v1/level/lc/list', {
                lc_id: 1
            });
            commit('LEVELS_LIST', _level.body);
        },
        remove_student: async function({commit}, payload) {
            commit('SET_LOADER', true);
            try {
                const _res = await axios_init.remove(`/v1/admin/learning-centre/student/${payload}`);
                commit('SET_LOADER', false);
            } catch (e) {
                throw Error(e);
                commit('SET_LOADER', false);
            }
        },
        add_Student: async function({commit, state}, payload) {
            if (!state.isEdit) {
                commit('SET_LOADER', true);
                try {
                    const _data = await axios_init.post('/v1/admin/learning-centre/student', payload);
                    commit('SET_LOADER', false);
                    console.log(_data);
                } catch (err) {
                    commit('SET_LOADER', false);
                    throw err;
                }
            } else {
                commit('SET_LOADER', true);
                try {
                    const _data = await axios_init.put(`/v1/admin/learning-centre/student/${state.index}`, payload);
                    commit('SET_LOADER', false);
                } catch (err) {
                    commit('SET_LOADER', false);
                    throw err;
                }
            }
        },
        editStudent({commit}, payload) {
            commit('EDIT_STUDENT', payload);
        },
        deleted_user: async function({ commit }, payload) {
            const item = await axios_init.get(`/v1/admin/learning-centre/student/${payload}`);
            commit('DELETED_USER', item.body);
        }
    }
}