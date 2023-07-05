import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = obj => {
    const request = axios.post(baseUrl, obj);
    return request.then(response => response.data);
};

const deleteName = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

const updateNumber = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj);
};

const nameService = { create, deleteName, getAll, updateNumber }

export default nameService;