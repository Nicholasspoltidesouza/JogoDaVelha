import axios from 'axios';


async function ApiResponse (line) {
    let resul;

    try {
        resul = await axios.get(`http://localhost:8000/verifyMLP/${line}`, {
        })
            .then(function (res) {
                resul = res.data.result
                return res.data.result;
            }).catch(function (err) {
            })
    } catch (err) {
        console.log(err)
    }

    return resul;
}


export default ApiResponse;

