import axios_init from "@/utils/axios_init";

export default {
    state: {
        subjects: [],
        loader: false,
        isEdit: false,
        index: null,
        deletedSubject: []
    },
    getters: {
        set_subjects: state => state.subjects,
        set_loader_subject: state => state.loader,
        set_deletedSubject: state => state.deletedSubject
    },
    mutations: {
        SUBJECTS_LIST(state, payload) {
            state.subjects = payload;
        },
        SET_LOADER_SUBJECT(state, payload) {
            state.loader = payload;
        },
        EDIT_STUDENT(state, payload) {
            state.index = payload.catchQuery;
            state.isEdit = true;
            state.dialogVisible = payload;
            console.log(state.isEdit);
        },
        DELETED_USER(state, payload) {
            state.deletedUser = payload;
        },
        SUBJECTS_DISABLED(state, payload) {
            const new_subject = state.subjects;
            new_subject.map(el => el.disabled = payload);
            state.subjects = new_subject;
        },
        SUBJECT_DISABLED(state, payload) {
            const _subject = state.subjects.filter(el => el.subjectId === payload)[0];
            _subject.disabled = true;
        }
    },
    actions: {
        subject_list: async function({commit}, payload) {
            const subject_data = await axios_init.get('/v1/admin/learning-centre/subject');
            const sub = subject_data.body.map(object => {
                return { ...object, disabled: false }
            })
            commit('SUBJECTS_LIST', sub);
        },
        remove_subject: async function({commit}, payload) {
            commit('SET_LOADER_SUBJECT', true);
            try {
                const subject_delete = await axios_init.remove(`/v1/admin/learning-centre/subject/${payload}`);
                commit('SET_LOADER_SUBJECT', false);
            } catch (e) {
                throw Error(e);
                commit('SET_LOADER', false);
            }
        },
        add_Subject: async function({commit, state}, payload) {
            if (!state.isEdit) {
                commit('SET_LOADER_SUBJECT', true);
                try {
                    const _data = await axios_init.post('/v1/admin/learning-centre/subject', payload);
                    commit('SET_LOADER_SUBJECT', false);
                    console.log(_data);
                } catch (err) {
                    commit('SET_LOADER_SUBJECT', false);
                    throw err;
                }
            } else {
                commit('SET_LOADER_SUBJECT', true);
                try {
                    const _data = await axios_init.put(`/v1/admin/learning-centre/subject/${state.index}`, payload);
                    commit('SET_LOADER_SUBJECT', false);
                } catch (err) {
                    commit('SET_LOADER_SUBJECT', false);
                    throw err;
                }
            }
        },
        editSubject: function({commit}, payload) {
            commit('EDIT_STUDENT', payload);
        },
        deleted_subject: async function({ commit }, payload) {
            const item = await axios_init.get(`/v1/admin/learning-centre/subject/${payload}`);
            commit('DELETED_USER', item.body);
        }
    }
}