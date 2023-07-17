import axios from "axios";

async function fetchEmojiData() {
  try {
    const response = await axios.get("https://emojihub.yurace.pro/api/all");

    if (response.status === 200) {
      return response?.data;
    }
    // Process the data or perform further operations
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}

export default fetchEmojiData;
