import axios from "axios"
import {API_URL} from '../../Constants.js'

class ArticleService {

    getAll(name) {
        console.log("getAll :" + name)
        return axios.get(`${API_URL}/users/${name}/articles`)
    }   

    delete(name, id) {
        return axios.delete(`${API_URL}/users/${name}/articles/${id}`)
    }  

    update(name, id, article) {
        return axios.put(`${API_URL}/users/${name}/articles/${id}`, article)
    }

    create(name, article) {
        console.log(article)
        return axios.post(`${API_URL}/users/${name}/articles`, article)
    }

    get(name, id) {
        return axios.get(`${API_URL}/users/${name}/articles/${id}`)
    }
}

export default new ArticleService()