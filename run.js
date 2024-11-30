import { spawn } from "node:child_process";

function runCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { cwd, stdio: "inherit", shell: true });

        process.on("close", (code) => {
            if (code !== 0) {
                reject(`Command "${command} ${args.join(" ")}" failed with exit code ${code}`);
            } else {
                resolve();
            }
        });
    });
}

async function main() {
    try {
        
        console.log("Starting servers...");
        runCommand("npm", ["run", "dev"], "./frontend"); // Start the frontend server
        runCommand("node", ["server.js"], "./backend");  // Start the backend server

        console.log("Servers are running...");
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
