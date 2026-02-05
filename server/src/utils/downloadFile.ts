import fs from "fs";
import path from "path";
import axios from "axios";

export async function downloadFile(
  url: string,
  filePath: string,
): Promise<boolean> {
  console.log("Скачиваем файл...");
  try {
    const fileResponse = await axios({
      method: "GET",
      url: url,
      responseType: "arraybuffer",
      maxRedirects: 5,
      timeout: 30000,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "*/*",
      },
    });

    fs.writeFileSync(filePath, Buffer.from(fileResponse.data));
    console.log("Файл успешно сохранен!");
    return true;
  } catch (error) {
    console.log("Не удалось скачать файл по ссылке");
    return false;
  }
}
