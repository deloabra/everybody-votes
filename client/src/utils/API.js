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
    }
};