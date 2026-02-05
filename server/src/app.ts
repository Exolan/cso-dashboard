import express from "express";
import cors from "cors";
import config from "./config/config";
import axios from "axios";
import fs from "fs";
import path from "path";
import { downloadFile } from "./utils/downloadFile";
import { dashboardService } from "./services/dashboardService";
import { DashboardData } from "./types/types";

const PUBLIC_DIR = path.join(__dirname, "../public");
const DOWNLOADS_DIR = path.join(PUBLIC_DIR, "downloads");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_DIR));

app.listen(config.port, () =>
  console.log("Сервер работает на порту: ", config.port),
);

app.get("/", (req, res) => {
  res.status(200).json("Сервер запущен!");
});

app.get("/get_data", async (req, res) => {
  try {
    if (!config.url) {
      console.log("Не удалось получить url");
      return res.status(400).json({ error: "URL не настроен" });
    }

    const response = await axios.get(config.url, {
      headers: {
        Authorization: "OAuth " + config.token,
      },
    });

    const downloadUrl = response.data.href;

    console.log("Ссылка на скачивание:", downloadUrl);

    const urlObj = new URL(downloadUrl);
    const filename = urlObj.searchParams.get("filename") || "дашборд.xlsx";

    if (!fs.existsSync(DOWNLOADS_DIR)) {
      fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
    }

    const filePath = path.join(DOWNLOADS_DIR, filename);

    const isDownload: boolean = await downloadFile(downloadUrl, filePath);

    if (!isDownload) {
      throw new Error("Не удалось скачать файл по ссылке");
    }

    const data: DashboardData | void = dashboardService(filePath);

    if (!data) {
      throw new Error("Не удалось обработать файл");
    }

    res.json({
      success: true,
      message: "Файл успешно скачан и сохранен",
      data: data,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        error: "Ошибка при скачивании файла",
        message: error,
      });
    }
  }
});
