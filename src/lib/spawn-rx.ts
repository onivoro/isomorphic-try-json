import { spawn, SpawnOptions, ChildProcess } from 'child_process';
import { Subject } from 'rxjs';

export const spawnRx = (cmd: string, args?: Array<string>, opts?: SpawnOptions) => {
    const subject = new Subject();

    const proc: ChildProcess = spawn(cmd, args, { ...opts, stdio: 'pipe' });
    proc.stdout.on('data', d => subject.next(d?.toString()))
    proc.stderr.on('data', d => subject.next(d?.toString()))
    proc.on('exit', (code: number) => {
        if (code) {
            subject.error(code)
        } else {
            subject.complete();
        }
    });

    proc.on('error', (e) => {
        return subject.error(e);
    });

    return subject;
};
