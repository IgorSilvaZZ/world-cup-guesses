export class Envs {
    static get(key: string, defaultValue: string = ''): string {
        return process.env[key] || defaultValue;
    }
}