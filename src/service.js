import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:3030/api`
})

export default class Service {

    onFetchCard = async () => {
        try {
            let data = await axios({
                method: 'get',
                url: `${api.baseURL}/card`
            }).then((response) => {
                console.log(`card respond${response.data}`)
            })
        } catch (e) {
            console.log(`error ${e}`)
        }
    }
}
