import * as boolean from 'boolean';

const env: NodeJS.ProcessEnv = process.env;

export class EnvironmentConfigUtils {
public static get(key: string, defaultValue?: any): any {
  return env[key] || defaultValue;
}

public static boolean(key: string, defaultValue?: boolean): boolean {
  return boolean(EnvironmentConfigUtils.get(key, defaultValue));
}

public static number(key: string, defaultValue?: number): number {
  return Number(EnvironmentConfigUtils.get(key, defaultValue));
}

public static string(key: string, defaultValue?: string): string {
  return EnvironmentConfigUtils.get(key, defaultValue).toString();
}

public static isDev() {
  return EnvironmentConfigUtils.get('APP_ENV') === 'dev';
}
}
