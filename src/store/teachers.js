import axios_init from "@/utils/axios_init";

export default {
    state: {
        teachers: [],
        loader: false,
        isEdit: false,
        index: null,
        deletedUser: []
    },
    getters: {
        set_teachers: state => state.teachers,
        set_loadert: state => state.loader,
        set_deletedTeacher: state => state.deletedUser
    },
    mutations: {
        TEACHERS_LIST(state, payload) {
            state.teachers = payload;
        },
        SET_LOADERT(state, payload) {
            state.loader = payload;
        },
        EDIT_TEACHER(state, payload) {
            state.index = payload.catchQuery;
            state.isEdit = true;
            state.dialogVisible = payload;
            console.log(state.isEdit);
        },
        DELETED_USERT(state, payload) {
            state.deletedUser = payload;
        }
    },
    actions: {
        teachers_list: async function({commit}, payload) {
            const _res = await axios_init.get('/v1/admin/learning-centre/teacher');
            commit('TEACHERS_LIST', _res.body.list);
        },
        remove_teacher: async function({commit}, payload) {
            commit('SET_LOADERT', true);
            try {
                const _res = await axios_init.remove(`/v1/admin/learning-centre/teacher/${payload}`);
                commit('SET_LOADERT', false);
            } catch (e) {
                throw Error(e);
                commit('SET_LOADERT', false);
            }
        },
        add_teacher: async function({commit, state}, payload) {
            if (!state.isEdit) {
                commit('SET_LOADERT', true);
                try {
                    const _data = await axios_init.post('/api/v1/admin/learning-centre/teacher', payload);
                    commit('SET_LOADERT', false);
                    console.log(_data);
                } catch (err) {
                    commit('SET_LOADERT', false);
                    throw err;
                }
            } else {
                commit('SET_LOADERT', true);
                try {
                    const _data = await axios_init.put(`/v1/admin/learning-centre/teacher/${state.index}`, payload);
                    commit('SET_LOADERT', false);
                } catch (err) {
                    commit('SET_LOADERT', false);
                    throw err;
                }
            }
        },
        editTeacher: function({commit}, payload) {
            commit('EDIT_TEACHER', payload);
        },
        deleted_user_t: async function({ commit }, payload) {
            const item = await axios_init.get(`/v1/admin/learning-centre/teacher/${payload}`);
            commit('DELETED_USERT', item.body);
        }
    }
}