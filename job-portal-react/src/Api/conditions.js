import { setCandidate } from "../Redux/Slices/CandidateSlice";
import { setEmployer } from "../Redux/Slices/EmployersSlice";
import {
  candidateConnected,
  employerConnected,
} from "../Redux/Slices/WhoConnected";

export function getCookie(name) {
  const cookies = document.cookie;
  const parts = cookies.split(`${name}=`);
  if (parts.length == 2) return parts[1];
  return null;
}

export function handleSwitchToCandidate(dispatch, data) {
  dispatch(candidateConnected());
  dispatch(setCandidate(data.candidate));
  StorgeDatainLocalStorage("ACCESS_TOKEN", data["access_token"]);
}
export function handleSwitchToEmployer(dispatch, data) {
  dispatch(employerConnected());
  console.log(data.employer);
  dispatch(setEmployer(data.employer));
  StorgeDatainLocalStorage("ACCESS_TOKEN", data["access_token"]);
}

export function StorgeDatainLocalStorage(name, data) {
  const dataStorage = typeof data == "object" ? JSON.stringify(data) : data;

  localStorage.setItem(name, dataStorage);
}
export function getDataFromLocal(name) {
  const data = localStorage.getItem(name);

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

export function returnSalary(num) {
  return num.toString().length >= 4 ? num.toString().slice(0, -3) + "k" : num;
}
export function calculateTimePosted(posted) {
  const time = new Date() - new Date(posted);
  const times = {
    ifSecond: time / 1000,
    ifMinute: time / (1000 * 60),
    ifHour: time / (1000 * 60 * 60),
    ifDay: time / (1000 * 60 * 60 * 24),
    ifMonth: time / (1000 * 60 * 60 * 24 * 12),
    ifYear: time / (1000 * 60 * 60 * 24 * 365),
  };
  if(times.ifSecond < 60){
    return `${times.ifSecond.toFixed(0)}s ago`
  }
  if(times.ifMinute < 60){
    return `${times.ifMinute.toFixed(0)}m ago`
  }
  if(times.ifHour < 24){
    return `${times.ifHour.toFixed(0)}h ago`
  }
  if(times.ifDay < 30){
    return `${times.ifDay.toFixed(0)}d ago`
  }
  if(times.ifMonth < 12){
    return `${times.ifMonth.toFixed(0)}M ago`
  }
  if(times.ifYear){
    return `${times.ifYear.toFixed(0)}y ago`
  }
 
}

export function avg(arr){

}