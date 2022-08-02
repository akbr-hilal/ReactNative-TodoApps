import axios from "axios";

export const API = axios.create({
    baseURL: `https://api.kontenbase.com/query/api/v1/228f0820-7e66-4677-afbf-3b8e85a112c4/`
})