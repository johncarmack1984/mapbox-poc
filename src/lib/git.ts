import { execSync } from "child_process";

function executeGitCommand(command: string) {
  return execSync(command)
    .toString("utf8")
    .replace(/[\n\r\s]+$/, "");
}

const BRANCH = executeGitCommand("git rev-parse --abbrev-ref HEAD");
const COMMIT_SHA = executeGitCommand("git rev-parse HEAD");

export { BRANCH, COMMIT_SHA };
