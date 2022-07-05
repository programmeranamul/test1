import axios from "axios";
import { API } from "../../data/BackEndData";

export default async function checkToken() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const valid = await axios.get(API + "/v1/valid", {
      headers: { Authorization: `bearer ${token}` },
    });

    return true;
  } catch (e) {
    localStorage.removeItem("token")
    return false;
  }
}
