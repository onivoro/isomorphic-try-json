import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { spawnRx } from './spawn-rx';

describe('spawnPromise', () => {
    it('resolves created process', (done) => {
        spawnRx('ls', ['-l']).pipe(catchError(e => of(e)), tap((v) => {
            expect(v).toBe('hotdogs');
            done();
        }));
    });
});
