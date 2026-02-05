import dotenv from "dotenv";

dotenv.config();

interface Config {
  token: string | null;
  port: number;
  url: string | null;
}

const config: Config = {
  token: process.env.TOKEN || null,
  port: Number(process.env.PORT) || 3000,
  url: process.env.URL || null,
};

export default config;
