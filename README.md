socket-kinda-ntp
==========

Synchronizes time between a client and server using websockets and something kinda like NTP. 

## Installation

```
npm install socket.io
npm install socket-kinda-ntp
```

## Client usage

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/client/socket-kinda-ntp.js"></script>
```

```javascript
  // Initialize the socket and start time synchronization.
  var socket = io.connect();
  kinda_ntp.init(socket);
  
  // Calculated server local time.
  var time = kinda_ntp.time();
```

## Server usage

```javascript
var kinda_ntp = require('socket-kinda-ntp');

io.sockets.on('connection', function (socket) {
  kinda_ntp.init(socket);
});
```

## License

(The MIT License)

Copyright (c) 2013 rhodey &lt;rhodey@anhonesteffort.org&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.