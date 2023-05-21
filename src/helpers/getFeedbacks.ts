import { mockServer } from "./constants";

export async function getFeedbacks(country: string) {
    
    let request = fetch(mockServer+country).then(res=>{
        return res.ok?res.json():"Ошибка получения с сервера"
    })
    return request
}

