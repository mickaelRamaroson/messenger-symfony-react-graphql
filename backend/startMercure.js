const { exec } = require("child_process");
const { PowerShell } = require("node-powershell");
require("dotenv").config();

const opsys = process.platform;
if (opsys == "darwin") {
  exec(
    `JWT_KEY='${process.env.MERCURE_JWT_KEY}' ADDR='${process.env.MECURE_ADDR}' CORS_ALLOWED_ORIGINS='*' ALLOW_ANONYMOUS=1 ./mercure/mercure_darwin`
  );
} else if (opsys == "win32" || opsys == "win64") {
  PowerShell.$`.\\mercure\\mercure_windows.exe --addr '${process.env.MECURE_ADDR}' --jwt-key '${process.env.MERCURE_JWT_KEY}'  --allow-anonymous 1 --cors-allowed-origins '*'`;
} else if (opsys == "linux") {
  exec(
    `JWT_KEY='${process.env.MERCURE_JWT_KEY}' ADDR='${process.env.MECURE_ADDR}' CORS_ALLOWED_ORIGINS='*' ALLOW_ANONYMOUS=1 ./mercure/mercure_linux`
  );
}

console.log("MERCURE is running on port 4000");

