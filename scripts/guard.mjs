export function requestAllowed({host,origin,port,allowedOrigins}={}) {      // no argument, null-ish fields or the wrong types are simply 'false'
  if(!Number.isInteger(port)||port<1||port>65535)return false;
  if(![`localhost:${port}`,`127.0.0.1:${port}`,`[::1]:${port}`].includes(host))return false;
  if(typeof origin!=='string'||!Array.isArray(allowedOrigins)||!allowedOrigins.includes(origin))return false;
  try {const url=new URL(origin);return ['http:','https:'].includes(url.protocol)&&url.origin===origin;}catch{return false;}
}
