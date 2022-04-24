sensorsDataAnalytic201505.modules['AesEncryption'] = (function () {
  'use strict';

  // CryptoJS 宿主对象
  var root = {};

  /* eslint-disable*/

  (function (root, factory) {
    if (typeof exports === 'object') {
      // CommonJS
      module.exports = exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define([], factory);
    } else {
      // Global (browser)
      root.CryptoJS = factory();
    }
  })(root, function () {
    /*globals window, global, require*/

    /**
     * CryptoJS core components.
     */
    var CryptoJS =
      CryptoJS ||
      (function (Math, undefined$1) {
        var crypto;

        // Native crypto from window (Browser)
        if (typeof window !== 'undefined' && window.crypto) {
          crypto = window.crypto;
        }

        // Native crypto in web worker (Browser)
        if (typeof self !== 'undefined' && self.crypto) {
          crypto = self.crypto;
        }

        // Native crypto from worker
        if (typeof globalThis !== 'undefined' && globalThis.crypto) {
          crypto = globalThis.crypto;
        }

        // Native (experimental IE 11) crypto from window (Browser)
        if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
          crypto = window.msCrypto;
        }

        // Native crypto from global (NodeJS)
        if (!crypto && typeof global !== 'undefined' && global.crypto) {
          crypto = global.crypto;
        }

        // Native crypto import via require (NodeJS)
        if (!crypto && typeof require === 'function') {
          try {
            crypto = require('crypto');
          } catch (err) {}
        }

        /*
         * Cryptographically secure pseudorandom number generator
         *
         * As Math.random() is cryptographically not safe to use
         */
        var cryptoSecureRandomInt = function () {
          if (crypto) {
            // Use getRandomValues method (Browser)
            if (typeof crypto.getRandomValues === 'function') {
              try {
                return crypto.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {}
            }

            // Use randomBytes method (NodeJS)
            if (typeof crypto.randomBytes === 'function') {
              try {
                return crypto.randomBytes(4).readInt32LE();
              } catch (err) {}
            }
          }

          throw new Error('Native crypto module could not be used to get secure random number.');
        };

        /*
       * Local polyfill of Object.create

       */
        var createObj =
          Object.create ||
          (function () {
            function F() {}

            return function (obj) {
              var subtype;

              F.prototype = obj;

              subtype = new F();

              F.prototype = null;

              return subtype;
            };
          })();

        /**
         * CryptoJS namespace.
         */
        var C = {};

        /**
         * Library namespace.
         */
        var C_lib = (C.lib = {});

        /**
         * Base object for prototypal inheritance.
         */
        var Base = (C_lib.Base = (function () {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function (overrides) {
              // Spawn
              var subtype = createObj(this);

              // Augment
              if (overrides) {
                subtype.mixIn(overrides);
              }

              // Create default initializer
              if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                subtype.init = function () {
                  subtype.$super.init.apply(this, arguments);
                };
              }

              // Initializer's prototype is the subtype object
              subtype.init.prototype = subtype;

              // Reference supertype
              subtype.$super = this;

              return subtype;
            },

            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function () {
              var instance = this.extend();
              instance.init.apply(instance, arguments);

              return instance;
            },

            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function () {},

            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function (properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }

              // IE won't copy toString using the loop above
              if (properties.hasOwnProperty('toString')) {
                this.toString = properties.toString;
              }
            },

            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function () {
              return this.init.prototype.extend(this);
            }
          };
        })());

        /**
         * An array of 32-bit words.
         *
         * @property {Array} words The array of 32-bit words.
         * @property {number} sigBytes The number of significant bytes in this word array.
         */
        var WordArray = (C_lib.WordArray = Base.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined$1) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },

          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function (encoder) {
            return (encoder || Hex).stringify(this);
          },

          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function (wordArray) {
            // Shortcuts
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;

            // Clamp excess bits
            this.clamp();

            // Concat
            if (thisSigBytes % 4) {
              // Copy one byte at a time
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
              }
            } else {
              // Copy one word at a time
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;

            // Chainable
            return this;
          },

          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function () {
            // Shortcuts
            var words = this.words;
            var sigBytes = this.sigBytes;

            // Clamp
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
            words.length = Math.ceil(sigBytes / 4);
          },

          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function () {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);

            return clone;
          },

          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function (nBytes) {
            var words = [];

            for (var i = 0; i < nBytes; i += 4) {
              words.push(cryptoSecureRandomInt());
            }

            return new WordArray.init(words, nBytes);
          }
        }));

        /**
         * Encoder namespace.
         */
        var C_enc = (C.enc = {});

        /**
         * Hex encoding strategy.
         */
        var Hex = (C_enc.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 0x0f).toString(16));
            }

            return hexChars.join('');
          },

          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function (hexStr) {
            // Shortcut
            var hexStrLength = hexStr.length;

            // Convert
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
            }

            return new WordArray.init(words, hexStrLength / 2);
          }
        });

        /**
         * Latin1 encoding strategy.
         */
        var Latin1 = (C_enc.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
              latin1Chars.push(String.fromCharCode(bite));
            }

            return latin1Chars.join('');
          },

          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function (latin1Str) {
            // Shortcut
            var latin1StrLength = latin1Str.length;

            // Convert
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
            }

            return new WordArray.init(words, latin1StrLength);
          }
        });

        /**
         * UTF-8 encoding strategy.
         */
        var Utf8 = (C_enc.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function (wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error('Malformed UTF-8 data');
            }
          },

          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function (utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        });

        /**
         * Abstract buffered block algorithm template.
         *
         * The property blockSize must be implemented in a concrete subtype.
         *
         * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
         */
        var BufferedBlockAlgorithm = (C_lib.BufferedBlockAlgorithm = Base.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function () {
            // Initial values
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },

          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function (data) {
            // Convert string to WordArray, else assume WordArray already
            if (typeof data == 'string') {
              data = Utf8.parse(data);
            }

            // Append
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },

          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function (doFlush) {
            var processedWords;

            // Shortcuts
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;

            // Count blocks ready
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              // Round up to include partial blocks
              nBlocksReady = Math.ceil(nBlocksReady);
            } else {
              // Round down to include only full blocks,
              // less the number of blocks that must remain in the buffer
              nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }

            // Count words ready
            var nWordsReady = nBlocksReady * blockSize;

            // Count bytes ready
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

            // Process blocks
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                // Perform concrete-algorithm logic
                this._doProcessBlock(dataWords, offset);
              }

              // Remove processed words
              processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }

            // Return processed words
            return new WordArray.init(processedWords, nBytesReady);
          },

          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function () {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();

            return clone;
          },

          _minBufferSize: 0
        }));

        /**
         * Abstract hasher template.
         *
         * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
         */
        var Hasher = (C_lib.Hasher = BufferedBlockAlgorithm.extend({
          /**
           * Configuration options.
           */
          cfg: Base.extend(),

          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function (cfg) {
            // Apply config defaults
            this.cfg = this.cfg.extend(cfg);

            // Set initial values
            this.reset();
          },

          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function () {
            // Reset data buffer
            BufferedBlockAlgorithm.reset.call(this);

            // Perform concrete-hasher logic
            this._doReset();
          },

          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function (messageUpdate) {
            // Append
            this._append(messageUpdate);

            // Update the hash
            this._process();

            // Chainable
            return this;
          },

          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function (messageUpdate) {
            // Final message update
            if (messageUpdate) {
              this._append(messageUpdate);
            }

            // Perform concrete-hasher logic
            var hash = this._doFinalize();

            return hash;
          },

          blockSize: 512 / 32,

          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function (hasher) {
            return function (message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },

          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function (hasher) {
            return function (message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        }));

        /**
         * Algorithm namespace.
         */
        var C_algo = (C.algo = {});

        return C;
      })(Math);

    return CryptoJS;
  });

  /* eslint-disable */

  (function (root, factory) {
    if (typeof exports === 'object') {
      // CommonJS
      module.exports = exports = factory(require('./core'));
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define(['./core'], factory);
    } else {
      // Global (browser)
      factory(root.CryptoJS);
    }
  })(root, function (CryptoJS) {
    (function (Math) {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo;

      // Constants table
      var T = [];

      // Compute constants
      (function () {
        for (var i = 0; i < 64; i++) {
          T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
        }
      })();

      /**
       * MD5 hash algorithm.
       */
      var MD5 = (C_algo.MD5 = Hasher.extend({
        _doReset: function () {
          this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
        },

        _doProcessBlock: function (M, offset) {
          // Swap endian
          for (var i = 0; i < 16; i++) {
            // Shortcuts
            var offset_i = offset + i;
            var M_offset_i = M[offset_i];

            M[offset_i] = (((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) | (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00);
          }

          // Shortcuts
          var H = this._hash.words;

          var M_offset_0 = M[offset + 0];
          var M_offset_1 = M[offset + 1];
          var M_offset_2 = M[offset + 2];
          var M_offset_3 = M[offset + 3];
          var M_offset_4 = M[offset + 4];
          var M_offset_5 = M[offset + 5];
          var M_offset_6 = M[offset + 6];
          var M_offset_7 = M[offset + 7];
          var M_offset_8 = M[offset + 8];
          var M_offset_9 = M[offset + 9];
          var M_offset_10 = M[offset + 10];
          var M_offset_11 = M[offset + 11];
          var M_offset_12 = M[offset + 12];
          var M_offset_13 = M[offset + 13];
          var M_offset_14 = M[offset + 14];
          var M_offset_15 = M[offset + 15];

          // Working varialbes
          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d = H[3];

          // Computation
          a = FF(a, b, c, d, M_offset_0, 7, T[0]);
          d = FF(d, a, b, c, M_offset_1, 12, T[1]);
          c = FF(c, d, a, b, M_offset_2, 17, T[2]);
          b = FF(b, c, d, a, M_offset_3, 22, T[3]);
          a = FF(a, b, c, d, M_offset_4, 7, T[4]);
          d = FF(d, a, b, c, M_offset_5, 12, T[5]);
          c = FF(c, d, a, b, M_offset_6, 17, T[6]);
          b = FF(b, c, d, a, M_offset_7, 22, T[7]);
          a = FF(a, b, c, d, M_offset_8, 7, T[8]);
          d = FF(d, a, b, c, M_offset_9, 12, T[9]);
          c = FF(c, d, a, b, M_offset_10, 17, T[10]);
          b = FF(b, c, d, a, M_offset_11, 22, T[11]);
          a = FF(a, b, c, d, M_offset_12, 7, T[12]);
          d = FF(d, a, b, c, M_offset_13, 12, T[13]);
          c = FF(c, d, a, b, M_offset_14, 17, T[14]);
          b = FF(b, c, d, a, M_offset_15, 22, T[15]);

          a = GG(a, b, c, d, M_offset_1, 5, T[16]);
          d = GG(d, a, b, c, M_offset_6, 9, T[17]);
          c = GG(c, d, a, b, M_offset_11, 14, T[18]);
          b = GG(b, c, d, a, M_offset_0, 20, T[19]);
          a = GG(a, b, c, d, M_offset_5, 5, T[20]);
          d = GG(d, a, b, c, M_offset_10, 9, T[21]);
          c = GG(c, d, a, b, M_offset_15, 14, T[22]);
          b = GG(b, c, d, a, M_offset_4, 20, T[23]);
          a = GG(a, b, c, d, M_offset_9, 5, T[24]);
          d = GG(d, a, b, c, M_offset_14, 9, T[25]);
          c = GG(c, d, a, b, M_offset_3, 14, T[26]);
          b = GG(b, c, d, a, M_offset_8, 20, T[27]);
          a = GG(a, b, c, d, M_offset_13, 5, T[28]);
          d = GG(d, a, b, c, M_offset_2, 9, T[29]);
          c = GG(c, d, a, b, M_offset_7, 14, T[30]);
          b = GG(b, c, d, a, M_offset_12, 20, T[31]);

          a = HH(a, b, c, d, M_offset_5, 4, T[32]);
          d = HH(d, a, b, c, M_offset_8, 11, T[33]);
          c = HH(c, d, a, b, M_offset_11, 16, T[34]);
          b = HH(b, c, d, a, M_offset_14, 23, T[35]);
          a = HH(a, b, c, d, M_offset_1, 4, T[36]);
          d = HH(d, a, b, c, M_offset_4, 11, T[37]);
          c = HH(c, d, a, b, M_offset_7, 16, T[38]);
          b = HH(b, c, d, a, M_offset_10, 23, T[39]);
          a = HH(a, b, c, d, M_offset_13, 4, T[40]);
          d = HH(d, a, b, c, M_offset_0, 11, T[41]);
          c = HH(c, d, a, b, M_offset_3, 16, T[42]);
          b = HH(b, c, d, a, M_offset_6, 23, T[43]);
          a = HH(a, b, c, d, M_offset_9, 4, T[44]);
          d = HH(d, a, b, c, M_offset_12, 11, T[45]);
          c = HH(c, d, a, b, M_offset_15, 16, T[46]);
          b = HH(b, c, d, a, M_offset_2, 23, T[47]);

          a = II(a, b, c, d, M_offset_0, 6, T[48]);
          d = II(d, a, b, c, M_offset_7, 10, T[49]);
          c = II(c, d, a, b, M_offset_14, 15, T[50]);
          b = II(b, c, d, a, M_offset_5, 21, T[51]);
          a = II(a, b, c, d, M_offset_12, 6, T[52]);
          d = II(d, a, b, c, M_offset_3, 10, T[53]);
          c = II(c, d, a, b, M_offset_10, 15, T[54]);
          b = II(b, c, d, a, M_offset_1, 21, T[55]);
          a = II(a, b, c, d, M_offset_8, 6, T[56]);
          d = II(d, a, b, c, M_offset_15, 10, T[57]);
          c = II(c, d, a, b, M_offset_6, 15, T[58]);
          b = II(b, c, d, a, M_offset_13, 21, T[59]);
          a = II(a, b, c, d, M_offset_4, 6, T[60]);
          d = II(d, a, b, c, M_offset_11, 10, T[61]);
          c = II(c, d, a, b, M_offset_2, 15, T[62]);
          b = II(b, c, d, a, M_offset_9, 21, T[63]);

          // Intermediate hash value
          H[0] = (H[0] + a) | 0;
          H[1] = (H[1] + b) | 0;
          H[2] = (H[2] + c) | 0;
          H[3] = (H[3] + d) | 0;
        },

        _doFinalize: function () {
          // Shortcuts
          var data = this._data;
          var dataWords = data.words;

          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8;

          // Add padding
          dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));

          var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
          var nBitsTotalL = nBitsTotal;
          dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) | (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00);
          dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) | (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00);

          data.sigBytes = (dataWords.length + 1) * 4;

          // Hash final blocks
          this._process();

          // Shortcuts
          var hash = this._hash;
          var H = hash.words;

          // Swap endian
          for (var i = 0; i < 4; i++) {
            // Shortcut
            var H_i = H[i];

            H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) | (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
          }

          // Return final computed hash
          return hash;
        },

        clone: function () {
          var clone = Hasher.clone.call(this);
          clone._hash = this._hash.clone();

          return clone;
        }
      }));

      function FF(a, b, c, d, x, s, t) {
        var n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      }

      function GG(a, b, c, d, x, s, t) {
        var n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      }

      function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      }

      function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      }

      /**
       * Shortcut function to the hasher's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       *
       * @return {WordArray} The hash.
       *
       * @static
       *
       * @example
       *
       *     var hash = CryptoJS.MD5('message');
       *     var hash = CryptoJS.MD5(wordArray);
       */
      C.MD5 = Hasher._createHelper(MD5);

      /**
       * Shortcut function to the HMAC's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       * @param {WordArray|string} key The secret key.
       *
       * @return {WordArray} The HMAC.
       *
       * @static
       *
       * @example
       *
       *     var hmac = CryptoJS.HmacMD5(message, key);
       */
      C.HmacMD5 = Hasher._createHmacHelper(MD5);
    })(Math);

    return CryptoJS.MD5;
  });

  /* eslint-disable */

  (function (root, factory, undef) {
    if (typeof exports === 'object') {
      // CommonJS
      module.exports = exports = factory(require('./core'), require('./sha1'), require('./hmac'));
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define(['./core', './sha1', './hmac'], factory);
    } else {
      // Global (browser)
      factory(root.CryptoJS);
    }
  })(root, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var WordArray = C_lib.WordArray;
      var C_algo = C.algo;
      var MD5 = C_algo.MD5;

      /**
       * This key derivation function is meant to conform with EVP_BytesToKey.
       * www.openssl.org/docs/crypto/EVP_BytesToKey.html
       */
      var EvpKDF = (C_algo.EvpKDF = Base.extend({
        /**
         * Configuration options.
         *
         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
         * @property {number} iterations The number of iterations to perform. Default: 1
         */
        cfg: Base.extend({
          keySize: 128 / 32,
          hasher: MD5,
          iterations: 1
        }),

        /**
         * Initializes a newly created key derivation function.
         *
         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
         *
         * @example
         *
         *     var kdf = CryptoJS.algo.EvpKDF.create();
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
         */
        init: function (cfg) {
          this.cfg = this.cfg.extend(cfg);
        },

        /**
         * Derives a key from a password.
         *
         * @param {WordArray|string} password The password.
         * @param {WordArray|string} salt A salt.
         *
         * @return {WordArray} The derived key.
         *
         * @example
         *
         *     var key = kdf.compute(password, salt);
         */
        compute: function (password, salt) {
          var block;

          // Shortcut
          var cfg = this.cfg;

          // Init hasher
          var hasher = cfg.hasher.create();

          // Initial values
          var derivedKey = WordArray.create();

          // Shortcuts
          var derivedKeyWords = derivedKey.words;
          var keySize = cfg.keySize;
          var iterations = cfg.iterations;

          // Generate key
          while (derivedKeyWords.length < keySize) {
            if (block) {
              hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();

            // Iterations
            for (var i = 1; i < iterations; i++) {
              block = hasher.finalize(block);
              hasher.reset();
            }

            derivedKey.concat(block);
          }
          derivedKey.sigBytes = keySize * 4;

          return derivedKey;
        }
      }));

      /**
       * Derives a key from a password.
       *
       * @param {WordArray|string} password The password.
       * @param {WordArray|string} salt A salt.
       * @param {Object} cfg (Optional) The configuration options to use for this computation.
       *
       * @return {WordArray} The derived key.
       *
       * @static
       *
       * @example
       *
       *     var key = CryptoJS.EvpKDF(password, salt);
       *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
       *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
       */
      C.EvpKDF = function (password, salt, cfg) {
        return EvpKDF.create(cfg).compute(password, salt);
      };
    })();

    return CryptoJS.EvpKDF;
  });

  /* eslint-disable */

  (function (root, factory) {
    if (typeof exports === 'object') {
      // CommonJS
      module.exports = exports = factory(require('./core'));
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define(['./core'], factory);
    } else {
      // Global (browser)
      factory(root.CryptoJS);
    }
  })(root, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var C_enc = C.enc;

      /**
       * Base64 encoding strategy.
       */
      var Base64 = (C_enc.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function (wordArray) {
          // Shortcuts
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var map = this._map;

          // Clamp excess bits
          wordArray.clamp();

          // Convert
          var base64Chars = [];
          for (var i = 0; i < sigBytes; i += 3) {
            var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
            var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

            var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

            for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
              base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
            }
          }

          // Add padding
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            while (base64Chars.length % 4) {
              base64Chars.push(paddingChar);
            }
          }

          return base64Chars.join('');
        },

        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function (base64Str) {
          // Shortcuts
          var base64StrLength = base64Str.length;
          var map = this._map;
          var reverseMap = this._reverseMap;

          if (!reverseMap) {
            reverseMap = this._reverseMap = [];
            for (var j = 0; j < map.length; j++) {
              reverseMap[map.charCodeAt(j)] = j;
            }
          }

          // Ignore padding
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
              base64StrLength = paddingIndex;
            }
          }

          // Convert
          return parseLoop(base64Str, base64StrLength, reverseMap);
        },

        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      });

      function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0; i < base64StrLength; i++) {
          if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
            nBytes++;
          }
        }
        return WordArray.create(words, nBytes);
      }
    })();

    return CryptoJS.enc.Base64;
  });

  /* eslint-disable */

  (function (root, factory, undef) {
    if (typeof exports === 'object') {
      // CommonJS
      module.exports = exports = factory(require('./core'), require('./evpkdf'));
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define(['./core', './evpkdf'], factory);
    } else {
      // Global (browser)
      factory(root.CryptoJS);
    }
  })(root, function (CryptoJS) {
    /**
     * Cipher core components.
     */
    CryptoJS.lib.Cipher ||
      (function (undefined$1) {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;

        /**
         * Abstract base cipher template.
         *
         * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
         * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
         * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
         * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
         */
        var Cipher = (C_lib.Cipher = BufferedBlockAlgorithm.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: Base.extend(),

          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function (key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
          },

          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function (key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
          },

          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function (xformMode, key, cfg) {
            // Apply config defaults
            this.cfg = this.cfg.extend(cfg);

            // Store transform mode and key
            this._xformMode = xformMode;
            this._key = key;

            // Set initial values
            this.reset();
          },

          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function () {
            // Reset data buffer
            BufferedBlockAlgorithm.reset.call(this);

            // Perform concrete-cipher logic
            this._doReset();
          },

          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function (dataUpdate) {
            // Append
            this._append(dataUpdate);

            // Process available blocks
            return this._process();
          },

          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function (dataUpdate) {
            // Final data update
            if (dataUpdate) {
              this._append(dataUpdate);
            }

            // Perform concrete-cipher logic
            var finalProcessedData = this._doFinalize();

            return finalProcessedData;
          },

          keySize: 128 / 32,

          ivSize: 128 / 32,

          _ENC_XFORM_MODE: 1,

          _DEC_XFORM_MODE: 2,

          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: (function () {
            function selectCipherStrategy(key) {
              if (typeof key == 'string') {
                return PasswordBasedCipher;
              } else {
                return SerializableCipher;
              }
            }

            return function (cipher) {
              return {
                encrypt: function (message, key, cfg) {
                  return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },

                decrypt: function (ciphertext, key, cfg) {
                  return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
              };
            };
          })()
        }));

        /**
         * Abstract base stream cipher template.
         *
         * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
         */
        var StreamCipher = (C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function () {
            // Process partial blocks
            var finalProcessedBlocks = this._process(!!'flush');

            return finalProcessedBlocks;
          },

          blockSize: 1
        }));

        /**
         * Mode namespace.
         */
        var C_mode = (C.mode = {});

        /**
         * Abstract base block cipher mode template.
         */
        var BlockCipherMode = (C_lib.BlockCipherMode = Base.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function (cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },

          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function (cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },

          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function (cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        }));

        /**
         * Cipher Block Chaining mode.
         */
        var CBC = (C_mode.CBC = (function () {
          /**
           * Abstract base CBC mode.
           */
          var CBC = BlockCipherMode.extend();

          /**
           * CBC encryptor.
           */
          CBC.Encryptor = CBC.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function (words, offset) {
              // Shortcuts
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;

              // XOR and encrypt
              xorBlock.call(this, words, offset, blockSize);
              cipher.encryptBlock(words, offset);

              // Remember this block to use with next block
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });

          /**
           * CBC decryptor.
           */
          CBC.Decryptor = CBC.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function (words, offset) {
              // Shortcuts
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;

              // Remember this block to use with next block
              var thisBlock = words.slice(offset, offset + blockSize);

              // Decrypt and XOR
              cipher.decryptBlock(words, offset);
              xorBlock.call(this, words, offset, blockSize);

              // This block becomes the previous block
              this._prevBlock = thisBlock;
            }
          });

          function xorBlock(words, offset, blockSize) {
            var block;

            // Shortcut
            var iv = this._iv;

            // Choose mixing block
            if (iv) {
              block = iv;

              // Remove IV for subsequent blocks
              this._iv = undefined$1;
            } else {
              block = this._prevBlock;
            }

            // XOR blocks
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= block[i];
            }
          }

          return CBC;
        })());

        /**
         * Padding namespace.
         */
        var C_pad = (C.pad = {});

        /**
         * PKCS #5/7 padding strategy.
         */
        var Pkcs7 = (C_pad.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function (data, blockSize) {
            // Shortcut
            var blockSizeBytes = blockSize * 4;

            // Count padding bytes
            var nPaddingBytes = blockSizeBytes - (data.sigBytes % blockSizeBytes);

            // Create padding word
            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

            // Create padding
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) {
              paddingWords.push(paddingWord);
            }
            var padding = WordArray.create(paddingWords, nPaddingBytes);

            // Add padding
            data.concat(padding);
          },

          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function (data) {
            // Get number of padding bytes from last byte
            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

            // Remove padding
            data.sigBytes -= nPaddingBytes;
          }
        });

        /**
         * Abstract base block cipher template.
         *
         * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
         */
        var BlockCipher = (C_lib.BlockCipher = Cipher.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),

          reset: function () {
            var modeCreator;

            // Reset cipher
            Cipher.reset.call(this);

            // Shortcuts
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;

            // Reset block mode
            if (this._xformMode == this._ENC_XFORM_MODE) {
              modeCreator = mode.createEncryptor;
            } /* if (this._xformMode == this._DEC_XFORM_MODE) */ else {
              modeCreator = mode.createDecryptor;
              // Keep at least one block in the buffer for unpadding
              this._minBufferSize = 1;
            }

            if (this._mode && this._mode.__creator == modeCreator) {
              this._mode.init(this, iv && iv.words);
            } else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },

          _doProcessBlock: function (words, offset) {
            this._mode.processBlock(words, offset);
          },

          _doFinalize: function () {
            var finalProcessedBlocks;

            // Shortcut
            var padding = this.cfg.padding;

            // Finalize
            if (this._xformMode == this._ENC_XFORM_MODE) {
              // Pad data
              padding.pad(this._data, this.blockSize);

              // Process final blocks
              finalProcessedBlocks = this._process(!!'flush');
            } /* if (this._xformMode == this._DEC_XFORM_MODE) */ else {
              // Process final blocks
              finalProcessedBlocks = this._process(!!'flush');

              // Unpad data
              padding.unpad(finalProcessedBlocks);
            }

            return finalProcessedBlocks;
          },

          blockSize: 128 / 32
        }));

        /**
         * A collection of cipher parameters.
         *
         * @property {WordArray} ciphertext The raw ciphertext.
         * @property {WordArray} key The key to this ciphertext.
         * @property {WordArray} iv The IV used in the ciphering operation.
         * @property {WordArray} salt The salt used with a key derivation function.
         * @property {Cipher} algorithm The cipher algorithm.
         * @property {Mode} mode The block mode used in the ciphering operation.
         * @property {Padding} padding The padding scheme used in the ciphering operation.
         * @property {number} blockSize The block size of the cipher.
         * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
         */
        var CipherParams = (C_lib.CipherParams = Base.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function (cipherParams) {
            this.mixIn(cipherParams);
          },

          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function (formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        }));

        /**
         * Format namespace.
         */
        var C_format = (C.format = {});

        /**
         * OpenSSL formatting strategy.
         */
        var OpenSSLFormatter = (C_format.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function (cipherParams) {
            var wordArray;

            // Shortcuts
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;

            // Format
            if (salt) {
              wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
            } else {
              wordArray = ciphertext;
            }

            return wordArray.toString(Base64);
          },

          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function (openSSLStr) {
            var salt;

            // Parse base64
            var ciphertext = Base64.parse(openSSLStr);

            // Shortcut
            var ciphertextWords = ciphertext.words;

            // Test for salt
            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
              // Extract salt
              salt = WordArray.create(ciphertextWords.slice(2, 4));

              // Remove salt from ciphertext
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }

            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
          }
        });

        /**
         * A cipher wrapper that returns ciphertext as a serializable cipher params object.
         */
        var SerializableCipher = (C_lib.SerializableCipher = Base.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: Base.extend({
            format: OpenSSLFormatter
          }),

          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function (cipher, message, key, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Encrypt
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);

            // Shortcut
            var cipherCfg = encryptor.cfg;

            // Create and return serializable cipher params
            return CipherParams.create({
              ciphertext: ciphertext,
              key: key,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },

          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function (cipher, ciphertext, key, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Convert string to CipherParams
            ciphertext = this._parse(ciphertext, cfg.format);

            // Decrypt
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

            return plaintext;
          },

          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function (ciphertext, format) {
            if (typeof ciphertext == 'string') {
              return format.parse(ciphertext, this);
            } else {
              return ciphertext;
            }
          }
        }));

        /**
         * Key derivation function namespace.
         */
        var C_kdf = (C.kdf = {});

        /**
         * OpenSSL key derivation function.
         */
        var OpenSSLKdf = (C_kdf.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function (password, keySize, ivSize, salt) {
            // Generate random salt
            if (!salt) {
              salt = WordArray.random(64 / 8);
            }

            // Derive key and IV
            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

            // Separate key and IV
            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
            key.sigBytes = keySize * 4;

            // Return params
            return CipherParams.create({ key: key, iv: iv, salt: salt });
          }
        });

        /**
         * A serializable cipher wrapper that derives the key from a password,
         * and returns ciphertext as a serializable cipher params object.
         */
        var PasswordBasedCipher = (C_lib.PasswordBasedCipher = SerializableCipher.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),

          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function (cipher, message, password, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Derive key and other params
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

            // Add IV to config
            cfg.iv = derivedParams.iv;

            // Encrypt
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

            // Mix in derived params
            ciphertext.mixIn(derivedParams);

            return ciphertext;
          },

          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function (cipher, ciphertext, password, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Convert string to CipherParams
            ciphertext = this._parse(ciphertext, cfg.format);

            // Derive key and other params
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

            // Add IV to config
            cfg.iv = derivedParams.iv;

            // Decrypt
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

            return plaintext;
          }
        }));
      })();
  });

  /*eslint-disable*/

  (function (root, factory, undef) {
    if (typeof exports === 'object') {
      // CommonJS
      module.exports = exports = factory(require('./core'), require('./enc-base64'), require('./md5'), require('./evpkdf'), require('./cipher-core'));
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define(['./core', './enc-base64', './md5', './evpkdf', './cipher-core'], factory);
    } else {
      // Global (browser)
      factory(root.CryptoJS);
    }
  })(root, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var BlockCipher = C_lib.BlockCipher;
      var C_algo = C.algo;

      // Lookup tables
      var SBOX = [];
      var INV_SBOX = [];
      var SUB_MIX_0 = [];
      var SUB_MIX_1 = [];
      var SUB_MIX_2 = [];
      var SUB_MIX_3 = [];
      var INV_SUB_MIX_0 = [];
      var INV_SUB_MIX_1 = [];
      var INV_SUB_MIX_2 = [];
      var INV_SUB_MIX_3 = [];

      // Compute lookup tables
      (function () {
        // Compute double table
        var d = [];
        for (var i = 0; i < 256; i++) {
          if (i < 128) {
            d[i] = i << 1;
          } else {
            d[i] = (i << 1) ^ 0x11b;
          }
        }

        // Walk GF(2^8)
        var x = 0;
        var xi = 0;
        for (var i = 0; i < 256; i++) {
          // Compute sbox
          var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
          sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
          SBOX[x] = sx;
          INV_SBOX[sx] = x;

          // Compute multiplication
          var x2 = d[x];
          var x4 = d[x2];
          var x8 = d[x4];

          // Compute sub bytes, mix columns tables
          var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
          SUB_MIX_0[x] = (t << 24) | (t >>> 8);
          SUB_MIX_1[x] = (t << 16) | (t >>> 16);
          SUB_MIX_2[x] = (t << 8) | (t >>> 24);
          SUB_MIX_3[x] = t;

          // Compute inv sub bytes, inv mix columns tables
          var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
          INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
          INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
          INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
          INV_SUB_MIX_3[sx] = t;

          // Compute next counter
          if (!x) {
            x = xi = 1;
          } else {
            x = x2 ^ d[d[d[x8 ^ x2]]];
            xi ^= d[d[xi]];
          }
        }
      })();

      // Precomputed Rcon lookup
      var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

      /**
       * AES block cipher algorithm.
       */
      var AES = (C_algo.AES = BlockCipher.extend({
        _doReset: function () {
          var t;

          // Skip reset of nRounds has been set before and key did not change
          if (this._nRounds && this._keyPriorReset === this._key) {
            return;
          }

          // Shortcuts
          var key = (this._keyPriorReset = this._key);
          var keyWords = key.words;
          var keySize = key.sigBytes / 4;

          // Compute number of rounds
          var nRounds = (this._nRounds = keySize + 6);

          // Compute number of key schedule rows
          var ksRows = (nRounds + 1) * 4;

          // Compute key schedule
          var keySchedule = (this._keySchedule = []);
          for (var ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
              keySchedule[ksRow] = keyWords[ksRow];
            } else {
              t = keySchedule[ksRow - 1];

              if (!(ksRow % keySize)) {
                // Rot word
                t = (t << 8) | (t >>> 24);

                // Sub word
                t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

                // Mix Rcon
                t ^= RCON[(ksRow / keySize) | 0] << 24;
              } else if (keySize > 6 && ksRow % keySize == 4) {
                // Sub word
                t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
              }

              keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
          }

          // Compute inv key schedule
          var invKeySchedule = (this._invKeySchedule = []);
          for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            var ksRow = ksRows - invKsRow;

            if (invKsRow % 4) {
              var t = keySchedule[ksRow];
            } else {
              var t = keySchedule[ksRow - 4];
            }

            if (invKsRow < 4 || ksRow <= 4) {
              invKeySchedule[invKsRow] = t;
            } else {
              invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^ INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
            }
          }
        },

        encryptBlock: function (M, offset) {
          this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
        },

        decryptBlock: function (M, offset) {
          // Swap 2nd and 4th rows
          var t = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t;

          this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

          // Inv swap 2nd and 4th rows
          var t = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t;
        },

        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
          // Shortcut
          var nRounds = this._nRounds;

          // Get input, add round key
          var s0 = M[offset] ^ keySchedule[0];
          var s1 = M[offset + 1] ^ keySchedule[1];
          var s2 = M[offset + 2] ^ keySchedule[2];
          var s3 = M[offset + 3] ^ keySchedule[3];

          // Key schedule row counter
          var ksRow = 4;

          // Rounds
          for (var round = 1; round < nRounds; round++) {
            // Shift rows, sub bytes, mix columns, add round key
            var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
            var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
            var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
            var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

            // Update state
            s0 = t0;
            s1 = t1;
            s2 = t2;
            s3 = t3;
          }

          // Shift rows, sub bytes, add round key
          var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
          var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
          var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
          var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

          // Set output
          M[offset] = t0;
          M[offset + 1] = t1;
          M[offset + 2] = t2;
          M[offset + 3] = t3;
        },

        keySize: 256 / 32
      }));

      /**
       * Shortcut functions to the cipher's object interface.
       *
       * @example
       *
       *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
       *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
       */
      C.AES = BlockCipher._createHelper(AES);
    })();

    return CryptoJS.AES;
  });

  /** 检测传入参数是否是函数
   * @category Util
   * @param {*} arg 传入参数
   * @returns 是否是函数
   * @function isFunction
   * @example 
   * isFunction (function(){}) //=> true
   */

  /** 检测传入参数是否是对象类型
   * @category Util
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是对象类型
   * @function isObject
   * @example 
   * isObject({}) //=> true
   * isObject(1) //=> false
   */
  function isObject(arg) {
    if (arg == null) {
      return false;
    } else {
      return Object.prototype.toString.call(arg) == '[object Object]';
    }
  }

  /** 获取指定数字范围内的随随机数
   * @param {Number} max 随机数最大值
   * @category Math
   * @function getRandomBasic
   * @return 指定数字范围内的随机数
   * 
   * @example
   * getRandomBasic(100) //=> 85
   */
  var getRandomBasic = (function () {
    var today = new Date();
    var seed = today.getTime();
    function rnd() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280.0;
    }
    return function rand(number) {
      return Math.ceil(rnd() * number);
    };
  })();

  /** 安全的 js 随机数生成方式,返回与原生 Math.random 类似的 0-1 的随机数值
   * @function getRandom
   * @category Math
   * @returns {Number} 一个介于 0 -1 的数字
   *
   * @example
   * getRandom() //=> 0.8368784293552812
   */
  function getRandom() {
    if (typeof Uint32Array === 'function') {
      var cry = '';
      if (typeof crypto !== 'undefined') {
        cry = crypto;
      } else if (typeof msCrypto !== 'undefined') {
        // eslint-disable-next-line no-undef
        cry = msCrypto;
      }
      if (isObject(cry) && cry.getRandomValues) {
        var typedArray = new Uint32Array(1);
        var randomNumber = cry.getRandomValues(typedArray)[0];
        var integerLimit = Math.pow(2, 32);
        return randomNumber / integerLimit;
      }
    }
    return getRandomBasic(10000000000000000000) / 10000000000000000000;
  }

  /* eslint-disable no-undef */

  var CryptoJS = root.CryptoJS;

  function buildAESOption(iv) {
    return {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: iv || generateIVData()
    };
  }

  // AES 加密 js 对象数据
  function encryptData(originalData, key, iv, isRawKey) {
    var opt = buildAESOption(iv);
    var jsonStr = originalData;
    if (typeof originalData !== 'string') {
      jsonStr = JSON.stringify(originalData);
    }
    if (!isRawKey) {
      key = CryptoJS.enc.Base64.parse(key);
    }
    var hex = CryptoJS.enc.Utf8.parse(jsonStr);
    var encryptedB64Val = CryptoJS.AES.encrypt(hex, key, opt).toString();
    var result = opt.iv.clone().concat(CryptoJS.enc.Base64.parse(encryptedB64Val)).toString(CryptoJS.enc.Base64);
    return result;
  }

  // AES 解密数据
  function decryptData(data, key, isRawKey) {
    var hex = CryptoJS.enc.Base64.parse(data).toString();
    var iv = hex.substr(0, 32);
    var edataB64 = CryptoJS.enc.Hex.parse(hex.substr(32)).toString(CryptoJS.enc.Base64);
    var opt = buildAESOption(CryptoJS.enc.Hex.parse(iv));
    if (!isRawKey) {
      key = CryptoJS.enc.Base64.parse(key);
    }
    var decrypted = CryptoJS.AES.decrypt(edataB64, key, opt);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  // 生成 iv 向量
  function generateIVData(len) {
    len = len || 16;
    var hexVal = '';
    while (len-- > 0) {
      var hex = Math.ceil(getRandom() * 127).toString(16);
      hexVal += hex.length === 2 ? hex : '0' + hex;
    }
    return CryptoJS.enc.Hex.parse(hexVal);
  }

  var _iv,
    _sd,
    _config,
    _oldEncoder,
    _log = (window.console && window.console.log) || function () {};

  // 传入神策采集数据，返回加密后的神策数据格式
  function AesEncrypt(originalData) {
    var result = encryptData(originalData, _config.k, _iv);
    return {
      key_id: _config.kid,
      key_hash: _config.khash,
      nc: 1,
      payload: result
    };
  }

  // 重写编码方式
  function encodeTrackData(data) {
    try {
      var encypted = AesEncrypt(data);
      var dataStr = JSON.stringify(encypted);
      var crc = 'crc=' + _sd._.hashCode(dataStr);
      return 'data=' + encodeURIComponent(dataStr) + '&ext=' + encodeURIComponent(crc) + '&gzip=9';
    } catch (e) {
      _log('数据加密发送异常。');
      return _oldEncoder.call(_sd.kit, data);
    }
  }

  function isTruthy(val, name) {
    if (val) {
      return true;
    }
    _log(name + '不能为空。');
    return false;
  }

  function matchType(val, name, type) {
    if (typeof val === type) {
      return true;
    }
    _log('参数类型错误,' + name + '必须为' + type);
    return false;
  }

  // 插件暴露的加解密接口
  function doEnDecrypt(isEnCrypt, data, key, isRawKey) {
    try {
      var k = key || (_config && _config.k);
      if (!isTruthy(k, '参数key') || !matchType(k, '参数key', 'string')) {
        return data;
      }
      if (isRawKey === undefined) {
        isRawKey = key !== undefined;
      }
      return isEnCrypt ? encryptData(data, k, null, isRawKey) : decryptData(data, k, isRawKey);
    } catch (e) {
      _log('执行加解密失败，返回原始数据。');
      return data;
    }
  }

  // 插件对象
  var AesEncryption = {
    init: function (sd, config) {
      _sd = sd;
      _log = (_sd && _sd.log) || _log;

      if (!sd || !sd.kit || !sd.kit.encodeTrackData) {
        _log('AES插件初始化失败,当前主sdk不支持AES插件，请升级主sdk');
        return;
      }

      if (isTruthy(config, '初始配置config') && isTruthy(config.k, '初始参数k') && isTruthy(config.kid, '初始参数kid') && isTruthy(config.khash, '初始参数khash') && matchType(config.k, '初始参数k', 'string') && matchType(config.khash, '初始参数khash', 'string') && matchType(config.kid, '初始参数kid', 'number')) {
        _config = config;
        _iv = generateIVData();
        _oldEncoder = _sd.kit.encodeTrackData;
        _sd.kit.encodeTrackData = encodeTrackData;
        _log('AES插件初始化完成');
      } else {
        _log('AES插件初始化失败');
      }
    },
    encrypt: function (data, key, isRawKey) {
      return doEnDecrypt(true, data, key, isRawKey);
    },
    decrypt: function (data, key, isRawKey) {
      return doEnDecrypt(false, data, key, isRawKey);
    }
  };

  // 对外公开 AesEncryption 插件
  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.AesEncryption = window.SensorsDataWebJSSDKPlugin.AesEncryption || AesEncryption;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      AesEncryption: AesEncryption
    };
  }

  return AesEncryption;

}());
