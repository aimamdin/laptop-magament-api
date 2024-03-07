import os from "os";
import cluster from "cluster";
import path from "path";

const cpuCount = os.cpus().length;

const PATH_TO_SERVER_APP = __dirname + '/index.ts';

cluster.setupPrimary({
    execArgv: ['-r', 'ts-node/register'],
    exec: PATH_TO_SERVER_APP
});

for (let index = 0; index < cpuCount; index++) {
  cluster.fork();
}

cluster.on("exit", (worker, b, c) => {
  console.log(`worker process id ${worker.process.pid}`);
  cluster.fork();
});
