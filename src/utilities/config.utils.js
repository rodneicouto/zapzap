const env = process.env.NODE_ENV || 'development';
import config from "../config/config.json" assert { type: "json" };

const _getProperty = getProperty;
export { _getProperty as getProperty };
export function getEnv() { return env }

function getProperty(name, defaultValue) {
  
  if( process.env[name] != null ) { 
      return process.env[name];
  }
  
  if( config[env][name] != null ) {
    return config[env][name];
  }

  if( config['default'][name] != null ) {
    return config['default'][name];
  }

  if( defaultValue != null ) {
    return defaultValue;
  }
  return null;
}
