const { execSync } = require("child_process");

function runCommands(command1, command2) {
  const fullCommand = `concurrently "${command1}" "wait-on http://localhost:3040 && ${command2}"`;

  execSync(fullCommand, {
    stdio: "inherit",
    maxBuffer: 2 * 1024 * 1024, // 设置缓冲区大小
  });
}

runCommands("vue-cli-service serve", "electron .");
