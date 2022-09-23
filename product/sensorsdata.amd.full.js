(function(global, factory) {
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(factory);
  }
}(this, (function() {

  var sd = {};

  (function() {
    var objectTypes = {
      "function": true,
      "object": true
    };
    var root = objectTypes[typeof window] && window || this;

    function runInContext(context, exports) {
      context || (context = root.Object());
      exports || (exports = root.Object());

      var Number = context.Number || root.Number,
        String = context.String || root.String,
        Object = context.Object || root.Object,
        Date = context.Date || root.Date,
        SyntaxError = context.SyntaxError || root.SyntaxError,
        TypeError = context.TypeError || root.TypeError,
        Math = context.Math || root.Math,
        nativeJSON = context.JSON || root.JSON;

      if (typeof nativeJSON == "object" && nativeJSON) {
        exports.stringify = nativeJSON.stringify;
        exports.parse = nativeJSON.parse;
        exports.runInContext = runInContext;
        return exports
      }

      var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty = objectProto.hasOwnProperty,
        undefined$1;

      function attempt(func, errorFunc) {
        try {
          func();
        } catch (exception) {
          if (errorFunc) {
            errorFunc();
          }
        }
      }

      var isExtended = new Date(-3509827334573292);
      attempt(function() {
        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
          isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
      });

      function has(name) {
        if (has[name] != null) {
          return has[name];
        }
        var isSupported;
        if (name == "bug-string-char-index") {
          isSupported = "a" [0] != "a";
        } else if (name == "json") {
          isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
        } else if (name == "date-serialization") {
          isSupported = has("json-stringify") && isExtended;
          if (isSupported) {
            var stringify = exports.stringify;
            attempt(function() {
              isSupported =
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            });
          }
        } else {
          var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
          if (name == "json-stringify") {
            var stringify = exports.stringify,
              stringifySupported = typeof stringify == "function";
            if (stringifySupported) {
              (value = function() {
                return 1;
              }).toJSON = value;
              attempt(function() {
                stringifySupported =
                  stringify(0) === "0" &&
                  stringify(new Number()) === "0" &&
                  stringify(new String()) == '""' &&
                  stringify(getClass) === undefined$1 &&
                  stringify(undefined$1) === undefined$1 &&
                  stringify() === undefined$1 &&
                  stringify(value) === "1" &&
                  stringify([value]) == "[1]" &&
                  stringify([undefined$1]) == "[null]" &&
                  stringify(null) == "null" &&
                  stringify([undefined$1, getClass, null]) == "[null,null,null]" &&
                  stringify({
                    "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                  }) == serialized &&
                  stringify(null, value) === "1" &&
                  stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
              }, function() {
                stringifySupported = false;
              });
            }
            isSupported = stringifySupported;
          }
          if (name == "json-parse") {
            var parse = exports.parse,
              parseSupported;
            if (typeof parse == "function") {
              attempt(function() {
                if (parse("0") === 0 && !parse(false)) {
                  value = parse(serialized);
                  parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                  if (parseSupported) {
                    attempt(function() {
                      parseSupported = !parse('"\t"');
                    });
                    if (parseSupported) {
                      attempt(function() {
                        parseSupported = parse("01") !== 1;
                      });
                    }
                    if (parseSupported) {
                      attempt(function() {
                        parseSupported = parse("1.") !== 1;
                      });
                    }
                  }
                }
              }, function() {
                parseSupported = false;
              });
            }
            isSupported = parseSupported;
          }
        }
        return has[name] = !!isSupported;
      }
      has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

      if (!has("json")) {
        var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

        var charIndexBuggy = has("bug-string-char-index");

        var forOwn = function(object, callback) {
          var size = 0,
            Properties, dontEnums, property;

          (Properties = function() {
            this.valueOf = 0;
          }).prototype.valueOf = 0;

          dontEnums = new Properties();
          for (property in dontEnums) {
            if (isProperty.call(dontEnums, property)) {
              size++;
            }
          }
          Properties = dontEnums = null;

          if (!size) {
            dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
            forOwn = function(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                property, length;
              var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
              for (property in object) {
                if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                  callback(property);
                }
              }
              for (length = dontEnums.length; property = dontEnums[--length];) {
                if (hasProperty.call(object, property)) {
                  callback(property);
                }
              }
            };
          } else {
            forOwn = function(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                property, isConstructor;
              for (property in object) {
                if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                  callback(property);
                }
              }
              if (isConstructor || isProperty.call(object, (property = "constructor"))) {
                callback(property);
              }
            };
          }
          return forOwn(object, callback);
        };

        if (!has("json-stringify") && !has("date-serialization")) {
          var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
          };

          var leadingZeroes = "000000";
          var toPaddedString = function(width, value) {
            return (leadingZeroes + (value || 0)).slice(-width);
          };

          var serializeDate = function(value) {
            var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
            if (!isExtended) {
              var floor = Math.floor;
              var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
              var getDay = function(year, month) {
                return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
              };
              getData = function(value) {
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                time = (value % 864e5 + 864e5) % 864e5;
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              };
            } else {
              getData = function(value) {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              };
            }
            serializeDate = function(value) {
              if (value > -1 / 0 && value < 1 / 0) {
                getData(value);
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  "." + toPaddedString(3, milliseconds) + "Z";
                year = month = date = hours = minutes = seconds = milliseconds = null;
              } else {
                value = null;
              }
              return value;
            };
            return serializeDate(value);
          };

          if (has("json-stringify") && !has("date-serialization")) {
            function dateToJSON(key) {
              return serializeDate(this);
            }

            var nativeStringify = exports.stringify;
            exports.stringify = function(source, filter, width) {
              var nativeToJSON = Date.prototype.toJSON;
              Date.prototype.toJSON = dateToJSON;
              var result = nativeStringify(source, filter, width);
              Date.prototype.toJSON = nativeToJSON;
              return result;
            };
          } else {
            var unicodePrefix = "\\u00";
            var escapeChar = function(character) {
              var charCode = character.charCodeAt(0),
                escaped = Escapes[charCode];
              if (escaped) {
                return escaped;
              }
              return unicodePrefix + toPaddedString(2, charCode.toString(16));
            };
            var reEscape = /[\x00-\x1f\x22\x5c]/g;
            var quote = function(value) {
              reEscape.lastIndex = 0;
              return '"' +
                (
                  reEscape.test(value) ?
                  value.replace(reEscape, escapeChar) :
                  value
                ) +
                '"';
            };

            var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
              var value, type, className, results, element, index, length, prefix, result;
              attempt(function() {
                value = object[property];
              });
              if (typeof value == "object" && value) {
                if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                  value = serializeDate(value);
                } else if (typeof value.toJSON == "function") {
                  value = value.toJSON(property);
                }
              }
              if (callback) {
                value = callback.call(object, property, value);
              }
              if (value == undefined$1) {
                return value === undefined$1 ? value : "null";
              }
              type = typeof value;
              if (type == "object") {
                className = getClass.call(value);
              }
              switch (className || type) {
                case "boolean":
                case booleanClass:
                  return "" + value;
                case "number":
                case numberClass:
                  return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                case "string":
                case stringClass:
                  return quote("" + value);
              }
              if (typeof value == "object") {
                for (length = stack.length; length--;) {
                  if (stack[length] === value) {
                    throw TypeError();
                  }
                }
                stack.push(value);
                results = [];
                prefix = indentation;
                indentation += whitespace;
                if (className == arrayClass) {
                  for (index = 0, length = value.length; index < length; index++) {
                    element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                    results.push(element === undefined$1 ? "null" : element);
                  }
                  result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
                } else {
                  forOwn(properties || value, function(property) {
                    var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                    if (element !== undefined$1) {
                      results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                    }
                  });
                  result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
                }
                stack.pop();
                return result;
              }
            };

            exports.stringify = function(source, filter, width) {
              var whitespace, callback, properties, className;
              if (objectTypes[typeof filter] && filter) {
                className = getClass.call(filter);
                if (className == functionClass) {
                  callback = filter;
                } else if (className == arrayClass) {
                  properties = {};
                  for (var index = 0, length = filter.length, value; index < length;) {
                    value = filter[index++];
                    className = getClass.call(value);
                    if (className == "[object String]" || className == "[object Number]") {
                      properties[value] = 1;
                    }
                  }
                }
              }
              if (width) {
                className = getClass.call(width);
                if (className == numberClass) {
                  if ((width -= width % 1) > 0) {
                    if (width > 10) {
                      width = 10;
                    }
                    for (whitespace = ""; whitespace.length < width;) {
                      whitespace += " ";
                    }
                  }
                } else if (className == stringClass) {
                  whitespace = width.length <= 10 ? width : width.slice(0, 10);
                }
              }
              return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
            };
          }
        }

        if (!has("json-parse")) {
          var fromCharCode = String.fromCharCode;

          var Unescapes = {
            92: "\\",
            34: '"',
            47: "/",
            98: "\b",
            116: "\t",
            110: "\n",
            102: "\f",
            114: "\r"
          };

          var Index, Source;

          var abort = function() {
            Index = Source = null;
            throw SyntaxError();
          };

          var lex = function() {
            var source = Source,
              length = source.length,
              value, begin, position, isSigned, charCode;
            while (Index < length) {
              charCode = source.charCodeAt(Index);
              switch (charCode) {
                case 9:
                case 10:
                case 13:
                case 32:
                  Index++;
                  break;
                case 123:
                case 125:
                case 91:
                case 93:
                case 58:
                case 44:
                  value = charIndexBuggy ? source.charAt(Index) : source[Index];
                  Index++;
                  return value;
                case 34:
                  for (value = "@", Index++; Index < length;) {
                    charCode = source.charCodeAt(Index);
                    if (charCode < 32) {
                      abort();
                    } else if (charCode == 92) {
                      charCode = source.charCodeAt(++Index);
                      switch (charCode) {
                        case 92:
                        case 34:
                        case 47:
                        case 98:
                        case 116:
                        case 110:
                        case 102:
                        case 114:
                          value += Unescapes[charCode];
                          Index++;
                          break;
                        case 117:
                          begin = ++Index;
                          for (position = Index + 4; Index < position; Index++) {
                            charCode = source.charCodeAt(Index);
                            if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                              abort();
                            }
                          }
                          value += fromCharCode("0x" + source.slice(begin, Index));
                          break;
                        default:
                          abort();
                      }
                    } else {
                      if (charCode == 34) {
                        break;
                      }
                      charCode = source.charCodeAt(Index);
                      begin = Index;
                      while (charCode >= 32 && charCode != 92 && charCode != 34) {
                        charCode = source.charCodeAt(++Index);
                      }
                      value += source.slice(begin, Index);
                    }
                  }
                  if (source.charCodeAt(Index) == 34) {
                    Index++;
                    return value;
                  }
                  abort();
                default:
                  begin = Index;
                  if (charCode == 45) {
                    isSigned = true;
                    charCode = source.charCodeAt(++Index);
                  }
                  if (charCode >= 48 && charCode <= 57) {
                    if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                      abort();
                    }
                    isSigned = false;
                    for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                    if (source.charCodeAt(Index) == 46) {
                      position = ++Index;
                      for (; position < length; position++) {
                        charCode = source.charCodeAt(position);
                        if (charCode < 48 || charCode > 57) {
                          break;
                        }
                      }
                      if (position == Index) {
                        abort();
                      }
                      Index = position;
                    }
                    charCode = source.charCodeAt(Index);
                    if (charCode == 101 || charCode == 69) {
                      charCode = source.charCodeAt(++Index);
                      if (charCode == 43 || charCode == 45) {
                        Index++;
                      }
                      for (position = Index; position < length; position++) {
                        charCode = source.charCodeAt(position);
                        if (charCode < 48 || charCode > 57) {
                          break;
                        }
                      }
                      if (position == Index) {
                        abort();
                      }
                      Index = position;
                    }
                    return +source.slice(begin, Index);
                  }
                  if (isSigned) {
                    abort();
                  }
                  var temp = source.slice(Index, Index + 4);
                  if (temp == "true") {
                    Index += 4;
                    return true;
                  } else if (temp == "fals" && source.charCodeAt(Index + 4) == 101) {
                    Index += 5;
                    return false;
                  } else if (temp == "null") {
                    Index += 4;
                    return null;
                  }
                  abort();
              }
            }
            return "$";
          };

          var get = function(value) {
            var results, hasMembers;
            if (value == "$") {
              abort();
            }
            if (typeof value == "string") {
              if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                return value.slice(1);
              }
              if (value == "[") {
                results = [];
                for (;;) {
                  value = lex();
                  if (value == "]") {
                    break;
                  }
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "]") {
                        abort();
                      }
                    } else {
                      abort();
                    }
                  } else {
                    hasMembers = true;
                  }
                  if (value == ",") {
                    abort();
                  }
                  results.push(get(value));
                }
                return results;
              } else if (value == "{") {
                results = {};
                for (;;) {
                  value = lex();
                  if (value == "}") {
                    break;
                  }
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "}") {
                        abort();
                      }
                    } else {
                      abort();
                    }
                  } else {
                    hasMembers = true;
                  }
                  if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                    abort();
                  }
                  results[value.slice(1)] = get(lex());
                }
                return results;
              }
              abort();
            }
            return value;
          };

          var update = function(source, property, callback) {
            var element = walk(source, property, callback);
            if (element === undefined$1) {
              delete source[property];
            } else {
              source[property] = element;
            }
          };

          var walk = function(source, property, callback) {
            var value = source[property],
              length;
            if (typeof value == "object" && value) {
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(getClass, forOwn, value, length, callback);
                }
              } else {
                forOwn(value, function(property) {
                  update(value, property, callback);
                });
              }
            }
            return callback.call(source, property, value);
          };

          exports.parse = function(source, callback) {
            var result, value;
            Index = 0;
            Source = "" + source;
            result = get(lex());
            if (lex() != "$") {
              abort();
            }
            Index = Source = null;
            return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
          };
        }
      }

      exports.runInContext = runInContext;
      return exports;
    }


    var nativeJSON = root.JSON,
      previousJSON = root.JSON3,
      isRestored = false;

    var JSON3 = runInContext(root, (root.JSON3 = {
      "noConflict": function() {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root.JSON3 = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };

  }).call(window);


  (function(root, factory) {
    factory(root);
  })(window, function(root) {
    if (root.atob) {
      try {
        root.atob(' ');
      } catch (e) {
        root.atob = (function(atob) {
          var func = function(string) {
            return atob(String(string).replace(/[\t\n\f\r ]+/g, ''));
          };
          func.original = atob;
          return func;
        })(root.atob);
      }
      return;
    }

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

    root.btoa = function(string) {
      string = String(string);
      var bitmap, a, b, c,
        result = '',
        i = 0,
        rest = string.length % 3;

      for (; i < string.length;) {
        if ((a = string.charCodeAt(i++)) > 255 ||
          (b = string.charCodeAt(i++)) > 255 ||
          (c = string.charCodeAt(i++)) > 255) {
          return '';
        }

        bitmap = (a << 16) | (b << 8) | c;
        result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
          b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
      }

      return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result;
    };

    root.atob = function(string) {
      string = String(string).replace(/[\t\n\f\r ]+/g, '');
      if (!b64re.test(string)) {
        return '';
      }
      string += '=='.slice(2 - (string.length & 3));
      var bitmap, result = '',
        r1, r2, i = 0;
      for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
          (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
          r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
          String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
      }
      return result;
    };
  });

  function isFunction(arg) {
    if (!arg) {
      return false;
    }
    var type = Object.prototype.toString.call(arg);
    return type == '[object Function]' || type == '[object AsyncFunction]';
  }

  function now() {
    if (Date.now && isFunction(Date.now)) {
      return Date.now();
    }
    return new Date().getTime();
  }

  var logFn;

  var logger = {
    setup: function(logger) {
      logFn = logger;
    },
    log: function() {
      (logFn || (console && console.log) || function() {}).apply(null, arguments);
    }
  };

  var _localStorage = {
    get: function(key) {
      return window.localStorage.getItem(key);
    },
    parse: function(key) {
      var storedValue;
      try {
        storedValue = JSON.parse(_localStorage.get(key)) || null;
      } catch (err) {
        logger.log(err);
      }
      return storedValue;
    },
    set: function(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (err) {
        logger.log(err);
      }
    },
    remove: function(key) {
      window.localStorage.removeItem(key);
    },
    isSupport: function() {
      var supported = true;
      try {
        var supportName = '__local_store_support__';
        var val = 'testIsSupportStorage';
        _localStorage.set(supportName, val);
        if (_localStorage.get(supportName) !== val) {
          supported = false;
        }
        _localStorage.remove(supportName);
      } catch (err) {
        supported = false;
      }
      return supported;
    }
  };

  function isObject(arg) {
    if (arg == null) {
      return false;
    } else {
      return Object.prototype.toString.call(arg) == '[object Object]';
    }
  }

  var getRandomBasic = (function() {
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

  function getRandom() {
    if (typeof Uint32Array === 'function') {
      var cry = '';
      if (typeof crypto !== 'undefined') {
        cry = crypto;
      } else if (typeof msCrypto !== 'undefined') {
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

  function safeJSONParse(str) {
    var val = null;
    try {
      val = JSON.parse(str);
    } catch (e) {}
    return val;
  }

  function ConcurrentStorage(lockGetPrefix, lockSetPrefix) {
    this.lockGetPrefix = lockGetPrefix || 'lock-get-prefix';
    this.lockSetPrefix = lockSetPrefix || 'lock-set-prefix';
  }

  ConcurrentStorage.prototype.get = function(key, lockTimeout, checkTime, callback) {
    if (!key) throw new Error('key is must');
    lockTimeout = lockTimeout || 10000;
    checkTime = checkTime || 1000;
    callback = callback || function() {};
    var lockKey = this.lockGetPrefix + key;
    var lock = _localStorage.get(lockKey);
    var randomNum = String(getRandom());
    if (lock) {
      lock = safeJSONParse(lock) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock.expireTime > now()) {
        return callback(null);
      }
    }
    _localStorage.set(lockKey, JSON.stringify({
      randomNum: randomNum,
      expireTime: now() + lockTimeout
    }));
    setTimeout(function() {
      lock = safeJSONParse(_localStorage.get(lockKey)) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock && lock.randomNum === randomNum) {
        callback(_localStorage.get(key));
        _localStorage.remove(key);
        _localStorage.remove(lockKey);
      } else {
        callback(null);
      }
    }, checkTime);
  };

  ConcurrentStorage.prototype.set = function(key, val, lockTimeout, checkTime, callback) {
    if (!key || !val) throw new Error('key and val is must');
    lockTimeout = lockTimeout || 10000;
    checkTime = checkTime || 1000;
    callback = callback || function() {};
    var lockKey = this.lockSetPrefix + key;
    var lock = _localStorage.get(lockKey);
    var randomNum = String(getRandom());
    if (lock) {
      lock = safeJSONParse(lock) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock.expireTime > now()) {
        return callback({
          status: 'fail',
          reason: 'This key is locked'
        });
      }
    }
    _localStorage.set(lockKey, JSON.stringify({
      randomNum: randomNum,
      expireTime: now() + lockTimeout
    }));
    setTimeout(function() {
      lock = safeJSONParse(_localStorage.get(lockKey)) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock.randomNum === randomNum) {
        _localStorage.set(key, val) && callback({
          status: 'success'
        });
      } else {
        callback({
          status: 'fail',
          reason: 'This key is locked'
        });
      }
    }, checkTime);
  };

  function isValidListener(listener) {
    if (typeof listener === 'function') {
      return true;
    } else if (listener && typeof listener === 'object') {
      return isValidListener(listener.listener);
    } else {
      return false;
    }
  }

  function EventEmitter() {
    this._events = {};
  }

  EventEmitter.prototype.on = function(eventName, listener) {
    if (!eventName || !listener) {
      return false;
    }

    if (!isValidListener(listener)) {
      throw new Error('listener must be a function');
    }

    this._events[eventName] = this._events[eventName] || [];
    var listenerIsWrapped = typeof listener === 'object';

    this._events[eventName].push(
      listenerIsWrapped ?
      listener : {
        listener: listener,
        once: false
      }
    );

    return this;
  };

  EventEmitter.prototype.prepend = function(eventName, listener) {
    if (!eventName || !listener) {
      return false;
    }

    if (!isValidListener(listener)) {
      throw new Error('listener must be a function');
    }

    this._events[eventName] = this._events[eventName] || [];
    var listenerIsWrapped = typeof listener === 'object';

    this._events[eventName].unshift(
      listenerIsWrapped ?
      listener : {
        listener: listener,
        once: false
      }
    );

    return this;
  };

  EventEmitter.prototype.prependOnce = function(eventName, listener) {
    return this.prepend(eventName, {
      listener: listener,
      once: true
    });
  };

  EventEmitter.prototype.once = function(eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true
    });
  };

  EventEmitter.prototype.off = function(eventName, listener) {
    var listeners = this._events[eventName];
    if (!listeners) {
      return false;
    }
    if (typeof listener === 'number') {
      listeners.splice(listener, 1);
    } else if (typeof listener === 'function') {
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] && listeners[i].listener === listener) {
          listeners.splice(i, 1);
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.emit = function(eventName, args) {
    var listeners = this._events[eventName];
    if (!listeners) {
      return false;
    }

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      if (listener) {
        listener.listener.call(this, args || {});
        if (listener.once) {
          this.off(eventName, i);
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function(eventName) {
    if (eventName && this._events[eventName]) {
      this._events[eventName] = [];
    } else {
      this._events = {};
    }
  };

  EventEmitter.prototype.listeners = function(eventName) {
    if (eventName && typeof eventName === 'string') {
      return this._events[eventName];
    } else {
      return this._events;
    }
  };

  function _decodeURIComponent(uri) {
    var result = uri;
    try {
      result = decodeURIComponent(uri);
    } catch (e) {
      result = uri;
    }
    return result;
  }

  function getURLSearchParams(queryString) {
    queryString = queryString || '';
    var args = {};
    var query = queryString.substring(1);
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      if (pos === -1) continue;
      var name = pairs[i].substring(0, pos);
      var value = pairs[i].substring(pos + 1);
      name = _decodeURIComponent(name);
      value = _decodeURIComponent(value);
      args[name] = value;
    }
    return args;
  }

  function isString(arg) {
    return Object.prototype.toString.call(arg) == '[object String]';
  }

  function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }


  function urlParse(url) {
    var URLParser = function(url) {
      this._fields = {
        Username: 4,
        Password: 5,
        Port: 7,
        Protocol: 2,
        Host: 6,
        Path: 8,
        URL: 0,
        QueryString: 9,
        Fragment: 10
      };
      this._values = {};
      this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

      if (typeof url != 'undefined') {
        this._parse(url);
      }
    };

    URLParser.prototype.setUrl = function(url) {
      this._parse(url);
    };

    URLParser.prototype._initValues = function() {
      for (var a in this._fields) {
        this._values[a] = '';
      }
    };

    URLParser.prototype.addQueryString = function(queryObj) {
      if (typeof queryObj !== 'object') {
        return false;
      }
      var query = this._values.QueryString || '';
      for (var i in queryObj) {
        if (new RegExp(i + '[^&]+').test(query)) {
          query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
        } else {
          if (query.slice(-1) === '&') {
            query = query + i + '=' + queryObj[i];
          } else {
            if (query === '') {
              query = i + '=' + queryObj[i];
            } else {
              query = query + '&' + i + '=' + queryObj[i];
            }
          }
        }
      }
      this._values.QueryString = query;
    };

    URLParser.prototype.getUrl = function() {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      url += this._values.Fragment ? '#' + this._values.Fragment : '';
      return url;
    };

    URLParser.prototype._parse = function(url) {
      this._initValues();

      var b = this._regex.exec(url);
      if (!b) {
        logger.log('URLParser::_parse -> Invalid URL');
      }

      var urlTmp = url.split('#');
      var urlPart = urlTmp[0];
      var hashPart = urlTmp.slice(1).join('#');
      b = this._regex.exec(urlPart);
      for (var c in this._fields) {
        if (typeof b[this._fields[c]] != 'undefined') {
          this._values[c] = b[this._fields[c]];
        }
      }
      this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
      this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];
      this._values['Fragment'] = hashPart;
    };

    return new URLParser(url);
  }



  function _URL(url) {
    var result = {};
    var isURLAPIWorking = function() {
      var url;
      try {
        url = new URL('http://modernizr.com/');
        return url.href === 'http://modernizr.com/';
      } catch (e) {
        return false;
      }
    };
    if (typeof window.URL === 'function' && isURLAPIWorking()) {
      result = new URL(url);
      if (!result.searchParams) {
        result.searchParams = (function() {
          var params = getURLSearchParams(result.search);
          return {
            get: function(searchParam) {
              return params[searchParam];
            }
          };
        })();
      }
    } else {
      if (!isString(url)) {
        url = String(url);
      }
      url = trim(url);
      var _regex = /^https?:\/\/.+/;
      if (_regex.test(url) === false) {
        logger.log('Invalid URL');
        return;
      }
      var instance = urlParse(url);
      result.hash = instance._values.Fragment;
      result.host = instance._values.Host ? instance._values.Host + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.href = instance._values.URL;
      result.password = instance._values.Password;
      result.pathname = instance._values.Path;
      result.port = instance._values.Port;
      result.search = instance._values.QueryString ? '?' + instance._values.QueryString : '';
      result.username = instance._values.Username;
      result.hostname = instance._values.Hostname;
      result.protocol = instance._values.Protocol ? instance._values.Protocol + ':' : '';
      result.origin = instance._values.Origin ? instance._values.Origin + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.searchParams = (function() {
        var params = getURLSearchParams('?' + instance._values.QueryString);
        return {
          get: function(searchParam) {
            return params[searchParam];
          }
        };
      })();
    }
    return result;
  }


  var UUID = (function() {
    var T = function() {
      var d = 1 * new Date(),
        i = 0;
      while (d == 1 * new Date()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    var R = function() {
      return getRandom().toString(16).replace('.', '');
    };
    var UA = function() {
      var ua = navigator.userAgent,
        i,
        ch,
        buffer = [],
        ret = 0;

      function xor(result, byte_array) {
        var j,
          tmp = 0;
        for (j = 0; j < byte_array.length; j++) {
          tmp |= buffer[j] << (j * 8);
        }
        return result ^ tmp;
      }

      for (i = 0; i < ua.length; i++) {
        ch = ua.charCodeAt(i);
        buffer.unshift(ch & 0xff);
        if (buffer.length >= 4) {
          ret = xor(ret, buffer);
          buffer = [];
        }
      }

      if (buffer.length > 0) {
        ret = xor(ret, buffer);
      }

      return ret.toString(16);
    };

    return function() {
      var se = String(screen.height * screen.width);
      if (se && /\d{5,}/.test(se)) {
        se = se.toString(16);
      } else {
        se = String(getRandom() * 31242)
          .replace('.', '')
          .slice(0, 8);
      }
      var val = T() + '-' + R() + '-' + UA() + '-' + se + '-' + T();
      if (val) {
        return val;
      } else {
        return (String(getRandom()) + String(getRandom()) + String(getRandom())).slice(2, 15);
      }
    };
  })();

  function isElement(arg) {
    return !!(arg && arg.nodeType === 1);
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function isArray(arg) {
    if (Array.isArray && isFunction(isArray)) {
      return Array.isArray(arg);
    }
    return Object.prototype.toString.call(arg) === '[object Array]';
  }


  function ry(dom) {
    return new DomElementInfo(dom);
  }

  var DomElementInfo = function(dom) {
    this.ele = dom;
  };

  var siblings = function(n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  DomElementInfo.prototype = {
    addClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') === -1) {
        this.ele.className = this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
      }
      return this;
    },
    removeClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        this.ele.className = classes.replace(' ' + para + ' ', ' ').slice(1, -1);
      }
      return this;
    },
    hasClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        return true;
      } else {
        return false;
      }
    },
    attr: function(key, value) {
      if (typeof key === 'string' && isUndefined(value)) {
        return this.ele.getAttribute(key);
      }
      if (typeof key === 'string') {
        value = String(value);
        this.ele.setAttribute(key, value);
      }
      return this;
    },
    offset: function() {
      var rect = this.ele.getBoundingClientRect();
      if (rect.width || rect.height) {
        var doc = this.ele.ownerDocument;
        var docElem = doc.documentElement;

        return {
          top: rect.top + window.pageYOffset - docElem.clientTop,
          left: rect.left + window.pageXOffset - docElem.clientLeft
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    getSize: function() {
      if (!window.getComputedStyle) {
        return {
          width: this.ele.offsetWidth,
          height: this.ele.offsetHeight
        };
      }
      try {
        var bounds = this.ele.getBoundingClientRect();
        return {
          width: bounds.width,
          height: bounds.height
        };
      } catch (e) {
        return {
          width: 0,
          height: 0
        };
      }
    },
    getStyle: function(value) {
      if (this.ele.currentStyle) {
        return this.ele.currentStyle[value];
      } else {
        return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value);
      }
    },
    wrap: function(elementTagName) {
      var ele = document.createElement(elementTagName);
      this.ele.parentNode.insertBefore(ele, this.ele);
      ele.appendChild(this.ele);
      return ry(ele);
    },
    getCssStyle: function(prop) {
      var result = this.ele.style.getPropertyValue(prop);
      if (result) {
        return result;
      }
      var rules = null;
      if (typeof window.getMatchedCSSRules === 'function') {
        rules = window.getMatchedCSSRules(this.ele);
      }
      if (!rules || !isArray(rules)) {
        return null;
      }
      for (var i = rules.length - 1; i >= 0; i--) {
        var r = rules[i];
        result = r.style.getPropertyValue(prop);
        if (result) {
          return result;
        }
      }
    },
    sibling: function(cur, dir) {
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    },
    next: function() {
      return this.sibling(this.ele, 'nextSibling');
    },
    prev: function() {
      return this.sibling(this.ele, 'previousSibling');
    },
    siblings: function() {
      return siblings((this.ele.parentNode || {}).firstChild, this.ele);
    },
    children: function() {
      return siblings(this.ele.firstChild);
    },
    parent: function() {
      var parent = this.ele.parentNode;
      parent = parent && parent.nodeType !== 11 ? parent : null;
      return ry(parent);
    },
    previousElementSibling: function() {
      var el = this.ele;
      if ('previousElementSibling' in document.documentElement) {
        return ry(el.previousElementSibling);
      } else {
        while ((el = el.previousSibling)) {
          if (el.nodeType === 1) {
            return ry(el);
          }
        }
        return ry(null);
      }
    },
    getSameTypeSiblings: function() {
      var element = this.ele;
      var parentNode = element.parentNode;
      var tagName = element.tagName.toLowerCase();
      var arr = [];
      for (var i = 0; i < parentNode.children.length; i++) {
        var child = parentNode.children[i];
        if (child.nodeType === 1 && child.tagName.toLowerCase() === tagName) {
          arr.push(parentNode.children[i]);
        }
      }
      return arr;
    },
    getParents: function() {
      try {
        var element = this.ele;
        if (!isElement(element)) {
          return [];
        }
        var pathArr = [element];
        if (element === null || element.parentElement === null) {
          return [];
        }
        while (element.parentElement !== null) {
          element = element.parentElement;
          pathArr.push(element);
        }
        return pathArr;
      } catch (err) {
        return [];
      }
    }
  };

  function addEvent(target, eventName, eventHandler, useCapture) {
    function fixEvent(event) {
      if (event) {
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
        event._getPath = fixEvent._getPath;
      }
      return event;
    }
    fixEvent._getPath = function() {
      var ev = this;
      return this.path || (this.composedPath && this.composedPath()) || ry(ev.target).getParents();
    };

    fixEvent.preventDefault = function() {
      this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
      this.cancelBubble = true;
    };

    var register_event = function(element, type, handler) {
      if (useCapture === undefined && type === 'click') {
        useCapture = true;
      }
      if (element && element.addEventListener) {
        element.addEventListener(
          type,
          function(e) {
            e._getPath = fixEvent._getPath;
            handler.call(this, e);
          },
          useCapture
        );
      } else {
        var ontype = 'on' + type;
        var old_handler = element[ontype];
        element[ontype] = makeHandler(element, handler, old_handler, type);
      }
    };

    function makeHandler(element, new_handler, old_handlers, type) {
      var handler = function(event) {
        event = event || fixEvent(window.event);
        if (!event) {
          return undefined;
        }
        event.target = event.srcElement;

        var ret = true;
        var old_result, new_result;
        if (typeof old_handlers === 'function') {
          old_result = old_handlers(event);
        }
        new_result = new_handler.call(element, event);
        if (type !== 'beforeunload') {
          if (false === old_result || false === new_result) {
            ret = false;
          }
          return ret;
        }
      };
      return handler;
    }

    register_event.apply(null, arguments);
  }

  function addHashEvent(callback) {
    var hashEvent = 'pushState' in window.history ? 'popstate' : 'hashchange';
    addEvent(window, hashEvent, callback);
  }

  function xhr(cors) {
    if (cors) {
      if (typeof window.XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest()) {
        return new XMLHttpRequest();
      } else if (typeof XDomainRequest !== 'undefined') {
        return new XDomainRequest();
      } else {
        return null;
      }
    } else {
      if (typeof window.XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
      }
      if (window.ActiveXObject) {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (d) {
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (d) {
            logger.log(d);
          }
        }
      }
    }
  }

  var nativeForEach = Array.prototype.forEach;
  var hasOwnProperty$2 = Object.prototype.hasOwnProperty;


  function each(obj, iterator, context) {
    if (obj == null) {
      return false;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        i in obj && iterator.call(context, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty$2.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  function extend(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (hasOwnProperty$1.call(source, prop) && source[prop] !== void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }




  function ajax(para) {
    para.timeout = para.timeout || 20000;

    para.credentials = typeof para.credentials === 'undefined' ? true : para.credentials;

    function getJSON(data) {
      if (!data) {
        return '';
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    }

    var g = xhr(para.cors);

    if (!g) {
      return false;
    }

    if (!para.type) {
      para.type = para.data ? 'POST' : 'GET';
    }
    para = extend({
        success: function() {},
        error: function() {}
      },
      para
    );

    var oldsuccess = para.success;
    var olderror = para.error;
    var errorTimer;

    function abort() {
      try {
        if (g && typeof g === 'object' && g.abort) {
          g.abort();
        }
      } catch (error) {
        logger.log(error);
      }

      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
        para.error && para.error();
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      }
    }

    para.success = function(data) {
      oldsuccess(data);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    para.error = function(err) {
      olderror(err);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    errorTimer = setTimeout(function() {
      abort();
    }, para.timeout);

    if (typeof XDomainRequest !== 'undefined' && g instanceof XDomainRequest) {
      g.onload = function() {
        para.success && para.success(getJSON(g.responseText));
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      };
      g.onerror = function() {
        para.error && para.error(getJSON(g.responseText), g.status);
        g.onreadystatechange = null;
        g.onerror = null;
        g.onload = null;
      };
    }
    g.onreadystatechange = function() {
      try {
        if (g.readyState == 4) {
          if ((g.status >= 200 && g.status < 300) || g.status == 304) {
            para.success(getJSON(g.responseText));
          } else {
            para.error(getJSON(g.responseText), g.status);
          }
          g.onreadystatechange = null;
          g.onload = null;
        }
      } catch (e) {
        g.onreadystatechange = null;
        g.onload = null;
      }
    };

    g.open(para.type, para.url, true);

    try {
      if (para.credentials) {
        g.withCredentials = true;
      }
      if (isObject(para.header)) {
        each(para.header, function(v, i) {
          g.setRequestHeader && g.setRequestHeader(i, v);
        });
      }

      if (para.data) {
        if (!para.cors) {
          g.setRequestHeader && g.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        if (para.contentType === 'application/json') {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        } else {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
      }
    } catch (e) {
      logger.log(e);
    }

    g.send(para.data || null);
  }

  function map(obj, iterator) {
    var results = [];
    if (obj == null) {
      return results;
    }
    if (Array.prototype.map && obj.map === Array.prototype.map) {
      return obj.map(iterator);
    }
    each(obj, function(value, index, list) {
      results.push(iterator(value, index, list));
    });
    return results;
  }

  function base64Decode(str) {
    var arr = [];
    try {
      arr = map(atob(str).split(''), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      });
    } catch (e) {
      arr = [];
    }

    try {
      return decodeURIComponent(arr.join(''));
    } catch (e) {
      return arr.join('');
    }
  }

  function base64Encode(str) {
    var result = '';
    try {
      result = btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode('0x' + p1);
        })
      );
    } catch (e) {
      result = str;
    }
    return result;
  }



  function bindReady(fn, win) {
    win = win || window;
    var done = false,
      top = true,
      doc = win.document,
      root = doc.documentElement,
      modern = doc.addEventListener,
      add = modern ? 'addEventListener' : 'attachEvent',
      rem = modern ? 'removeEventListener' : 'detachEvent',
      pre = modern ? '' : 'on',
      init = function(e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
        (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) fn.call(win, e.type || e);
      },
      poll = function() {
        try {
          root.doScroll('left');
        } catch (e) {
          setTimeout(poll, 50);
          return;
        }
        init('poll');
      };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
      if (!modern && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (e) {
          logger.log(e);
        }
        if (top) poll();
      }
      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      win[add](pre + 'load', init, false);
    }
  }

  var cookie = {
    get: function(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return _decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
    set: function(name, value, days, cross_subdomain, cookie_samesite, is_secure, domain) {
      var cdomain = domain,
        expires = '',
        secure = '',
        samesite = '';
      days = days == null ? 73000 : days;

      if (days !== 0) {
        var date = new Date();
        if (String(days).slice(-1) === 's') {
          date.setTime(date.getTime() + Number(String(days).slice(0, -1)) * 1000);
        } else {
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        }

        expires = '; expires=' + date.toGMTString();
      }
      if (isString(cookie_samesite) && cookie_samesite !== '') {
        samesite = '; SameSite=' + cookie_samesite;
      }
      if (is_secure) {
        secure = '; secure';
      }

      function getValid(data) {
        if (data) {
          return data.replace(/\r\n/g, '');
        } else {
          return false;
        }
      }
      var valid_name = '';
      var valid_value = '';
      var valid_domain = '';
      if (name) {
        valid_name = getValid(name);
      }
      if (value) {
        valid_value = getValid(value);
      }
      if (cdomain) {
        valid_domain = getValid(cdomain);
      }
      if (valid_name && valid_value) {
        document.cookie = valid_name + '=' + encodeURIComponent(valid_value) + expires + '; path=/' + valid_domain + samesite + secure;
      }
    },
    remove: function(name, cross_subdomain) {
      this.set(name, '1', -1, cross_subdomain);
    },
    isSupport: function(testKey, testValue) {
      testKey = testKey || 'cookie_support_test';
      testValue = testValue || '1';
      var self = this;

      function accessNormal() {
        self.set(testKey, testValue);
        var val = self.get(testKey);
        if (val !== testValue) return false;
        self.remove(testKey);
        return true;
      }
      return navigator.cookieEnabled && accessNormal();
    }
  };

  function coverExtend(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0 && obj[prop] === void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  function _decodeURI(uri) {
    var result = uri;
    try {
      result = decodeURI(uri);
    } catch (e) {
      result = uri;
    }
    return result;
  }

  function dfmapping(str) {
    var dfk = 't6KJCZa5pDdQ9khoEM3Tj70fbP2eLSyc4BrsYugARqFIw1mzlGNVXOHiWvxUn8';
    var len = dfk.length - 1;
    var relation = {};
    var i = 0;
    for (i = 0; i < dfk.length; i++) {
      relation[dfk.charAt(i)] = dfk.charAt(len - i);
    }
    var newStr = '';
    for (i = 0; i < str.length; i++) {
      if (str.charAt(i) in relation) {
        newStr += relation[str.charAt(i)];
      } else {
        newStr += str.charAt(i);
      }
    }
    return newStr;
  }

  function isDate(arg) {
    return Object.prototype.toString.call(arg) == '[object Date]';
  }

  function formatDate(date) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + '.' + pad(date.getMilliseconds());
  }

  function encodeDates(obj) {
    each(obj, function(v, k) {
      if (isDate(v)) {
        obj[k] = formatDate(v);
      } else if (isObject(v)) {
        obj[k] = encodeDates(v);
      }
    });
    return obj;
  }


  function extend2Lev(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) {
          if (isObject(source[prop]) && isObject(obj[prop])) {
            extend(obj[prop], source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  }


  function filter(arr, fn, context) {
    var hasOwn = Object.prototype.hasOwnProperty;
    if (arr.filter) {
      return arr.filter(fn);
    }
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      if (!hasOwn.call(arr, i)) {
        continue;
      }
      var val = arr[i];
      if (fn.call(context, val, i, arr)) {
        ret.push(val);
      }
    }
    return ret;
  }

  function formatJsonString(obj) {
    try {
      return JSON.stringify(obj, null, '  ');
    } catch (e) {
      return JSON.stringify(obj);
    }
  }

  function getSafeHostname(hostname) {
    if (typeof hostname === 'string' && hostname.match(/^[a-zA-Z0-9\u4e00-\u9fa5\-\.]+$/)) {
      return hostname;
    } else {
      return '';
    }
  }

  function getCookieTopLevelDomain(hostname, testFlag) {
    hostname = hostname || location.hostname;
    testFlag = testFlag || 'domain_test';

    var new_hostname = getSafeHostname(hostname);

    var splitResult = new_hostname.split('.');
    if (isArray(splitResult) && splitResult.length >= 2 && !/^(\d+\.)+\d+$/.test(new_hostname)) {
      var domainStr = '.' + splitResult.splice(splitResult.length - 1, 1);
      while (splitResult.length > 0) {
        domainStr = '.' + splitResult.splice(splitResult.length - 1, 1) + domainStr;
        document.cookie = testFlag + '=true; path=/; domain=' + domainStr;

        if (document.cookie.indexOf(testFlag + '=true') !== -1) {
          var nowDate = new Date();
          nowDate.setTime(nowDate.getTime() - 1000);

          document.cookie = testFlag + '=true; expires=' + nowDate.toGMTString() + '; path=/; SameSite=Lax; domain=' + domainStr;

          return domainStr;
        }
      }
    }
    return '';
  }

  function getDomBySelector(selector) {
    if (!isString(selector)) {
      return null;
    }
    var arr = selector.split('>');
    var el = null;

    function getDom(selector, parent) {
      selector = trim(selector);
      var node;
      if (selector === 'body') {
        return document.getElementsByTagName('body')[0];
      }
      if (selector.indexOf('#') === 0) {
        selector = selector.slice(1);
        node = document.getElementById(selector);
      } else if (selector.indexOf(':nth-of-type') > -1) {
        var arr = selector.split(':nth-of-type');
        if (!(arr[0] && arr[1])) {
          return null;
        }
        var tagname = arr[0];
        var indexArr = arr[1].match(/\(([0-9]+)\)/);
        if (!(indexArr && indexArr[1])) {
          return null;
        }
        var num = Number(indexArr[1]);
        if (!(isElement(parent) && parent.children && parent.children.length > 0)) {
          return null;
        }
        var child = parent.children;

        for (var i = 0; i < child.length; i++) {
          if (isElement(child[i])) {
            var name = child[i].tagName.toLowerCase();
            if (name === tagname) {
              num--;
              if (num === 0) {
                node = child[i];
                break;
              }
            }
          }
        }
        if (num > 0) {
          return null;
        }
      }
      if (!node) {
        return null;
      }
      return node;
    }

    function get(parent) {
      var tagSelector = arr.shift();
      var element;
      if (!tagSelector) {
        return parent;
      }
      try {
        element = getDom(tagSelector, parent);
      } catch (error) {
        logger.log(error);
      }
      if (!(element && isElement(element))) {
        return null;
      } else {
        return get(element);
      }
    }
    el = get();
    if (!(el && isElement(el))) {
      return null;
    } else {
      return el;
    }
  }

  function getElementContent(element, tagName) {
    var textContent = '';
    var element_content = '';
    if (element.textContent) {
      textContent = trim(element.textContent);
    } else if (element.innerText) {
      textContent = trim(element.innerText);
    }
    if (textContent) {
      textContent = textContent
        .replace(/[\r\n]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .substring(0, 255);
    }
    element_content = textContent || '';

    if (tagName === 'input' || tagName === 'INPUT') {
      element_content = element.value || '';
    }
    return element_content;
  }

  function getHostname(url, defaultValue) {
    if (!defaultValue || typeof defaultValue !== 'string') {
      defaultValue = 'hostname解析异常';
    }
    var hostname = null;
    try {
      hostname = _URL(url).hostname;
    } catch (e) {
      logger.log('getHostname传入的url参数不合法！');
    }
    return hostname || defaultValue;
  }

  function getIOSVersion() {
    try {
      var version = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
      return version && version[1] ? Number.parseInt(version[1], 10) : '';
    } catch (e) {
      return '';
    }
  }

  function getQueryParam(url, key) {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    url = _decodeURIComponent(url);
    var regexS = '[\\?&]' + key + '=([^&#]*)',
      regex = new RegExp(regexS),
      results = regex.exec(url);
    if (results === null || (results && typeof results[1] !== 'string' && results[1].length)) {
      return '';
    } else {
      return _decodeURIComponent(results[1]);
    }
  }


  function getQueryParamsFromUrl(url) {
    var result = {};
    var arr = url.split('?');
    var queryString = arr[1] || '';
    if (queryString) {
      result = getURLSearchParams('?' + queryString);
    }
    return result;
  }

  function mediaQueriesSupported() {
    return typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined';
  }

  function getScreenOrientation() {
    var screenOrientationAPI = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
    var screenOrientation = '未取到值';
    if (screenOrientationAPI) {
      screenOrientation = screenOrientationAPI.indexOf('landscape') > -1 ? 'landscape' : 'portrait';
    } else if (mediaQueriesSupported()) {
      var matchMediaFunc = window.matchMedia || window.msMatchMedia;
      if (matchMediaFunc('(orientation: landscape)').matches) {
        screenOrientation = 'landscape';
      } else if (matchMediaFunc('(orientation: portrait)').matches) {
        screenOrientation = 'portrait';
      }
    }
    return screenOrientation;
  }


  function getUA() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    if ((s = ua.match(/ qq\/([\d.]+)/))) {
      Sys.qqBuildinBrowser = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/mqqbrowser\/([\d.]+)/))) {
      Sys.qqBrowser = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/opera.([\d.]+)/))) {
      Sys.opera = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/msie ([\d.]+)/))) {
      Sys.ie = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/edge.([\d.]+)/))) {
      Sys.edge = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/firefox\/([\d.]+)/))) {
      Sys.firefox = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/chrome\/([\d.]+)/))) {
      Sys.chrome = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/version\/([\d.]+).*safari/))) {
      Sys.safari = Number(s[1].match(/^\d*.\d*/));
    } else if ((s = ua.match(/trident\/([\d.]+)/))) {
      Sys.ie = 11;
    }
    return Sys;
  }

  function getURL(url) {
    if (isString(url)) {
      url = trim(url);
      return _decodeURI(url);
    } else {
      return _decodeURI(location.href);
    }
  }

  function getURLPath(url_path) {
    if (isString(url_path)) {
      url_path = trim(url_path);
      return _decodeURI(url_path);
    } else {
      return _decodeURI(location.pathname);
    }
  }

  function hasAttribute(ele, attrName) {
    if (ele.hasAttribute) {
      return ele.hasAttribute(attrName);
    } else if (ele.attributes) {
      return !!(ele.attributes[attrName] && ele.attributes[attrName].specified);
    }
  }

  function hasAttributes(ele, attrNames) {
    if (typeof attrNames === 'string') {
      return hasAttribute(ele, attrNames);
    } else if (isArray(attrNames)) {
      var result = false;
      for (var i = 0; i < attrNames.length; i++) {
        var testResult = hasAttribute(ele, attrNames[i]);
        if (testResult) {
          result = true;
          break;
        }
      }
      return result;
    }
  }

  function hashCode(str) {
    if (typeof str !== 'string') {
      return 0;
    }
    var hash = 0;
    var char = null;
    if (str.length == 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  function hashCode53(str) {
    var max53 = 9007199254740992;
    var min53 = -9007199254740992;
    var factor = 31;
    var hash = 0;
    if (str.length > 0) {
      var val = str.split('');
      for (var i = 0; i < val.length; i++) {
        var aVal = val[i].charCodeAt();
        var nextHash = factor * hash + aVal;
        if (nextHash > max53) {
          hash = min53 + hash;
          while (((nextHash = factor * hash + aVal), nextHash < min53)) {
            hash = hash / 2 + aVal;
          }
        }
        if (nextHash < min53) {
          hash = max53 + hash;
          while (((nextHash = factor * hash + aVal), nextHash > max53)) {
            hash = hash / 2 + aVal;
          }
        }
        hash = factor * hash + aVal;
      }
    }
    return hash;
  }

  function indexOf(arr, target) {
    var indexof = arr.indexOf;
    if (indexof) {
      return indexof.call(arr, target);
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (target === arr[i]) {
          return i;
        }
      }
      return -1;
    }
  }

  function inherit(subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function isArguments(arg) {
    return !!(arg && hasOwnProperty.call(arg, 'callee'));
  }

  function isBoolean(arg) {
    return Object.prototype.toString.call(arg) == '[object Boolean]';
  }

  function isEmptyObject(arg) {
    if (isObject(arg)) {
      for (var key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  function isHttpUrl(str) {
    if (typeof str !== 'string') return false;
    var _regex = /^https?:\/\/.+/;
    if (_regex.test(str) === false) {
      logger.log('Invalid URL');
      return false;
    }
    return true;
  }

  function isIOS() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }

  function isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function isNumber(arg) {
    return Object.prototype.toString.call(arg) == '[object Number]' && /[\d\.]+/.test(String(arg));
  }

  function isSupportBeaconSend() {
    var supported = false;
    if (typeof navigator !== 'object' || typeof navigator.sendBeacon !== 'function') {
      return supported;
    }

    var Sys = getUA();
    var ua = navigator.userAgent.toLowerCase();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      var reg = /os [\d._]*/gi;
      var verinfo = ua.match(reg);
      var version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
      var ver = version.split('.');
      if (typeof Sys.safari === 'undefined') {
        Sys.safari = ver[0];
      }
      if (ver[0] && (Sys.qqBuildinBrowser || Sys.qqBrowser)) {
        supported = false;
      } else if (ver[0] && ver[0] < 13) {
        if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 12) {
          supported = true;
        }
      } else if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.3) {
        supported = true;
      }
    } else {
      if (Sys.chrome > 38 || Sys.edge > 13 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.0) {
        supported = true;
      }
    }
    return supported;
  }

  function isSupportCors() {
    if (typeof window.XMLHttpRequest === 'undefined') {
      return false;
    }
    if ('withCredentials' in new XMLHttpRequest()) {
      return true;
    } else if (typeof XDomainRequest !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }




  function jsonp(obj) {
    if (!(isObject(obj) && isString(obj.callbackName))) {
      logger.log('JSONP 请求缺少 callbackName');
      return false;
    }
    obj.success = isFunction(obj.success) ? obj.success : function() {};
    obj.error = isFunction(obj.error) ? obj.error : function() {};
    obj.data = obj.data || '';
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var timer = null;
    var isError = false;
    head.appendChild(script);
    if (isNumber(obj.timeout)) {
      timer = setTimeout(function() {
        if (isError) {
          return false;
        }
        obj.error('timeout');
        window[obj.callbackName] = function() {
          logger.log('call jsonp error');
        };
        timer = null;
        head.removeChild(script);
        isError = true;
      }, obj.timeout);
    }
    window[obj.callbackName] = function() {
      clearTimeout(timer);
      timer = null;
      obj.success.apply(null, arguments);
      window[obj.callbackName] = function() {
        logger.log('call jsonp error');
      };
      head.removeChild(script);
    };
    if (obj.url.indexOf('?') > -1) {
      obj.url += '&callbackName=' + obj.callbackName;
    } else {
      obj.url += '?callbackName=' + obj.callbackName;
    }
    if (isObject(obj.data)) {
      var arr = [];
      each(obj.data, function(value, key) {
        arr.push(key + '=' + value);
      });
      obj.data = arr.join('&');
      obj.url += '&' + obj.data;
    }
    script.onerror = function(err) {
      if (isError) {
        return false;
      }
      window[obj.callbackName] = function() {
        logger.log('call jsonp error');
      };
      clearTimeout(timer);
      timer = null;
      head.removeChild(script);
      obj.error(err);
      isError = true;
    };
    script.src = obj.url;
  }


  function listenPageState(obj) {
    var visibilystore = {
      visibleHandler: isFunction(obj.visible) ? obj.visible : function() {},
      hiddenHandler: isFunction(obj.hidden) ? obj.hidden : function() {},
      visibilityChange: null,
      hidden: null,
      isSupport: function() {
        return typeof document[this.hidden] !== 'undefined';
      },
      init: function() {
        if (typeof document.hidden !== 'undefined') {
          this.hidden = 'hidden';
          this.visibilityChange = 'visibilitychange';
        } else if (typeof document.mozHidden !== 'undefined') {
          this.hidden = 'mozHidden';
          this.visibilityChange = 'mozvisibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
          this.hidden = 'msHidden';
          this.visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
          this.hidden = 'webkitHidden';
          this.visibilityChange = 'webkitvisibilitychange';
        }
        this.listen();
      },
      listen: function() {
        if (!this.isSupport()) {
          addEvent(window, 'focus', this.visibleHandler);
          addEvent(window, 'blur', this.hiddenHandler);
        } else {
          var _this = this;
          addEvent(
            document,
            this.visibilityChange,
            function() {
              if (!document[_this.hidden]) {
                _this.visibleHandler();
              } else {
                _this.hiddenHandler();
              }
            },
            1
          );
        }
      }
    };
    visibilystore.init();
  }


  function loadScript(para) {
    para = extend({
        success: function() {},
        error: function() {},
        appendCall: function(g) {
          document.getElementsByTagName('head')[0].appendChild(g);
        }
      },
      para
    );

    var g = null;
    if (para.type === 'css') {
      g = document.createElement('link');
      g.rel = 'stylesheet';
      g.href = para.url;
    }
    if (para.type === 'js') {
      g = document.createElement('script');
      g.async = 'async';
      g.setAttribute('charset', 'UTF-8');
      g.src = para.url;
      g.type = 'text/javascript';
    }
    g.onload = g.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        para.success();
        g.onload = g.onreadystatechange = null;
      }
    };
    g.onerror = function() {
      para.error();
      g.onerror = null;
    };
    para.appendCall(g);
  }

  function removeScriptProtocol(str) {
    if (typeof str !== 'string') return '';
    var _regex = /^\s*javascript/i;
    while (_regex.test(str)) {
      str = str.replace(_regex, '');
    }
    return str;
  }

  function rot13obfs(str, key) {
    str = String(str);
    key = typeof key === 'number' ? key : 13;
    var n = 126;

    var chars = str.split('');

    for (var i = 0, len = chars.length; i < len; i++) {
      var c = chars[i].charCodeAt(0);

      if (c < n) {
        chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
      }
    }

    return chars.join('');
  }

  function rot13defs(str) {
    var key = 13,
      n = 126;
    str = String(str);

    return rot13obfs(str, n - key);
  }

  function searchObjDate(o) {
    if (isObject(o)) {
      each(o, function(a, b) {
        if (isObject(a)) {
          searchObjDate(o[b]);
        } else {
          if (isDate(a)) {
            o[b] = formatDate(a);
          }
        }
      });
    }
  }

  var _sessionStorage = {
    isSupport: function() {
      var supported = true;
      var supportName = '__session_storage_support__';
      var val = 'testIsSupportStorage';
      try {
        if (sessionStorage && sessionStorage.setItem) {
          sessionStorage.setItem(supportName, val);
          sessionStorage.removeItem(supportName, val);
          supported = true;
        } else {
          supported = false;
        }
      } catch (e) {
        supported = false;
      }
      return supported;
    }
  };

  function setCssStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(css));
    } catch (e) {
      style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName('head')[0];
    var firstScript = document.getElementsByTagName('script')[0];
    if (head) {
      if (head.children.length) {
        head.insertBefore(style, head.children[0]);
      } else {
        head.appendChild(style);
      }
    } else {
      firstScript.parentNode.insertBefore(style, firstScript);
    }
  }

  function strToUnicode(str) {
    if (typeof str !== 'string') {
      logger.log('转换unicode错误', str);
      return str;
    }
    var nstr = '';
    for (var i = 0; i < str.length; i++) {
      nstr += '\\' + str.charCodeAt(i).toString(16);
    }
    return nstr;
  }

  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var nowtime = now();
      if (!previous && options.leading === false) previous = nowtime;
      var remaining = wait - (nowtime - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = nowtime;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  function values(obj) {
    var results = [];
    if (obj == null) {
      return results;
    }
    each(obj, function(value) {
      results[results.length] = value;
    });
    return results;
  }

  function toArray(iterable) {
    if (!iterable) {
      return [];
    }
    if (iterable.toArray) {
      return iterable.toArray();
    }
    if (isArray(iterable) || isArguments(iterable)) {
      return Array.prototype.slice.call(iterable);
    }
    return values(iterable);
  }

  function unique(arr) {
    var temp,
      n = [],
      o = {};
    for (var i = 0; i < arr.length; i++) {
      temp = arr[i];
      if (!(temp in o)) {
        o[temp] = true;
        n.push(temp);
      }
    }
    return n;
  }

  var ENC = {
    '+': '-',
    '/': '_',
    '=': '.'
  };
  var DEC = {
    '-': '+',
    _: '/',
    '.': '='
  };

  var urlSafeBase64 = {
    encode: function(base64) {
      return base64.replace(/[+/=]/g, function(m) {
        return ENC[m];
      });
    },

    decode: function(safe) {
      return safe.replace(/[-_.]/g, function(m) {
        return DEC[m];
      });
    },

    trim: function(string) {
      return string.replace(/[.=]{1,2}$/, '');
    },

    isBase64: function(string) {
      return /^[A-Za-z0-9+/]*[=]{0,2}$/.test(string);
    },

    isUrlSafeBase64: function(string) {
      return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(string);
    }
  };

  var W = {
    __proto__: null,
    ConcurrentStorage: ConcurrentStorage,
    EventEmitter: EventEmitter,
    URL: _URL,
    UUID: UUID,
    addEvent: addEvent,
    addHashEvent: addHashEvent,
    ajax: ajax,
    base64Decode: base64Decode,
    base64Encode: base64Encode,
    bindReady: bindReady,
    cookie: cookie,
    coverExtend: coverExtend,
    decodeURI: _decodeURI,
    decodeURIComponent: _decodeURIComponent,
    dfmapping: dfmapping,
    each: each,
    encodeDates: encodeDates,
    extend: extend,
    extend2Lev: extend2Lev,
    filter: filter,
    formatDate: formatDate,
    formatJsonString: formatJsonString,
    getCookieTopLevelDomain: getCookieTopLevelDomain,
    getDomBySelector: getDomBySelector,
    getElementContent: getElementContent,
    getHostname: getHostname,
    getIOSVersion: getIOSVersion,
    getQueryParam: getQueryParam,
    getQueryParamsFromUrl: getQueryParamsFromUrl,
    getRandom: getRandom,
    getRandomBasic: getRandomBasic,
    getScreenOrientation: getScreenOrientation,
    getUA: getUA,
    getURL: getURL,
    getURLPath: getURLPath,
    getURLSearchParams: getURLSearchParams,
    hasAttribute: hasAttribute,
    hasAttributes: hasAttributes,
    hashCode: hashCode,
    hashCode53: hashCode53,
    indexOf: indexOf,
    inherit: inherit,
    isArguments: isArguments,
    isArray: isArray,
    isBoolean: isBoolean,
    isDate: isDate,
    isElement: isElement,
    isEmptyObject: isEmptyObject,
    isFunction: isFunction,
    isHttpUrl: isHttpUrl,
    isIOS: isIOS,
    isJSONString: isJSONString,
    isNumber: isNumber,
    isObject: isObject,
    isString: isString,
    isSupportBeaconSend: isSupportBeaconSend,
    isSupportCors: isSupportCors,
    isUndefined: isUndefined,
    jsonp: jsonp,
    listenPageState: listenPageState,
    loadScript: loadScript,
    localStorage: _localStorage,
    logger: logger,
    map: map,
    mediaQueriesSupported: mediaQueriesSupported,
    now: now,
    removeScriptProtocol: removeScriptProtocol,
    rot13defs: rot13defs,
    rot13obfs: rot13obfs,
    ry: ry,
    safeJSONParse: safeJSONParse,
    searchObjDate: searchObjDate,
    sessionStorage: _sessionStorage,
    setCssStyle: setCssStyle,
    strToUnicode: strToUnicode,
    throttle: throttle,
    toArray: toArray,
    trim: trim,
    unique: unique,
    urlParse: urlParse,
    urlSafeBase64: urlSafeBase64,
    values: values,
    xhr: xhr
  };

  var sdPara = {};

  var defaultPara = {
    preset_properties: {
      search_keyword_baidu: false,
      latest_utm: true,
      latest_traffic_source_type: true,
      latest_search_keyword: true,
      latest_referrer: true,
      latest_referrer_host: false,
      latest_landing_page: false,
      latest_wx_ad_click_id: undefined,
      url: true,
      title: true
    },
    encrypt_cookie: false,
    enc_cookie: false,
    img_use_crossorigin: false,

    name: 'sa',
    max_referrer_string_length: 200,
    max_string_length: 500,
    max_id_length: 255,
    max_key_length: 100,
    cross_subdomain: true,
    show_log: false,
    is_debug: false,
    debug_mode: false,
    debug_mode_upload: false,

    source_channel: [],
    sdk_id: '',

    send_type: 'image',

    vtrack_ignore: {},

    auto_init: true,

    is_track_single_page: false,

    is_single_page: false,

    batch_send: false,

    source_type: {},
    callback_timeout: 200,
    datasend_timeout: 8000,
    is_track_device_id: false,
    ignore_oom: true,
    app_js_bridge: false
  };

  function sdLog() {
    if ((_sessionStorage.isSupport() && sessionStorage.getItem('sensorsdata_jssdk_debug') === 'true') || sdPara.show_log) {
      if (isObject(arguments[0]) && (sdPara.show_log === true || sdPara.show_log === 'string' || sdPara.show_log === false)) {
        arguments[0] = formatJsonString(arguments[0]);
      }

      if (typeof console === 'object' && console.log) {
        try {
          return console.log.apply(console, arguments);
        } catch (e) {
          console.log(arguments[0]);
        }
      }
    }
  }

  var flag = 'data:enc;';
  var flag_dfm = 'dfm-enc-';

  function decrypt(v) {
    if (v.indexOf(flag) === 0) {
      v = v.substring(flag.length);
      v = rot13defs(v);
    } else if (v.indexOf(flag_dfm) === 0) {
      v = v.substring(flag_dfm.length);
      v = dfmapping(v);
    }
    return v;
  }

  function decryptIfNeeded(cross) {
    if (isString(cross) && (cross.indexOf(flag) === 0 || cross.indexOf(flag_dfm) === 0)) {
      cross = decrypt(cross);
    }
    return cross;
  }

  function encrypt(v) {
    return flag_dfm + dfmapping(v);
  }

  var debug = {
    distinct_id: function() {},
    jssdkDebug: function() {},
    _sendDebug: function(debugString) {},
    apph5: function(obj) {
      var name = 'app_h5打通失败-';
      var relation = {
        1: name + 'use_app_track为false',
        2: name + 'Android或者iOS，没有暴露相应方法',
        3.1: name + 'Android校验server_url失败',
        3.2: name + 'iOS校验server_url失败',
        4.1: name + 'H5 校验 iOS server_url 失败',
        4.2: name + 'H5 校验 Android server_url 失败'
      };
      var output = obj.output;
      var step = obj.step;
      var data = obj.data || '';
      if (output === 'all' || output === 'console') {
        sdLog(relation[step]);
      }
      if ((output === 'all' || output === 'code') && isObject(sdPara.is_debug) && sdPara.is_debug.apph5) {
        if (!data.type || data.type.slice(0, 7) !== 'profile') {
          data.properties._jssdk_debug_info = 'apph5-' + String(step);
        }
      }
    },
    defineMode: function(type) {
      var debugList = {
        1: {
          title: '当前页面无法进行可视化全埋点',
          message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 App SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        },
        2: {
          title: '当前页面无法进行可视化全埋点',
          message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 Web JS SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        },
        3: {
          title: '当前页面无法进行可视化全埋点',
          message: 'Web JS SDK 没有开启全埋点配置，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html'
        },
        4: {
          title: '当前页面无法进行可视化全埋点',
          message: 'Web JS SDK 配置的数据校验地址与 App SDK 配置的数据校验地址不一致，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        }
      };
      if (type && debugList[type]) {
        return debugList[type];
      } else {
        return false;
      }
    },
    protocol: {
      protocolIsSame: function(url1, url2) {
        try {
          if (_URL(url1).protocol !== _URL(url2).protocol) {
            return false;
          }
        } catch (error) {
          sdLog('不支持 _.URL 方法');
          return false;
        }
        return true;
      },
      serverUrl: function() {
        if (isString(sdPara.server_url) && sdPara.server_url !== '' && !this.protocolIsSame(sdPara.server_url, location.href)) {
          sdLog('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。\n因为：1、https 下面发送 http 的图片请求会失败。2、http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
        }
      },
      ajax: function(url) {
        if (url === sdPara.server_url) {
          return false;
        }
        if (isString(url) && url !== '' && !this.protocolIsSame(url, location.href)) {
          sdLog('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。因为 http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
        }
      }
    }
  };

  var source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';
  var sdkversion_placeholder = '1.23.5';
  var domain_test_key = 'sensorsdata_domain_test';

  var IDENTITY_KEY = {
    EMAIL: '$identity_email',
    MOBILE: '$identity_mobile',
    LOGIN: '$identity_login_id'
  };

  function parseSuperProperties(data) {
    var obj = data.properties;
    var copyData = JSON.parse(JSON.stringify(data));
    if (isObject(obj)) {
      each(obj, function(objVal, key) {
        if (isFunction(objVal)) {
          try {
            obj[key] = objVal(copyData);
            if (isFunction(obj[key])) {
              sdLog('您的属性- ' + key + ' 格式不满足要求，我们已经将其删除');
              delete obj[key];
            }
          } catch (e) {
            delete obj[key];
            sdLog('您的属性- ' + key + ' 抛出了异常，我们已经将其删除');
          }
        }
      });
    }
  }

  function searchConfigData(data) {
    if (typeof data === 'object' && data.$option) {
      var data_config = data.$option;
      delete data.$option;
      return data_config;
    } else {
      return {};
    }
  }

  function strip_empty_properties(p) {
    var ret = {};
    each(p, function(v, k) {
      if (v != null) {
        ret[k] = v;
      }
    });
    return ret;
  }

  function getCurrentDomain(url) {
    var sdDomain = sdPara.current_domain;
    switch (typeof sdDomain) {
      case 'function':
        var resultDomain = sdDomain();
        if (resultDomain === '' || trim(resultDomain) === '') {
          return 'url解析失败';
        } else if (resultDomain.indexOf('.') !== -1) {
          return resultDomain;
        } else {
          return 'url解析失败';
        }
        case 'string':
          if (sdDomain === '' || trim(sdDomain) === '') {
            return 'url解析失败';
          } else if (sdDomain.indexOf('.') !== -1) {
            return sdDomain;
          } else {
            return 'url解析失败';
          }
          default:
            var cookieTopLevelDomain = getCookieTopLevelDomain(null, domain_test_key);
            if (url === '') {
              return 'url解析失败';
            } else if (cookieTopLevelDomain === '') {
              return 'url解析失败';
            } else {
              return cookieTopLevelDomain;
            }
    }
  }

  function getEleInfo(obj) {
    if (!obj.target) {
      return false;
    }

    var target = obj.target;
    var tagName = target.tagName.toLowerCase();

    var props = {};

    props.$element_type = tagName;
    props.$element_name = target.getAttribute('name');
    props.$element_id = target.getAttribute('id');
    props.$element_class_name = typeof target.className === 'string' ? target.className : null;
    props.$element_target_url = target.getAttribute('href');
    props.$element_content = getElementContent$1(target, tagName);
    props = strip_empty_properties(props);
    props.$url = getURL();
    props.$url_path = getURLPath();
    props.$title = document.title;

    return props;
  }

  function isBaiduTraffic() {
    var referer = document.referrer;
    var endsWith = 'baidu.com';
    if (!referer) {
      return false;
    }

    try {
      var hostname = _URL(referer).hostname;
      return hostname && hostname.substring(hostname.length - endsWith.length) === endsWith;
    } catch (e) {
      return false;
    }
  }

  function getReferrerEqid() {
    var query = getQueryParamsFromUrl(document.referrer);
    if (isEmptyObject(query) || !query.eqid) {
      return UUID().replace(/-/g, '');
    }
    return query.eqid;
  }

  function getReferrerEqidType() {
    var query = getQueryParamsFromUrl(document.referrer);
    if (isEmptyObject(query) || !query.eqid) {
      var url = getQueryParamsFromUrl(location.href);
      if (query.ck || url.utm_source) {
        return 'baidu_sem_keyword_id';
      }
      return 'baidu_other_keyword_id';
    }
    return 'baidu_seo_keyword_id';
  }

  var getBaiduKeyword = {
    data: {},
    id: function() {
      if (this.data.id) {
        return this.data.id;
      } else {
        this.data.id = getReferrerEqid();
        return this.data.id;
      }
    },
    type: function() {
      if (this.data.type) {
        return this.data.type;
      } else {
        this.data.type = getReferrerEqidType();
        return this.data.type;
      }
    }
  };

  function isReferralTraffic(refererstring) {
    refererstring = refererstring || document.referrer;
    if (refererstring === '') {
      return true;
    }

    return getCookieTopLevelDomain(getHostname(refererstring), domain_test_key) !== getCookieTopLevelDomain(null, domain_test_key);
  }

  function getReferrer(referrer, full) {
    referrer = referrer || document.referrer;
    if (typeof referrer !== 'string') {
      return '取值异常_referrer异常_' + String(referrer);
    }
    referrer = trim(referrer);
    referrer = _decodeURI(referrer);
    if (referrer.indexOf('https://www.baidu.com/') === 0 && !full) {
      referrer = referrer.split('?')[0];
    }
    referrer = referrer.slice(0, sdPara.max_referrer_string_length);
    return typeof referrer === 'string' ? referrer : '';
  }

  function getReferSearchEngine(referrerUrl) {
    var hostname = getHostname(referrerUrl);
    if (!hostname || hostname === 'hostname解析异常') {
      return '';
    }
    var searchEngineUrls = {
      baidu: [/^.*\.baidu\.com$/],
      bing: [/^.*\.bing\.com$/],
      google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
      sm: [/^m\.sm\.cn$/],
      so: [/^.+\.so\.com$/],
      sogou: [/^.*\.sogou\.com$/],
      yahoo: [/^.*\.yahoo\.com$/]
    };
    for (var prop in searchEngineUrls) {
      var urls = searchEngineUrls[prop];
      for (var i = 0, len = urls.length; i < len; i++) {
        if (urls[i].test(hostname)) {
          return prop;
        }
      }
    }
    return '未知搜索引擎';
  }

  function getKeywordFromReferrer(referrerUrl, activeValue) {
    referrerUrl = referrerUrl || document.referrer;
    var search_keyword = sdPara.source_type.keyword;
    if (document && typeof referrerUrl === 'string') {
      if (referrerUrl.indexOf('http') === 0) {
        var searchEngine = getReferSearchEngine(referrerUrl);
        var query = getQueryParamsFromUrl(referrerUrl);
        if (isEmptyObject(query)) {
          if (sdPara.preset_properties.search_keyword_baidu && isBaiduTraffic()) {
            return;
          } else {
            return '未取到值';
          }
        }
        var temp = null;
        for (var i in search_keyword) {
          if (searchEngine === i) {
            if (typeof query === 'object') {
              temp = search_keyword[i];
              if (isArray(temp)) {
                for (i = 0; i < temp.length; i++) {
                  var _value = query[temp[i]];
                  if (_value) {
                    if (activeValue) {
                      return {
                        active: _value
                      };
                    } else {
                      return _value;
                    }
                  }
                }
              } else if (query[temp]) {
                if (activeValue) {
                  return {
                    active: query[temp]
                  };
                } else {
                  return query[temp];
                }
              }
            }
          }
        }
        if (sdPara.preset_properties.search_keyword_baidu && isBaiduTraffic()) {
          return;
        } else {
          return '未取到值';
        }
      } else {
        if (referrerUrl === '') {
          return '未取到值_直接打开';
        } else {
          return '未取到值_非http的url';
        }
      }
    } else {
      return '取值异常_referrer异常_' + String(referrerUrl);
    }
  }

  function getWxAdIdFromUrl(url) {
    var click_id = getQueryParam(url, 'gdt_vid');
    var hash_key = getQueryParam(url, 'hash_key');
    var callbacks = getQueryParam(url, 'callbacks');
    var obj = {
      click_id: '',
      hash_key: '',
      callbacks: ''
    };
    if (isString(click_id) && click_id.length) {
      obj.click_id = click_id.length == 16 || click_id.length == 18 ? click_id : '参数解析不合法';

      if (isString(hash_key) && hash_key.length) {
        obj.hash_key = hash_key;
      }
      if (isString(callbacks) && callbacks.length) {
        obj.callbacks = callbacks;
      }
    }

    return obj;
  }




  var pageInfo = {
    initPage: function() {
      var referrer = getReferrer();
      var url = getURL();
      var url_domain = getCurrentDomain(url);
      if (!url_domain) {
        debug.jssdkDebug('url_domain异常_' + url + '_' + url_domain);
      }

      this.pageProp = {
        referrer: referrer,
        referrer_host: referrer ? getHostname(referrer) : '',
        url: url,
        url_host: getHostname(url, 'url_host取值异常'),
        url_domain: url_domain
      };
    },
    pageProp: {},

    campaignParams: function() {
      return sd.kit.getUtmData();
    },
    campaignParamsStandard: function(prefix, prefix_add) {
      prefix = prefix || '';
      prefix_add = prefix_add || '';
      var utms = pageInfo.campaignParams();
      var $utms = {},
        otherUtms = {};
      each(utms, function(v, i, utms) {
        if ((' ' + source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms[prefix + i] = utms[i];
        } else {
          otherUtms[prefix_add + i] = utms[i];
        }
      });
      return {
        $utms: $utms,
        otherUtms: otherUtms
      };
    },
    properties: function() {
      var viewportHeightValue = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      var viewportWidthValue = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
      var propertiesObj = {
        $timezone_offset: new Date().getTimezoneOffset(),
        $screen_height: Number(screen.height) || 0,
        $screen_width: Number(screen.width) || 0,
        $viewport_height: viewportHeightValue,
        $viewport_width: viewportWidthValue,
        $lib: 'js',
        $lib_version: sdkversion_placeholder
      };
      return propertiesObj;
    },
    currentProps: {},
    register: function(obj) {
      extend(pageInfo.currentProps, obj);
    }
  };

  function getSourceFromReferrer() {
    function getMatchStrFromArr(arr, str) {
      for (var i = 0; i < arr.length; i++) {
        if (str.split('?')[0].indexOf(arr[i]) !== -1) {
          return true;
        }
      }
    }

    var utm_reg = '(' + sdPara.source_type.utm.join('|') + ')\\=[^&]+';
    var search_engine = sdPara.source_type.search;
    var social_engine = sdPara.source_type.social;

    var referrer = document.referrer || '';
    var url = pageInfo.pageProp.url;
    if (url) {
      var utm_match = url.match(new RegExp(utm_reg));
      if (utm_match && utm_match[0]) {
        return '付费广告流量';
      } else if (getMatchStrFromArr(search_engine, referrer)) {
        return '自然搜索流量';
      } else if (getMatchStrFromArr(social_engine, referrer)) {
        return '社交网站流量';
      } else if (referrer === '') {
        return '直接流量';
      } else {
        return '引荐流量';
      }
    } else {
      return '获取url异常';
    }
  }

  function getInputElementValue(inputEle) {
    var allowCollectInputVal = sdPara.heatmap && typeof sdPara.heatmap.collect_input === 'function' && sdPara.heatmap.collect_input(inputEle);
    if (inputEle.type === 'button' || inputEle.type === 'submit' || allowCollectInputVal) {
      return inputEle.value || '';
    }
    return '';
  }

  function getElementContent$1(element, tagName) {
    if (isString(tagName) && tagName.toLowerCase() === 'input') {
      return getInputElementValue(element);
    }
    return getElementContent(element, tagName);
  }

  function ajax$1(para) {
    debug.protocol.ajax(para.url);
    return ajax(para);
  }

  function addEvent$1(target, eventName, evenHandler) {
    var useCapture = isObject(sdPara.heatmap) && sdPara.heatmap.useCapture ? true : false;
    if (isObject(sdPara.heatmap) && typeof sdPara.heatmap.useCapture === 'undefined' && eventName === 'click') {
      useCapture = true;
    }
    return addEvent(target, eventName, evenHandler, useCapture);
  }

  var cookie$1 = {
    get: function(name) {
      return cookie.get(name);
    },
    set: function(name, value, days, cross_subdomain) {
      var cdomain = '';
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sdPara.cross_subdomain : cross_subdomain;

      if (cross_subdomain) {
        var domain = getCurrentDomain(location.href);
        if (domain === 'url解析失败') {
          domain = '';
        }
        cdomain = domain ? '; domain=' + domain : '';
      }

      return cookie.set(name, value, days, cross_subdomain, sdPara.set_cookie_samesite, sdPara.is_secure_cookie, cdomain);
    },
    remove: function(name, cross_subdomain) {
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sdPara.cross_subdomain : cross_subdomain;
      return cookie.remove(name, cross_subdomain);
    },
    isSupport: function(testKey, testValue) {
      testKey = testKey || 'sajssdk_2015_cookie_access_test';
      testValue = testValue || '1';
      return cookie.isSupport(testKey, testValue);
    }
  };

  function getSafeHttpProtocol() {
    var protocol = location.protocol;
    if (protocol === 'http:' || protocol === 'https:') {
      return protocol;
    } else {
      return 'http:';
    }
  }

  function getNewUserFlagKey(name_prefix, url) {
    var sub = '';
    url = url || location.href;
    if (sdPara.cross_subdomain === false) {
      try {
        sub = _URL(url).hostname;
      } catch (e) {
        sdLog(e);
      }
      if (typeof sub === 'string' && sub !== '') {
        sub = 'sajssdk_2015_' + sdPara.sdk_id + name_prefix + '_' + sub.replace(/\./g, '_');
      } else {
        sub = 'sajssdk_2015_root_' + sdPara.sdk_id + name_prefix;
      }
    } else {
      sub = 'sajssdk_2015_cross_' + sdPara.sdk_id + name_prefix;
    }
    return sub;
  }

  cookie$1.getNewUser = isNewUser;

  function isNewUser() {
    var prefix = 'new_user';
    if (cookie$1.isSupport()) {
      if (cookie$1.get('sensorsdata_is_new_user') !== null || cookie$1.get(getNewUserFlagKey(prefix)) !== null) {
        return true;
      }
      return false;
    } else {
      if (memory.get(memory.getNewUserFlagMemoryKey(prefix)) !== null) return true;
      return false;
    }
  }

  var memory = {
    data: {},

    get: function(name) {
      var value = this.data[name];
      if (value === undefined) return null;
      if (value._expirationTimestamp_ !== undefined) {
        if (new Date().getTime() > value._expirationTimestamp_) {
          return null;
        }
        return value.value;
      }
      return value;
    },

    set: function(name, value, days) {
      if (days) {
        var date = new Date();
        var expirationTimestamp;
        if (String(days).slice(-1) === 's') {
          expirationTimestamp = date.getTime() + Number(String(days).slice(0, -1)) * 1000;
        } else {
          expirationTimestamp = date.getTime() + days * 24 * 60 * 60 * 1000;
        }
        value = {
          value: value,
          _expirationTimestamp_: expirationTimestamp
        };
      }
      this.data[name] = value;
    },

    getNewUserFlagMemoryKey: function(name_prefix) {
      return 'sajssdk_2015_' + sdPara.sdk_id + name_prefix;
    }
  };

  var saNewUser = {
    checkIsAddSign: function(data) {
      if (data.type === 'track') {
        if (isNewUser()) {
          data.properties.$is_first_day = true;
        } else {
          data.properties.$is_first_day = false;
        }
      }
    },
    is_first_visit_time: false,
    is_page_first_visited: false,
    checkIsFirstTime: function(data) {
      if (data.type === 'track' && data.event === '$pageview') {
        if (this.is_first_visit_time) {
          data.properties.$is_first_time = true;
          this.is_first_visit_time = false;
        } else {
          data.properties.$is_first_time = false;
        }
      }
    },
    setDeviceId: function(uuid) {
      var device_id = null;
      var ds = cookie$1.get('sensorsdata2015jssdkcross' + sd.para.sdk_id);
      ds = decryptIfNeeded(ds);
      var state = {};
      if (ds != null && isJSONString(ds)) {
        state = JSON.parse(ds);
        if (state.$device_id) {
          device_id = state.$device_id;
        }
      }

      device_id = device_id || uuid;

      if (sd.para.cross_subdomain === true) {
        sd.store.set('$device_id', device_id);
      } else {
        state.$device_id = device_id;
        state = JSON.stringify(state);
        if (sd.para.encrypt_cookie) {
          state = encrypt(state);
        }
        cookie$1.set('sensorsdata2015jssdkcross' + sd.para.sdk_id, state, null, true);
      }

      if (sd.para.is_track_device_id) {
        pageInfo.currentProps.$device_id = device_id;
      }
    },
    storeInitCheck: function() {
      if (sd.is_first_visitor) {
        var date = new Date();
        var obj = {
          h: 23 - date.getHours(),
          m: 59 - date.getMinutes(),
          s: 59 - date.getSeconds()
        };
        if (cookie$1.isSupport()) {
          cookie$1.set(getNewUserFlagKey('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
        } else {
          memory.set(memory.getNewUserFlagMemoryKey('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
        }
        this.is_first_visit_time = true;
        this.is_page_first_visited = true;
      } else {
        if (!isNewUser()) {
          this.checkIsAddSign = function(data) {
            if (data.type === 'track') {
              data.properties.$is_first_day = false;
            }
          };
        }
        this.checkIsFirstTime = function(data) {
          if (data.type === 'track' && data.event === '$pageview') {
            data.properties.$is_first_time = false;
          }
        };
      }
    },
    checkIsFirstLatest: function() {
      var url_domain = pageInfo.pageProp.url_domain;


      var latestObj = {};

      if (url_domain === '') {
        url_domain = 'url解析失败';
      }

      var baiduKey = getKeywordFromReferrer(document.referrer, true);
      if (sd.para.preset_properties.search_keyword_baidu) {
        if (isReferralTraffic(document.referrer)) {
          if (isBaiduTraffic() && !(isObject(baiduKey) && baiduKey.active)) {
            latestObj['$search_keyword_id'] = getBaiduKeyword.id();
            latestObj['$search_keyword_id_type'] = getBaiduKeyword.type();
            latestObj['$search_keyword_id_hash'] = hashCode53(latestObj['$search_keyword_id']);
          } else {
            if (sd.store._state && sd.store._state.props) {
              sd.store._state.props.$search_keyword_id && delete sd.store._state.props.$search_keyword_id;
              sd.store._state.props.$search_keyword_id_type && delete sd.store._state.props.$search_keyword_id_type;
              sd.store._state.props.$search_keyword_id_hash && delete sd.store._state.props.$search_keyword_id_hash;
            }
          }
        }
      } else {
        if (sd.store._state && sd.store._state.props) {
          sd.store._state.props.$search_keyword_id && delete sd.store._state.props.$search_keyword_id;
          sd.store._state.props.$search_keyword_id_type && delete sd.store._state.props.$search_keyword_id_type;
          sd.store._state.props.$search_keyword_id_hash && delete sd.store._state.props.$search_keyword_id_hash;
        }
      }

      sd.store.save();

      each(sd.para.preset_properties, function(value, key) {
        if (key.indexOf('latest_') === -1) {
          return false;
        }
        key = key.slice(7);
        if (value) {
          if (key === 'wx_ad_click_id' && value === 'not_collect') {
            return false;
          }
          if (key !== 'utm' && url_domain === 'url解析失败') {
            if (key === 'wx_ad_click_id') {
              latestObj['_latest_wx_ad_click_id'] = 'url的domain解析失败';
              latestObj['_latest_wx_ad_hash_key'] = 'url的domain解析失败';
              latestObj['_latest_wx_ad_callbacks'] = 'url的domain解析失败';
            } else {
              latestObj['$latest_' + key] = 'url的domain解析失败';
            }
          } else if (isReferralTraffic(document.referrer)) {
            switch (key) {
              case 'traffic_source_type':
                latestObj['$latest_traffic_source_type'] = getSourceFromReferrer();
                break;
              case 'referrer':
                latestObj['$latest_referrer'] = pageInfo.pageProp.referrer;
                break;
              case 'search_keyword':
                if (getKeywordFromReferrer()) {
                  latestObj['$latest_search_keyword'] = getKeywordFromReferrer();
                } else if (isObject(sd.store._state) && isObject(sd.store._state.props) && sd.store._state.props.$latest_search_keyword) {
                  delete sd.store._state.props.$latest_search_keyword;
                }
                break;
              case 'landing_page':
                latestObj['$latest_landing_page'] = getURL();
                break;
              case 'wx_ad_click_id':
                var adObj = getWxAdIdFromUrl(location.href);
                latestObj['_latest_wx_ad_click_id'] = adObj.click_id;
                latestObj['_latest_wx_ad_hash_key'] = adObj.hash_key;
                latestObj['_latest_wx_ad_callbacks'] = adObj.callbacks;
                break;
            }
          }
        } else {
          if (key === 'utm' && sd.store._state && sd.store._state.props) {
            for (var key1 in sd.store._state.props) {
              if (key1.indexOf('$latest_utm') === 0 || (key1.indexOf('_latest_') === 0 && key1.indexOf('_latest_wx_ad_') < 0)) {
                delete sd.store._state.props[key1];
              }
            }
          } else if (sd.store._state && sd.store._state.props && '$latest_' + key in sd.store._state.props) {
            delete sd.store._state.props['$latest_' + key];
          } else if (key == 'wx_ad_click_id' && sd.store._state && sd.store._state.props && value === false) {
            var wxPro = ['_latest_wx_ad_click_id', '_latest_wx_ad_hash_key', '_latest_wx_ad_callbacks'];
            each(wxPro, function(value) {
              if (value in sd.store._state.props) {
                delete sd.store._state.props[value];
              }
            });
          }
        }
      });

      sd.register(latestObj);

      if (sd.para.preset_properties.latest_utm) {
        var allUtms = pageInfo.campaignParamsStandard('$latest_', '_latest_');
        var $utms = allUtms.$utms;
        var otherUtms = allUtms.otherUtms;
        if (!isEmptyObject($utms)) {
          sd.register($utms);
        }
        if (!isEmptyObject(otherUtms)) {
          sd.register(otherUtms);
        }
      }
    }
  };


  var store = {
    requests: [],
    _sessionState: {},
    _state: {
      distinct_id: '',
      first_id: '',
      props: {},
      identities: {}
    },
    getProps: function() {
      return this._state.props || {};
    },
    getSessionProps: function() {
      return this._sessionState;
    },
    getOriginDistinctId: function() {
      return this._state._distinct_id || this._state.distinct_id;
    },
    getOriginUnionId: function(state) {
      var obj = {};
      state = state || this._state;
      var firstId = state._first_id || state.first_id,
        distinct_id = state._distinct_id || state.distinct_id;
      if (firstId && distinct_id) {
        obj.login_id = distinct_id;
        obj.anonymous_id = firstId;
      } else {
        obj.anonymous_id = distinct_id;
      }
      return obj;
    },
    getDistinctId: function() {
      var unionId = this.getUnionId();
      return unionId.login_id || unionId.anonymous_id;
    },
    getUnionId: function(state) {
      var obj = this.getOriginUnionId(state);
      if (obj.login_id && this._state.history_login_id && this._state.history_login_id.name && this._state.history_login_id.name !== sd.IDENTITY_KEY.LOGIN) {
        obj.login_id = this._state.history_login_id.name + '+' + obj.login_id;
      }
      return obj;
    },
    getFirstId: function() {
      return this._state._first_id || this._state.first_id;
    },
    initSessionState: function() {
      var ds = cookie$1.get('sensorsdata2015session');
      ds = decryptIfNeeded(ds);
      var state = null;
      if (ds !== null && typeof(state = safeJSONParse(ds)) === 'object') {
        this._sessionState = state || {};
      }
    },

    setOnce: function(a, b) {
      if (!(a in this._state)) {
        this.set(a, b);
      }
    },
    set: function(name, value) {
      this._state = this._state || {};
      var pre_id = this._state.distinct_id;
      this._state[name] = value;
      if (name === 'first_id') {
        delete this._state._first_id;
      } else if (name === 'distinct_id') {
        delete this._state._distinct_id;
      }
      this.save();
      if (name === 'distinct_id' && pre_id) {
        sd.events.tempAdd('changeDistinctId', value);
      }
    },
    change: function(name, value) {
      this._state['_' + name] = value;
    },
    setSessionProps: function(newp) {
      var props = this._sessionState;
      extend(props, newp);
      this.sessionSave(props);
    },
    setSessionPropsOnce: function(newp) {
      var props = this._sessionState;
      coverExtend(props, newp);
      this.sessionSave(props);
    },
    setProps: function(newp, isCover) {
      var props = {};
      if (!isCover) {
        props = extend(this._state.props || {}, newp);
      } else {
        props = newp;
      }
      for (var key in props) {
        if (typeof props[key] === 'string') {
          props[key] = props[key].slice(0, sd.para.max_referrer_string_length);
        }
      }
      this.set('props', props);
    },
    setPropsOnce: function(newp) {
      var props = this._state.props || {};
      coverExtend(props, newp);
      this.set('props', props);
    },
    clearAllProps: function(arr) {
      this._sessionState = {};
      var i;
      if (isArray(arr) && arr.length > 0) {
        for (i = 0; i < arr.length; i++) {
          if (isString(arr[i]) && arr[i].indexOf('latest_') === -1 && isObject(this._state.props) && arr[i] in this._state.props) {
            delete this._state.props[arr[i]];
          }
        }
      } else {
        if (isObject(this._state.props)) {
          for (i in this._state.props) {
            if (i.indexOf('latest_') !== 1) {
              delete this._state.props[i];
            }
          }
        }
      }
      this.sessionSave({});
      this.save();
    },
    sessionSave: function(props) {
      this._sessionState = props;
      var sessionStateStr = JSON.stringify(this._sessionState);
      if (sd.para.encrypt_cookie) {
        sessionStateStr = encrypt(sessionStateStr);
      }
      cookie$1.set('sensorsdata2015session', sessionStateStr, 0);
    },
    save: function() {
      var copyState = JSON.parse(JSON.stringify(this._state));
      delete copyState._first_id;
      delete copyState._distinct_id;

      if (copyState.identities) {
        copyState.identities = base64Encode(JSON.stringify(copyState.identities));
      }

      var stateStr = JSON.stringify(copyState);
      if (sd.para.encrypt_cookie) {
        stateStr = encrypt(stateStr);
      }
      cookie$1.set(this.getCookieName(), stateStr, 73000, sd.para.cross_subdomain);
    },
    getCookieName: function() {
      var sub = '';
      if (sd.para.cross_subdomain === false) {
        try {
          sub = _URL(location.href).hostname;
        } catch (e) {
          sd.log(e);
        }
        if (typeof sub === 'string' && sub !== '') {
          sub = 'sa_jssdk_2015_' + sd.para.sdk_id + sub.replace(/\./g, '_');
        } else {
          sub = 'sa_jssdk_2015_root' + sd.para.sdk_id;
        }
      } else {
        sub = 'sensorsdata2015jssdkcross' + sd.para.sdk_id;
      }
      return sub;
    },
    init: function() {
      function compatibleWith3(state) {
        var identitiesprop;
        if (state.identities) {
          if (state.identities.indexOf('\n/') === 0) {
            state.identities = safeJSONParse(rot13defs(state.identities));
          } else {
            state.identities = safeJSONParse(base64Decode(state.identities));
          }
        }

        var unionId = store.getOriginUnionId(state);

        if (state.identities && isObject(state.identities) && !isEmptyObject(state.identities)) {
          if (state.identities.$identity_anonymous_id && state.identities.$identity_anonymous_id !== unionId.anonymous_id) {
            state.identities.$identity_anonymous_id = unionId.anonymous_id;
          }
        } else {
          state.identities = {};
          state.identities.$identity_anonymous_id = unionId.anonymous_id;
          state.identities.$identity_cookie_id = UUID();
        }


        state.history_login_id = state.history_login_id || {};
        var history_login_id = state.history_login_id;
        var old_login_id_name = history_login_id.name;

        if (unionId.login_id) {
          if (old_login_id_name && state.identities.hasOwnProperty(old_login_id_name)) {
            if (state.identities[old_login_id_name] !== unionId.login_id) {
              state.identities[old_login_id_name] = unionId.login_id;
              for (identitiesprop in state.identities) {
                if (state.identities.hasOwnProperty(identitiesprop)) {
                  if (identitiesprop !== '$identity_cookie_id' && identitiesprop !== old_login_id_name) {
                    delete state.identities[identitiesprop];
                  }
                }
              }
              state.history_login_id.value = unionId.login_id;
            }
          } else {
            var currentLoginKey = old_login_id_name || sd.IDENTITY_KEY.LOGIN;
            state.identities[currentLoginKey] = unionId.login_id;
            for (identitiesprop in state.identities) {
              if (state.identities.hasOwnProperty(identitiesprop)) {
                if (identitiesprop !== '$identity_cookie_id' && identitiesprop !== currentLoginKey) {
                  delete state.identities[identitiesprop];
                }
              }
            }
            state.history_login_id = {
              name: currentLoginKey,
              value: unionId.login_id
            };
          }
        } else {

          if (state.identities.hasOwnProperty('$identity_login_id') || state.identities.hasOwnProperty(old_login_id_name)) {
            for (identitiesprop in state.identities) {
              if (state.identities.hasOwnProperty(identitiesprop)) {
                if (identitiesprop !== '$identity_cookie_id' && identitiesprop !== '$identity_anonymous_id') {
                  delete state.identities[identitiesprop];
                }
              }
            }
          }
          state.history_login_id = {
            name: '',
            value: ''
          };
        }

        return state;
      }

      function cookieExistExpection(uuid) {
        sd.store.set('distinct_id', uuid);
        sd.store.set('identities', {
          $identity_cookie_id: uuid
        });
        sd.store.set('history_login_id', {
          name: '',
          value: ''
        });
      }
      this.initSessionState();
      var uuid = UUID();
      var cross, cookieJSON;
      if (cookie$1.isSupport()) {
        cross = cookie$1.get(this.getCookieName());
        cross = decryptIfNeeded(cross);
        cookieJSON = safeJSONParse(cross);
      }
      if (!cookie$1.isSupport() || cross === null || !isJSONString(cross) || !isObject(cookieJSON) || (isObject(cookieJSON) && !cookieJSON.distinct_id)) {
        sd.is_first_visitor = true;
        cookieExistExpection(uuid);
      } else {
        sd.store._state = extend(compatibleWith3(cookieJSON));
        sd.store.save();
      }
      saNewUser.setDeviceId(uuid);
      saNewUser.storeInitCheck();
      saNewUser.checkIsFirstLatest();
    },
    saveObjectVal: function(name, value) {
      if (!isString(value)) {
        value = JSON.stringify(value);
      }
      if (sd.para.encrypt_cookie == true) {
        value = encrypt(value);
      }
      _localStorage.set(name, value);
    },
    readObjectVal: function(name) {
      var value = _localStorage.get(name);
      if (!value) return null;
      value = decryptIfNeeded(value);
      return safeJSONParse(value);
    }
  };

  var checkLog = {
    string: function(str) {
      sdLog(str + ' must be string');
    },
    emptyString: function(str) {
      sdLog(str + '\'s is empty');
    },
    regexTest: function(str) {
      sdLog(str + ' is invalid');
    },
    idLength: function(str) {
      sdLog(str + ' length is longer than ' + sdPara.max_id_length);
    },
    keyLength: function(str) {
      sdLog(str + ' length is longer than ' + sdPara.max_key_length);
    },
    stringLength: function(str) {
      sdLog(str + ' length is longer than ' + sdPara.max_string_length);
    },
    voidZero: function(str) {
      sdLog(str + '\'s is undefined');
    },
    reservedLoginId: function(str) {
      sdLog(str + ' is invalid');
    },
    reservedBind: function(str) {
      sdLog(str + ' is invalid');
    },
    reservedUnbind: function(str) {
      sdLog(str + ' is invalid');
    }
  };
  var ruleOption = {
    regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_tag.*|^user_group.*)[a-zA-Z_$][a-zA-Z\d_$]*)$/i,
    loginIDReservedNames: ['$identity_anonymous_id', '$identity_cookie_id'],
    bindReservedNames: ['$identity_login_id', '$identity_anonymous_id', '$identity_cookie_id'],
    unbindReservedNames: ['$identity_anonymous_id', IDENTITY_KEY.LOGIN],
    string: function(str) {
      if (!isString(str)) {
        return false;
      }
      return true;
    },
    emptyString: function(str) {
      if (!isString(str) || trim(str).length === 0) {
        return false;
      }
      return true;
    },
    regexTest: function(str) {
      if (!isString(str) || !this.regName.test(str)) {
        return false;
      }
      return true;
    },
    idLength: function(str) {
      if (!isString(str) || str.length > sdPara.max_id_length) {
        return false;
      }
      return true;
    },
    keyLength: function(str) {
      if (!isString(str) || str.length > sdPara.max_key_length) {
        return false;
      }
      return true;
    },
    stringLength: function(str) {
      if (!isString(str) || str.length > sdPara.max_string_length) {
        return false;
      }
      return true;
    },
    voidZero: function(str) {
      if (str === void 0) {
        return false;
      }
      return true;
    },
    reservedLoginId: function(str) {
      if (indexOf(this.loginIDReservedNames, str) > -1) {
        return false;
      }
      return true;
    },
    reservedUnbind: function(str) {
      if (indexOf(this.unbindReservedNames, str) > -1) {
        return false;
      }
      return true;
    },
    reservedBind: function(str) {
      var historyId = store._state.history_login_id;
      if (historyId && historyId.name && historyId.name === str) {
        return false;
      }
      if (indexOf(this.bindReservedNames, str) > -1) {
        return false;
      }
      return true;
    }
  };

  var checkOption = {
    distinct_id: {
      rules: ['string', 'emptyString', 'idLength'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Id';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'idLength') {
            return true;
          }
        }

        return status;
      }
    },
    event: {
      rules: ['string', 'emptyString', 'keyLength', 'regexTest'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'eventName';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    propertyKey: {
      rules: ['string', 'emptyString', 'keyLength', 'regexTest'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Property key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    propertyValue: {
      rules: ['voidZero'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          val = 'Property Value';
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    properties: function(p) {
      if (isObject(p)) {
        each(p, function(s, k) {
          check({
            propertyKey: k
          });

          var onComplete = function(status, val, rule_type) {
            if (!status) {
              val = k + '\'s Value';
              isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
            }
            return true;
          };
          check({
            propertyValue: s
          }, onComplete);
        });
      } else if (ruleOption.voidZero(p)) {
        sdLog('properties可以没有，但有的话必须是对象');
      }
      return true;
    },
    propertiesMust: function(p) {
      if (!(p === undefined || !isObject(p) || isEmptyObject(p))) {
        this.properties.call(this, p);
      } else {
        sdLog('properties必须是对象');
      }
      return true;
    },
    item_type: {
      rules: ['string', 'emptyString', 'keyLength', 'regexTest'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'item_type';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    item_id: {
      rules: ['string', 'emptyString', 'stringLength'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'item_id';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    loginIdKey: {
      rules: ['string', 'emptyString', 'keyLength', 'regexTest', 'reservedLoginId'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'login_id_key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'keyLength') {
            return true;
          }
        }
        return status;
      }
    },
    bindKey: {
      rules: ['string', 'emptyString', 'keyLength', 'regexTest', 'reservedBind'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'keyLength') {
            return true;
          }
        }
        return status;
      }
    },
    unbindKey: {
      rules: ['string', 'emptyString', 'keyLength', 'regexTest', 'reservedUnbind'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'keyLength') {
            return true;
          }
        }
        return status;
      }
    },
    bindValue: {
      rules: ['string', 'emptyString', 'idLength'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Value';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'idLength') {
            return true;
          }
        }
        return status;
      }
    },

    check: function(a, b, onComplete) {
      var checkRules = this[a];
      if (isFunction(checkRules)) {
        return checkRules.call(this, b);
      } else if (!checkRules) {
        return false;
      }
      for (var i = 0; i < checkRules.rules.length; i++) {
        var rule = checkRules.rules[i];
        var status = ruleOption[rule](b);
        var result = isFunction(onComplete) ? onComplete(status, b, rule) : checkRules.onComplete(status, b, rule);
        if (!status) {
          return result;
        }
      }
      return true;
    }
  };

  function check(p, onComplete) {
    for (var i in p) {
      if (Object.prototype.hasOwnProperty.call(p, i) && !checkOption.check(i, p[i], onComplete)) {
        return false;
      }
    }
    return true;
  }

  var dataStageImpl = {
    stage: null,
    init: function(stage) {
      this.stage = stage;
    }
  };

  function processAddCustomProps(data) {
    return dataStageImpl.stage.process('addCustomProps', data);
  }

  function processFormatData(data) {
    return dataStageImpl.stage.process('formatData', data);
  }

  var saEvent = {};

  saEvent.check = check;

  saEvent.sendItem = function(p) {
    var data = {
      lib: {
        $lib: 'js',
        $lib_method: 'code',
        $lib_version: String(sd.lib_version)
      },
      time: new Date() * 1
    };

    extend(data, p);
    dataStageImpl.stage.process('formatData', data);

    sd.sendState.getSendCall(data);
  };

  saEvent.send = function(p, callback) {
    var data = sd.kit.buildData(p);
    sd.kit.sendData(data, callback);
  };

  saEvent.debugPath = function(data) {
    var _data = data;
    var url = '';
    if (sd.para.debug_mode_url.indexOf('?') !== -1) {
      url = sd.para.debug_mode_url + '&' + sd.kit.encodeTrackData(data);
    } else {
      url = sd.para.debug_mode_url + '?' + sd.kit.encodeTrackData(data);
    }

    ajax$1({
      url: url,
      type: 'GET',
      cors: true,
      header: {
        'Dry-Run': String(sd.para.debug_mode_upload)
      },
      success: function(data) {
        isEmptyObject(data) === true ? alert('debug数据发送成功' + _data) : alert('debug失败 错误原因' + JSON.stringify(data));
      }
    });
  };


  var UNLIMITED_TAGS_MAP = {
    label: false,
    li: false,
    a: true,
    button: true
  };

  var heatmap = {
    otherTags: [],
    initUnlimitedTags: function() {
      each(heatmap.otherTags, function(tagName) {
        if (tagName in UNLIMITED_TAGS_MAP) {
          UNLIMITED_TAGS_MAP[tagName] = true;
        }
      });
    },
    isUnlimitedTag: function(el) {
      if (!el || el.nodeType !== 1) return false;
      var tagName = el.nodeName.toLowerCase();
      return UNLIMITED_TAGS_MAP[tagName] || hasAttributes(el, sd.para.heatmap.track_attr);
    },
    getTargetElement: function(element, e) {
      var that = this;
      var target = element;
      if (typeof target !== 'object') {
        return null;
      }
      if (typeof target.tagName !== 'string') {
        return null;
      }
      var tagName = target.tagName.toLowerCase();
      if (tagName.toLowerCase() === 'body' || tagName.toLowerCase() === 'html') {
        return null;
      }
      if (!target || !target.parentNode || !target.parentNode.children) {
        return null;
      }

      var parent_ele = target.parentNode;

      var otherTags = that.otherTags;

      if (tagName === 'a' || tagName === 'button' || tagName === 'input' || tagName === 'textarea') {
        return target;
      }
      if (indexOf(otherTags, tagName) > -1) {
        return target;
      }
      if (tagName === 'area' && parent_ele.tagName.toLowerCase() === 'map' && ry(parent_ele).prev().tagName && ry(parent_ele).prev().tagName.toLowerCase() === 'img') {
        return ry(parent_ele).prev();
      }
      if (tagName === 'div' && sd.para.heatmap.collect_tags.div && that.isDivLevelValid(target)) {
        var max_level = (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level) || 1;
        if (max_level > 1 || that.isCollectableDiv(target)) {
          return target;
        }
      }
      if (that.isStyleTag(tagName) && sd.para.heatmap.collect_tags.div) {
        var parentTrackDiv = that.getCollectableParent(target);
        if (parentTrackDiv && that.isDivLevelValid(parentTrackDiv)) {
          return parentTrackDiv;
        }
      }
      var unlimitedTag = that.hasElement({
        event: (e && e.originalEvent) || e,
        element: element
      }, function(target) {
        return that.isUnlimitedTag(target);
      });
      return unlimitedTag || null;
    },
    getDivLevels: function(element, rootElement) {
      var path = heatmap.getElementPath(element, true, rootElement);
      var pathArr = path.split(' > ');
      var ans = 0;
      each(pathArr, function(tag) {
        if (tag === 'div') {
          ans++;
        }
      });
      return ans;
    },
    isDivLevelValid: function(element) {
      var max_level = (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level) || 1;

      var allDiv = element.getElementsByTagName('div');
      for (var i = allDiv.length - 1; i >= 0; i--) {
        if (heatmap.getDivLevels(allDiv[i], element) > max_level) {
          return false;
        }
      }
      return true;
    },
    getElementPath: function(element, ignoreID, rootElement) {
      var names = [];
      while (element.parentNode) {
        if (element.id && !ignoreID && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(element.id)) {
          names.unshift(element.tagName.toLowerCase() + '#' + element.id);
          break;
        } else {
          if (rootElement && element === rootElement) {
            names.unshift(element.tagName.toLowerCase());
            break;
          } else if (element === document.body) {
            names.unshift('body');
            break;
          } else {
            names.unshift(element.tagName.toLowerCase());
          }
          element = element.parentNode;
        }
      }
      return names.join(' > ');
    },
    getClosestLi: function(element) {
      var getClosest = function(elem, selector) {
        for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
          if (elem.tagName.toLowerCase() === selector) {
            return elem;
          }
        }
        return null;
      };
      return getClosest(element, 'li');
    },
    getElementPosition: function(element, elementPath, ignoreID) {
      var closestLi = sd.heatmap.getClosestLi(element);
      if (!closestLi) {
        return null;
      }
      var tag = element.tagName.toLowerCase();
      var sameTypeTags = closestLi.getElementsByTagName(tag);
      var sameTypeTagsLen = sameTypeTags.length;
      var arr = [];
      if (sameTypeTagsLen > 1) {
        for (var i = 0; i < sameTypeTagsLen; i++) {
          var elepath = sd.heatmap.getElementPath(sameTypeTags[i], ignoreID);
          if (elepath === elementPath) {
            arr.push(sameTypeTags[i]);
          }
        }
        if (arr.length > 1) {
          return indexOf(arr, element);
        }
      }

      function _getPosition(element) {
        var parentNode = element.parentNode;
        if (!parentNode) {
          return '';
        }
        var sameTypeSiblings = ry(element).getSameTypeSiblings();
        var typeLen = sameTypeSiblings.length;
        if (typeLen === 1) {
          return 0;
        }
        for (var i = 0, e = element; ry(e).previousElementSibling().ele; e = ry(e).previousElementSibling().ele, i++);
        return i;
      }
      return _getPosition(closestLi);
    },
    setNotice: function(web_url) {
      sd.is_heatmap_render_mode = true;

      if (!sd.para.heatmap) {
        sd.errorMsg = '您SDK没有配置开启点击图，可能没有数据！';
      }
      if (web_url) {
        if (web_url.slice(0, 5) === 'http:' && location.protocol === 'https:') {
          sd.errorMsg = '您的当前页面是https的地址，神策分析环境也必须是https！';
        }
      }
      if (!sd.para.heatmap_url) {
        sd.para.heatmap_url = getSafeHttpProtocol() + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/heatmap.min.js';
      }
    },
    getDomIndex: function(el) {
      if (!el.parentNode) return -1;
      var i = 0;
      var nodeName = el.tagName;
      var list = el.parentNode.children;
      for (var n = 0; n < list.length; n++) {
        if (list[n].tagName === nodeName) {
          if (el === list[n]) {
            return i;
          } else {
            i++;
          }
        }
      }
      return -1;
    },
    selector: function(el, notuseid) {
      var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
      if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && (!sd.para.heatmap || (sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id')) && !notuseid) {
        return '#' + el.getAttribute('id');
      } else {
        return el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '');
      }
    },
    getDomSelector: function(el, arr, notuseid) {
      if (!el || !el.parentNode || !el.parentNode.children) {
        return false;
      }
      arr = arr && arr.join ? arr : [];
      var name = el.nodeName.toLowerCase();
      if (!el || name === 'body' || 1 != el.nodeType) {
        arr.unshift('body');
        return arr.join(' > ');
      }
      arr.unshift(this.selector(el, notuseid));
      if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id' && !notuseid) return arr.join(' > ');
      return this.getDomSelector(el.parentNode, arr, notuseid);
    },
    na: function() {
      var a = document.documentElement.scrollLeft || window.pageXOffset;
      return parseInt(isNaN(a) ? 0 : a, 10);
    },
    i: function() {
      var a = 0;
      try {
        (a = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset), (a = isNaN(a) ? 0 : a);
      } catch (b) {
        a = 0;
      }
      return parseInt(a, 10);
    },
    getBrowserWidth: function() {
      var a = window.innerWidth || document.body.clientWidth;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getBrowserHeight: function() {
      var a = window.innerHeight || document.body.clientHeight;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getScrollWidth: function() {
      var a = parseInt(document.body.scrollWidth, 10);
      return isNaN(a) ? 0 : a;
    },
    getEleDetail: function(target) {
      var selector = this.getDomSelector(target);
      var prop = getEleInfo({
        target: target
      });
      prop.$element_selector = selector ? selector : '';
      prop.$element_path = sd.heatmap.getElementPath(target, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      var element_position = sd.heatmap.getElementPosition(target, prop.$element_path, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      if (isNumber(element_position)) {
        prop.$element_position = element_position;
      }
      return prop;
    },
    getPointerEventProp: function(ev, target) {
      if (!ev) {
        return {};
      }

      function getScroll() {
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft || 0;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0;
        return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        };
      }

      function getElementPosition(target) {
        if (document.documentElement.getBoundingClientRect) {
          var targetEle = target.getBoundingClientRect();
          return {
            targetEleX: targetEle.left + getScroll().scrollLeft || 0,
            targetEleY: targetEle.top + getScroll().scrollTop || 0
          };
        }
      }

      function toFixedThree(val) {
        return Number(Number(val).toFixed(3));
      }

      function getPage(ev) {
        var pageX = ev.pageX || ev.clientX + getScroll().scrollLeft || ev.offsetX + getElementPosition(target).targetEleX || 0;
        var pageY = ev.pageY || ev.clientY + getScroll().scrollTop || ev.offsetY + getElementPosition(target).targetEleY || 0;
        return {
          $page_x: toFixedThree(pageX),
          $page_y: toFixedThree(pageY)
        };
      }
      return getPage(ev);
    },
    start: function(ev, target, tagName, customProps, callback) {
      var userCustomProps = isObject(customProps) ? customProps : {};
      var userCallback = isFunction(callback) ? callback : isFunction(customProps) ? customProps : undefined;
      if (sd.para.heatmap && sd.para.heatmap.collect_element && !sd.para.heatmap.collect_element(target)) {
        return false;
      }

      var prop = this.getEleDetail(target);

      if (sd.para.heatmap && sd.para.heatmap.custom_property) {
        var customP = sd.para.heatmap.custom_property(target);
        if (isObject(customP)) {
          prop = extend(prop, customP);
        }
      }
      prop = extend(prop, this.getPointerEventProp(ev, target), userCustomProps);
      if (tagName === 'a' && sd.para.heatmap && sd.para.heatmap.isTrackLink === true) {
        sd.trackLink({
          event: ev,
          target: target
        }, '$WebClick', prop);
      } else {
        sd.track('$WebClick', prop, userCallback);
      }
    },
    hasElement: function(obj, func) {
      var path;
      if (obj.event) {
        var e = obj.event;
        path = e.path || (e._getPath && e._getPath());
      } else if (obj.element) {
        path = ry(obj.element).getParents();
      }

      if (path) {
        if (isArray(path) && path.length > 0) {
          for (var i = 0; i < path.length; i++) {
            if (typeof path[i] === 'object' && path[i].nodeType === 1 && func(path[i])) {
              return path[i];
            }
          }
        }
      }
    },
    isStyleTag: function(tagname, isVisualMode) {
      var defaultTag = ['a', 'div', 'input', 'button', 'textarea'];
      var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
      if (indexOf(defaultTag, tagname) > -1) {
        return false;
      }
      if (isVisualMode && (!sd.para.heatmap || !sd.para.heatmap.collect_tags || !sd.para.heatmap.collect_tags.div)) {
        return indexOf(ignore_tags_default, tagname) > -1;
      } else if (isObject(sd.para.heatmap) && isObject(sd.para.heatmap.collect_tags) && isObject(sd.para.heatmap.collect_tags.div) && isArray(sd.para.heatmap.collect_tags.div.ignore_tags) && indexOf(sd.para.heatmap.collect_tags.div.ignore_tags, tagname) > -1) {
        return true;
      }
      return false;
    },
    isCollectableDiv: function(target, isVisualMode) {
      try {
        if (target.children.length === 0) {
          return true;
        } else {
          for (var i = 0; i < target.children.length; i++) {
            if (target.children[i].nodeType !== 1) {
              continue;
            }
            var tag = target.children[i].tagName.toLowerCase();
            var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
            if ((tag === 'div' && max_level > 1) || this.isStyleTag(tag, isVisualMode)) {
              if (!this.isCollectableDiv(target.children[i], isVisualMode)) {
                return false;
              }
            } else {
              return false;
            }
          }
          return true;
        }
      } catch (error) {
        sd.log(error);
      }
      return false;
    },
    getCollectableParent: function(target, isVisualMode) {
      try {
        var parent = target.parentNode;
        var parentName = parent ? parent.tagName.toLowerCase() : '';
        if (parentName === 'body') {
          return false;
        }
        var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
        if (parentName && parentName === 'div' && (max_level > 1 || this.isCollectableDiv(parent, isVisualMode))) {
          return parent;
        } else if (parent && this.isStyleTag(parentName, isVisualMode)) {
          return this.getCollectableParent(parent, isVisualMode);
        }
      } catch (error) {
        sd.log(error);
      }
      return false;
    },
    listenUrlChange: function(callback) {
      callback();
      sd.ee.spa.on('switch', function() {
        callback();
      });
    },
    initScrollmap: function() {
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.scroll_notice_map !== 'default') {
        return false;
      }
      var isPageCollect = true;
      if (sd.para.scrollmap && isFunction(sd.para.scrollmap.collect_url)) {
        this.listenUrlChange(function() {
          isPageCollect = !!sd.para.scrollmap.collect_url();
        });
      }

      var interDelay = function(param) {
        var interDelay = {};
        interDelay.timeout = param.timeout || 1000;
        interDelay.func = param.func;
        interDelay.hasInit = false;
        interDelay.inter = null;
        interDelay.main = function(para, isClose) {
          this.func(para, isClose);
          this.inter = null;
        };
        interDelay.go = function(isNoDelay) {
          var para = {};
          if (!this.inter) {
            para.$viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
            para.$viewport_position = Math.round(para.$viewport_position) || 0;
            if (isNoDelay) {
              interDelay.main(para, true);
            } else {
              this.inter = setTimeout(function() {
                interDelay.main(para);
              }, this.timeout);
            }
          }
        };
        return interDelay;
      };

      var delayTime = interDelay({
        timeout: 1000,
        func: function(para, isClose) {
          var offsetTop = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
          var current_time = new Date();
          var delay_time = current_time - this.current_time;
          if ((delay_time > sd.para.heatmap.scroll_delay_time && offsetTop - para.$viewport_position !== 0) || isClose) {
            para.$url = getURL();
            para.$title = document.title;
            para.$url_path = getURLPath();
            para.event_duration = Math.min(sd.para.heatmap.scroll_event_duration, parseInt(delay_time) / 1000);
            para.event_duration = para.event_duration < 0 ? 0 : para.event_duration;
            sd.track('$WebStay', para);
          }
          this.current_time = current_time;
        }
      });

      delayTime.current_time = new Date();

      addEvent$1(window, 'scroll', function() {
        if (!isPageCollect) {
          return false;
        }
        delayTime.go();
      });

      addEvent$1(window, 'unload', function() {
        if (!isPageCollect) {
          return false;
        }
        delayTime.go('notime');
      });
    },
    initHeatmap: function() {
      var that = this;
      var isPageCollect = true;
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.clickmap !== 'default') {
        return false;
      }

      if (isFunction(sd.para.heatmap.collect_url)) {
        this.listenUrlChange(function() {
          isPageCollect = !!sd.para.heatmap.collect_url();
        });
      }

      if (sd.para.heatmap.collect_elements === 'all') {
        sd.para.heatmap.collect_elements = 'all';
      } else {
        sd.para.heatmap.collect_elements = 'interact';
      }
      if (sd.para.heatmap.collect_elements === 'all') {
        addEvent$1(document, 'click', function(e) {
          if (!isPageCollect) return false;
          var ev = e || window.event;
          if (!ev) {
            return false;
          }
          var target = ev.target || ev.srcElement;
          if (typeof target !== 'object') {
            return false;
          }
          if (typeof target.tagName !== 'string') {
            return false;
          }
          var tagName = target.tagName.toLowerCase();
          if (tagName === 'body' || tagName === 'html') {
            return false;
          }
          if (!target || !target.parentNode || !target.parentNode.children) {
            return false;
          }
          var parent_ele = target.parentNode.tagName.toLowerCase();
          if (parent_ele === 'a' || parent_ele === 'button') {
            that.start(ev, target.parentNode, parent_ele);
          } else {
            that.start(ev, target, tagName);
          }
        });
      } else {
        addEvent$1(document, 'click', function(e) {
          if (!isPageCollect) return false;
          var ev = e || window.event;
          if (!ev) {
            return false;
          }
          var target = ev.target || ev.srcElement;
          var theTarget = sd.heatmap.getTargetElement(target, e);
          if (theTarget) {
            that.start(ev, theTarget, theTarget.tagName.toLowerCase());
          } else if (isElement(target) && target.tagName.toLowerCase() === 'div' && isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config && sd.unlimitedDiv.events.length > 0) {
            if (sd.unlimitedDiv.isTargetEle(target)) {
              that.start(ev, target, target.tagName.toLowerCase(), {
                $lib_method: 'vtrack'
              });
            }
          }
        });
      }
    }
  };

  var commonWays = {
    setOnlineState: function(state) {
      if (state === true && isObject(sd.para.jsapp) && typeof sd.para.jsapp.getData === 'function') {
        sd.para.jsapp.isOnline = true;
        var arr = sd.para.jsapp.getData();
        if (isArray(arr) && arr.length > 0) {
          each(arr, function(str) {
            if (isJSONString(str)) {
              sd.sendState.realtimeSend(JSON.parse(str));
            }
          });
        }
      } else {
        sd.para.jsapp.isOnline = false;
      }
    },
    autoTrackIsUsed: false,
    isReady: function(callback) {
      callback();
    },
    getUtm: function() {
      return pageInfo.campaignParams();
    },
    getStayTime: function() {
      return (new Date() - sd._t) / 1000;
    },
    setProfileLocal: function(obj) {
      if (!_localStorage.isSupport()) {
        sd.setProfile(obj);
        return false;
      }
      if (!isObject(obj) || isEmptyObject(obj)) {
        return false;
      }
      var saveData = sd.store.readObjectVal('sensorsdata_2015_jssdk_profile');
      var isNeedSend = false;
      if (isObject(saveData) && !isEmptyObject(saveData)) {
        for (var i in obj) {
          if ((i in saveData && saveData[i] !== obj[i]) || !(i in saveData)) {
            saveData[i] = obj[i];
            isNeedSend = true;
          }
        }
        if (isNeedSend) {
          sd.store.saveObjectVal('sensorsdata_2015_jssdk_profile', saveData);
          sd.setProfile(obj);
        }
      } else {
        sd.store.saveObjectVal('sensorsdata_2015_jssdk_profile', obj);
        sd.setProfile(obj);
      }
    },
    setInitReferrer: function() {
      var _referrer = getReferrer();
      sd.setOnceProfile({
        _init_referrer: _referrer,
        _init_referrer_host: pageInfo.pageProp.referrer_host
      });
    },
    setSessionReferrer: function() {
      var _referrer = getReferrer();
      sd.store.setSessionPropsOnce({
        _session_referrer: _referrer,
        _session_referrer_host: pageInfo.pageProp.referrer_host
      });
    },
    setDefaultAttr: function() {
      pageInfo.register({
        _current_url: location.href,
        _referrer: getReferrer(),
        _referring_host: pageInfo.pageProp.referrer_host
      });
    },
    trackHeatMap: function(target, props, callback) {
      if (typeof target === 'object' && target.tagName) {
        var tagName = target.tagName.toLowerCase();
        var parent_ele = target.parentNode.tagName.toLowerCase();
        var trackAttrs = sd.para.heatmap && sd.para.heatmap.track_attr ? sd.para.heatmap.track_attr : ['data-sensors-click'];
        if (tagName !== 'button' && tagName !== 'a' && parent_ele !== 'a' && parent_ele !== 'button' && tagName !== 'input' && tagName !== 'textarea' && !hasAttributes(target, trackAttrs)) {
          heatmap.start(null, target, tagName, props, callback);
        }
      }
    },
    trackAllHeatMap: function(target, props, callback) {
      if (typeof target === 'object' && target.tagName) {
        var tagName = target.tagName.toLowerCase();
        heatmap.start(null, target, tagName, props, callback);
      }
    },
    autoTrackSinglePage: function(para, callback) {
      var url;
      if (this.autoTrackIsUsed) {
        url = pageInfo.pageProp.url;
      } else {
        url = pageInfo.pageProp.referrer;
      }
      para = isObject(para) ? para : {};

      function getUtm() {
        var utms = pageInfo.campaignParams();
        var $utms = {};
        each(utms, function(v, i, utms) {
          if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
            $utms['$' + i] = utms[i];
          } else {
            $utms[i] = utms[i];
          }
        });
        return $utms;
      }

      var is_set_profile = !para.not_set_profile;
      if (para.not_set_profile) {
        delete para.not_set_profile;
      }

      function closure(p, c) {
        sd.track(
          '$pageview',
          extend({
              $referrer: url,
              $url: getURL(),
              $url_path: getURLPath(),
              $title: document.title
            },
            p,
            getUtm()
          ),
          c
        );
        url = getURL();
      }
      closure(para, callback);
      this.autoTrackSinglePage = closure;

      if (sd.is_first_visitor && is_set_profile) {
        var eqidObj = {};

        if (sd.para.preset_properties.search_keyword_baidu && isReferralTraffic(document.referrer) && isBaiduTraffic()) {
          eqidObj['$search_keyword_id'] = getBaiduKeyword.id();
          eqidObj['$search_keyword_id_type'] = getBaiduKeyword.type();
          eqidObj['$search_keyword_id_hash'] = hashCode53(eqidObj['$search_keyword_id']);
        }

        sd.setOnceProfile(
          extend({
              $first_visit_time: new Date(),
              $first_referrer: getReferrer(),
              $first_browser_language: isString(navigator.language) ? navigator.language.toLowerCase() : '取值异常',
              $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
              $first_traffic_source_type: getSourceFromReferrer(),
              $first_search_keyword: getKeywordFromReferrer()
            },
            getUtm(),
            eqidObj
          )
        );

        sd.is_first_visitor = false;
      }
    },
    autoTrackWithoutProfile: function(para, callback) {
      para = isObject(para) ? para : {};
      this.autoTrack(extend(para, {
        not_set_profile: true
      }), callback);
    },
    autoTrack: function(para, callback) {
      para = isObject(para) ? para : {};

      var utms = pageInfo.campaignParams();
      var $utms = {};
      each(utms, function(v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      });

      var is_set_profile = !para.not_set_profile;
      if (para.not_set_profile) {
        delete para.not_set_profile;
      }

      var current_page_url = location.href;

      if (sd.para.is_single_page) {
        addHashEvent(function() {
          var referrer = getReferrer(current_page_url, true);
          sd.track(
            '$pageview',
            extend({
                $referrer: referrer,
                $url: getURL(),
                $url_path: getURLPath(),
                $title: document.title
              },
              $utms,
              para
            ),
            callback
          );
          current_page_url = getURL();
        });
      }
      sd.track(
        '$pageview',
        extend({
            $referrer: getReferrer(null, true),
            $url: getURL(),
            $url_path: getURLPath(),
            $title: document.title
          },
          $utms,
          para
        ),
        callback
      );

      if (sd.is_first_visitor && is_set_profile) {
        var eqidObj = {};

        if (sd.para.preset_properties.search_keyword_baidu && isReferralTraffic(document.referrer) && isBaiduTraffic()) {
          eqidObj['$search_keyword_id'] = getBaiduKeyword.id();
          eqidObj['$search_keyword_id_type'] = getBaiduKeyword.type();
          eqidObj['$search_keyword_id_hash'] = hashCode53(eqidObj['$search_keyword_id']);
        }

        sd.setOnceProfile(
          extend({
              $first_visit_time: new Date(),
              $first_referrer: getReferrer(null, true),
              $first_browser_language: isString(navigator.language) ? navigator.language.toLowerCase() : '取值异常',
              $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
              $first_traffic_source_type: getSourceFromReferrer(),
              $first_search_keyword: getKeywordFromReferrer()
            },
            $utms,
            eqidObj
          )
        );

        sd.is_first_visitor = false;
      }

      this.autoTrackIsUsed = true;
    },
    getAnonymousID: function() {
      if (isEmptyObject(sd.store._state)) {
        return '请先初始化SDK';
      } else {
        return sd.store._state._first_id || sd.store._state.first_id || sd.store._state._distinct_id || sd.store._state.distinct_id;
      }
    },
    setPlugin: function(para) {
      if (!isObject(para)) {
        return false;
      }
      each(para, function(v, k) {
        if (isFunction(v)) {
          if (isObject(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[k]) {
            v(window.SensorsDataWebJSSDKPlugin[k]);
          } else {
            sd.log(k + '没有获取到,请查阅文档，调整' + k + '的引入顺序！');
          }
        }
      });
    },
    useModulePlugin: function() {
      sd.use.apply(sd, arguments);
    },
    useAppPlugin: function() {
      this.setPlugin.apply(this, arguments);
    }
  };

  function addSinglePageEvent(callback) {
    var current_url = location.href;
    var historyPushState = window.history.pushState;
    var historyReplaceState = window.history.replaceState;

    if (isFunction(window.history.pushState)) {
      window.history.pushState = function() {
        historyPushState.apply(window.history, arguments);
        callback(current_url);
        current_url = location.href;
      };
    }

    if (isFunction(window.history.replaceState)) {
      window.history.replaceState = function() {
        historyReplaceState.apply(window.history, arguments);
        callback(current_url);
        current_url = location.href;
      };
    }

    var singlePageEvent;
    if (window.document.documentMode) {
      singlePageEvent = 'hashchange';
    } else {
      singlePageEvent = historyPushState ? 'popstate' : 'hashchange';
    }

    addEvent(window, singlePageEvent, function() {
      callback(current_url);
      current_url = location.href;
    });
  }

  var spa = new EventEmitter();
  var sdk = new EventEmitter();
  var ee = {};

  ee.spa = spa;

  ee.sdk = sdk;

  ee.initSystemEvent = function() {
    addSinglePageEvent(function(url) {
      spa.emit('switch', url);
    });
  };

  ee.EVENT_LIST = {
    spaSwitch: ['spa', 'switch'],
    sdkAfterInitPara: ['sdk', 'afterInitPara'],
    sdkBeforeInit: ['sdk', 'beforeInit'],
    sdkAfterInit: ['sdk', 'afterInit']
  };

  function eventEmitterFacade(event_type, callback) {
    var splitEvent = [];
    if (typeof event_type === 'string' && event_type in ee.EVENT_LIST) {
      splitEvent = ee.EVENT_LIST[event_type];
      ee[splitEvent[0]].on(splitEvent[1], callback);
    }
  }


  function addReferrerHost(data) {
    var isNotProfileType = !data.type || data.type.slice(0, 7) !== 'profile';
    var defaultHost = '取值异常';
    if (isObject(data.properties)) {
      if (data.properties.$first_referrer) {
        data.properties.$first_referrer_host = getHostname(data.properties.$first_referrer, defaultHost);
      }
      if (isNotProfileType) {
        if ('$referrer' in data.properties) {
          data.properties.$referrer_host = data.properties.$referrer === '' ? '' : getHostname(data.properties.$referrer, defaultHost);
        }
        if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
          data.properties.$latest_referrer_host = data.properties.$latest_referrer === '' ? '' : getHostname(data.properties.$latest_referrer, defaultHost);
        }
      }
    }
  }

  function addPropsHook(data) {
    var isNotProfileType = !data.type || data.type.slice(0, 7) !== 'profile';
    var isSatisfy = sd.para.preset_properties && isNotProfileType;
    if (isSatisfy && sd.para.preset_properties.url && typeof data.properties.$url === 'undefined') {
      data.properties.$url = getURL();
    }
    if (isSatisfy && sd.para.preset_properties.title && typeof data.properties.$title === 'undefined') {
      data.properties.$title = document.title;
    }
  }

  function initPara(para) {
    extend(sdPara, para || sd.para || {});

    sd.para = sdPara;

    var latestObj = {};
    if (isObject(sd.para.is_track_latest)) {
      for (var latestProp in sd.para.is_track_latest) {
        latestObj['latest_' + latestProp] = sd.para.is_track_latest[latestProp];
      }
    }
    sd.para.preset_properties = extend({}, sd.para_default.preset_properties, latestObj, sd.para.preset_properties || {});

    var i;
    for (i in sd.para_default) {
      if (sd.para[i] === void 0) {
        sd.para[i] = sd.para_default[i];
      }
    }
    if (typeof sd.para.server_url === 'string') {
      sd.para.server_url = trim(sd.para.server_url);
      if (sd.para.server_url) {
        if (sd.para.server_url.slice(0, 3) === '://') {
          sd.para.server_url = location.protocol.slice(0, -1) + sd.para.server_url;
        } else if (sd.para.server_url.slice(0, 2) === '//') {
          sd.para.server_url = location.protocol + sd.para.server_url;
        } else if (sd.para.server_url.slice(0, 4) !== 'http') {
          sd.para.server_url = '';
        }
      }
    }

    if (typeof sd.para.web_url === 'string' && (sd.para.web_url.slice(0, 3) === '://' || sd.para.web_url.slice(0, 2) === '//')) {
      if (sd.para.web_url.slice(0, 3) === '://') {
        sd.para.web_url = location.protocol.slice(0, -1) + sd.para.web_url;
      } else {
        sd.para.web_url = location.protocol + sd.para.web_url;
      }
    }

    if (sd.para.send_type !== 'image' && sd.para.send_type !== 'ajax' && sd.para.send_type !== 'beacon') {
      sd.para.send_type = 'image';
    }

    sd.debug.protocol.serverUrl();

    sd.bridge.initPara();

    var batch_send_default = {
      datasend_timeout: 6000,
      send_interval: 6000
    };

    if (_localStorage.isSupport() && isSupportCors() && typeof localStorage === 'object') {
      if (sd.para.batch_send === true) {
        sd.para.batch_send = extend({}, batch_send_default);
      } else if (typeof sd.para.batch_send === 'object') {
        sd.para.batch_send = extend({}, batch_send_default, sd.para.batch_send);
      }
    } else {
      sd.para.batch_send = false;
    }

    var utm_type = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var search_type = ['www.baidu.', 'm.baidu.', 'm.sm.cn', 'so.com', 'sogou.com', 'youdao.com', 'google.', 'yahoo.com/', 'bing.com/', 'ask.com/'];
    var social_type = ['weibo.com', 'renren.com', 'kaixin001.com', 'douban.com', 'qzone.qq.com', 'zhihu.com', 'tieba.baidu.com', 'weixin.qq.com'];
    var search_keyword = {
      baidu: ['wd', 'word', 'kw', 'keyword'],
      google: 'q',
      bing: 'q',
      yahoo: 'p',
      sogou: ['query', 'keyword'],
      so: 'q',
      sm: 'q'
    };

    if (typeof sd.para.source_type === 'object') {
      sd.para.source_type.utm = isArray(sd.para.source_type.utm) ? sd.para.source_type.utm.concat(utm_type) : utm_type;
      sd.para.source_type.search = isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(search_type) : search_type;
      sd.para.source_type.social = isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(social_type) : social_type;
      sd.para.source_type.keyword = isObject(sd.para.source_type.keyword) ? extend(search_keyword, sd.para.source_type.keyword) : search_keyword;
    }
    var collect_tags_default = {
      div: false
    };
    var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
    if (sd.para.heatmap && !isObject(sd.para.heatmap)) {
      sd.para.heatmap = {};
    }
    if (isObject(sd.para.heatmap)) {
      sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default';
      sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || 'default';
      sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4000;
      sd.para.heatmap.scroll_event_duration = sd.para.heatmap.scroll_event_duration || 18000;
      sd.para.heatmap.renderRefreshTime = sd.para.heatmap.renderRefreshTime || 1000;
      sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1000;

      if (sd.para.heatmap.get_vtrack_config !== true) {
        sd.para.heatmap.get_vtrack_config = false;
      }

      var trackAttrs = isArray(sd.para.heatmap.track_attr) ?
        filter(sd.para.heatmap.track_attr, function(v) {
          return v && typeof v === 'string';
        }) : [];
      trackAttrs.push('data-sensors-click');
      sd.para.heatmap.track_attr = trackAttrs;

      if (isObject(sd.para.heatmap.collect_tags)) {
        if (sd.para.heatmap.collect_tags.div === true) {
          sd.para.heatmap.collect_tags.div = {
            ignore_tags: ignore_tags_default,
            max_level: 1
          };
        } else if (isObject(sd.para.heatmap.collect_tags.div)) {
          if (sd.para.heatmap.collect_tags.div.ignore_tags) {
            if (!isArray(sd.para.heatmap.collect_tags.div.ignore_tags)) {
              sd.log('ignore_tags 参数必须是数组格式');
              sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
            }
          } else {
            sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
          }
          if (sd.para.heatmap.collect_tags.div.max_level) {
            var supportedDivLevel = [1, 2, 3];
            if (indexOf(supportedDivLevel, sd.para.heatmap.collect_tags.div.max_level) === -1) {
              sd.para.heatmap.collect_tags.div.max_level = 1;
            }
          }
        } else {
          sd.para.heatmap.collect_tags.div = false;
        }
      } else {
        sd.para.heatmap.collect_tags = collect_tags_default;
      }
    }
    if (isArray(sd.para.server_url) && sd.para.server_url.length) {
      for (i = 0; i < sd.para.server_url.length; i++) {
        if (!/sa\.gif[^\/]*$/.test(sd.para.server_url[i])) {
          sd.para.server_url[i] = sd.para.server_url[i].replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
        }
      }
    } else if (!/sa\.gif[^\/]*$/.test(sd.para.server_url) && typeof sd.para.server_url === 'string') {
      sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
    }
    if (typeof sd.para.server_url === 'string') {
      sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');
    }
    if (sd.para.noCache === true) {
      sd.para.noCache = '?' + new Date().getTime();
    } else {
      sd.para.noCache = '';
    }

    if (sd.para.callback_timeout > sd.para.datasend_timeout) {
      sd.para.datasend_timeout = sd.para.callback_timeout;
    }

    if (sd.para.heatmap && sd.para.heatmap.collect_tags && isObject(sd.para.heatmap.collect_tags)) {
      each(sd.para.heatmap.collect_tags, function(val, key) {
        if (key !== 'div' && val) {
          sd.heatmap.otherTags.push(key);
        }
      });
    }
    if (sd.para.heatmap && sd.para.heatmap.clickmap === 'default') {
      sd.heatmap.initUnlimitedTags();
    }
  }

  var readyState = {
    state: 0,
    historyState: [],
    stateType: {
      1: '1-init未开始',
      2: '2-init开始',
      3: '3-store完成'
    },
    getState: function() {
      return this.historyState.join('\n');
    },
    setState: function(n) {
      if (String(n) in this.stateType) {
        this.state = n;
      }
      this.historyState.push(this.stateType[n]);
    }
  };

  function resetIdentities(resetObj) {
    var identities = {};
    for (var i in resetObj) {
      identities[i] = resetObj[i];
    }
    sd.store._state.identities = identities;
    sd.store.save();
  }

  function setInitVar() {
    sd._t = sd._t || 1 * new Date();
    sd.lib_version = sdkversion_placeholder;
    sd.is_first_visitor = false;
    sd.source_channel_standard = source_channel_standard;
  }

  function enableLocalLog() {
    if (_sessionStorage.isSupport()) {
      try {
        sessionStorage.setItem('sensorsdata_jssdk_debug', 'true');
      } catch (e) {
        sd.log('enableLocalLog error: ' + e.message);
      }
    }
  }

  function disableLocalLog() {
    if (_sessionStorage.isSupport()) {
      sessionStorage.removeItem('sensorsdata_jssdk_debug');
    }
  }

  function quick() {
    var arg = Array.prototype.slice.call(arguments);
    var arg0 = arg[0];
    var arg1 = arg.slice(1);
    if (typeof arg0 === 'string' && commonWays[arg0]) {
      return commonWays[arg0].apply(commonWays, arg1);
    } else if (typeof arg0 === 'function') {
      arg0.apply(sd, arg1);
    } else {
      sd.log('quick方法中没有这个功能' + arg[0]);
    }
  }


  function use(name, option) {
    if (!isString(name)) {
      sd.log('use插件名称必须是字符串！');
      return false;
    }

    if (isObject(window.SensorsDataWebJSSDKPlugin) && isObject(window.SensorsDataWebJSSDKPlugin[name]) && isFunction(window.SensorsDataWebJSSDKPlugin[name].init)) {
      window.SensorsDataWebJSSDKPlugin[name].init(sd, option);
      return window.SensorsDataWebJSSDKPlugin[name];
    } else if (isObject(sd.modules) && isObject(sd.modules[name]) && isFunction(sd.modules[name].init)) {
      sd.modules[name].init(sd, option);
      return sd.modules[name];
    } else {
      sd.log(name + '没有获取到,请查阅文档，调整' + name + '的引入顺序！');
    }
  }

  function track(e, p, c) {
    if (saEvent.check({
        event: e,
        properties: p
      })) {
      saEvent.send({
          type: 'track',
          event: e,
          properties: p
        },
        c
      );
    }
  }

  function bind(itemName, itemValue) {
    if (!saEvent.check({
        bindKey: itemName,
        bindValue: itemValue
      })) {
      return false;
    }

    sd.store._state.identities[itemName] = itemValue;
    sd.store.save();

    saEvent.send({
      type: 'track_id_bind',
      event: '$BindID',
      properties: {}
    });
  }

  function unbind(itemName, itemValue) {
    if (!saEvent.check({
        unbindKey: itemName,
        bindValue: itemValue
      })) {
      return false;
    }

    if (isObject(sd.store._state.identities) && sd.store._state.identities.hasOwnProperty(itemName) && sd.store._state.identities[itemName] === itemValue) {
      var loginID = sd.store.getUnionId().login_id;
      if (loginID && itemName + '+' + itemValue === loginID) {
        sd.store._state.distinct_id = sd.store._state.first_id;
        sd.store._state.first_id = '';
        sd.store.set('history_login_id', {
          name: '',
          value: ''
        });
      }

      if (itemName !== '$identity_cookie_id') {
        delete sd.store._state.identities[itemName];
        sd.store.save();
      }
    }

    var identities = {};
    identities[itemName] = itemValue;

    saEvent.send({
      identities: identities,
      type: 'track_id_unbind',
      event: '$UnbindID',
      properties: {}
    });
  }

  function trackLink(link, event_name, event_prop) {
    function _trackLink(obj, event_name, event_prop) {
      obj = obj || {};
      var link = null;
      if (obj.ele) {
        link = obj.ele;
      }
      if (obj.event) {
        if (obj.target) {
          link = obj.target;
        } else {
          link = obj.event.target;
        }
      }

      event_prop = event_prop || {};
      if (!link || typeof link !== 'object') {
        return false;
      }
      if (!link.href || /^javascript/.test(link.href) || link.target || link.download || link.onclick) {
        sd.track(event_name, event_prop);
        return false;
      }

      function linkFunc(e) {
        e.stopPropagation();
        e.preventDefault();
        var hasCalled = false;

        function track_a_click() {
          if (!hasCalled) {
            hasCalled = true;
            location.href = link.href;
          }
        }
        setTimeout(track_a_click, 1000);
        sd.track(event_name, event_prop, track_a_click);
      }
      if (obj.event) {
        linkFunc(obj.event);
      }
      if (obj.ele) {
        addEvent$1(obj.ele, 'click', function(e) {
          linkFunc(e);
        });
      }
    }

    if (typeof link === 'object' && link.tagName) {
      _trackLink({
        ele: link
      }, event_name, event_prop);
    } else if (typeof link === 'object' && link.target && link.event) {
      _trackLink(link, event_name, event_prop);
    }
  }

  function trackLinks(link, event_name, event_prop) {
    event_prop = event_prop || {};
    if (!link || typeof link !== 'object') {
      return false;
    }
    if (!link.href || /^javascript/.test(link.href) || link.target) {
      return false;
    }
    addEvent$1(link, 'click', function(e) {
      e.preventDefault();
      var hasCalled = false;
      setTimeout(track_a_click, 1000);

      function track_a_click() {
        if (!hasCalled) {
          hasCalled = true;
          location.href = link.href;
        }
      }
      sd.track(event_name, event_prop, track_a_click);
    });
  }

  function setItem(type, id, p) {
    if (saEvent.check({
        item_type: type,
        item_id: id,
        properties: p
      })) {
      saEvent.sendItem({
        type: 'item_set',
        item_type: type,
        item_id: id,
        properties: p || {}
      });
    }
  }

  function deleteItem(type, id) {
    if (saEvent.check({
        item_type: type,
        item_id: id
      })) {
      saEvent.sendItem({
        type: 'item_delete',
        item_type: type,
        item_id: id
      });
    }
  }

  function setProfile(p, c) {
    if (saEvent.check({
        propertiesMust: p
      })) {
      saEvent.send({
          type: 'profile_set',
          properties: p
        },
        c
      );
    }
  }

  function setOnceProfile(p, c) {
    if (saEvent.check({
        propertiesMust: p
      })) {
      saEvent.send({
          type: 'profile_set_once',
          properties: p
        },
        c
      );
    }
  }

  function appendProfile(p, c) {
    if (saEvent.check({
        propertiesMust: p
      })) {
      each(p, function(value, key) {
        if (isString(value)) {
          p[key] = [value];
        } else if (isArray(value)) {
          p[key] = value;
        } else {
          delete p[key];
          sd.log('appendProfile属性的值必须是字符串或者数组');
        }
      });
      if (!isEmptyObject(p)) {
        saEvent.send({
            type: 'profile_append',
            properties: p
          },
          c
        );
      }
    }
  }

  function incrementProfile(p, c) {
    var str = p;
    if (isString(p)) {
      p = {};
      p[str] = 1;
    }

    function isChecked(p) {
      for (var i in p) {
        if (Object.prototype.hasOwnProperty.call(p, i) && !/-*\d+/.test(String(p[i]))) {
          return false;
        }
      }
      return true;
    }

    if (saEvent.check({
        propertiesMust: p
      })) {
      if (isChecked(p)) {
        saEvent.send({
            type: 'profile_increment',
            properties: p
          },
          c
        );
      } else {
        sd.log('profile_increment的值只能是数字');
      }
    }
  }

  function deleteProfile(c) {
    saEvent.send({
        type: 'profile_delete'
      },
      c
    );
    store.set('distinct_id', UUID());
    store.set('first_id', '');
  }

  function unsetProfile(p, c) {
    var str = p;
    var temp = {};
    if (isString(p)) {
      p = [];
      p.push(str);
    }
    if (isArray(p)) {
      each(p, function(v) {
        if (isString(v)) {
          temp[v] = true;
        } else {
          sd.log('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
        }
      });
      saEvent.send({
          type: 'profile_unset',
          properties: temp
        },
        c
      );
    } else {
      sd.log('profile_unset的参数是数组');
    }
  }

  function identify(id, isSave) {
    if (typeof id === 'number') {
      id = String(id);
    }

    function saveIdentities(id) {
      sd.store._state.identities.$identity_anonymous_id = id;
      sd.store.save();
    }

    var firstId = store.getFirstId();
    if (typeof id === 'undefined') {
      var uuid = UUID();
      if (firstId) {
        store.set('first_id', uuid);
      } else {
        store.set('distinct_id', uuid);
      }
      saveIdentities(uuid);
    } else if (saEvent.check({
        distinct_id: id
      })) {
      if (isSave === true) {
        if (firstId) {
          store.set('first_id', id);
        } else {
          store.set('distinct_id', id);
        }
      } else {
        if (firstId) {
          store.change('first_id', id);
        } else {
          store.change('distinct_id', id);
        }
      }
      saveIdentities(id);
    }
  }

  function sendSignup(id, e, p, c) {
    var original_id = store.getFirstId() || store.getDistinctId();
    store.set('distinct_id', id);
    saEvent.send({
        original_id: original_id,
        distinct_id: sd.store.getDistinctId(),
        type: 'track_signup',
        event: e,
        properties: p
      },
      c
    );
  }

  function trackSignup(id, e, p, c) {
    if (typeof id === 'number') {
      id = String(id);
    }
    if (saEvent.check({
        distinct_id: id,
        event: e,
        properties: p
      })) {
      sendSignup(id, e, p, c);
    }
  }


  function registerPage(obj) {
    if (saEvent.check({
        properties: obj
      })) {
      extend(pageInfo.currentProps, obj);
    } else {
      sd.log('register输入的参数有误');
    }
  }

  function clearAllRegister(arr) {
    store.clearAllProps(arr);
  }

  function clearPageRegister(arr) {
    var i;
    if (isArray(arr) && arr.length > 0) {
      for (i = 0; i < arr.length; i++) {
        if (isString(arr[i]) && arr[i] in pageInfo.currentProps) {
          delete pageInfo.currentProps[arr[i]];
        }
      }
    } else if (arr === true) {
      for (i in pageInfo.currentProps) {
        delete pageInfo.currentProps[i];
      }
    }
  }

  function register(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setProps(props);
    } else {
      sd.log('register输入的参数有误');
    }
  }

  function registerOnce(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setPropsOnce(props);
    } else {
      sd.log('registerOnce输入的参数有误');
    }
  }

  function registerSession(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setSessionProps(props);
    } else {
      sd.log('registerSession输入的参数有误');
    }
  }

  function registerSessionOnce(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setSessionPropsOnce(props);
    } else {
      sd.log('registerSessionOnce输入的参数有误');
    }
  }

  function loginBody(obj) {
    var id = obj.id;
    var callback = obj.callback;
    var name = obj.name;

    var firstId = store.getFirstId();
    var distinctId = store.getOriginDistinctId();

    if (!saEvent.check({
        distinct_id: id
      })) {
      sd.log('login id is invalid');
      return false;
    }
    if (id === sd.store.getOriginDistinctId() && !firstId) {
      sd.log('login id is equal to distinct_id');
      return false;
    }
    if (isObject(sd.store._state.identities) && sd.store._state.identities.hasOwnProperty(name) && id === sd.store._state.first_id) {
      return false;
    }

    var isNewLoginId = sd.store._state.history_login_id.name !== name || id !== sd.store._state.history_login_id.value;
    if (isNewLoginId) {
      sd.store._state.identities[name] = id;
      sd.store.set('history_login_id', {
        name: name,
        value: id
      });

      if (!firstId) {
        store.set('first_id', distinctId);
      }

      sendSignup(id, '$SignUp', {}, callback);

      var tempObj = {
        $identity_cookie_id: sd.store._state.identities.$identity_cookie_id
      };
      tempObj[name] = id;
      resetIdentities(tempObj);
      return true;
    }
    return false;
  }

  function login(id, callback) {
    if (typeof id === 'number') {
      id = String(id);
    }
    var returnValue = loginBody({
      id: id,
      callback: callback,
      name: IDENTITY_KEY.LOGIN
    });
    !returnValue && isFunction(callback) && callback();
  }

  function loginWithKey(name, id) {
    if (typeof id === 'number') {
      id = String(id);
    }

    if (typeof name === 'number') {
      name = String(name);
    }

    if (!saEvent.check({
        loginIdKey: name
      })) {
      return false;
    }

    if (IDENTITY_KEY.LOGIN === name) {
      login(id);
      return false;
    }

    loginBody({
      id: id,
      callback: null,
      name: name
    });
  }

  function logout(isChangeId) {
    var firstId = store.getFirstId();
    if (firstId) {
      store.set('first_id', '');
      if (isChangeId === true) {
        var uuid = UUID();
        store.set('distinct_id', uuid);
      } else {
        store.set('distinct_id', firstId);
      }
    }
    resetIdentities({
      $identity_cookie_id: sd.store._state.identities.$identity_cookie_id
    });

    sd.store.set('history_login_id', {
      name: '',
      value: ''
    });
  }

  function getPresetProperties() {
    function getUtm() {
      var utms = pageInfo.campaignParams();
      var $utms = {};
      each(utms, function(v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      });
      return $utms;
    }

    var obj = {
      $is_first_day: isNewUser(),
      $is_first_time: saNewUser.is_page_first_visited,
      $referrer: pageInfo.pageProp.referrer || '',
      $referrer_host: pageInfo.pageProp.referrer ? getHostname(pageInfo.pageProp.referrer) : '',
      $url: getURL(),
      $url_path: getURLPath(),
      $title: document.title || '',
      _distinct_id: store.getDistinctId(),
      identities: JSON.parse(JSON.stringify(store._state.identities))
    };
    var result = extend({}, pageInfo.properties(), sd.store.getProps(), getUtm(), obj);
    if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
      result.$latest_referrer_host = result.$latest_referrer === '' ? '' : getHostname(result.$latest_referrer);
    }
    return result;
  }

  function iOSWebClickPolyfill() {
    var iOS_other_tags_css = '';
    var default_cursor_css = ' { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }';
    if (sd.heatmap && isArray(sd.heatmap.otherTags)) {
      each(sd.heatmap.otherTags, function(val) {
        iOS_other_tags_css += val + default_cursor_css;
      });
    }
    if (isIOS() && getIOSVersion() && getIOSVersion() < 13) {
      if (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div) {
        setCssStyle('div, [data-sensors-click]' + default_cursor_css);
      }
      if (sd.para.heatmap && sd.para.heatmap.track_attr) {
        setCssStyle('[' + sd.para.heatmap.track_attr.join('], [') + ']' + default_cursor_css);
      }
      if (iOS_other_tags_css !== '') {
        setCssStyle(iOS_other_tags_css);
      }
    }
  }

  var functions = {
    __proto__: null,
    addReferrerHost: addReferrerHost,
    addPropsHook: addPropsHook,
    initPara: initPara,
    setInitVar: setInitVar,
    enableLocalLog: enableLocalLog,
    disableLocalLog: disableLocalLog,
    quick: quick,
    use: use,
    track: track,
    bind: bind,
    unbind: unbind,
    trackLink: trackLink,
    trackLinks: trackLinks,
    setItem: setItem,
    deleteItem: deleteItem,
    setProfile: setProfile,
    setOnceProfile: setOnceProfile,
    appendProfile: appendProfile,
    incrementProfile: incrementProfile,
    deleteProfile: deleteProfile,
    unsetProfile: unsetProfile,
    identify: identify,
    trackSignup: trackSignup,
    registerPage: registerPage,
    clearAllRegister: clearAllRegister,
    clearPageRegister: clearPageRegister,
    register: register,
    registerOnce: registerOnce,
    registerSession: registerSession,
    registerSessionOnce: registerSessionOnce,
    login: login,
    loginWithKey: loginWithKey,
    logout: logout,
    getPresetProperties: getPresetProperties,
    iOSWebClickPolyfill: iOSWebClickPolyfill,
    readyState: readyState,
    para_default: defaultPara,
    log: sdLog,
    debug: debug,
    IDENTITY_KEY: IDENTITY_KEY,
    on: eventEmitterFacade
  };

  var EventEmitterSa = function() {
    this._events = [];
    this.pendingEvents = [];
  };

  EventEmitterSa.prototype = {
    emit: function(type) {
      var args = [].slice.call(arguments, 1);

      each(this._events, function(val) {
        if (val.type !== type) {
          return;
        }
        val.callback.apply(val.context, args);
      });

      this.pendingEvents.push({
        type: type,
        data: args
      });
      this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
    },
    on: function(event, callback, context, replayAll) {
      if (typeof callback !== 'function') {
        return;
      }
      this._events.push({
        type: event,
        callback: callback,
        context: context || this
      });

      replayAll = replayAll === false ? false : true;
      if (this.pendingEvents.length > 0 && replayAll) {
        each(this.pendingEvents, function(val) {
          if (val.type === event) {
            callback.apply(context, val.data);
          }
        });
      }
    },
    tempAdd: function(event, data) {
      if (!data || !event) {
        return;
      }
      return this.emit(event, data);
    },
    isReady: function() {}
  };



  var common = {
    __proto__: null,
    parseSuperProperties: parseSuperProperties,
    searchConfigData: searchConfigData,
    strip_empty_properties: strip_empty_properties,
    getCurrentDomain: getCurrentDomain,
    getEleInfo: getEleInfo,
    isBaiduTraffic: isBaiduTraffic,
    getReferrerEqid: getReferrerEqid,
    getReferrerEqidType: getReferrerEqidType,
    getBaiduKeyword: getBaiduKeyword,
    isReferralTraffic: isReferralTraffic,
    getReferrer: getReferrer,
    getKeywordFromReferrer: getKeywordFromReferrer,
    getWxAdIdFromUrl: getWxAdIdFromUrl,
    getReferSearchEngine: getReferSearchEngine,
    getSourceFromReferrer: getSourceFromReferrer,
    info: pageInfo,
    ajax: ajax$1,
    getElementContent: getElementContent$1,
    cookie: cookie$1,
    addEvent: addEvent$1,
    EventEmitterSa: EventEmitterSa,
    encrypt: encrypt,
    decryptIfNeeded: decryptIfNeeded
  };

  var businessStageImpl = {
    stage: null,
    init: function(stage) {
      this.stage = stage;
    }
  };

  function processGetUtmData() {
    return businessStageImpl.stage && businessStageImpl.stage.process('getUtmData');
  }

  var kit = {};

  kit.buildData = function(p) {
    var data = {
      identities: {},
      distinct_id: sd.store.getDistinctId(),
      lib: {
        $lib: 'js',
        $lib_method: 'code',
        $lib_version: String(sd.lib_version)
      },
      properties: {}
    };

    if (isObject(p) && isObject(p.identities) && !isEmptyObject(p.identities)) {
      extend(data.identities, p.identities);
    } else {
      extend(data.identities, store._state.identities);
    }

    if (isObject(p) && isObject(p.properties) && !isEmptyObject(p.properties)) {
      if (p.properties.$lib_detail) {
        data.lib.$lib_detail = p.properties.$lib_detail;
        delete p.properties.$lib_detail;
      }
      if (p.properties.$lib_method) {
        data.lib.$lib_method = p.properties.$lib_method;
        delete p.properties.$lib_method;
      }
    }

    extend(data, sd.store.getUnionId(), p);

    processAddCustomProps(data);

    if (isObject(p.properties) && !isEmptyObject(p.properties)) {
      extend(data.properties, p.properties);
    }


    if (!p.type || p.type.slice(0, 7) !== 'profile') {

      data.properties = extend({}, pageInfo.properties(), store.getProps(), store.getSessionProps(), pageInfo.currentProps, data.properties);
      if (sd.para.preset_properties.latest_referrer && !isString(data.properties.$latest_referrer)) {
        data.properties.$latest_referrer = '取值异常';
      }
      if (sd.para.preset_properties.latest_search_keyword && !isString(data.properties.$latest_search_keyword)) {
        if (!sd.para.preset_properties.search_keyword_baidu || !isString(data.properties.$search_keyword_id) || !isNumber(data.properties.$search_keyword_id_hash) || !isString(data.properties.$search_keyword_id_type)) {
          data.properties.$latest_search_keyword = '取值异常';
        }
      }
      if (sd.para.preset_properties.latest_traffic_source_type && !isString(data.properties.$latest_traffic_source_type)) {
        data.properties.$latest_traffic_source_type = '取值异常';
      }
      if (sd.para.preset_properties.latest_landing_page && !isString(data.properties.$latest_landing_page)) {
        data.properties.$latest_landing_page = '取值异常';
      }
      if (sd.para.preset_properties.latest_wx_ad_click_id === 'not_collect') {
        delete data.properties._latest_wx_ad_click_id;
        delete data.properties._latest_wx_ad_hash_key;
        delete data.properties._latest_wx_ad_callbacks;
      } else if (sd.para.preset_properties.latest_wx_ad_click_id && !isString(data.properties._latest_wx_ad_click_id)) {
        data.properties._latest_wx_ad_click_id = '取值异常';
        data.properties._latest_wx_ad_hash_key = '取值异常';
        data.properties._latest_wx_ad_callbacks = '取值异常';
      }
      if (isString(data.properties._latest_wx_ad_click_id)) {
        data.properties.$url = getURL();
      }
    }

    if (data.properties.$time && isDate(data.properties.$time)) {
      data.time = data.properties.$time * 1;
      delete data.properties.$time;
    } else {
      data.time = new Date() * 1;
    }

    sd.vtrackBase.addCustomProps(data);

    parseSuperProperties(data);

    saNewUser.checkIsAddSign(data);
    saNewUser.checkIsFirstTime(data);

    sd.addReferrerHost(data);
    sd.addPropsHook(data);

    processFormatData(data);
    return data;
  };

  kit.sendData = function(data, callback) {
    var data_config = searchConfigData(data.properties);
    if (sd.para.debug_mode === true) {
      sd.log(data);
      sd.saEvent.debugPath(JSON.stringify(data), callback);
    } else {
      sd.sendState.getSendCall(data, data_config, callback);
    }
  };

  kit.encodeTrackData = function(data) {
    var dataStr = base64Encode(data);
    var crc = 'crc=' + hashCode(dataStr);
    return 'data=' + encodeURIComponent(dataStr) + '&ext=' + encodeURIComponent(crc);
  };

  kit.getUtmData = function() {
    return processGetUtmData();
  };

  function getSendUrl(url, data) {
    var dataStr = kit.encodeTrackData(data);
    if (url.indexOf('?') !== -1) {
      return url + '&' + dataStr;
    }
    return url + '?' + dataStr;
  }

  function getSendData(data) {
    return kit.encodeTrackData(data);
  }

  var ImageSender = function(para) {
    this.callback = para.callback;
    this.img = document.createElement('img');
    this.img.width = 1;
    this.img.height = 1;
    if (sd.para.img_use_crossorigin) {
      this.img.crossOrigin = 'anonymous';
    }
    this.data = para.data;
    this.server_url = getSendUrl(para.server_url, para.data);
  };

  ImageSender.prototype.start = function() {
    var me = this;
    if (sd.para.ignore_oom) {
      this.img.onload = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onerror = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onabort = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
    }
    this.img.src = this.server_url;
  };

  ImageSender.prototype.lastClear = function() {
    var sys = getUA();
    if (sys.ie !== undefined) {
      this.img.src = 'about:blank';
    } else {
      this.img.src = '';
    }
  };

  var AjaxSender = function(para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  AjaxSender.prototype.start = function() {
    var me = this;
    ajax$1({
      url: this.server_url,
      type: 'POST',
      data: this.data,
      credentials: false,
      timeout: sd.para.datasend_timeout,
      cors: true,
      success: function() {
        me.isEnd();
      },
      error: function() {
        me.isEnd();
      }
    });
  };

  var BeaconSender = function(para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  BeaconSender.prototype.start = function() {
    var me = this;
    if (typeof navigator === 'object' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(this.server_url, this.data);
    }
    setTimeout(function() {
      me.isEnd();
    }, 40);
  };

  function getSendType(data) {
    var supportedSendTypes = ['image', 'ajax', 'beacon'];
    var sendType = supportedSendTypes[0];

    if (data.config && indexOf(supportedSendTypes, data.config.send_type) > -1) {
      sendType = data.config.send_type;
    } else {
      sendType = sd.para.send_type;
    }

    if (sendType === 'beacon' && isSupportBeaconSend() === false) {
      sendType = 'image';
    }

    if (sendType === 'ajax' && isSupportCors() === false) {
      sendType = 'image';
    }

    return sendType;
  }

  function getSender(data) {
    var sendType = getSendType(data);
    switch (sendType) {
      case 'image':
        return new ImageSender(data);
      case 'ajax':
        return new AjaxSender(data);
      case 'beacon':
        return new BeaconSender(data);
      default:
        return new ImageSender(data);
    }
  }

  function getRealtimeInstance(data) {
    var obj = getSender(data);
    var start = obj.start;
    obj.start = function() {
      var me = this;
      start.apply(this, arguments);
      setTimeout(function() {
        me.isEnd(true);
      }, sd.para.callback_timeout);
    };
    obj.end = function() {
      this.callback && this.callback();
      var self = this;
      setTimeout(function() {
        self.lastClear && self.lastClear();
      }, sd.para.datasend_timeout - sd.para.callback_timeout);
    };
    obj.isEnd = function() {
      if (!this.received) {
        this.received = true;
        this.end();
      }
    };
    return obj;
  }

  var sendStageImpl = {
    stage: null,
    init: function(stage) {
      this.stage = stage;
    },
    interceptor: {
      send: {
        entry: function(data, context) {
          var sd = context.sensors;
          var callback = data.callback;

          if (!sd.para.app_js_bridge) {
            sd.debug.apph5({
              data: data.data,
              step: '1',
              output: 'code'
            });
            sd.sendState.prepareServerUrl(data);
            return data;
          }

          if (!sd.para.app_js_bridge.is_mui) {
            if (sd.para.app_js_bridge.is_send === true) {
              sd.debug.apph5({
                data: data.data,
                step: '2',
                output: 'all'
              });
              sd.sendState.prepareServerUrl(data);
              return data;
            }
            sd._.isFunction(callback) && callback();
            return data;
          }

          if (sd.para.app_js_bridge.is_mui) {
            if (window.plus && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event) {
              window.plus.SDAnalytics.trackH5Event(data);
              sd._.isFunction(callback) && callback();
              return data;
            }

            if (sd.para.app_js_bridge.is_send === true) {
              sd.sendState.prepareServerUrl(data);
              return data;
            }

            sd._.isFunction(callback) && callback();
            return data;
          }
        }
      }
    }
  };


  var sendState = {};

  sendState.getSendCall = function(data, config, callback) {
    if (sd.is_heatmap_render_mode) {
      return false;
    }

    if (sd.readyState.state < 3) {
      sd.log('初始化没有完成');
      return false;
    }

    data._track_id = Number(String(getRandom()).slice(2, 5) + String(getRandom()).slice(2, 4) + String(new Date().getTime()).slice(-4));
    data._flush_time = new Date().getTime();

    var originData = data;

    data = JSON.stringify(data);

    var requestData = {
      data: originData,
      config: config,
      callback: callback
    };

    sd.events.tempAdd('send', originData);

    if (!sd.para.app_js_bridge && sd.para.batch_send && _localStorage.isSupport() && localStorage.length < 100) {
      sd.log(originData);
      sd.batchSend.add(requestData.data);
      return false;
    }
    if (originData.type === 'item_set' || originData.type === 'item_delete') {
      this.prepareServerUrl(requestData);
    } else {
      sendStageImpl.stage.process('beforeSend', requestData);
    }

    sd.log(originData);
  };

  sendState.prepareServerUrl = function(requestData) {
    if (typeof requestData.config === 'object' && requestData.config.server_url) {
      this.sendCall(requestData, requestData.config.server_url, requestData.callback);
    } else if (isArray(sd.para.server_url) && sd.para.server_url.length) {
      for (var i = 0; i < sd.para.server_url.length; i++) {
        this.sendCall(requestData, sd.para.server_url[i]);
      }
    } else if (typeof sd.para.server_url === 'string' && sd.para.server_url !== '') {
      this.sendCall(requestData, sd.para.server_url, requestData.callback);
    } else {
      sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
    }
  };

  sendState.sendCall = function(requestData, server_url, callback) {
    var data = {
      server_url: server_url,
      data: JSON.stringify(requestData.data),
      callback: callback,
      config: requestData.config
    };
    if (isObject(sd.para.jsapp) && !sd.para.jsapp.isOnline && typeof sd.para.jsapp.setData === 'function') {
      delete data.callback;
      data = JSON.stringify(data);
      sd.para.jsapp.setData(data);
    } else {
      this.realtimeSend(data);
    }
  };

  sendState.realtimeSend = function(data) {
    var instance = getRealtimeInstance(data);
    instance.start();
  };

  var dataStoragePrefix = 'sawebjssdk-';
  var tabStoragePrefix = 'tab-sawebjssdk-';

  function BatchSend() {
    this.sendTimeStamp = 0;
    this.timer = null;
    this.serverUrl = '';
    this.hasTabStorage = false;
  }

  BatchSend.prototype = {
    batchInterval: function() {
      if (this.serverUrl === '') this.getServerUrl();
      if (!this.hasTabStorage) {
        this.generateTabStorage();
        this.hasTabStorage = true;
      }
      var self = this;
      self.timer = setTimeout(function() {
        self.updateExpireTime();
        self.recycle();
        self.send();
        clearTimeout(self.timer);
        self.batchInterval();
      }, sd.para.batch_send.send_interval);
    },

    getServerUrl: function() {
      if ((isString(sd.para.server_url) && sd.para.server_url !== '') || (isArray(sd.para.server_url) && sd.para.server_url.length)) {
        this.serverUrl = isArray(sd.para.server_url) ? sd.para.server_url[0] : sd.para.server_url;
      } else {
        return sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
      }
    },

    send: function() {
      if (this.sendTimeStamp && now() - this.sendTimeStamp < sd.para.batch_send.datasend_timeout) return;
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        this.sendTimeStamp = now();
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
        if (tabStorage.data.length) {
          var data = [];
          for (var i = 0; i < tabStorage.data.length; i++) {
            data.push(sd.store.readObjectVal(tabStorage.data[i]));
          }
          this.request(data, tabStorage.data);
        }
      }
    },

    updateExpireTime: function() {
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
        tabStorage.expireTime = now() + sd.para.batch_send.send_interval * 2;
        tabStorage.serverUrl = this.serverUrl;
        _localStorage.set(this.tabKey, JSON.stringify(tabStorage));
      }
    },

    request: function(data, dataKeys) {
      var self = this;
      ajax({
        url: this.serverUrl,
        type: 'POST',
        data: 'data_list=' + encodeURIComponent(base64Encode(JSON.stringify(data))),
        credentials: false,
        timeout: sd.para.batch_send.datasend_timeout,
        cors: true,
        success: function() {
          self.remove(dataKeys);
          self.sendTimeStamp = 0;
        },
        error: function() {
          self.sendTimeStamp = 0;
        }
      });
    },

    remove: function(dataKeys) {
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        var tabStorageData = (safeJSONParse(tabStorage) || this.generateTabStorageVal()).data;
        for (var i = 0; i < dataKeys.length; i++) {
          var idx = indexOf(tabStorageData, dataKeys[i]);
          if (idx > -1) {
            tabStorageData.splice(idx, 1);
          }
          _localStorage.remove(dataKeys[i]);
        }
        _localStorage.set(this.tabKey, JSON.stringify(this.generateTabStorageVal(tabStorageData)));
      }
    },

    add: function(data) {
      var dataKey = dataStoragePrefix + String(getRandom());
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage === null) {
        this.tabKey = tabStoragePrefix + String(getRandom());
        tabStorage = this.generateTabStorageVal();
      } else {
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
      }
      tabStorage.data.push(dataKey);
      tabStorage.expireTime = now() + sd.para.batch_send.send_interval * 2;
      _localStorage.set(this.tabKey, JSON.stringify(tabStorage));
      sd.store.saveObjectVal(dataKey, data);
      if (data.type === 'track_signup' || data.event === '$pageview') {
        this.sendImmediately();
      }
    },

    generateTabStorage: function() {
      this.tabKey = tabStoragePrefix + String(getRandom());
      _localStorage.set(this.tabKey, JSON.stringify(this.generateTabStorageVal()));
    },

    generateTabStorageVal: function(data) {
      data = data || [];
      return {
        data: data,
        expireTime: now() + sd.para.batch_send.send_interval * 2,
        serverUrl: this.serverUrl
      };
    },

    sendImmediately: function() {
      this.send();
    },

    recycle: function() {
      var notSendMap = {},
        lockTimeout = 10000,
        lockPrefix = 'sajssdk-lock-get-';
      for (var i = 0; i < localStorage.length; i++) {
        var item = localStorage.key(i),
          self = this;
        if (item.indexOf(tabStoragePrefix) === 0) {
          var tabStorage = safeJSONParse(_localStorage.get(item)) || this.generateTabStorageVal();
          for (var j = 0; j < tabStorage.data.length; j++) {
            notSendMap[tabStorage.data[j]] = true;
          }
          if (now() > tabStorage.expireTime && this.serverUrl === tabStorage.serverUrl) {
            var concurrentStorage = new ConcurrentStorage(lockPrefix);
            concurrentStorage.get(item, lockTimeout, 1000, function(data) {
              if (data) {
                if (_localStorage.get(self.tabKey) === null) {
                  self.generateTabStorage();
                }
                var recycleData = safeJSONParse(data) || self.generateTabStorageVal();
                _localStorage.set(self.tabKey, JSON.stringify(self.generateTabStorageVal((safeJSONParse(_localStorage.get(self.tabKey)) || this.generateTabStorageVal()).data.concat(recycleData.data))));
              }
            });
          }
        } else if (item.indexOf(lockPrefix) === 0) {
          var lock = safeJSONParse(_localStorage.get(item)) || {
            expireTime: 0
          };
          if (now() - lock.expireTime > lockTimeout) {
            _localStorage.remove(item);
          }
        }
      }
      for (var n = 0; n < localStorage.length; n++) {
        var key1 = localStorage.key(n);
        if (key1.indexOf(dataStoragePrefix) === 0 && !notSendMap[key1]) {
          _localStorage.remove(key1);
        }
      }
    }
  };

  var batchSend = new BatchSend();

  var bridge = {
    bridge_info: {
      touch_app_bridge: false,
      verify_success: false,
      platform: '',
      support_two_way_call: false
    },
    is_verify_success: false,
    initPara: function() {
      var app_js_bridge_default = {
        is_send: sd.para.use_app_track_is_send === false || sd.para.use_app_track === 'only' ? false : true,
        white_list: [],
        is_mui: sd.para.use_app_track === 'mui' ? true : false
      };

      if (typeof sd.para.app_js_bridge === 'object') {
        sd.para.app_js_bridge = extend({}, app_js_bridge_default, sd.para.app_js_bridge);
      } else if (sd.para.use_app_track === true || sd.para.app_js_bridge === true || sd.para.use_app_track === 'only' || sd.para.use_app_track === 'mui') {
        sd.para.app_js_bridge = extend({}, app_js_bridge_default);
      }

      if (sd.para.app_js_bridge.is_send === false) {
        sd.log('设置了 is_send:false,如果打通失败，数据将被丢弃!');
      }
    },
    app_js_bridge_v1: function() {
      var app_info = null;
      var todo = null;

      function setAppInfo(data) {
        app_info = data;
        if (isJSONString(app_info)) {
          app_info = JSON.parse(app_info);
        }
        if (todo) {
          todo(app_info);
          todo = null;
          app_info = null;
        }
      }

      function getAndroid() {
        if (typeof window.SensorsData_APP_JS_Bridge === 'object' && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app) {
          app_info = SensorsData_APP_JS_Bridge.sensorsdata_call_app();
          if (isJSONString(app_info)) {
            app_info = JSON.parse(app_info);
          }
        }
      }
      window.sensorsdata_app_js_bridge_call_js = function(data) {
        setAppInfo(data);
      };

      function calliOS() {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
          var iframe = document.createElement('iframe');
          iframe.setAttribute('src', 'sensorsanalytics://getAppInfo');
          document.documentElement.appendChild(iframe);
          iframe.parentNode.removeChild(iframe);
          iframe = null;
        }
      }
      sd.getAppStatus = function(func) {
        calliOS();
        getAndroid();
        if (!func) {
          return app_info;
        } else {
          if (app_info === null) {
            todo = func;
          } else {
            func(app_info);
            app_info = null;
          }
        }
      };
    },
    hasVisualModeBridge: function() {
      var vBridgeObj = window['SensorsData_App_Visual_Bridge'];
      var vMode = 'sensorsdata_visualized_mode';
      return isObject(vBridgeObj) && vBridgeObj[vMode] && (vBridgeObj[vMode] === true || vBridgeObj[vMode]());
    },
    validateAppUrl: validateAppUrl
  };

  function SDKJSBridge(callType) {
    var that = this;
    this.type = callType;
    this.resultCbs = {};
    this.timeoutCbs = {};
    this.timerId = null;
    this.appCallJsCallback = null;

    if (!window.sensorsdata_app_call_js) {
      window.sensorsdata_app_call_js = function(callType, data) {
        if (callType in window.sensorsdata_app_call_js.modules) {
          return window.sensorsdata_app_call_js.modules[callType](data);
        }
      };
    }
    window.sensorsdata_app_call_js.modules = window.sensorsdata_app_call_js.modules || {};
    window.sensorsdata_app_call_js.modules[this.type] = function(data) {
      try {
        var tmp = base64Decode(data) || data;
        try {
          tmp = JSON.parse(tmp);
        } catch (e) {}

        var messageId = tmp && tmp.message_id;
        if (messageId && that.resultCbs[messageId]) {
          data = tmp;
          if (that.timeoutCbs[messageId] && that.timeoutCbs[messageId].isTimeout) {
            that.resultCbs[messageId].callbacks.length = 0;
            return;
          }

          if (that.resultCbs[messageId]) {
            that.resultCbs[messageId].result = data;
            clearTimeout(that.timerId);
            that.timeoutCbs[messageId].callbacks.length = 0;

            for (var i in that.resultCbs[messageId].callbacks) {
              that.resultCbs[messageId].callbacks[i].call(null, data);
              that.resultCbs[messageId].callbacks.splice(i, 1);
            }
          }
          return;
        }

        return that.appCallJsCallback && that.appCallJsCallback.call(null, data);
      } catch (error) {
        console.log('app 回调 js 异常', data);
      }
    };
  }

  SDKJSBridge.prototype.call = function(callArg, timeout) {
    var that = this;
    var callId = new Date().getTime().toString(16) + String(getRandom()).replace('.', '').slice(1, 8);

    this.resultCbs[callId] = that.resultCbs[callId] || {
      result: null,
      callbacks: []
    };
    this.timeoutCbs[callId] = that.timeoutCbs[callId] || {
      isTimeout: false,
      callbacks: []
    };
    callArg = callArg.data ? callArg : {
      data: callArg
    };
    callArg.data.message_id = callId;
    var appData = extend({
      callType: this.type
    }, callArg);

    if (timeout) {
      this.timerId = setTimeout(function() {
        that.timeoutCbs[callId].isTimeout = true;
        for (var i in that.timeoutCbs[callId].callbacks) {
          that.timeoutCbs[callId].callbacks[i].call(null);
          that.timeoutCbs[callId].callbacks.splice(i, 1);
        }
      }, timeout);
    }

    handleCommands(appData);

    return {
      onResult: function(callback) {
        if (that.resultCbs[callId].result) {
          callback(that.resultCbs[callId].result);
          return this;
        }!that.timeoutCbs[callId].isTimeout && that.resultCbs[callId].callbacks.push(callback);
        return this;
      },
      onTimeout: function(callback) {
        if (that.timeoutCbs[callId].isTimeout) {
          callback();
          return this;
        }!that.resultCbs[callId].result && that.timeoutCbs[callId].callbacks.push(callback);
        return this;
      }
    };
  };

  SDKJSBridge.prototype.onAppNotify = function(callback) {
    this.appCallJsCallback = callback;
  };

  SDKJSBridge.prototype.notifyApp = function(callArg, message_id) {
    var appData = extend({
      callType: this.type
    }, callArg);
    if (message_id) {
      appData.message_id = message_id;
    }
    return handleCommands(appData);
  };

  function handleCommands(appData) {
    try {
      if (sd.bridge.activeBridge && isFunction(sd.bridge.activeBridge.handleCommand)) {
        return sd.bridge.activeBridge.handleCommand(appData);
      }
    } catch (e) {
      sd.log('Error: handle command exception:' + e);
    }
    sd.log('数据发往App失败，App没有暴露bridge,type:' + appData.callType);
    return false;
  }

  function validateAppUrl(appUrl) {
    function resolveUrl(url) {
      var obj = {
        hostname: '',
        project: ''
      };
      try {
        url = _URL(url);
        obj.hostname = url.hostname;
        obj.project = url.searchParams.get('project') || 'default';
      } catch (e) {
        sd.log(e);
      }
      return obj;
    }

    var appObj = resolveUrl(appUrl);
    var H5Obj = resolveUrl(sd.para.server_url);
    if (appObj.hostname === H5Obj.hostname && appObj.project === H5Obj.project) {
      return true;
    }

    if (isArray(sd.para.app_js_bridge.white_list)) {
      for (var i = 0; i < sd.para.app_js_bridge.white_list.length; i++) {
        var urlobj = resolveUrl(sd.para.app_js_bridge.white_list[i]);
        if (urlobj.hostname === appObj.hostname && urlobj.project === appObj.project) {
          return true;
        }
      }
    }

    return false;
  }

  function DeprecatedJSBridge(arg) {
    this.bridge = new SDKJSBridge(arg.type);
  }

  DeprecatedJSBridge.prototype = {
    double: function() {},
    getAppData: function() {},
    hasAppBridge: function() {
      return sd.bridge.bridge_info.support_two_way_call;
    },
    init: function() {},
    jsCallApp: function() {},
    requestToApp: function(e) {
      this.bridge
        .call(e, e.timeout.time)
        .onResult(function(data) {
          isFunction(e.callback) && e.callback(data);
        })
        .onTimeout(function() {
          isFunction(e.timeout.callback) && e.timeout.callback();
        });
    }
  };

  var vtrackBase = {};
  vtrackBase.initUrl = function() {
    var url_info = {
      server_url: {
        project: '',
        host: ''
      },
      page_url: {
        host: '',
        pathname: ''
      }
    };
    var serverParse;
    if (!isString(sd.para.server_url)) {
      sd.log('----vcollect---server_url必须为字符串');
      return false;
    }
    try {
      serverParse = _URL(sd.para.server_url);
      url_info.server_url.project = serverParse.searchParams.get('project') || 'default';
      url_info.server_url.host = serverParse.host;
    } catch (error) {
      sd.log('----vcollect---server_url解析异常', error);
      return false;
    }

    var urlParse;
    try {
      urlParse = _URL(location.href);
      url_info.page_url.host = urlParse.hostname;
      url_info.page_url.pathname = urlParse.pathname;
    } catch (error) {
      sd.log('----vcollect---页面地址解析异常', error);
      return false;
    }
    return url_info;
  };

  vtrackBase.isDiv = function(obj) {
    if (obj.element_path) {
      var pathArr = obj.element_path.split('>');
      var lastPath = trim(pathArr.pop());
      if (lastPath.slice(0, 3) !== 'div') {
        return false;
      }
    }
    return true;
  };

  vtrackBase.configIsMatchNew = function(properties, eventConf) {
    if (isString(properties.$element_selector) && isString(eventConf.element_selector)) {
      if (eventConf.element_field === 'element_selector' && eventConf['function'] === 'equal') {
        return properties.$element_selector === eventConf.element_selector;
      }
      if (eventConf.element_field === 'element_selector' && eventConf['function'] === 'contain') {
        return properties.$element_selector.indexOf(eventConf.element_selector) > -1;
      }
    }
    if (isString(properties.$element_path) && isString(eventConf.element_path)) {
      if (eventConf.element_field === 'element_path' && eventConf['function'] === 'equal') {
        return properties.$element_path === eventConf.element_path;
      }
      if (eventConf.element_field === 'element_path' && eventConf['function'] === 'contain') {
        return properties.$element_path.indexOf(eventConf.element_path) > -1;
      }
    }
    return false;
  };

  vtrackBase.configIsMatch = function(properties, eventConf) {
    if (eventConf.limit_element_content) {
      if (eventConf.element_content !== properties.$element_content) {
        return false;
      }
    }
    if (eventConf.limit_element_position) {
      if (eventConf.element_position !== String(properties.$element_position)) {
        return false;
      }
    }

    if (eventConf.element_field && eventConf['function']) {
      return vtrackBase.configIsMatchNew(properties, eventConf);
    } else {
      return vtrackBase.configIsMatchOldVersion(properties, eventConf);
    }
  };

  vtrackBase.configIsMatchOldVersion = function(properties, eventConf) {
    if (!eventConf.element_path) {
      return false;
    }
    if (properties.$element_position !== undefined) {
      if (eventConf.element_path !== properties.$element_path) {
        return false;
      }
    } else {
      if (sd.vtrackBase.isDiv({
          element_path: eventConf.element_path
        })) {
        if (properties.$element_path.indexOf(eventConf.element_path) < 0) {
          return false;
        }
      } else {
        if (eventConf.element_path !== properties.$element_path) {
          return false;
        }
      }
    }
    return true;
  };

  vtrackBase.filterConfig = function(data, events, page_url) {
    var arr = [];
    if (!page_url) {
      var urlinfo = vtrackBase.initUrl();
      if (!urlinfo) {
        return [];
      } else {
        page_url = urlinfo.page_url;
      }
    }
    if (data.event === '$WebClick') {
      each(events, function(item) {
        if (isObject(item) && (item.event_type === 'webclick' || item.event_type === 'appclick') && isObject(item.event)) {
          if (item.event.url_host === page_url.host && item.event.url_path === page_url.pathname) {
            if (vtrackBase.configIsMatch(data.properties, item.event)) {
              arr.push(item);
            }
          }
        }
      });
    }
    return arr;
  };

  vtrackBase.getPropElInLi = function(li, list_selector) {
    if (!(li && isElement(li) && isString(list_selector))) {
      return null;
    }
    if (li.tagName.toLowerCase() !== 'li') {
      return null;
    }
    var li_selector = sd.heatmap.getDomSelector(li);
    var selector;
    if (li_selector) {
      selector = li_selector + list_selector;
      var target = getDomBySelector(selector);
      if (target) {
        return target;
      } else {
        return null;
      }
    } else {
      sd.log('----custom---获取同级属性元素失败，selector信息异常', li_selector, list_selector);
      return null;
    }
  };

  vtrackBase.getProp = function(propConf, data) {
    if (!isObject(propConf)) {
      return false;
    }
    if (!(isString(propConf.name) && propConf.name.length > 0)) {
      sd.log('----vcustom----属性名不合法,属性抛弃', propConf.name);
      return false;
    }

    var result = {};
    var value;
    var regResult;

    if (propConf.method === 'content') {
      var el;
      if (isString(propConf.element_selector) && propConf.element_selector.length > 0) {
        el = getDomBySelector(propConf.element_selector);
      } else if (data && isString(propConf.list_selector)) {
        var clickTarget = getDomBySelector(data.properties.$element_selector);
        if (clickTarget) {
          var closeli = sd.heatmap.getClosestLi(clickTarget);
          el = vtrackBase.getPropElInLi(closeli, propConf.list_selector);
        } else {
          sd.log('----vcustom----点击元素获取异常，属性抛弃', propConf.name);
          return false;
        }
      } else {
        sd.log('----vcustom----属性配置异常，属性抛弃', propConf.name);
        return false;
      }

      if (el && isElement(el)) {
        if (el.tagName.toLowerCase() === 'input') {
          value = el.value || '';
        } else if (el.tagName.toLowerCase() === 'select') {
          var sid = el.selectedIndex;
          if (isNumber(sid) && isElement(el[sid])) {
            value = getElementContent$1(el[sid], 'select');
          }
        } else {
          value = getElementContent$1(el, el.tagName.toLowerCase());
        }
      } else {
        sd.log('----vcustom----属性元素获取失败，属性抛弃', propConf.name);
        return false;
      }

      if (propConf.regular) {
        try {
          regResult = new RegExp(propConf.regular).exec(value);
        } catch (error) {
          sd.log('----vcustom----正则处理失败，属性抛弃', propConf.name);
          return false;
        }

        if (regResult === null) {
          sd.log('----vcustom----属性规则处理，未匹配到结果,属性抛弃', propConf.name);
          return false;
        } else {
          if (!(isArray(regResult) && isString(regResult[0]))) {
            sd.log('----vcustom----正则处理异常，属性抛弃', propConf.name, regResult);
            return false;
          }
          value = regResult[0];
        }
      }

      if (propConf.type === 'STRING') {
        result[propConf.name] = value;
      } else if (propConf.type === 'NUMBER') {
        if (value.length < 1) {
          sd.log('----vcustom----未获取到数字内容，属性抛弃', propConf.name, value);
          return false;
        }
        if (!isNaN(Number(value))) {
          result[propConf.name] = Number(value);
        } else {
          sd.log('----vcustom----数字类型属性转换失败，属性抛弃', propConf.name, value);
          return false;
        }
      }

      return result;
    } else {
      sd.log('----vcustom----属性不支持此获取方式', propConf.name, propConf.method);
      return false;
    }
  };

  vtrackBase.getAssignConfigs = function(func, config) {
    var url_info = vtrackBase.initUrl();
    if (!(url_info && url_info.page_url)) {
      return [];
    }
    if (!isObject(config)) {
      return [];
    }
    var arr = [];
    config.events = config.events || config.eventList;

    if (!(isArray(config.events) && config.events.length > 0)) {
      return [];
    }

    each(config.events, function(event) {
      if (isObject(event) && isObject(event.event) && event.event.url_host === url_info.page_url.host && event.event.url_path === url_info.page_url.pathname) {
        if (func(event)) {
          arr.push(event);
        }
      }
    });

    return arr;
  };

  vtrackBase.addCustomProps = function(data) {
    if (sd.bridge.bridge_info.verify_success === 'success') {
      var h5_props = sd.vapph5collect.customProp.geth5Props(JSON.parse(JSON.stringify(data)));
      if (isObject(h5_props) && !isEmptyObject(h5_props)) {
        data.properties = extend(data.properties, h5_props);
      }
    }

    var props = sd.vtrackcollect.customProp.getVtrackProps(JSON.parse(JSON.stringify(data)));
    if (isObject(props) && !isEmptyObject(props)) {
      data.properties = extend(data.properties, props);
    }
    return data;
  };

  vtrackBase.init = function() {
    sd.vtrackcollect.init();

    if (sd.bridge.bridge_info.verify_success === 'success') {
      sd.vapph5collect.init();
    }
  };

  var unlimitedDiv = {
    events: [],
    init: function(data) {
      this.filterWebClickEvents(data);
    },
    filterWebClickEvents: function(data) {
      this.events = sd.vtrackcollect.getAssignConfigs(function(event) {
        if (isObject(event) && event.event.unlimited_div === true && event.event_type === 'webclick') {
          return true;
        } else {
          return false;
        }
      }, data);
    },
    isTargetEle: function(ele) {
      var prop = sd.heatmap.getEleDetail(ele);

      if (!isObject(prop) || !isString(prop.$element_path)) {
        return false;
      }

      for (var i = 0; i < this.events.length; i++) {
        if (isObject(this.events[i]) && isObject(this.events[i].event) && sd.vtrackcollect.configIsMatch(prop, this.events[i].event)) {
          return true;
        }
      }

      return false;
    }
  };

  var customProp = {
    events: [],
    configSwitch: false,
    collectAble: function() {
      return this.configSwitch && isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config;
    },
    updateEvents: function(data) {
      this.events = sd.vtrackcollect.getAssignConfigs(function(event) {
        if (isObject(event) && isArray(event.properties) && event.properties.length > 0) {
          return true;
        } else {
          return false;
        }
      }, data);
      if (this.events.length) {
        this.configSwitch = true;
      } else {
        this.configSwitch = false;
      }
    },
    getVtrackProps: function(data) {
      var props = {};
      if (!this.collectAble()) {
        return {};
      }
      if (data.event === '$WebClick') {
        props = this.clickCustomPropMaker(data, this.events);
      }
      return props;
    },
    clickCustomPropMaker: function(data, events, configs) {
      var _this = this;
      configs = configs || this.filterConfig(data, events, sd.vtrackcollect.url_info.page_url);
      var props = {};
      if (!configs.length) {
        return {};
      }
      each(configs, function(config) {
        if (isArray(config.properties) && config.properties.length > 0) {
          each(config.properties, function(propConf) {
            var prop = _this.getProp(propConf, data);
            if (isObject(prop)) {
              extend(props, prop);
            }
          });
        }
      });
      return props;
    },
    getProp: vtrackBase.getProp,
    getPropElInLi: vtrackBase.getPropElInLi,

    filterConfig: vtrackBase.filterConfig
  };

  var vtrackcollect = {
    unlimitedDiv: unlimitedDiv,
    config: {},
    storageEnable: true,
    storage_name: 'webjssdkvtrackcollect',
    para: {
      session_time: 30 * 60 * 1000,
      timeout: 5000,
      update_interval: 30 * 60 * 1000
    },
    url_info: {},
    timer: null,
    update_time: null,
    customProp: customProp,
    initUrl: function() {
      var info = vtrackBase.initUrl();
      if (info) {
        var apiParse;
        try {
          apiParse = new urlParse(sd.para.server_url);
          apiParse._values.Path = '/config/visualized/Web.conf';
          info.api_url = apiParse.getUrl();
        } catch (error) {
          sd.log('----vtrackcollect---API地址解析异常', error);
          return false;
        }
        this.url_info = info;
      }
      return info;
    },
    init: function() {
      if (!(isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config)) {
        return false;
      }

      if (!_localStorage.isSupport()) {
        this.storageEnable = false;
      }
      if (!this.initUrl()) {
        sd.log('----vtrackcustom----初始化失败，url信息解析失败');
        return false;
      }

      if (!this.storageEnable) {
        this.getConfigFromServer();
      } else {
        var data = sd.store.readObjectVal(this.storage_name);
        if (!(isObject(data) && isObject(data.data))) {
          this.getConfigFromServer();
        } else if (!this.serverUrlIsSame(data.serverUrl)) {
          this.getConfigFromServer();
        } else {
          this.config = data.data;
          this.update_time = data.updateTime;
          this.updateConfig(data.data);
          var now_time = new Date().getTime();
          var duration = now_time - this.update_time;
          if (!(isNumber(duration) && duration > 0 && duration < this.para.session_time)) {
            this.getConfigFromServer();
          } else {
            var next_time = this.para.update_interval - duration;
            this.setNextFetch(next_time);
          }
        }
      }
      this.pageStateListenner();
    },
    serverUrlIsSame: function(obj) {
      if (!isObject(obj)) {
        return false;
      }
      if (obj.host === this.url_info.server_url.host && obj.project === this.url_info.server_url.project) {
        return true;
      }
      return false;
    },
    getConfigFromServer: function() {
      var _this = this;
      var success = function(code, data) {
        _this.update_time = new Date().getTime();
        var serverData = {};
        if (code === 200) {
          if (data && isObject(data) && data.os === 'Web') {
            serverData = data;
            _this.updateConfig(serverData);
          }
        } else if (code === 205) {
          _this.updateConfig(serverData);
        } else if (code === 304) {
          serverData = _this.config;
        } else {
          sd.log('----vtrackcustom----数据异常', code);
          _this.updateConfig(serverData);
        }
        _this.updateStorage(serverData);
        _this.setNextFetch();
      };
      var error = function(err) {
        _this.update_time = new Date().getTime();
        sd.log('----vtrackcustom----配置拉取失败', err);
        _this.setNextFetch();
      };
      this.sendRequest(success, error);
    },
    setNextFetch: function(time) {
      var _this = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      time = time || this.para.update_interval;
      this.timer = setTimeout(function() {
        _this.getConfigFromServer();
      }, time);
    },
    pageStateListenner: function() {
      var _this = this;
      listenPageState({
        visible: function() {
          var time = new Date().getTime();
          var duration = time - _this.update_time;
          if (isNumber(duration) && duration > 0 && duration < _this.para.update_interval) {
            var next_time = _this.para.update_interval - duration;
            _this.setNextFetch(next_time);
          } else {
            _this.getConfigFromServer();
          }
        },
        hidden: function() {
          if (_this.timer) {
            clearTimeout(_this.timer);
            _this.timer = null;
          }
        }
      });
    },
    updateConfig: function(data) {
      if (!isObject(data)) {
        return false;
      }
      this.config = data;
      this.customProp.updateEvents(data);
      this.unlimitedDiv.init(data);
    },
    updateStorage: function(data) {
      if (!this.storageEnable) {
        return false;
      }
      if (!isObject(data)) {
        return false;
      }
      var server_url;
      if (!this.url_info.server_url) {
        var urlinfo = sd.vtrackcollect.initUrl();
        if (!urlinfo) {
          return false;
        } else {
          server_url = urlinfo.server_url;
        }
      } else {
        server_url = this.url_info.server_url;
      }
      var obj = {
        updateTime: new Date().getTime(),
        data: data,
        serverUrl: server_url
      };
      sd.store.saveObjectVal(this.storage_name, obj);
    },
    sendRequest: function(suc, err) {
      var _this = this;
      var data = {
        app_id: this.url_info.page_url.host
      };
      if (this.config.version) {
        data.v = this.config.version;
      }
      jsonp({
        url: _this.url_info.api_url,
        callbackName: 'saJSSDKVtrackCollectConfig',
        data: data,
        timeout: _this.para.timeout,
        success: function(code, data) {
          suc(code, data);
        },
        error: function(error) {
          err(error);
        }
      });
    },

    getAssignConfigs: vtrackBase.getAssignConfigs,

    configIsMatch: vtrackBase.configIsMatch
  };

  var vapph5CustomProp = {
    events: [],
    getAssignConfigs: vtrackBase.getAssignConfigs,
    filterConfig: vtrackBase.filterConfig,
    getProp: vtrackBase.getProp,
    initUrl: vtrackBase.initUrl,
    updateEvents: function(events) {
      if (!isArray(events)) {
        return;
      }
      this.events = events;
    },
    init: function() {
      this.initAppGetPropsBridge();
    },
    geth5Props: function(data) {
      var props = {};
      var name_arr = [];
      var that = this;
      if (!this.events.length) {
        return {};
      }
      if (data.event === '$WebClick') {
        var events = this.filterConfig(data, this.events);
        if (!events.length) {
          return {};
        } else {
          each(events, function(event) {
            if (!isObject(event)) {
              return;
            }
            if (isArray(event.properties) && event.properties.length > 0) {
              each(event.properties, function(propConf) {
                if (!isObject(propConf)) {
                  return;
                }
                if (propConf.h5 === false) {
                  if (!isArray(props.sensorsdata_app_visual_properties)) {
                    props.sensorsdata_app_visual_properties = [];
                  }
                  props.sensorsdata_app_visual_properties.push(propConf);
                } else {
                  var prop = that.getProp(propConf, data);
                  if (isObject(prop)) {
                    props = extend(props, prop);
                  }
                }
              });
            }
            if (isString(event.event_name)) {
              name_arr.push(event.event_name);
            }
          });

          if (sd.bridge.hasVisualModeBridge()) {
            props.sensorsdata_web_visual_eventName = name_arr;
          }
        }
      }
      if (props.sensorsdata_app_visual_properties) {
        props.sensorsdata_app_visual_properties = base64Encode(JSON.stringify(props.sensorsdata_app_visual_properties));
      }

      return props;
    },

    initAppGetPropsBridge: function() {
      var that = this;
      var bridgeCall = new sd.SDKJSBridge('getJSVisualProperties');

      bridgeCall.onAppNotify(function(data) {
        var props = {};
        try {
          data = JSON.parse(base64Decode(data));
        } catch (error) {
          sd.log('getJSVisualProperties data parse error!');
        }
        if (isObject(data)) {
          var confs = data.sensorsdata_js_visual_properties;
          var url_info = that.initUrl();
          if (url_info) {
            url_info = url_info.page_url;
            if (isArray(confs) && confs.length > 0) {
              each(confs, function(propConf) {
                if (!isObject(propConf)) {
                  return;
                }
                if (propConf.url_host === url_info.host && propConf.url_path === url_info.pathname) {
                  if (propConf.h5) {
                    var prop = that.getProp(propConf);
                    if (isObject(prop)) {
                      props = extend(props, prop);
                    }
                  }
                }
              });
            }
          }
        }
        var platform = sd.bridge.bridge_info.platform;
        if (platform === 'android') {
          bridgeCall.notifyApp({
            data: props
          }, data.message_id);
        }
        return props;
      });

      return bridgeCall;
    }
  };

  var vapph5collect = {
    events: [],
    customProp: vapph5CustomProp,
    getAssignConfigs: vtrackBase.getAssignConfigs,
    initUrl: vtrackBase.initUrl,
    init: function() {
      if (!this.initUrl()) {
        return;
      }
      var result = this.getConfigFromApp();
      if (result) {
        this.updateConfigs(result);
      }
      this.customProp.init();
      this.initAppUpdateConfigBridge();
    },
    initAppUpdateConfigBridge: function() {
      var _this = this;
      return new sd.SDKJSBridge('updateH5VisualConfig').onAppNotify(function(data) {
        if (data) {
          try {
            data = JSON.parse(base64Decode(data));
          } catch (error) {
            sd.log('updateH5VisualConfig result parse error！');
            return;
          }
          _this.updateConfigs(data);
        }
      });
    },
    getConfigFromApp: function() {
      var result = new sd.SDKJSBridge('sensorsdata_get_app_visual_config').notifyApp();
      if (result) {
        try {
          result = JSON.parse(base64Decode(result));
        } catch (error) {
          result = null;
          sd.log('getAppVisualConfig result parse error！');
        }
      }
      return result;
    },
    updateConfigs: function(config) {
      this.events = this.filterConfigs(config);
      this.customProp.updateEvents(this.events);
    },
    filterConfigs: function(config) {
      return this.getAssignConfigs(function(event) {
        if (isObject(event) && event.h5 !== false) {
          return true;
        } else {
          return false;
        }
      }, config);
    }
  };

  function getFlagValue(param) {
    var result = null;
    try {
      var nameParams = JSON.parse(window.name);
      result = nameParams[param] ? _decodeURIComponent(nameParams[param]) : null;
    } catch (e) {
      result = null;
    }
    if (result === null) {
      result = getQueryParam(location.href, param) || null;
    }
    return result;
  }

  var heatmapMode = {
    isSeachHasKeyword: function() {
      if (getQueryParam(location.href, 'sa-request-id') !== '') {
        if (typeof sessionStorage.getItem('sensors-visual-mode') === 'string') {
          sessionStorage.removeItem('sensors-visual-mode');
        }
        return true;
      } else {
        return false;
      }
    },
    hasKeywordHandle: function() {
      var url = location.href;
      var id = getQueryParam(url, 'sa-request-id') || null;
      var type = getQueryParam(url, 'sa-request-type') || null;
      var web_url = getQueryParam(url, 'sa-request-url') || null;
      heatmap.setNotice(web_url);
      if (_sessionStorage.isSupport()) {
        if (web_url !== null) {
          sessionStorage.setItem('sensors_heatmap_url', web_url);
        }
        sessionStorage.setItem('sensors_heatmap_id', id);
        if (type !== null) {
          if (type === '1' || type === '2' || type === '3') {
            sessionStorage.setItem('sensors_heatmap_type', type);
          } else {
            type = null;
          }
        } else {
          var session_type = sessionStorage.getItem('sensors_heatmap_type');
          if (session_type !== null) {
            type = session_type;
          } else {
            type = null;
          }
        }
      }
      this.isReady(id, type);
    },
    isReady: function(data, type, url) {
      if (sd.para.heatmap_url) {
        loadScript({
          success: function() {
            setTimeout(function() {
              if (typeof sa_jssdk_heatmap_render !== 'undefined') {
                sa_jssdk_heatmap_render(sd, data, type, url);
                if (typeof console === 'object' && typeof console.log === 'function') {
                  if (!(sd.heatmap_version && sd.heatmap_version === sd.lib_version)) {
                    console.log('heatmap.js与sensorsdata.js版本号不一致，可能存在风险!');
                  }
                }
              }
            }, 0);
          },
          error: function() {},
          type: 'js',
          url: sd.para.heatmap_url
        });
      } else {
        sd.log('没有指定heatmap_url的路径');
      }
    },
    isStorageHasKeyword: function() {
      return _sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors_heatmap_id') === 'string';
    },
    storageHasKeywordHandle: function() {
      heatmap.setNotice();
      heatmapMode.isReady(sessionStorage.getItem('sensors_heatmap_id'), sessionStorage.getItem('sensors_heatmap_type'), location.href);
    },
    isWindowNameHasKeyword: function() {
      try {
        var nameParams = JSON.parse(window.name);
        var page_url = isString(nameParams['sa-request-page-url']) ? _decodeURIComponent(nameParams['sa-request-page-url']) : null;
        return nameParams['sa-request-id'] && isString(nameParams['sa-request-id']) && page_url === location.href;
      } catch (e) {
        return false;
      }
    },
    windowNameHasKeywordHandle: function() {
      var nameParams = JSON.parse(window.name);

      function getDecode(key) {
        var value = nameParams[key];
        return isString(value) ? _decodeURIComponent(value) : null;
      }
      var id = getDecode('sa-request-id');
      var type = getDecode('sa-request-type');
      var web_url = getDecode('sa-request-url');
      heatmap.setNotice(web_url);
      if (_sessionStorage.isSupport()) {
        if (web_url !== null) {
          sessionStorage.setItem('sensors_heatmap_url', web_url);
        }
        sessionStorage.setItem('sensors_heatmap_id', id);
        if (type !== null) {
          if (type === '1' || type === '2' || type === '3') {
            sessionStorage.setItem('sensors_heatmap_type', type);
          } else {
            type = null;
          }
        } else {
          if (sessionStorage.getItem('sensors_heatmap_type') !== null) {
            type = sessionStorage.getItem('sensors_heatmap_type');
          } else {
            type = null;
          }
        }
      }
      heatmapMode.isReady(id, type);
    }
  };

  var vtrackMode = {
    isStorageHasKeyword: function() {
      return _sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors-visual-mode') === 'string';
    },
    isSearchHasKeyword: function() {
      if (getFlagValue('sa-visual-mode') === true || getFlagValue('sa-visual-mode') === 'true') {
        if (typeof sessionStorage.getItem('sensors_heatmap_id') === 'string') {
          sessionStorage.removeItem('sensors_heatmap_id');
        }
        return true;
      } else {
        return false;
      }
    },
    loadVtrack: function() {
      loadScript({
        success: function() {},
        error: function() {},
        type: 'js',
        url: sd.para.vtrack_url ? sd.para.vtrack_url : getSafeHttpProtocol() + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vtrack.min.js'
      });
    },
    messageListener: function(event) {
      function validUrl(value) {
        if (isHttpUrl(value)) {
          return removeScriptProtocol(value);
        } else {
          sd.log('可视化模式检测 URL 失败');
          return false;
        }
      }

      if (event.data.source !== 'sa-fe') {
        return false;
      }
      if (event.data.type === 'v-track-mode') {
        if (event.data.data && event.data.data.isVtrack) {
          if (_sessionStorage.isSupport()) {
            sessionStorage.setItem('sensors-visual-mode', 'true');
          }
          if (event.data.data.userURL && location.href.match(/sa-visual-mode=true/)) {
            var valid_url = validUrl(event.data.data.userURL);
            if (valid_url) {
              window.location.href = valid_url;
            }
          } else {
            vtrackMode.loadVtrack();
          }
        }
        window.removeEventListener('message', vtrackMode.messageListener, false);
      }
    },
    removeMessageHandle: function() {
      if (window.removeEventListener) {
        window.removeEventListener('message', vtrackMode.messageListener, false);
      }
    },
    verifyVtrackMode: function() {
      if (window.addEventListener) {
        window.addEventListener('message', vtrackMode.messageListener, false);
      }
      vtrackMode.postMessage();
    },
    postMessage: function() {
      try {
        if (window.parent && window.parent.postMessage) {
          window.parent.postMessage({
              source: 'sa-web-sdk',
              type: 'v-is-vtrack',
              data: {
                sdkversion: '1.23.5'
              }
            },
            '*'
          );
        }
      } catch (e) {
        sd.log('浏览器版本过低，不支持 postMessage API');
      }
    },
    notifyUser: function() {
      var fn = function(event) {
        if (event.data.source !== 'sa-fe') {
          return false;
        }
        if (event.data.type === 'v-track-mode') {
          if (event.data.data && event.data.data.isVtrack) {
            alert('当前版本不支持，请升级部署神策数据治理');
          }
          window.removeEventListener('message', fn, false);
        }
      };
      if (window.addEventListener) {
        window.addEventListener('message', fn, false);
      }
      vtrackMode.postMessage();
    }
  };

  function defineMode(isLoaded) {
    var bridgeObj = sd.bridge.bridge_info;

    function getAndPostDebugInfo() {
      var arr = [];
      if (!bridgeObj.touch_app_bridge) {
        arr.push(sd.debug.defineMode('1'));
      }
      if (!isObject(sd.para.app_js_bridge)) {
        arr.push(sd.debug.defineMode('2'));
        bridgeObj.verify_success = false;
      }
      if (!(isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default')) {
        arr.push(sd.debug.defineMode('3'));
      }
      if (bridgeObj.verify_success === 'fail') {
        arr.push(sd.debug.defineMode('4'));
      }

      new sd.SDKJSBridge('app_alert').notifyApp({
        data: arr
      });
    }

    if (sd.bridge.hasVisualModeBridge()) {
      if (isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default') {
        if (isObject(sd.para.app_js_bridge) && bridgeObj.verify_success === 'success') {
          if (!isLoaded) {
            var protocol = location.protocol;
            var protocolArr = ['http:', 'https:'];
            protocol = indexOf(protocolArr, protocol) > -1 ? protocol : 'https:';
            loadScript({
              success: function() {
                setTimeout(function() {
                  if (typeof sa_jssdk_app_define_mode !== 'undefined') {
                    sa_jssdk_app_define_mode(sd, isLoaded);
                  }
                }, 0);
              },
              error: function() {},
              type: 'js',
              url: protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vapph5define.min.js'
            });
          } else {
            sa_jssdk_app_define_mode(sd, isLoaded);
          }
        } else {
          getAndPostDebugInfo();
        }
      } else {
        getAndPostDebugInfo();
      }
    }
  }

  function listenSinglePage() {
    if (sd.para.is_track_single_page) {
      spa.on('switch', function(last_url) {
        var sendData = function(extraData) {
          extraData = extraData || {};
          if (last_url !== location.href) {
            pageInfo.pageProp.referrer = getURL(last_url);
            sd.quick('autoTrack', extend({
              $url: getURL(),
              $referrer: getURL(last_url)
            }, extraData));
          }
        };
        if (typeof sd.para.is_track_single_page === 'boolean') {
          sendData();
        } else if (typeof sd.para.is_track_single_page === 'function') {
          var returnValue = sd.para.is_track_single_page();
          if (isObject(returnValue)) {
            sendData(returnValue);
          } else if (returnValue === true) {
            sendData();
          }
        }
      });
    }
  }

  function enterFullTrack() {
    if (sd._q && isArray(sd._q) && sd._q.length > 0) {
      each(sd._q, function(content) {
        sd[content[0]].apply(sd, Array.prototype.slice.call(content[1]));
      });
    }

    if (isObject(sd.para.heatmap)) {
      heatmap.initHeatmap();
      heatmap.initScrollmap();
    }
  }

  function trackMode() {
    sd.readyState.setState(3);

    new sd.SDKJSBridge('visualized').onAppNotify(function() {
      if (typeof sa_jssdk_app_define_mode !== 'undefined') {
        defineMode(true);
      } else {
        defineMode(false);
      }
    });

    defineMode(false);

    sd.bridge.app_js_bridge_v1();
    pageInfo.initPage();

    listenSinglePage();

    if (!sd.para.app_js_bridge && sd.para.batch_send && _localStorage.isSupport()) {
      sd.batchSend.batchInterval();
    }
    sd.store.init();

    sd.vtrackBase.init();

    sd.readyState.setState(4);


    enterFullTrack();
  }

  function detectMode() {
    if (heatmapMode.isSeachHasKeyword()) {
      heatmapMode.hasKeywordHandle();
    } else if (window.parent !== self && vtrackMode.isSearchHasKeyword()) {
      vtrackMode.verifyVtrackMode();
    } else if (heatmapMode.isWindowNameHasKeyword()) {
      heatmapMode.windowNameHasKeywordHandle();
    } else if (heatmapMode.isStorageHasKeyword()) {
      heatmapMode.storageHasKeywordHandle();
    } else if (window.parent !== self && vtrackMode.isStorageHasKeyword()) {
      vtrackMode.verifyVtrackMode();
    } else {
      trackMode();
      vtrackMode.notifyUser();
    }
  }

  var methods = ['setItem', 'deleteItem', 'getAppStatus', 'track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'clearPageRegister', 'bind', 'unbind', 'loginWithKey'];

  function checkState() {
    each(methods, function(method) {
      var oldFunc = sd[method];
      sd[method] = function() {
        if (sd.readyState.state < 3) {
          if (!isArray(sd._q)) {
            sd._q = [];
          }
          sd._q.push([method, arguments]);
          return false;
        }
        if (!sd.readyState.getState()) {
          try {
            console.error('请先初始化神策JS SDK');
          } catch (e) {
            sd.log(e);
          }
          return;
        }
        return oldFunc.apply(sd, arguments);
      };
    });
  }

  var saEmpty = {
    track: function(e, p, c) {},
    quick: function(name, p, t, c) {},
    register: function(obj) {},
    registerPage: function(obj) {},
    registerOnce: function(obj) {},
    clearAllRegister: function(arr) {},
    trackSignup: function(id, e, p, c) {},
    setProfile: function(prop, c) {},
    setOnceProfile: function(prop, c) {},
    appendProfile: function(prop, c) {},
    incrementProfile: function(prop, c) {},
    deleteProfile: function(c) {},
    unsetProfile: function(prop, c) {},
    identify: function(id, isSave) {},
    login: function(id, callback) {},
    logout: function(isChangeId) {},
    trackLink: function(link, event_name, event_prop) {},
    deleteItem: function(type, id) {},
    setItem: function(type, id, p) {},
    getAppStatus: function(func) {},
    clearPageRegister: function(arr) {}
  };

  function CancellationToken(canceled) {
    this.cancel = function() {
      canceled = true;
    };
    this.getCanceled = function() {
      return canceled || false;
    };
  }

  function InterceptorContext(data, pos, sd) {
    var originalData = null;
    try {
      originalData = JSON.parse(JSON.stringify(data || null));
    } catch (e) {
      sdLog(e);
    }
    this.getOriginalData = function() {
      return originalData;
    };
    this.getPosition = function() {
      return pos;
    };
    this.cancellationToken = new CancellationToken();
    this.sensors = sd;
  }

  function Stage(processDef) {
    if (!isObject(processDef)) {
      throw 'error: Stage constructor requires arguments.';
    }
    this.processDef = processDef;
    this.registeredInterceptors = {};
  }

  Stage.prototype.process = function(proc, data) {
    if (!proc || !(proc in this.processDef)) {
      sdLog('process [' + proc + '] is not supported');
      return;
    }

    var itcptrs = this.registeredInterceptors[proc];
    if (itcptrs && isArray(itcptrs) && itcptrs.length > 0) {
      var pos = {
        current: 0,
        total: itcptrs.length
      };
      var context = new InterceptorContext(data, pos, sd);

      for (var i = 0; i < itcptrs.length; i++) {
        try {
          pos.current = i + 1;
          data = itcptrs[i].call(null, data, context) || data;
          if (context.cancellationToken.getCanceled()) {
            break;
          }
        } catch (e) {
          sdLog('interceptor error:' + e);
        }
      }
    }

    if (this.processDef[proc] && this.processDef[proc] in this.processDef) {
      data = this.process(this.processDef[proc], data);
    }
    return data;
  };

  Stage.prototype.registerStageImplementation = function(stageImpl) {
    if (!stageImpl || !stageImpl.init || !isFunction(stageImpl.init)) {
      return;
    }
    stageImpl.init(this);
    stageImpl.interceptor && this.registerInterceptor(stageImpl.interceptor);
  };

  Stage.prototype.registerInterceptor = function(interceptor) {
    if (!interceptor) {
      return;
    }
    for (var i in interceptor) {
      var itcptr = interceptor[i];
      if (!itcptr || !isObject(itcptr) || !isFunction(itcptr.entry)) {
        continue;
      }

      if (!isNumber(itcptr.priority)) {
        itcptr.priority = Number.MAX_VALUE;
      }

      if (!this.registeredInterceptors[i]) {
        this.registeredInterceptors[i] = [];
      }

      var curIts = this.registeredInterceptors[i];
      itcptr.entry.priority = itcptr.priority;
      curIts.push(itcptr.entry);

      curIts.sort(function(ita, itb) {
        return ita.priority - itb.priority;
      });
    }
  };

  var processDef = {
    addCustomProps: null,
    formatData: null
  };

  var dataStage = new Stage(processDef);

  var processDef$1 = {
    beforeSend: 'send',
    send: 'afterSend',
    afterSend: null
  };

  var sendStage = new Stage(processDef$1);

  var processDef$2 = {
    getUtmData: null
  };

  var businessStage = new Stage(processDef$2);

  function registerFeature(feature) {
    feature && feature.dataStage && dataStage.registerStageImplementation(feature.dataStage);
    feature && feature.businessStage && businessStage.registerStageImplementation(feature.businessStage);
    feature && feature.sendStage && sendStage.registerStageImplementation(feature.sendStage);
  }

  var interceptorRegisters = {
    dataStage: function registerDataStageInterceptor(interceptor) {
      interceptor && dataStage.registerInterceptor(interceptor);
    },
    businessStage: function registerBusinessInterceptor(interceptor) {
      interceptor && businessStage.registerInterceptor(interceptor);
    },
    sendStage: function registerSendStageInterceptor(interceptor) {
      interceptor && sendStage.registerInterceptor(interceptor);
    }
  };

  function registerInterceptor(stage, interceptor) {
    if (interceptorRegisters[stage]) {
      interceptorRegisters[stage](interceptor);
    }
  }

  function CoreFeature(sd) {
    sd.kit = kit;
    sd.saEvent = saEvent;
    this.dataStage = dataStageImpl;
    this.sendStage = sendStageImpl;
    this.businessStage = businessStageImpl;
  }

  function strip_sa_properties(p) {
    if (!isObject(p)) {
      return p;
    }
    each(p, function(v, k) {
      if (isArray(v)) {
        var temp = [];
        each(v, function(arrv) {
          if (isString(arrv)) {
            temp.push(arrv);
          } else {
            sdLog('您的数据-', k, v, '的数组里的值必须是字符串,已经将其删除');
          }
        });
        p[k] = temp;
      }
      if (!(isString(v) || isNumber(v) || isDate(v) || isBoolean(v) || isArray(v) || isFunction(v) || k === '$option')) {
        sdLog('您的数据-', k, v, '-格式不满足要求，我们已经将其删除');
        delete p[k];
      }
    });
    return p;
  }

  function formatString(str, maxLen) {
    if (isNumber(maxLen) && str.length > maxLen) {
      sdLog('字符串长度超过限制，已经做截取--' + str);
      return str.slice(0, maxLen);
    } else {
      return str;
    }
  }

  function filterReservedProperties(obj) {
    var reservedFields = ['distinct_id', 'user_id', 'id', 'date', 'datetime', 'event', 'events', 'first_id', 'original_id', 'device_id', 'properties', 'second_id', 'time', 'users'];
    if (!isObject(obj)) {
      return;
    }
    each(reservedFields, function(key, index) {
      if (!(key in obj)) {
        return;
      }
      if (index < 3) {
        delete obj[key];
        sdLog('您的属性- ' + key + '是保留字段，我们已经将其删除');
      } else {
        sdLog('您的属性- ' + key + '是保留字段，请避免其作为属性名');
      }
    });
  }

  function searchObjString(o) {
    var white_list = ['$element_selector', '$element_path'];
    var infinite_list = ['sensorsdata_app_visual_properties'];
    if (isObject(o)) {
      each(o, function(a, b) {
        if (isObject(a)) {
          searchObjString(o[b]);
        } else {
          if (isString(a)) {
            if (indexOf(infinite_list, b) > -1) {
              return;
            }
            o[b] = formatString(a, indexOf(white_list, b) > -1 ? 1024 : sdPara.max_string_length);
          }
        }
      });
    }
  }

  function searchZZAppStyle(data) {
    if (typeof data.properties.$project !== 'undefined') {
      data.project = data.properties.$project;
      delete data.properties.$project;
    }
    if (typeof data.properties.$token !== 'undefined') {
      data.token = data.properties.$token;
      delete data.properties.$token;
    }
  }

  function formatItem(data) {
    if ('item_type' in data) {
      var item_type = data['item_type'];

      var typeOnComplete = function(status) {
        if (!status) {
          delete data['item_type'];
        }
        return true;
      };

      check({
        item_type: item_type
      }, typeOnComplete);
    }
    if ('item_id' in data) {
      var item_id = data['item_id'];
      var idOnComplete = function(status, val, rule) {
        if (!status && rule === 'string') {
          delete data['item_id'];
        }
        return true;
      };
      check({
        item_id: item_id
      }, idOnComplete);
    }
  }

  function formatProperties(p) {
    each(p, function(val, key) {
      var onComplete = function(status, value, rule_type) {
        if (!status && rule_type !== 'keyLength') {
          delete p[key];
        }
        return true;
      };
      check({
        propertyKey: key
      }, onComplete);
    });
  }

  function formatData(data) {
    var p = data.properties;

    if (isObject(p)) {
      strip_sa_properties(p);

      filterReservedProperties(p);

      searchZZAppStyle(data);

      formatProperties(p);

      searchObjString(p);
    } else if ('properties' in data) {
      data.properties = {};
    }

    searchObjDate(data);

    formatItem(data);
  }

  var dataStageImpl$1 = {
    init: function() {},
    interceptor: {
      formatData: {
        priority: 0,
        entry: function(data) {
          formatData(data);
          return data;
        }
      }
    }
  };

  function DataFormatFeature() {
    this.dataStage = dataStageImpl$1;
  }

  var preCfg = window['sensors_data_pre_config'];
  var is_compliance_enabled = isObject(preCfg) ? preCfg.is_compliance_enabled : false;

  function implementCore(isRealImp) {
    if (isRealImp) {
      logger.setup(sdLog);
      sd._ = extend(W, common);
      sd.ee = ee;
      sd.sendState = sendState;
      sd.events = new sd._.EventEmitterSa();
      sd.batchSend = batchSend;
      sd.bridge = bridge;
      sd.SDKJSBridge = SDKJSBridge;
      sd.JSBridge = DeprecatedJSBridge;
      sd.store = store;
      sd.vtrackBase = vtrackBase;
      sd.unlimitedDiv = unlimitedDiv;
      sd.customProp = customProp;
      sd.vtrackcollect = vtrackcollect;
      sd.vapph5collect = vapph5collect;
      sd.heatmap = heatmap;
      sd.detectMode = detectMode;
      sd.registerFeature = registerFeature;
      sd.registerInterceptor = registerInterceptor;
      registerFeature(new CoreFeature(sd));
      registerFeature(new DataFormatFeature(sd));
    }

    var imp = isRealImp ? functions : saEmpty;
    for (var f in imp) {
      sd[f] = imp[f];
    }
    sd.on = eventEmitterFacade;
    sd.ee = ee;
    sd.use = use;
  }

  sd.init = function(para) {
    ee.sdk.emit('beforeInit');
    if (sd.readyState && sd.readyState.state && sd.readyState.state >= 2) {
      return false;
    }

    if (is_compliance_enabled) {
      implementCore(true);
    }

    ee.initSystemEvent();

    sd.setInitVar();
    sd.readyState.setState(2);
    sd.initPara(para);
    ee.sdk.emit('afterInitPara');
    sd.detectMode();
    sd.iOSWebClickPolyfill();
    ee.sdk.emit('afterInit');
  };

  if (is_compliance_enabled) {
    implementCore(false);
  } else {
    implementCore(true);
    checkState();
  }

  var _sd = sd;
  try {
    sd.modules = {};
    sd.modules['AndroidBridge'] = (function() {
      'use strict';

      var vbridge = window.SensorsData_App_Visual_Bridge;
      var vmode = vbridge && vbridge.sensorsdata_visualized_mode;
      var valert = vbridge && vbridge.sensorsdata_visualized_alert_info;
      var vhover = vbridge && vbridge.sensorsdata_hover_web_nodes;

      function alertApp(request) {
        return valert && valert.call(vbridge, JSON.stringify(request));
      }

      function hoverNode(request) {
        return vmode.call(vbridge) && vhover && vhover.call(vbridge, JSON.stringify(request));
      }

      function callBridge(request, bridge) {
        return bridge && typeof bridge[request.callType] === 'function' && bridge[request.callType]();
      }

      var vbridge$1 = {
        isVerify: function() {
          return vmode && (vmode === true || vmode.call(vbridge));
        },
        commands: {
          app_alert: alertApp,
          visualized_track: hoverNode,
          page_info: hoverNode,
          sensorsdata_get_app_visual_config: callBridge
        }
      };

      var anBridge;
      var anTrack;
      var anServerUrl;
      var sd, _, log;

      var AndroidBridge = {
        init: function(sensors) {
          sd = sensors;
          _ = sd && sd._;
          log = (sd && sd.log) || (console && console.log) || function() {};
          sd.on && sd.on('sdkAfterInitPara', initBridge);
        },
        handleCommand: handleCommand
      };

      function initBridge() {
        anBridge = window.SensorsData_APP_New_H5_Bridge;
        anTrack = anBridge && anBridge.sensorsdata_track;
        anServerUrl = anTrack && anBridge.sensorsdata_get_server_url && anBridge.sensorsdata_get_server_url();

        if (!sd || sd.bridge.activeBridge || !anServerUrl) {
          return;
        }

        sd.bridge.activeBridge = AndroidBridge;

        if (sd.para.app_js_bridge && !sd.para.app_js_bridge.is_mui) {
          sd.bridge.is_verify_success = anServerUrl && sd.bridge.validateAppUrl(anServerUrl);
        }

        sd.bridge.bridge_info = {
          touch_app_bridge: true,
          platform: 'android',
          verify_success: sd.bridge.is_verify_success ? 'success' : 'fail',
          support_two_way_call: anBridge.sensorsdata_js_call_app ? true : false
        };

        if (!sd.para.app_js_bridge) {
          log('app_js_bridge is not configured, data will not be sent by android bridge.');
          return;
        }

        sd.registerInterceptor('sendStage', {
          send: {
            priority: 0,
            entry: sendData
          }
        });

        log('Android bridge inits succeed.');
      }

      function sendData(rqData, ctx) {
        if (sd.para.app_js_bridge.is_mui) {
          return rqData;
        }

        var callback = rqData.callback;
        if (sd.bridge.is_verify_success) {
          anTrack && anTrack.call(anBridge, JSON.stringify(_.extend({
            server_url: sd.para.server_url
          }, rqData.data)));
          _.isFunction(callback) && callback();
          ctx.cancellationToken.cancel();
          return rqData;
        }

        if (sd.para.app_js_bridge.is_send) {
          sd.debug.apph5({
            data: rqData.data,
            step: '4.2',
            output: 'all'
          });
          return rqData;
        }

        _.isFunction(callback) && callback();
        ctx.cancellationToken.cancel();
        return rqData;
      }

      function handleCommand(request) {
        var callType = request.callType;
        if (callType in vbridge$1.commands) {
          return vbridge$1.commands[callType](request, anBridge);
        }
        if (anBridge && _.isFunction(anBridge.sensorsdata_js_call_app)) {
          anBridge.sensorsdata_js_call_app(JSON.stringify(request));
        }
      }

      if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
        window.SensorsDataWebJSSDKPlugin.AndroidBridge = window.SensorsDataWebJSSDKPlugin.AndroidBridge || AndroidBridge;
      } else {
        window.SensorsDataWebJSSDKPlugin = {
          AndroidBridge: AndroidBridge
        };
      }

      return AndroidBridge;

    }());

    sd.modules['AndroidObsoleteBridge'] = (function() {
      'use strict';

      var vbridge = window.SensorsData_App_Visual_Bridge;
      var vmode = vbridge && vbridge.sensorsdata_visualized_mode;
      var valert = vbridge && vbridge.sensorsdata_visualized_alert_info;
      var vhover = vbridge && vbridge.sensorsdata_hover_web_nodes;

      function alertApp(request) {
        return valert && valert.call(vbridge, JSON.stringify(request));
      }

      function hoverNode(request) {
        return vmode.call(vbridge) && vhover && vhover.call(vbridge, JSON.stringify(request));
      }

      function callBridge(request, bridge) {
        return bridge && typeof bridge[request.callType] === 'function' && bridge[request.callType]();
      }

      var vbridge$1 = {
        isVerify: function() {
          return vmode && (vmode === true || vmode.call(vbridge));
        },
        commands: {
          app_alert: alertApp,
          visualized_track: hoverNode,
          page_info: hoverNode,
          sensorsdata_get_app_visual_config: callBridge
        }
      };

      var anBridge;
      var anTrack;
      var anVerify;
      var anVisualVerify;
      var sd, _, log;

      var AndroidObsoleteBridge = {
        init: function(sensors) {
          sd = sensors;
          _ = sd && sd._;
          log = (sd && sd.log) || (console && console.log) || function() {};
          sd.on && sd.on('sdkAfterInitPara', initBridge);
        },
        handleCommand: handleCommand
      };

      function initBridge() {
        anBridge = window.SensorsData_APP_JS_Bridge;
        anTrack = anBridge && anBridge.sensorsdata_track;
        anVerify = anBridge && anBridge.sensorsdata_verify;
        anVisualVerify = anBridge && anBridge.sensorsdata_visual_verify;

        if (!sd || sd.bridge.activeBridge || !(anVerify || anTrack || anVisualVerify)) {
          return;
        }

        sd.bridge.activeBridge = AndroidObsoleteBridge;

        var verifyOk = anVerify || anTrack;
        if (anVisualVerify) {
          verifyOk = anVisualVerify.call(anBridge, JSON.stringify({
            server_url: sd.para.server_url
          })) ? true : false;
        }

        sd.bridge.bridge_info = {
          touch_app_bridge: true,
          platform: 'android',
          verify_success: verifyOk ? 'success' : 'fail'
        };

        if (!sd.para.app_js_bridge) {
          log('app_js_bridge is not configured, data will not be sent by android obsolete bridge.');
          return;
        }

        sd.registerInterceptor('sendStage', {
          send: {
            priority: 0,
            entry: sendData
          }
        });

        log('Android obsolete bridge inits succeed.');
      }

      function sendData(rqData, ctx) {
        if (sd.para.app_js_bridge.is_mui) {
          return rqData;
        }
        var callback = rqData.callback;
        if (anVerify) {
          var success = anVerify && anVerify.call(anBridge, JSON.stringify(_.extend({
            server_url: sd.para.server_url
          }, rqData.data)));
          if (success) {
            _.isFunction(callback) && callback();
            ctx.cancellationToken.cancel();
            return rqData;
          }
          if (sd.para.app_js_bridge.is_send) {
            sd.debug.apph5({
              data: rqData.data,
              step: '3.1',
              output: 'all'
            });
            return rqData;
          }
          _.isFunction(callback) && callback();
          ctx.cancellationToken.cancel();
          return rqData;
        }

        anTrack && anTrack.call(anBridge, JSON.stringify(_.extend({
          server_url: sd.para.server_url
        }, rqData.data)));
        _.isFunction(callback) && callback();
        ctx.cancellationToken.cancel();
        return rqData;
      }

      function handleCommand(request) {
        var callType = request.callType;
        if (callType in vbridge$1.commands) {
          return vbridge$1.commands[callType](request, anBridge);
        }
        if (anBridge && _.isFunction(anBridge.sensorsdata_js_call_app)) {
          return anBridge.sensorsdata_js_call_app(JSON.stringify(request));
        }
      }

      if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
        window.SensorsDataWebJSSDKPlugin.AndroidObsoleteBridge = window.SensorsDataWebJSSDKPlugin.AndroidObsoleteBridge || AndroidObsoleteBridge;
      } else {
        window.SensorsDataWebJSSDKPlugin = {
          AndroidObsoleteBridge: AndroidObsoleteBridge
        };
      }

      return AndroidObsoleteBridge;

    }());

    sd.modules['IosBridge'] = (function() {
      'use strict';

      var iosServerUrl;
      var iosTracker;

      var sd, _, log;
      var IOSBridge = {
        init: function(sensors) {
          sd = sensors;
          _ = sd && sd._;
          log = (sd && sd.log) || (console && console.log) || function() {};
          sd.on && sd.on('sdkAfterInitPara', initBridge);
        },
        handleCommand: handleCommand
      };

      function initBridge() {
        iosServerUrl = window.SensorsData_iOS_JS_Bridge && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url;
        iosTracker = function() {
          return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker;
        };

        if (!sd || sd.bridge.activeBridge || !iosTracker() || !iosTracker().postMessage) {
          return;
        }

        sd.bridge.activeBridge = IOSBridge;
        if (sd.para.app_js_bridge && !sd.para.app_js_bridge.is_mui) {
          sd.bridge.is_verify_success = iosServerUrl && sd.bridge.validateAppUrl(iosServerUrl);
        }

        sd.bridge.bridge_info = {
          touch_app_bridge: true,
          platform: 'ios',
          verify_success: sd.bridge.is_verify_success ? 'success' : 'fail',
          support_two_way_call: true
        };

        if (!sd.para.app_js_bridge) {
          log('app_js_bridge is not configured, data will not be sent by iOS bridge.');
          return;
        }

        sd.registerInterceptor('sendStage', {
          send: {
            priority: 0,
            entry: sendData
          }
        });

        log('IOS bridge inits succeed.');
      }

      function sendData(rqData, ctx) {
        if (sd.para.app_js_bridge.is_mui) {
          return rqData;
        }
        var callback = rqData.callback;
        if (sd.bridge.is_verify_success) {
          iosTracker() &&
            iosTracker().postMessage(
              JSON.stringify({
                callType: 'app_h5_track',
                data: _.extend({
                  server_url: sd.para.server_url
                }, rqData.data)
              })
            );
          _.isFunction(callback) && callback();
          ctx.cancellationToken.cancel();
          return rqData;
        }

        if (sd.para.app_js_bridge.is_send) {
          sd.debug.apph5({
            data: rqData.data,
            step: '4.1',
            output: 'all'
          });
          return rqData;
        }

        _.isFunction(callback) && callback();
        ctx.cancellationToken.cancel();
        return rqData;
      }

      function handleCommand(request) {
        var callType = request.callType;
        if ((callType === 'page_info' || callType === 'visualized_track') && !sd.bridge.hasVisualModeBridge()) {
          return null;
        }

        if (callType === 'sensorsdata_get_app_visual_config') {
          return _.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge[callType];
        }

        return iosTracker() && iosTracker().postMessage(JSON.stringify(request));
      }

      if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
        window.SensorsDataWebJSSDKPlugin.IOSBridge = window.SensorsDataWebJSSDKPlugin.IOSBridge || IOSBridge;
      } else {
        window.SensorsDataWebJSSDKPlugin = {
          IOSBridge: IOSBridge
        };
      }

      return IOSBridge;

    }());

    sd.modules['IosObsoleteBridge'] = (function() {
      'use strict';

      var sd, _, log;
      var IOSObsoleteBridge = {
        init: function(sensors) {
          sd = sensors;
          _ = sd && sd._;
          log = (sd && sd.log) || (console && console.log) || function() {};
          sd.on && sd.on('sdkAfterInitPara', initBridge);
        }
      };

      function initBridge() {
        if (!sd || sd.bridge.activeBridge || !hasBridge()) {
          return;
        }

        sd.bridge.activeBridge = IOSObsoleteBridge;
        sd.bridge.bridge_info = {
          touch_app_bridge: true,
          platform: 'ios',
          verify_success: verifyIOSObsoleteBridge() ? 'success' : 'fail'
        };

        if (!sd.para.app_js_bridge) {
          log('app_js_bridge is not configured, data will not be sent by iOS obsolete bridge.');
          return;
        }

        sd.registerInterceptor('sendStage', {
          send: {
            priority: 0,
            entry: sendData
          }
        });

        log('IOS obsolete bridge inits succeed.');
      }

      function hasBridge() {
        return (/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream;
      }

      function verifyIOSObsoleteBridge() {
        if (/sensors-verify/.test(navigator.userAgent)) {
          var match = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
          if (match && match[0] && typeof match[1] === 'string' && match[1].split('?').length === 2) {
            match = match[1].split('?');
            var hostname = null;
            var project = null;
            try {
              hostname = _.URL(sd.para.server_url).hostname;
              project = _.URL(sd.para.server_url).searchParams.get('project') || 'default';
            } catch (e) {
              sd.log(e);
            }
            if (hostname && hostname === match[0] && project && project === match[1]) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else if (/sa-sdk-ios/.test(navigator.userAgent)) {
          return true;
        } else {
          return false;
        }
      }

      function sendData(rqData, ctx) {
        if (sd.para.app_js_bridge.is_mui) {
          return rqData;
        }
        var callback = rqData.callback;

        function checkURL(originData) {
          var data = JSON.stringify(_.extend({
            server_url: sd.para.server_url
          }, originData));
          data = data.replace(/\r\n/g, '');
          data = encodeURIComponent(data);
          return 'sensorsanalytics://trackEvent?event=' + data;
        }

        if (sd.bridge.bridge_info.verify_success) {
          var iframe = document.createElement('iframe');
          var newurl = checkURL(rqData.data);
          iframe.setAttribute('src', newurl);
          document.documentElement.appendChild(iframe);
          iframe.parentNode.removeChild(iframe);
          iframe = null;
          _.isFunction(callback) && callback();
          ctx.cancellationToken.cancel();
          return true;
        }

        if (sd.para.app_js_bridge.is_send) {
          sd.debug.apph5({
            data: rqData.data,
            step: '3.2',
            output: 'all'
          });
          return rqData;
        }

        _.isFunction(callback) && callback();
        ctx.cancellationToken.cancel();
        return rqData;
      }

      if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
        window.SensorsDataWebJSSDKPlugin.IOSObsoleteBridge = window.SensorsDataWebJSSDKPlugin.IOSObsoleteBridge || IOSObsoleteBridge;
      } else {
        window.SensorsDataWebJSSDKPlugin = {
          IOSObsoleteBridge: IOSObsoleteBridge
        };
      }

      return IOSObsoleteBridge;

    }());

    sd.modules['Utm'] = (function() {
      'use strict';

      var source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';

      var sd;
      var utm = {
        init: function(sa) {
          if (!sa || sd) {
            return;
          }
          sd = sa;
          sd.on &&
            sd.on('sdkAfterInitPara', function() {
              sd.registerInterceptor('businessStage', {
                getUtmData: {
                  priority: 0,
                  entry: function() {
                    return getUtm();
                  }
                }
              });
            });

          function getUtm() {
            var campaign_keywords = source_channel_standard.split(' '),
              kw = '',
              params = {};
            if (sd._.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0) {
              campaign_keywords = campaign_keywords.concat(sd.para.source_channel);
              campaign_keywords = sd._.unique(campaign_keywords);
            }
            sd._.each(campaign_keywords, function(kwkey) {
              kw = sd._.getQueryParam(location.href, kwkey);
              if (kw.length) {
                params[kwkey] = kw;
              }
            });
            return params;
          }
        }
      };

      if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
        window.SensorsDataWebJSSDKPlugin.Utm = window.SensorsDataWebJSSDKPlugin.Utm || utm;
      } else {
        window.SensorsDataWebJSSDKPlugin = {
          Utm: utm
        };
      }

      return utm;

    }());


    sd.use('AndroidBridge');
    sd.use('IOSBridge');
    sd.use('AndroidObsoleteBridge');
    sd.use('IOSObsoleteBridge');

    sd.use('Utm');
    if (typeof window['sensorsDataAnalytic201505'] === 'string') {
      sd.para = window[sensorsDataAnalytic201505].para;
      sd._q = window[sensorsDataAnalytic201505]._q;

      window[sensorsDataAnalytic201505] = sd;
      window['sensorsDataAnalytic201505'] = sd;
      sd.init();
    } else if (typeof window['sensorsDataAnalytic201505'] === 'undefined') {
      window['sensorsDataAnalytic201505'] = sd;
    } else {
      _sd = window['sensorsDataAnalytic201505'];
    }
  } catch (err) {
    if (typeof console === 'object' && console.log) {
      try {
        console.log(err);
      } catch (e) {
        sd.log(e);
      }
    }
  }

  var _sd$1 = _sd;

  return _sd$1;

})));