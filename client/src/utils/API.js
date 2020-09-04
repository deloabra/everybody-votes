import axios from "axios";

export default {
    getQuestion: function(questionId) {
        return axios.get(`/question/${questionId}`);
    },

    createQuestion: async function(body) {
        return await axios.post("/api/createquestion", body);
    },

    createAnswerChoice: async function(body){
        return await axios.post("/api/createanswerchoice", body);
    },

    getAnswerChoices: async function(questionId){
        return await axios.get(`/api/answerchoices/${questionId}`);
    },

    getVotes: async function(questionId){
        return await axios.get(`/api/getvotes/${questionId}`);
    }
};