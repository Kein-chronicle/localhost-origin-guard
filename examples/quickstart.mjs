import { requestAllowed } from '../scripts/guard.mjs';

const base = { host: 'localhost:8731', origin: 'https://editor.example.com', port: 8731, allowedOrigins: ['https://editor.example.com'] };
const show = (label, req) => console.log(String(requestAllowed(req)).padEnd(5), label);

show('allowed origin on loopback', base);
show('127.0.0.1 is fine too', { ...base, host: '127.0.0.1:8731' });
show('unlisted origin', { ...base, origin: 'https://evil.example.net' });
show('origin with trailing slash (not canonical)', { ...base, origin: 'https://editor.example.com/' });
show('DNS-rebinding style Host', { ...base, host: 'localhost:8731.evil.example.net' });
show('wrong port in Host', { ...base, host: 'localhost:9999' });
show('no Origin header at all', { ...base, origin: undefined });
