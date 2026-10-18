import test from 'node:test';
import assert from 'node:assert/strict';

import {requestAllowed} from '../scripts/guard.mjs';
const good={host:'localhost:8123',origin:'https://example.com',port:8123,allowedOrigins:['https://example.com']};
test('exact host and origin pair accepted',()=>{assert.equal(requestAllowed(good),true);assert.equal(requestAllowed({...good,host:'[::1]:8123'}),true);});
test('rebinding, suffix, opaque, absent and path origins fail closed',()=>{
 for(const host of ['example.com:8123','localhost.evil:8123','localhost:8124',undefined])assert.equal(requestAllowed({...good,host}),false);
 for(const origin of ['null',undefined,'https://example.com.evil','https://example.com/path','https://example.com/'])assert.equal(requestAllowed({...good,origin}),false);
 assert.equal(requestAllowed({...good,port:NaN}),false);
 assert.equal(requestAllowed({...good,origin:'null',allowedOrigins:['null']}),false);
});

test('missing or malformed arguments are false, never a throw',()=>{
 assert.equal(requestAllowed(),false);
 assert.equal(requestAllowed({}),false);
 assert.equal(requestAllowed({host:'localhost:80',origin:{},port:80,allowedOrigins:'https://x'}),false);
 assert.equal(requestAllowed({host:['localhost:80'],origin:'https://x.example',port:80,allowedOrigins:['https://x.example']}),false);
});
