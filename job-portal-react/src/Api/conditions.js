import { setCandidate } from "../Redux/Slices/CandidateSlice";
import { candidateConnected, employerConnected } from "../Redux/Slices/WhoConnected";

export function getCookie(name){
    const cookies = document.cookie;
    const parts = cookies.split(`${name}=`)
    if(parts.length == 2) return parts[1]
    return null
}

export function handleSwitchToCandidate(dispatch,data){
    dispatch(candidateConnected())
    dispatch(setCandidate(data.candidate))
    StorgeDatainLocalStorage('ACCESS_TOKEN',data['access_token'])
}
export function handleSwitchToEmployer(dispatch,data){
    dispatch(employerConnected())
    dispatch(setCandidate(data.employer))
    StorgeDatainLocalStorage('ACCESS_TOKEN',data['access_token'])
}

export function StorgeDatainLocalStorage(name,data){
    const dataStorage = typeof data == 'object' ? JSON.stringify(data) : data

    localStorage.setItem(name,dataStorage)
}
export function getDataFromLocal(name) {
    const data = localStorage.getItem(name);

    try {
        return JSON.parse(data);
    } catch (e) {
        return data; 
    }
}