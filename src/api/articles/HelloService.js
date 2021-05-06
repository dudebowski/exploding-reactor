import axios from "axios"
import {API_URL} from '../../Constants.js'

class HelloService {

    execute(name) {
        return axios.get(`${API_URL}/info/name/${name}`)
    }   
}



export default new HelloService()