import axios from "axios";

export async function fetchData() {
  try {
    const res = await axios.get("http://localhost:5555/get_data");

    if (res.data.success) {
      return res.data.data;
    }
  } catch (err) {
    console.error(err);
  }
}
