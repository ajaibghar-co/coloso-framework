const env = process.env.NODE_ENV || "development";

console.log(`Loading Config for ${env} environment`);

const configDev = {
  dbPath: "./server/monument.db",
  serverUrl: "http://localhost:3000",
};

const configProd = {
  dbPath: "/volume/monument.db",
  serverUrl: "",
};

const allConfig = {
  development: configDev,
  production: configProd,
};

const config = allConfig[env];

export { config };
