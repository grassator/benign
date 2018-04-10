# benign

[![Build Status](https://travis-ci.org/grassator/benign.svg?branch=master)](https://travis-ci.org/grassator/benign)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This library provides a single exported function called `benign`, that when used provides an object that does not do anything, but also tries it's best to appear to your code as if it does.


```javascript
import { benign } from "benign";

const B = benign();
const b = new B();
console.log(b().foo().bar === b);
```

## Requirements

This package requires Proxy implementation, so should generally in all evergreen browsers. All IE browsers are not supported.

## `instanceof` handling

By default `benign` will report that everything else is an instance of `benign()`, but converse is not true:

```javascript
import { benign } from "benign";

console.log(/foo/ instanceof benign()); // true
console.log(benign() instanceof RegExp); // false
```

This is explained by the way [Symbol.hasInstance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance) works.

## License

The MIT License (MIT)

Copyright (c) 2018 Dmitriy Kubyshkin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

