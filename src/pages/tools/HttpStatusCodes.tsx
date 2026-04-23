import React, { useState } from 'react';
import { ServerCrash, Search } from 'lucide-react';

const STATUS_CODES = [
  // 1xx
  { code: 100, name: 'Continue', desc: 'The server has received the request headers and the client should proceed to send the request body.' },
  { code: 101, name: 'Switching Protocols', desc: 'The requester has asked the server to switch protocols.' },
  // 2xx
  { code: 200, name: 'OK', desc: 'The request has succeeded.' },
  { code: 201, name: 'Created', desc: 'The request has been fulfilled and resulted in a new resource being created.' },
  { code: 202, name: 'Accepted', desc: 'The request has been accepted for processing, but the processing has not been completed.' },
  { code: 204, name: 'No Content', desc: 'The server successfully processed the request, but is not returning any content.' },
  { code: 206, name: 'Partial Content', desc: 'The server is delivering only part of the resource due to a range header.' },
  // 3xx
  { code: 301, name: 'Moved Permanently', desc: 'The requested resource has been assigned a new permanent URI.' },
  { code: 302, name: 'Found', desc: 'The resource was found but at a different URI temporarily.' },
  { code: 304, name: 'Not Modified', desc: 'The resource has not been modified since the last request.' },
  { code: 307, name: 'Temporary Redirect', desc: 'The request should be repeated with another URI but future requests should still use the original URI.' },
  { code: 308, name: 'Permanent Redirect', desc: 'The request and all future requests should be repeated using another URI.' },
  // 4xx
  { code: 400, name: 'Bad Request', desc: 'The server cannot or will not process the request due to a client error.' },
  { code: 401, name: 'Unauthorized', desc: 'Authentication is required and has failed or has not yet been provided.' },
  { code: 403, name: 'Forbidden', desc: 'The server understood the request but refuses to authorize it.' },
  { code: 404, name: 'Not Found', desc: 'The requested resource could not be found.' },
  { code: 405, name: 'Method Not Allowed', desc: 'The request method is not supported for the requested resource.' },
  { code: 408, name: 'Request Timeout', desc: 'The server timed out waiting for the request.' },
  { code: 409, name: 'Conflict', desc: 'The request could not be completed due to a conflict with the current state of the resource.' },
  { code: 410, name: 'Gone', desc: 'The resource requested is no longer available and will not be available again.' },
  { code: 413, name: 'Payload Too Large', desc: 'The request is larger than the server is willing or able to process.' },
  { code: 415, name: 'Unsupported Media Type', desc: 'The request entity has a media type which the server does not support.' },
  { code: 422, name: 'Unprocessable Entity', desc: 'The request was well-formed but was unable to be followed due to semantic errors.' },
  { code: 429, name: 'Too Many Requests', desc: 'The user has sent too many requests in a given amount of time (rate limiting).' },
  // 5xx
  { code: 500, name: 'Internal Server Error', desc: 'An unexpected condition was encountered.' },
  { code: 501, name: 'Not Implemented', desc: 'The server does not support the functionality required to fulfill the request.' },
  { code: 502, name: 'Bad Gateway', desc: 'The server received an invalid response from the upstream server.' },
  { code: 503, name: 'Service Unavailable', desc: 'The server is currently unable to handle the request due to a temporary overload or maintenance.' },
  { code: 504, name: 'Gateway Timeout', desc: 'The server did not receive a timely response from the upstream server.' },
  { code: 505, name: 'HTTP Version Not Supported', desc: 'The server does not support the HTTP protocol version used in the request.' },
];

const getColor = (code: number) => {
  if (code < 200) return { badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' };
  if (code < 300) return { badge: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-400' };
  if (code < 400) return { badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400' };
  if (code < 500) return { badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', dot: 'bg-orange-400' };
  return { badge: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-400' };
};

export default function HttpStatusCodes() {
  const [search, setSearch] = useState('');
  const filtered = STATUS_CODES.filter(s => String(s.code).includes(search) || s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><ServerCrash className="w-6 h-6 text-primary" /> HTTP Status Codes</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        A searchable, comprehensive reference for all standard HTTP response codes — grouped by class. No more Googling MDN for what a 422 means.
      </p>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by code or name..."
          className="w-full bg-card border border-border pl-10 pr-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-sm" />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(s => {
            const { badge, dot } = getColor(s.code);
            return (
              <div key={s.code} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-all flex gap-4">
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold font-mono ${badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                    {s.code}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center text-muted-foreground py-16">No matching status codes found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
