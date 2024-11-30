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
        console.log("Updating npm packages...");
        await runCommand("npm", ["install"], "./frontend");
        await runCommand("npm", ["install"], "./backend");
        console.log("Packages updated successfully.");
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
