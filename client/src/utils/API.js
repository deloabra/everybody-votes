import axios from "axios";

export default {
    getQuestion: function(questionId) {
        return axios.get("/question/:");
    }
};