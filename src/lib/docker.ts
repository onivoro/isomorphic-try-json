import { spawnRx } from "./spawn-rx";

export class Docker {
  constructor(public readonly containerName: string) { }

  command(cmd: string) {
    const cmdLiteral = this.containerName ? `docker exec ${this.containerName} sh -c '${cmd}'` : cmd;
    console.log(cmdLiteral);
    return cmdLiteral;
  }

  commandArray(cmd: string) {
    const cmdLiteral = this.containerName ? `docker exec ${this.containerName} sh -c '${cmd}'` : cmd;
    console.log(cmdLiteral);
    return cmdLiteral;
  }

  spawnRx(cmd: string, db: string, username: string) {
    const dbOptions = db ? ['-d', db] : [];
    const commonArgs = ['-qtAX', '-U', username, ...dbOptions, '-c', cmd];
    const binaryName = 'psql';
    return this.containerName
      ? spawnRx('docker', ['exec', this.containerName, binaryName, ...commonArgs])
      : spawnRx(binaryName, commonArgs);
  }

}