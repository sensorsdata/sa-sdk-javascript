;
(function() {
  var $ = function(window) {

    "use strict";

    var arr = [];

    var document = window.document;

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);

    var support = {};

    function salog() {
      if (typeof console === 'object' && console.log) {
        try {
          return console.log.apply(console, arguments);
        } catch (e) {
          console.log(arguments[0]);
        }
      }
    }

    function DOMEval(code, doc) {
      doc = doc || document;

      var script = doc.createElement("script");

      script.text = code;
      doc.head.appendChild(script).parentNode.removeChild(script);
    }



    var
      version = "3.2.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector",

      jQuery = function(selector, context) {

        return new jQuery.fn.init(selector, context);
      },

      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([a-z])/g,

      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };

    jQuery.fn = jQuery.prototype = {

      jquery: version,

      constructor: jQuery,

      length: 0,

      toArray: function() {
        return slice.call(this);
      },

      get: function(num) {

        if (num == null) {
          return slice.call(this);
        }

        return num < 0 ? this[num + this.length] : this[num];
      },

      pushStack: function(elems) {

        var ret = jQuery.merge(this.constructor(), elems);

        ret.prevObject = this;

        return ret;
      },

      each: function(callback) {
        return jQuery.each(this, callback);
      },

      map: function(callback) {
        return this.pushStack(jQuery.map(this, function(elem, i) {
          return callback.call(elem, i, elem);
        }));
      },

      slice: function() {
        return this.pushStack(slice.apply(this, arguments));
      },

      first: function() {
        return this.eq(0);
      },

      last: function() {
        return this.eq(-1);
      },

      eq: function(i) {
        var len = this.length,
          j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },

      end: function() {
        return this.prevObject || this.constructor();
      },

      push: push,
      sort: arr.sort,
      splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
      var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      if (typeof target === "boolean") {
        deep = target;

        target = arguments[i] || {};
        i++;
      }

      if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
      }

      if (i === length) {
        target = this;
        i--;
      }

      for (; i < length; i++) {

        if ((options = arguments[i]) != null) {

          for (name in options) {
            src = target[name];
            copy = options[name];

            if (target === copy) {
              continue;
            }

            if (deep && copy && (jQuery.isPlainObject(copy) ||
                (copyIsArray = Array.isArray(copy)))) {

              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Array.isArray(src) ? src : [];

              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }

              target[name] = jQuery.extend(deep, clone, copy);

            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }

      return target;
    };

    jQuery.extend({

      expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

      isReady: true,

      error: function(msg) {
        throw new Error(msg);
      },

      noop: function() {},

      isFunction: function(obj) {
        return jQuery.type(obj) === "function";
      },

      isWindow: function(obj) {
        return obj != null && obj === obj.window;
      },

      isNumeric: function(obj) {

        var type = jQuery.type(obj);
        return (type === "number" || type === "string") &&

          !isNaN(obj - parseFloat(obj));
      },

      isPlainObject: function(obj) {
        var proto, Ctor;

        if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
        }

        proto = getProto(obj);

        if (!proto) {
          return true;
        }

        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
      },

      isEmptyObject: function(obj) {

        var name;

        for (name in obj) {
          return false;
        }
        return true;
      },

      type: function(obj) {
        if (obj == null) {
          return obj + "";
        }

        return typeof obj === "object" || typeof obj === "function" ?
          class2type[toString.call(obj)] || "object" :
          typeof obj;
      },

      globalEval: function(code) {
        DOMEval(code);
      },

      camelCase: function(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
      },

      each: function(obj, callback) {
        var length, i = 0;

        if (isArrayLike(obj)) {
          length = obj.length;
          for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        }

        return obj;
      },

      trim: function(text) {
        return text == null ?
          "" :
          (text + "").replace(rtrim, "");
      },

      makeArray: function(arr, results) {
        var ret = results || [];

        if (arr != null) {
          if (isArrayLike(Object(arr))) {
            jQuery.merge(ret,
              typeof arr === "string" ? [arr] : arr
            );
          } else {
            push.call(ret, arr);
          }
        }

        return ret;
      },

      inArray: function(elem, arr, i) {
        return arr == null ? -1 : indexOf.call(arr, elem, i);
      },

      merge: function(first, second) {
        var len = +second.length,
          j = 0,
          i = first.length;

        for (; j < len; j++) {
          first[i++] = second[j];
        }

        first.length = i;

        return first;
      },

      grep: function(elems, callback, invert) {
        var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;

        for (; i < length; i++) {
          callbackInverse = !callback(elems[i], i);
          if (callbackInverse !== callbackExpect) {
            matches.push(elems[i]);
          }
        }

        return matches;
      },

      map: function(elems, callback, arg) {
        var length, value,
          i = 0,
          ret = [];

        if (isArrayLike(elems)) {
          length = elems.length;
          for (; i < length; i++) {
            value = callback(elems[i], i, arg);

            if (value != null) {
              ret.push(value);
            }
          }

        } else {
          for (i in elems) {
            value = callback(elems[i], i, arg);

            if (value != null) {
              ret.push(value);
            }
          }
        }

        return concat.apply([], ret);
      },

      guid: 1,

      proxy: function(fn, context) {
        var tmp, args, proxy;

        if (typeof context === "string") {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }

        if (!jQuery.isFunction(fn)) {
          return undefined;
        }

        args = slice.call(arguments, 2);
        proxy = function() {
          return fn.apply(context || this, args.concat(slice.call(arguments)));
        };

        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
      },

      now: Date.now,

      support: support
    });

    if (typeof Symbol === "function") {
      jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }

    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
      function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
      });

    function isArrayLike(obj) {

      var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);

      if (type === "function" || jQuery.isWindow(obj)) {
        return false;
      }

      return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle =
      (function(window) {

        var i,
          support,
          Expr,
          getText,
          isXML,
          tokenize,
          compile,
          select,
          outermostContext,
          sortInput,
          hasDuplicate,

          setDocument,
          document,
          docElem,
          documentIsHTML,
          rbuggyQSA,
          rbuggyMatches,
          matches,
          contains,

          expando = "sizzle" + 1 * new Date(),
          preferredDoc = window.document,
          dirruns = 0,
          done = 0,
          classCache = createCache(),
          tokenCache = createCache(),
          compilerCache = createCache(),
          sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          },

          hasOwn = ({}).hasOwnProperty,
          arr = [],
          pop = arr.pop,
          push_native = arr.push,
          push = arr.push,
          slice = arr.slice,
          indexOf = function(list, elem) {
            var i = 0,
              len = list.length;
            for (; i < len; i++) {
              if (list[i] === elem) {
                return i;
              }
            }
            return -1;
          },

          booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


          whitespace = "[\\x20\\t\\r\\n\\f]",

          identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

          attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
          "*([*^$|!~]?=)" + whitespace +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
          "*\\]",

          pseudos = ":(" + identifier + ")(?:\\((" +
          "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
          "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
          ".*" +
          ")\\)|)",

          rwhitespace = new RegExp(whitespace + "+", "g"),
          rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

          rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
          rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

          rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

          rpseudo = new RegExp(pseudos),
          ridentifier = new RegExp("^" + identifier + "$"),

          matchExpr = {
            "ID": new RegExp("^#(" + identifier + ")"),
            "CLASS": new RegExp("^\\.(" + identifier + ")"),
            "TAG": new RegExp("^(" + identifier + "|[*])"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
              "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
              "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          },

          rinputs = /^(?:input|select|textarea|button)$/i,
          rheader = /^h\d$/i,

          rnative = /^[^{]+\{\s*\[native \w/,

          rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

          rsibling = /[+~]/,

          runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
          funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 0x10000;
            return high !== high || escapedWhitespace ?
              escaped :
              high < 0 ?
              String.fromCharCode(high + 0x10000) :
              String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
          },

          rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
          fcssescape = function(ch, asCodePoint) {
            if (asCodePoint) {

              if (ch === "\0") {
                return "\uFFFD";
              }

              return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }

            return "\\" + ch;
          },

          unloadHandler = function() {
            setDocument();
          },

          disabledAncestor = addCombinator(
            function(elem) {
              return elem.disabled === true && ("form" in elem || "label" in elem);
            }, {
              dir: "parentNode",
              next: "legend"
            }
          );

        try {
          push.apply(
            (arr = slice.call(preferredDoc.childNodes)),
            preferredDoc.childNodes
          );
          arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
          push = {
            apply: arr.length ?

              function(target, els) {
                push_native.apply(target, slice.call(els));
              } :

              function(target, els) {
                var j = target.length,
                  i = 0;
                while ((target[j++] = els[i++])) {}
                target.length = j - 1;
              }
          };
        }

        function Sizzle(selector, context, results, seed) {
          var m, i, elem, nid, match, groups, newSelector,
            newContext = context && context.ownerDocument,

            nodeType = context ? context.nodeType : 9;

          results = results || [];

          if (typeof selector !== "string" || !selector ||
            nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

            return results;
          }

          if (!seed) {

            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
              setDocument(context);
            }
            context = context || document;

            if (documentIsHTML) {

              if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

                if ((m = match[1])) {

                  if (nodeType === 9) {
                    if ((elem = context.getElementById(m))) {

                      if (elem.id === m) {
                        results.push(elem);
                        return results;
                      }
                    } else {
                      return results;
                    }

                  } else {

                    if (newContext && (elem = newContext.getElementById(m)) &&
                      contains(context, elem) &&
                      elem.id === m) {

                      results.push(elem);
                      return results;
                    }
                  }

                } else if (match[2]) {
                  push.apply(results, context.getElementsByTagName(selector));
                  return results;

                } else if ((m = match[3]) && support.getElementsByClassName &&
                  context.getElementsByClassName) {

                  push.apply(results, context.getElementsByClassName(m));
                  return results;
                }
              }

              if (support.qsa &&
                !compilerCache[selector + " "] &&
                (!rbuggyQSA || !rbuggyQSA.test(selector))) {

                if (nodeType !== 1) {
                  newContext = context;
                  newSelector = selector;

                } else if (context.nodeName.toLowerCase() !== "object") {

                  if ((nid = context.getAttribute("id"))) {
                    nid = nid.replace(rcssescape, fcssescape);
                  } else {
                    context.setAttribute("id", (nid = expando));
                  }

                  groups = tokenize(selector);
                  i = groups.length;
                  while (i--) {
                    groups[i] = "#" + nid + " " + toSelector(groups[i]);
                  }
                  newSelector = groups.join(",");

                  newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                    context;
                }

                if (newSelector) {
                  try {
                    push.apply(results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    salog(qsaError);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
          }

          return select(selector.replace(rtrim, "$1"), context, results, seed);
        }

        function createCache() {
          var keys = [];

          function cache(key, value) {
            if (keys.push(key + " ") > Expr.cacheLength) {
              delete cache[keys.shift()];
            }
            return (cache[key + " "] = value);
          }
          return cache;
        }

        function markFunction(fn) {
          fn[expando] = true;
          return fn;
        }

        function assert(fn) {
          var el = document.createElement("fieldset");

          try {
            return !!fn(el);
          } catch (e) {
            return false;
          } finally {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
            el = null;
          }
        }

        function addHandle(attrs, handler) {
          var arr = attrs.split("|"),
            i = arr.length;

          while (i--) {
            Expr.attrHandle[arr[i]] = handler;
          }
        }

        function siblingCheck(a, b) {
          var cur = b && a,
            diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
            a.sourceIndex - b.sourceIndex;

          if (diff) {
            return diff;
          }

          if (cur) {
            while ((cur = cur.nextSibling)) {
              if (cur === b) {
                return -1;
              }
            }
          }

          return a ? 1 : -1;
        }

        function createInputPseudo(type) {
          return function(elem) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === type;
          };
        }

        function createButtonPseudo(type) {
          return function(elem) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && elem.type === type;
          };
        }

        function createDisabledPseudo(disabled) {

          return function(elem) {

            if ("form" in elem) {

              if (elem.parentNode && elem.disabled === false) {

                if ("label" in elem) {
                  if ("label" in elem.parentNode) {
                    return elem.parentNode.disabled === disabled;
                  } else {
                    return elem.disabled === disabled;
                  }
                }

                return elem.isDisabled === disabled ||

                  elem.isDisabled !== !disabled &&
                  disabledAncestor(elem) === disabled;
              }

              return elem.disabled === disabled;

            } else if ("label" in elem) {
              return elem.disabled === disabled;
            }

            return false;
          };
        }

        function createPositionalPseudo(fn) {
          return markFunction(function(argument) {
            argument = +argument;
            return markFunction(function(seed, matches) {
              var j,
                matchIndexes = fn([], seed.length, argument),
                i = matchIndexes.length;

              while (i--) {
                if (seed[(j = matchIndexes[i])]) {
                  seed[j] = !(matches[j] = seed[j]);
                }
              }
            });
          });
        }

        function testContext(context) {
          return context && typeof context.getElementsByTagName !== "undefined" && context;
        }

        support = Sizzle.support = {};

        isXML = Sizzle.isXML = function(elem) {
          var documentElement = elem && (elem.ownerDocument || elem).documentElement;
          return documentElement ? documentElement.nodeName !== "HTML" : false;
        };

        setDocument = Sizzle.setDocument = function(node) {
          var hasCompare, subWindow,
            doc = node ? node.ownerDocument || node : preferredDoc;

          if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
            return document;
          }

          document = doc;
          docElem = document.documentElement;
          documentIsHTML = !isXML(document);

          if (preferredDoc !== document &&
            (subWindow = document.defaultView) && subWindow.top !== subWindow) {

            if (subWindow.addEventListener) {
              subWindow.addEventListener("unload", unloadHandler, false);

            } else if (subWindow.attachEvent) {
              subWindow.attachEvent("onunload", unloadHandler);
            }
          }


          support.attributes = assert(function(el) {
            el.className = "i";
            return !el.getAttribute("className");
          });


          support.getElementsByTagName = assert(function(el) {
            el.appendChild(document.createComment(""));
            return !el.getElementsByTagName("*").length;
          });

          support.getElementsByClassName = rnative.test(document.getElementsByClassName);

          support.getById = assert(function(el) {
            docElem.appendChild(el).id = expando;
            return !document.getElementsByName || !document.getElementsByName(expando).length;
          });

          if (support.getById) {
            Expr.filter["ID"] = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                return elem.getAttribute("id") === attrId;
              };
            };
            Expr.find["ID"] = function(id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var elem = context.getElementById(id);
                return elem ? [elem] : [];
              }
            };
          } else {
            Expr.filter["ID"] = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                var node = typeof elem.getAttributeNode !== "undefined" &&
                  elem.getAttributeNode("id");
                return node && node.value === attrId;
              };
            };

            Expr.find["ID"] = function(id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var node, i, elems,
                  elem = context.getElementById(id);

                if (elem) {

                  node = elem.getAttributeNode("id");
                  if (node && node.value === id) {
                    return [elem];
                  }

                  elems = context.getElementsByName(id);
                  i = 0;
                  while ((elem = elems[i++])) {
                    node = elem.getAttributeNode("id");
                    if (node && node.value === id) {
                      return [elem];
                    }
                  }
                }

                return [];
              }
            };
          }

          Expr.find["TAG"] = support.getElementsByTagName ?
            function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);

              } else if (support.qsa) {
                return context.querySelectorAll(tag);
              }
            } :

            function(tag, context) {
              var elem,
                tmp = [],
                i = 0,
                results = context.getElementsByTagName(tag);

              if (tag === "*") {
                while ((elem = results[i++])) {
                  if (elem.nodeType === 1) {
                    tmp.push(elem);
                  }
                }

                return tmp;
              }
              return results;
            };

          Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
            if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
              return context.getElementsByClassName(className);
            }
          };



          rbuggyMatches = [];

          rbuggyQSA = [];

          if ((support.qsa = rnative.test(document.querySelectorAll))) {
            assert(function(el) {
              docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                "<option selected=''></option></select>";

              if (el.querySelectorAll("[msallowcapture^='']").length) {
                rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
              }

              if (!el.querySelectorAll("[selected]").length) {
                rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
              }

              if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                rbuggyQSA.push("~=");
              }

              if (!el.querySelectorAll(":checked").length) {
                rbuggyQSA.push(":checked");
              }

              if (!el.querySelectorAll("a#" + expando + "+*").length) {
                rbuggyQSA.push(".#.+[+~]");
              }
            });

            assert(function(el) {
              el.innerHTML = "<a href='' disabled='disabled'></a>" +
                "<select disabled='disabled'><option/></select>";

              var input = document.createElement("input");
              input.setAttribute("type", "hidden");
              el.appendChild(input).setAttribute("name", "D");

              if (el.querySelectorAll("[name=d]").length) {
                rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
              }

              if (el.querySelectorAll(":enabled").length !== 2) {
                rbuggyQSA.push(":enabled", ":disabled");
              }

              docElem.appendChild(el).disabled = true;
              if (el.querySelectorAll(":disabled").length !== 2) {
                rbuggyQSA.push(":enabled", ":disabled");
              }

              el.querySelectorAll("*,:x");
              rbuggyQSA.push(",.*:");
            });
          }

          if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
              docElem.webkitMatchesSelector ||
              docElem.mozMatchesSelector ||
              docElem.oMatchesSelector ||
              docElem.msMatchesSelector)))) {

            assert(function(el) {
              support.disconnectedMatch = matches.call(el, "*");

              matches.call(el, "[s!='']:x");
              rbuggyMatches.push("!=", pseudos);
            });
          }

          rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
          rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

          hasCompare = rnative.test(docElem.compareDocumentPosition);

          contains = hasCompare || rnative.test(docElem.contains) ?
            function(a, b) {
              var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
              return a === bup || !!(bup && bup.nodeType === 1 && (
                adown.contains ?
                adown.contains(bup) :
                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
              ));
            } :
            function(a, b) {
              if (b) {
                while ((b = b.parentNode)) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };


          sortOrder = hasCompare ?
            function(a, b) {

              if (a === b) {
                hasDuplicate = true;
                return 0;
              }

              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }

              compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                a.compareDocumentPosition(b) :

                1;

              if (compare & 1 ||
                (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                  return -1;
                }
                if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                  return 1;
                }

                return sortInput ?
                  (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                  0;
              }

              return compare & 4 ? -1 : 1;
            } :
            function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }

              var cur,
                i = 0,
                aup = a.parentNode,
                bup = b.parentNode,
                ap = [a],
                bp = [b];

              if (!aup || !bup) {
                return a === document ? -1 :
                  b === document ? 1 :
                  aup ? -1 :
                  bup ? 1 :
                  sortInput ?
                  (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                  0;

              } else if (aup === bup) {
                return siblingCheck(a, b);
              }

              cur = a;
              while ((cur = cur.parentNode)) {
                ap.unshift(cur);
              }
              cur = b;
              while ((cur = cur.parentNode)) {
                bp.unshift(cur);
              }

              while (ap[i] === bp[i]) {
                i++;
              }

              return i ?
                siblingCheck(ap[i], bp[i]) :

                ap[i] === preferredDoc ? -1 :
                bp[i] === preferredDoc ? 1 :
                0;
            };

          return document;
        };

        Sizzle.matches = function(expr, elements) {
          return Sizzle(expr, null, null, elements);
        };

        Sizzle.matchesSelector = function(elem, expr) {
          if ((elem.ownerDocument || elem) !== document) {
            setDocument(elem);
          }

          expr = expr.replace(rattributeQuotes, "='$1']");

          if (support.matchesSelector && documentIsHTML &&
            !compilerCache[expr + " "] &&
            (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
            (!rbuggyQSA || !rbuggyQSA.test(expr))) {

            try {
              var ret = matches.call(elem, expr);

              if (ret || support.disconnectedMatch ||
                elem.document && elem.document.nodeType !== 11) {
                return ret;
              }
            } catch (e) {
              salog(e);
            }
          }

          return Sizzle(expr, document, null, [elem]).length > 0;
        };

        Sizzle.contains = function(context, elem) {
          if ((context.ownerDocument || context) !== document) {
            setDocument(context);
          }
          return contains(context, elem);
        };

        Sizzle.attr = function(elem, name) {
          if ((elem.ownerDocument || elem) !== document) {
            setDocument(elem);
          }

          var fn = Expr.attrHandle[name.toLowerCase()],
            val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
            fn(elem, name, !documentIsHTML) :
            undefined;

          return val !== undefined ?
            val :
            support.attributes || !documentIsHTML ?
            elem.getAttribute(name) :
            (val = elem.getAttributeNode(name)) && val.specified ?
            val.value :
            null;
        };

        Sizzle.escape = function(sel) {
          return (sel + "").replace(rcssescape, fcssescape);
        };

        Sizzle.error = function(msg) {
          throw new Error("Syntax error, unrecognized expression: " + msg);
        };

        Sizzle.uniqueSort = function(results) {
          var elem,
            duplicates = [],
            j = 0,
            i = 0;

          hasDuplicate = !support.detectDuplicates;
          sortInput = !support.sortStable && results.slice(0);
          results.sort(sortOrder);

          if (hasDuplicate) {
            while ((elem = results[i++])) {
              if (elem === results[i]) {
                j = duplicates.push(i);
              }
            }
            while (j--) {
              results.splice(duplicates[j], 1);
            }
          }

          sortInput = null;

          return results;
        };

        getText = Sizzle.getText = function(elem) {
          var node,
            ret = "",
            i = 0,
            nodeType = elem.nodeType;

          if (!nodeType) {
            while ((node = elem[i++])) {
              ret += getText(node);
            }
          } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === "string") {
              return elem.textContent;
            } else {
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                ret += getText(elem);
              }
            }
          } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
          }

          return ret;
        };

        Expr = Sizzle.selectors = {

          cacheLength: 50,

          createPseudo: markFunction,

          match: matchExpr,

          attrHandle: {},

          find: {},

          relative: {
            ">": {
              dir: "parentNode",
              first: true
            },
            " ": {
              dir: "parentNode"
            },
            "+": {
              dir: "previousSibling",
              first: true
            },
            "~": {
              dir: "previousSibling"
            }
          },

          preFilter: {
            "ATTR": function(match) {
              match[1] = match[1].replace(runescape, funescape);

              match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

              if (match[2] === "~=") {
                match[3] = " " + match[3] + " ";
              }

              return match.slice(0, 4);
            },

            "CHILD": function(match) {
              match[1] = match[1].toLowerCase();

              if (match[1].slice(0, 3) === "nth") {
                if (!match[3]) {
                  Sizzle.error(match[0]);
                }

                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                match[5] = +((match[7] + match[8]) || match[3] === "odd");

              } else if (match[3]) {
                Sizzle.error(match[0]);
              }

              return match;
            },

            "PSEUDO": function(match) {
              var excess,
                unquoted = !match[6] && match[2];

              if (matchExpr["CHILD"].test(match[0])) {
                return null;
              }

              if (match[3]) {
                match[2] = match[4] || match[5] || "";

              } else if (unquoted && rpseudo.test(unquoted) &&
                (excess = tokenize(unquoted, true)) &&
                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                match[0] = match[0].slice(0, excess);
                match[2] = unquoted.slice(0, excess);
              }

              return match.slice(0, 3);
            }
          },

          filter: {

            "TAG": function(nodeNameSelector) {
              var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
              return nodeNameSelector === "*" ?
                function() {
                  return true;
                } :
                function(elem) {
                  return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
            },

            "CLASS": function(className) {
              var pattern = classCache[className + " "];

              return pattern ||
                (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                classCache(className, function(elem) {
                  return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                });
            },

            "ATTR": function(name, operator, check) {
              return function(elem) {
                var result = Sizzle.attr(elem, name);

                if (result == null) {
                  return operator === "!=";
                }
                if (!operator) {
                  return true;
                }

                result += "";

                return operator === "=" ? result === check :
                  operator === "!=" ? result !== check :
                  operator === "^=" ? check && result.indexOf(check) === 0 :
                  operator === "*=" ? check && result.indexOf(check) > -1 :
                  operator === "$=" ? check && result.slice(-check.length) === check :
                  operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                  operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                  false;
              };
            },

            "CHILD": function(type, what, argument, first, last) {
              var simple = type.slice(0, 3) !== "nth",
                forward = type.slice(-4) !== "last",
                ofType = what === "of-type";

              return first === 1 && last === 0 ?

                function(elem) {
                  return !!elem.parentNode;
                } :

                function(elem, context, xml) {
                  var cache, uniqueCache, outerCache, node, nodeIndex, start,
                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                    parent = elem.parentNode,
                    name = ofType && elem.nodeName.toLowerCase(),
                    useCache = !xml && !ofType,
                    diff = false;

                  if (parent) {

                    if (simple) {
                      while (dir) {
                        node = elem;
                        while ((node = node[dir])) {
                          if (ofType ?
                            node.nodeName.toLowerCase() === name :
                            node.nodeType === 1) {

                            return false;
                          }
                        }
                        start = dir = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }

                    start = [forward ? parent.firstChild : parent.lastChild];

                    if (forward && useCache) {


                      node = parent;
                      outerCache = node[expando] || (node[expando] = {});

                      uniqueCache = outerCache[node.uniqueID] ||
                        (outerCache[node.uniqueID] = {});

                      cache = uniqueCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];

                      while ((node = ++nodeIndex && node && node[dir] ||

                          (diff = nodeIndex = 0) || start.pop())) {

                        if (node.nodeType === 1 && ++diff && node === elem) {
                          uniqueCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }

                    } else {
                      if (useCache) {
                        node = elem;
                        outerCache = node[expando] || (node[expando] = {});

                        uniqueCache = outerCache[node.uniqueID] ||
                          (outerCache[node.uniqueID] = {});

                        cache = uniqueCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }

                      if (diff === false) {
                        while ((node = ++nodeIndex && node && node[dir] ||
                            (diff = nodeIndex = 0) || start.pop())) {

                          if ((ofType ?
                              node.nodeName.toLowerCase() === name :
                              node.nodeType === 1) &&
                            ++diff) {

                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});

                              uniqueCache = outerCache[node.uniqueID] ||
                                (outerCache[node.uniqueID] = {});

                              uniqueCache[type] = [dirruns, diff];
                            }

                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }

                    diff -= last;
                    return diff === first || (diff % first === 0 && diff / first >= 0);
                  }
                };
            },

            "PSEUDO": function(pseudo, argument) {
              var args,
                fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                Sizzle.error("unsupported pseudo: " + pseudo);

              if (fn[expando]) {
                return fn(argument);
              }

              if (fn.length > 1) {
                args = [pseudo, pseudo, "", argument];
                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                  markFunction(function(seed, matches) {
                    var idx,
                      matched = fn(seed, argument),
                      i = matched.length;
                    while (i--) {
                      idx = indexOf(seed, matched[i]);
                      seed[idx] = !(matches[idx] = matched[i]);
                    }
                  }) :
                  function(elem) {
                    return fn(elem, 0, args);
                  };
              }

              return fn;
            }
          },

          pseudos: {
            "not": markFunction(function(selector) {
              var input = [],
                results = [],
                matcher = compile(selector.replace(rtrim, "$1"));

              return matcher[expando] ?
                markFunction(function(seed, matches, context, xml) {
                  var elem,
                    unmatched = matcher(seed, null, xml, []),
                    i = seed.length;

                  while (i--) {
                    if ((elem = unmatched[i])) {
                      seed[i] = !(matches[i] = elem);
                    }
                  }
                }) :
                function(elem, context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
            }),

            "has": markFunction(function(selector) {
              return function(elem) {
                return Sizzle(selector, elem).length > 0;
              };
            }),

            "contains": markFunction(function(text) {
              text = text.replace(runescape, funescape);
              return function(elem) {
                return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
              };
            }),

            "lang": markFunction(function(lang) {
              if (!ridentifier.test(lang || "")) {
                Sizzle.error("unsupported lang: " + lang);
              }
              lang = lang.replace(runescape, funescape).toLowerCase();
              return function(elem) {
                var elemLang;
                do {
                  if ((elemLang = documentIsHTML ?
                      elem.lang :
                      elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                    elemLang = elemLang.toLowerCase();
                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                  }
                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                return false;
              };
            }),

            "target": function(elem) {
              var hash = window.location && window.location.hash;
              return hash && hash.slice(1) === elem.id;
            },

            "root": function(elem) {
              return elem === docElem;
            },

            "focus": function(elem) {
              return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
            },

            "enabled": createDisabledPseudo(false),
            "disabled": createDisabledPseudo(true),

            "checked": function(elem) {
              var nodeName = elem.nodeName.toLowerCase();
              return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
            },

            "selected": function(elem) {
              if (elem.parentNode) {
                elem.parentNode.selectedIndex;
              }

              return elem.selected === true;
            },

            "empty": function(elem) {
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                if (elem.nodeType < 6) {
                  return false;
                }
              }
              return true;
            },

            "parent": function(elem) {
              return !Expr.pseudos["empty"](elem);
            },

            "header": function(elem) {
              return rheader.test(elem.nodeName);
            },

            "input": function(elem) {
              return rinputs.test(elem.nodeName);
            },

            "button": function(elem) {
              var name = elem.nodeName.toLowerCase();
              return name === "input" && elem.type === "button" || name === "button";
            },

            "text": function(elem) {
              var attr;
              return elem.nodeName.toLowerCase() === "input" &&
                elem.type === "text" &&

                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
            },

            "first": createPositionalPseudo(function() {
              return [0];
            }),

            "last": createPositionalPseudo(function(matchIndexes, length) {
              return [length - 1];
            }),

            "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
              return [argument < 0 ? argument + length : argument];
            }),

            "even": createPositionalPseudo(function(matchIndexes, length) {
              var i = 0;
              for (; i < length; i += 2) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),

            "odd": createPositionalPseudo(function(matchIndexes, length) {
              var i = 1;
              for (; i < length; i += 2) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),

            "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
              var i = argument < 0 ? argument + length : argument;
              for (; --i >= 0;) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),

            "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
              var i = argument < 0 ? argument + length : argument;
              for (; ++i < length;) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            })
          }
        };

        Expr.pseudos["nth"] = Expr.pseudos["eq"];

        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
          }) {
          Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
          }) {
          Expr.pseudos[i] = createButtonPseudo(i);
        }

        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();

        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
          var matched, match, tokens, type,
            soFar, groups, preFilters,
            cached = tokenCache[selector + " "];

          if (cached) {
            return parseOnly ? 0 : cached.slice(0);
          }

          soFar = selector;
          groups = [];
          preFilters = Expr.preFilter;

          while (soFar) {

            if (!matched || (match = rcomma.exec(soFar))) {
              if (match) {
                soFar = soFar.slice(match[0].length) || soFar;
              }
              groups.push((tokens = []));
            }

            matched = false;

            if ((match = rcombinators.exec(soFar))) {
              matched = match.shift();
              tokens.push({
                value: matched,
                type: match[0].replace(rtrim, " ")
              });
              soFar = soFar.slice(matched.length);
            }

            for (type in Expr.filter) {
              if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                  (match = preFilters[type](match)))) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  type: type,
                  matches: match
                });
                soFar = soFar.slice(matched.length);
              }
            }

            if (!matched) {
              break;
            }
          }

          return parseOnly ?
            soFar.length :
            soFar ?
            Sizzle.error(selector) :
            tokenCache(selector, groups).slice(0);
        };

        function toSelector(tokens) {
          var i = 0,
            len = tokens.length,
            selector = "";
          for (; i < len; i++) {
            selector += tokens[i].value;
          }
          return selector;
        }

        function addCombinator(matcher, combinator, base) {
          var dir = combinator.dir,
            skip = combinator.next,
            key = skip || dir,
            checkNonElements = base && key === "parentNode",
            doneName = done++;

          return combinator.first ?
            function(elem, context, xml) {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  return matcher(elem, context, xml);
                }
              }
              return false;
            } :

            function(elem, context, xml) {
              var oldCache, uniqueCache, outerCache,
                newCache = [dirruns, doneName];

              if (xml) {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    if (matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              } else {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {});

                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

                    if (skip && skip === elem.nodeName.toLowerCase()) {
                      elem = elem[dir] || elem;
                    } else if ((oldCache = uniqueCache[key]) &&
                      oldCache[0] === dirruns && oldCache[1] === doneName) {

                      return (newCache[2] = oldCache[2]);
                    } else {
                      uniqueCache[key] = newCache;

                      if ((newCache[2] = matcher(elem, context, xml))) {
                        return true;
                      }
                    }
                  }
                }
              }
              return false;
            };
        }

        function elementMatcher(matchers) {
          return matchers.length > 1 ?
            function(elem, context, xml) {
              var i = matchers.length;
              while (i--) {
                if (!matchers[i](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } :
            matchers[0];
        }

        function multipleContexts(selector, contexts, results) {
          var i = 0,
            len = contexts.length;
          for (; i < len; i++) {
            Sizzle(selector, contexts[i], results);
          }
          return results;
        }

        function condense(unmatched, map, filter, context, xml) {
          var elem,
            newUnmatched = [],
            i = 0,
            len = unmatched.length,
            mapped = map != null;

          for (; i < len; i++) {
            if ((elem = unmatched[i])) {
              if (!filter || filter(elem, context, xml)) {
                newUnmatched.push(elem);
                if (mapped) {
                  map.push(i);
                }
              }
            }
          }

          return newUnmatched;
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
          if (postFilter && !postFilter[expando]) {
            postFilter = setMatcher(postFilter);
          }
          if (postFinder && !postFinder[expando]) {
            postFinder = setMatcher(postFinder, postSelector);
          }
          return markFunction(function(seed, results, context, xml) {
            var temp, i, elem,
              preMap = [],
              postMap = [],
              preexisting = results.length,

              elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

              matcherIn = preFilter && (seed || !selector) ?
              condense(elems, preMap, preFilter, context, xml) :
              elems,

              matcherOut = matcher ?
              postFinder || (seed ? preFilter : preexisting || postFilter) ?

              [] :

              results :
              matcherIn;

            if (matcher) {
              matcher(matcherIn, matcherOut, context, xml);
            }

            if (postFilter) {
              temp = condense(matcherOut, postMap);
              postFilter(temp, [], context, xml);

              i = temp.length;
              while (i--) {
                if ((elem = temp[i])) {
                  matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                }
              }
            }

            if (seed) {
              if (postFinder || preFilter) {
                if (postFinder) {
                  temp = [];
                  i = matcherOut.length;
                  while (i--) {
                    if ((elem = matcherOut[i])) {
                      temp.push((matcherIn[i] = elem));
                    }
                  }
                  postFinder(null, (matcherOut = []), temp, xml);
                }

                i = matcherOut.length;
                while (i--) {
                  if ((elem = matcherOut[i]) &&
                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                    seed[temp] = !(results[temp] = elem);
                  }
                }
              }

            } else {
              matcherOut = condense(
                matcherOut === results ?
                matcherOut.splice(preexisting, matcherOut.length) :
                matcherOut
              );
              if (postFinder) {
                postFinder(null, results, matcherOut, xml);
              } else {
                push.apply(results, matcherOut);
              }
            }
          });
        }

        function matcherFromTokens(tokens) {
          var checkContext, matcher, j,
            len = tokens.length,
            leadingRelative = Expr.relative[tokens[0].type],
            implicitRelative = leadingRelative || Expr.relative[" "],
            i = leadingRelative ? 1 : 0,

            matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true),
            matchAnyContext = addCombinator(function(elem) {
              return indexOf(checkContext, elem) > -1;
            }, implicitRelative, true),
            matchers = [function(elem, context, xml) {
              var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
                (checkContext = context).nodeType ?
                matchContext(elem, context, xml) :
                matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            }];

          for (; i < len; i++) {
            if ((matcher = Expr.relative[tokens[i].type])) {
              matchers = [addCombinator(elementMatcher(matchers), matcher)];
            } else {
              matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

              if (matcher[expando]) {
                j = ++i;
                for (; j < len; j++) {
                  if (Expr.relative[tokens[j].type]) {
                    break;
                  }
                }
                return setMatcher(
                  i > 1 && elementMatcher(matchers),
                  i > 1 && toSelector(
                    tokens.slice(0, i - 1).concat({
                      value: tokens[i - 2].type === " " ? "*" : ""
                    })
                  ).replace(rtrim, "$1"),
                  matcher,
                  i < j && matcherFromTokens(tokens.slice(i, j)),
                  j < len && matcherFromTokens((tokens = tokens.slice(j))),
                  j < len && toSelector(tokens)
                );
              }
              matchers.push(matcher);
            }
          }

          return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
          var bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function(seed, context, xml, results, outermost) {
              var elem, j, matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;

              if (outermost) {
                outermostContext = context === document || context || outermost;
              }

              for (; i !== len && (elem = elems[i]) != null; i++) {
                if (byElement && elem) {
                  j = 0;
                  if (!context && elem.ownerDocument !== document) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while ((matcher = elementMatchers[j++])) {
                    if (matcher(elem, context || document, xml)) {
                      results.push(elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }

                if (bySet) {
                  if ((elem = !matcher && elem)) {
                    matchedCount--;
                  }

                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }

              matchedCount += i;

              if (bySet && i !== matchedCount) {
                j = 0;
                while ((matcher = setMatchers[j++])) {
                  matcher(unmatched, setMatched, context, xml);
                }

                if (seed) {
                  if (matchedCount > 0) {
                    while (i--) {
                      if (!(unmatched[i] || setMatched[i])) {
                        setMatched[i] = pop.call(results);
                      }
                    }
                  }

                  setMatched = condense(setMatched);
                }

                push.apply(results, setMatched);

                if (outermost && !seed && setMatched.length > 0 &&
                  (matchedCount + setMatchers.length) > 1) {

                  Sizzle.uniqueSort(results);
                }
              }

              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }

              return unmatched;
            };

          return bySet ?
            markFunction(superMatcher) :
            superMatcher;
        }

        compile = Sizzle.compile = function(selector, match) {
          var i,
            setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[selector + " "];

          if (!cached) {
            if (!match) {
              match = tokenize(selector);
            }
            i = match.length;
            while (i--) {
              cached = matcherFromTokens(match[i]);
              if (cached[expando]) {
                setMatchers.push(cached);
              } else {
                elementMatchers.push(cached);
              }
            }

            cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

            cached.selector = selector;
          }
          return cached;
        };

        select = Sizzle.select = function(selector, context, results, seed) {
          var i, tokens, token, type, find,
            compiled = typeof selector === "function" && selector,
            match = !seed && tokenize((selector = compiled.selector || selector));

          results = results || [];

          if (match.length === 1) {

            tokens = match[0] = match[0].slice(0);
            if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
              context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

              context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
              if (!context) {
                return results;

              } else if (compiled) {
                context = context.parentNode;
              }

              selector = selector.slice(tokens.shift().value.length);
            }

            i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
            while (i--) {
              token = tokens[i];

              if (Expr.relative[(type = token.type)]) {
                break;
              }
              if ((find = Expr.find[type])) {
                if ((seed = find(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  ))) {

                  tokens.splice(i, 1);
                  selector = seed.length && toSelector(tokens);
                  if (!selector) {
                    push.apply(results, seed);
                    return results;
                  }

                  break;
                }
              }
            }
          }

          (compiled || compile(selector, match))(
            seed,
            context,
            !documentIsHTML,
            results,
            !context || rsibling.test(selector) && testContext(context.parentNode) || context
          );
          return results;
        };


        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

        support.detectDuplicates = !!hasDuplicate;

        setDocument();

        support.sortDetached = assert(function(el) {
          return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
        });

        if (!assert(function(el) {
            el.innerHTML = "<a href='#'></a>";
            return el.firstChild.getAttribute("href") === "#";
          })) {
          addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML) {
              return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
            }
          });
        }

        if (!support.attributes || !assert(function(el) {
            el.innerHTML = "<input/>";
            el.firstChild.setAttribute("value", "");
            return el.firstChild.getAttribute("value") === "";
          })) {
          addHandle("value", function(elem, name, isXML) {
            if (!isXML && elem.nodeName.toLowerCase() === "input") {
              return elem.defaultValue;
            }
          });
        }

        if (!assert(function(el) {
            return el.getAttribute("disabled") == null;
          })) {
          addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML) {
              return elem[name] === true ? name.toLowerCase() :
                (val = elem.getAttributeNode(name)) && val.specified ?
                val.value :
                null;
            }
          });
        }

        return Sizzle;

      })(window);



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;




    var dir = function(elem, dir, until) {
      var matched = [],
        truncate = until !== undefined;

      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
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


    var rneedsContext = jQuery.expr.match.needsContext;



    function nodeName(elem, name) {

      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

    };
    var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);



    var risSimple = /^.[^:#\[\.,]*$/;

    function winnow(elements, qualifier, not) {
      if (jQuery.isFunction(qualifier)) {
        return jQuery.grep(elements, function(elem, i) {
          return !!qualifier.call(elem, i, elem) !== not;
        });
      }

      if (qualifier.nodeType) {
        return jQuery.grep(elements, function(elem) {
          return (elem === qualifier) !== not;
        });
      }

      if (typeof qualifier !== "string") {
        return jQuery.grep(elements, function(elem) {
          return (indexOf.call(qualifier, elem) > -1) !== not;
        });
      }

      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }

      qualifier = jQuery.filter(qualifier, elements);
      return jQuery.grep(elements, function(elem) {
        return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1;
      });
    }

    jQuery.filter = function(expr, elems, not) {
      var elem = elems[0];

      if (not) {
        expr = ":not(" + expr + ")";
      }

      if (elems.length === 1 && elem.nodeType === 1) {
        return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
      }

      return jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
        return elem.nodeType === 1;
      }));
    };

    jQuery.fn.extend({
      find: function(selector) {
        var i, ret,
          len = this.length,
          self = this;

        if (typeof selector !== "string") {
          return this.pushStack(jQuery(selector).filter(function() {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this)) {
                return true;
              }
            }
          }));
        }

        ret = this.pushStack([]);

        for (i = 0; i < len; i++) {
          jQuery.find(selector, self[i], ret);
        }

        return len > 1 ? jQuery.uniqueSort(ret) : ret;
      },
      filter: function(selector) {
        return this.pushStack(winnow(this, selector || [], false));
      },
      not: function(selector) {
        return this.pushStack(winnow(this, selector || [], true));
      },
      is: function(selector) {
        return !!winnow(
          this,

          typeof selector === "string" && rneedsContext.test(selector) ?
          jQuery(selector) :
          selector || [],
          false
        ).length;
      }
    });




    var rootjQuery,

      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

      init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;

        if (!selector) {
          return this;
        }

        root = root || rootjQuery;

        if (typeof selector === "string") {
          if (selector[0] === "<" &&
            selector[selector.length - 1] === ">" &&
            selector.length >= 3) {

            match = [null, selector, null];

          } else {
            match = rquickExpr.exec(selector);
          }

          if (match && (match[1] || !context)) {

            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;

              jQuery.merge(this, jQuery.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document,
                true
              ));

              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {

                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);

                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }

              return this;

            } else {
              elem = document.getElementById(match[2]);

              if (elem) {

                this[0] = elem;
                this.length = 1;
              }
              return this;
            }

          } else if (!context || context.jquery) {
            return (context || root).find(selector);

          } else {
            return this.constructor(context).find(selector);
          }

        } else if (selector.nodeType) {
          this[0] = selector;
          this.length = 1;
          return this;

        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ?
            root.ready(selector) :

            selector(jQuery);
        }

        return jQuery.makeArray(selector, this);
      };

    init.prototype = jQuery.fn;

    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };

    jQuery.fn.extend({
      has: function(target) {
        var targets = jQuery(target, this),
          l = targets.length;

        return this.filter(function() {
          var i = 0;
          for (; i < l; i++) {
            if (jQuery.contains(this, targets[i])) {
              return true;
            }
          }
        });
      },

      closest: function(selectors, context) {
        var cur,
          i = 0,
          l = this.length,
          matched = [],
          targets = typeof selectors !== "string" && jQuery(selectors);

        if (!rneedsContext.test(selectors)) {
          for (; i < l; i++) {
            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

              if (cur.nodeType < 11 && (targets ?
                  targets.index(cur) > -1 :

                  cur.nodeType === 1 &&
                  jQuery.find.matchesSelector(cur, selectors))) {

                matched.push(cur);
                break;
              }
            }
          }
        }

        return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
      },

      index: function(elem) {

        if (!elem) {
          return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
        }

        if (typeof elem === "string") {
          return indexOf.call(jQuery(elem), this[0]);
        }

        return indexOf.call(this,

          elem.jquery ? elem[0] : elem
        );
      },

      add: function(selector, context) {
        return this.pushStack(
          jQuery.uniqueSort(
            jQuery.merge(this.get(), jQuery(selector, context))
          )
        );
      },

      addBack: function(selector) {
        return this.add(selector == null ?
          this.prevObject : this.prevObject.filter(selector)
        );
      }
    });

    function sibling(cur, dir) {
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    }

    jQuery.each({
      parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function(elem) {
        return dir(elem, "parentNode");
      },
      parentsUntil: function(elem, i, until) {
        return dir(elem, "parentNode", until);
      },
      next: function(elem) {
        return sibling(elem, "nextSibling");
      },
      prev: function(elem) {
        return sibling(elem, "previousSibling");
      },
      nextAll: function(elem) {
        return dir(elem, "nextSibling");
      },
      prevAll: function(elem) {
        return dir(elem, "previousSibling");
      },
      nextUntil: function(elem, i, until) {
        return dir(elem, "nextSibling", until);
      },
      prevUntil: function(elem, i, until) {
        return dir(elem, "previousSibling", until);
      },
      siblings: function(elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
      },
      children: function(elem) {
        return siblings(elem.firstChild);
      },
      contents: function(elem) {
        if (nodeName(elem, "iframe")) {
          return elem.contentDocument;
        }

        if (nodeName(elem, "template")) {
          elem = elem.content || elem;
        }

        return jQuery.merge([], elem.childNodes);
      }
    }, function(name, fn) {
      jQuery.fn[name] = function(until, selector) {
        var matched = jQuery.map(this, fn, until);

        if (name.slice(-5) !== "Until") {
          selector = until;
        }

        if (selector && typeof selector === "string") {
          matched = jQuery.filter(selector, matched);
        }

        if (this.length > 1) {

          if (!guaranteedUnique[name]) {
            jQuery.uniqueSort(matched);
          }

          if (rparentsprev.test(name)) {
            matched.reverse();
          }
        }

        return this.pushStack(matched);
      };
    });
    var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);



    function createOptions(options) {
      var object = {};
      jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
        object[flag] = true;
      });
      return object;
    }

    jQuery.Callbacks = function(options) {

      options = typeof options === "string" ?
        createOptions(options) :
        jQuery.extend({}, options);

      var
        firing,

        memory,

        fired,

        locked,

        list = [],

        queue = [],

        firingIndex = -1,

        fire = function() {

          locked = locked || options.once;

          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {

              if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                options.stopOnFalse) {

                firingIndex = list.length;
                memory = false;
              }
            }
          }

          if (!options.memory) {
            memory = false;
          }

          firing = false;

          if (locked) {

            if (memory) {
              list = [];

            } else {
              list = "";
            }
          }
        },

        self = {

          add: function() {
            if (list) {

              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }

              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {

                    add(arg);
                  }
                });
              })(arguments);

              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },

          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);

                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },

          has: function(fn) {
            return fn ?
              jQuery.inArray(fn, list) > -1 :
              list.length > 0;
          },

          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },

          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },

          lock: function() {
            locked = queue = [];
            if (!memory && !firing) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },

          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },

          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },

          fired: function() {
            return !!fired;
          }
        };

      return self;
    };


    function Identity(v) {
      return v;
    }

    function Thrower(ex) {
      throw ex;
    }

    function adoptValue(value, resolve, reject, noValue) {
      var method;

      try {

        if (value && jQuery.isFunction((method = value.promise))) {
          method.call(value).done(resolve).fail(reject);

        } else if (value && jQuery.isFunction((method = value.then))) {
          method.call(value, resolve, reject);

        } else {

          resolve.apply(undefined, [value].slice(noValue));
        }

      } catch (value) {

        reject.apply(undefined, [value]);
      }
    }

    jQuery.extend({

      Deferred: function(func) {
        var tuples = [

            ["notify", "progress", jQuery.Callbacks("memory"),
              jQuery.Callbacks("memory"), 2
            ],
            ["resolve", "done", jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"), 0, "resolved"
            ],
            ["reject", "fail", jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"), 1, "rejected"
            ]
          ],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            "catch": function(fn) {
              return promise.then(null, fn);
            },

            pipe: function() {
              var fns = arguments;

              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {

                  var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise()
                        .progress(newDefer.notify)
                        .done(newDefer.resolve)
                        .fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](
                        this,
                        fn ? [returned] : arguments
                      );
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            then: function(onFulfilled, onRejected, onProgress) {
              var maxDepth = 0;

              function resolve(depth, deferred, handler, special) {
                return function() {
                  var that = this,
                    args = arguments,
                    mightThrow = function() {
                      var returned, then;

                      if (depth < maxDepth) {
                        return;
                      }

                      returned = handler.apply(that, args);

                      if (returned === deferred.promise()) {
                        throw new TypeError("Thenable self-resolution");
                      }

                      then = returned &&

                        (typeof returned === "object" ||
                          typeof returned === "function") &&
                        returned.then;

                      if (jQuery.isFunction(then)) {

                        if (special) {
                          then.call(
                            returned,
                            resolve(maxDepth, deferred, Identity, special),
                            resolve(maxDepth, deferred, Thrower, special)
                          );

                        } else {

                          maxDepth++;

                          then.call(
                            returned,
                            resolve(maxDepth, deferred, Identity, special),
                            resolve(maxDepth, deferred, Thrower, special),
                            resolve(maxDepth, deferred, Identity,
                              deferred.notifyWith)
                          );
                        }

                      } else {

                        if (handler !== Identity) {
                          that = undefined;
                          args = [returned];
                        }

                        (special || deferred.resolveWith)(that, args);
                      }
                    },

                    process = special ?
                    mightThrow :
                    function() {
                      try {
                        mightThrow();
                      } catch (e) {

                        if (jQuery.Deferred.exceptionHook) {
                          jQuery.Deferred.exceptionHook(e,
                            process.stackTrace);
                        }

                        if (depth + 1 >= maxDepth) {

                          if (handler !== Thrower) {
                            that = undefined;
                            args = [e];
                          }

                          deferred.rejectWith(that, args);
                        }
                      }
                    };

                  if (depth) {
                    process();
                  } else {

                    if (jQuery.Deferred.getStackHook) {
                      process.stackTrace = jQuery.Deferred.getStackHook();
                    }
                    window.setTimeout(process);
                  }
                };
              }

              return jQuery.Deferred(function(newDefer) {

                tuples[0][3].add(
                  resolve(
                    0,
                    newDefer,
                    jQuery.isFunction(onProgress) ?
                    onProgress :
                    Identity,
                    newDefer.notifyWith
                  )
                );

                tuples[1][3].add(
                  resolve(
                    0,
                    newDefer,
                    jQuery.isFunction(onFulfilled) ?
                    onFulfilled :
                    Identity
                  )
                );

                tuples[2][3].add(
                  resolve(
                    0,
                    newDefer,
                    jQuery.isFunction(onRejected) ?
                    onRejected :
                    Thrower
                  )
                );
              }).promise();
            },

            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};

        jQuery.each(tuples, function(i, tuple) {
          var list = tuple[2],
            stateString = tuple[5];

          promise[tuple[1]] = list.add;

          if (stateString) {
            list.add(
              function() {

                state = stateString;
              },

              tuples[3 - i][2].disable,

              tuples[0][2].lock
            );
          }

          list.add(tuple[3].fire);

          deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
            return this;
          };

          deferred[tuple[0] + "With"] = list.fireWith;
        });

        promise.promise(deferred);

        if (func) {
          func.call(deferred, deferred);
        }

        return deferred;
      },

      when: function(singleValue) {
        var

          remaining = arguments.length,

          i = remaining,

          resolveContexts = Array(i),
          resolveValues = slice.call(arguments),

          master = jQuery.Deferred(),

          updateFunc = function(i) {
            return function(value) {
              resolveContexts[i] = this;
              resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (!(--remaining)) {
                master.resolveWith(resolveContexts, resolveValues);
              }
            };
          };

        if (remaining <= 1) {
          adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject,
            !remaining);

          if (master.state() === "pending" ||
            jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

            return master.then();
          }
        }

        while (i--) {
          adoptValue(resolveValues[i], updateFunc(i), master.reject);
        }

        return master.promise();
      }
    });


    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

    jQuery.Deferred.exceptionHook = function(error, stack) {

      if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
        window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
      }
    };




    jQuery.readyException = function(error) {
      window.setTimeout(function() {
        throw error;
      });
    };




    var readyList = jQuery.Deferred();

    jQuery.fn.ready = function(fn) {

      readyList
        .then(fn)

        .catch(function(error) {
          jQuery.readyException(error);
        });

      return this;
    };

    jQuery.extend({

      isReady: false,

      readyWait: 1,

      ready: function(wait) {

        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
          return;
        }

        jQuery.isReady = true;

        if (wait !== true && --jQuery.readyWait > 0) {
          return;
        }

        readyList.resolveWith(document, [jQuery]);
      }
    });

    jQuery.ready.then = readyList.then;

    function completed() {
      document.removeEventListener("DOMContentLoaded", completed);
      window.removeEventListener("load", completed);
      jQuery.ready();
    }

    if (document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)) {

      window.setTimeout(jQuery.ready);

    } else {

      document.addEventListener("DOMContentLoaded", completed);

      window.addEventListener("load", completed);
    }




    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0,
        len = elems.length,
        bulk = key == null;

      if (jQuery.type(key) === "object") {
        chainable = true;
        for (i in key) {
          access(elems, fn, i, key[i], true, emptyGet, raw);
        }

      } else if (value !== undefined) {
        chainable = true;

        if (!jQuery.isFunction(value)) {
          raw = true;
        }

        if (bulk) {

          if (raw) {
            fn.call(elems, value);
            fn = null;

          } else {
            bulk = fn;
            fn = function(elem, key, value) {
              return bulk.call(jQuery(elem), value);
            };
          }
        }

        if (fn) {
          for (; i < len; i++) {
            fn(
              elems[i], key, raw ?
              value :
              value.call(elems[i], i, fn(elems[i], key))
            );
          }
        }
      }

      if (chainable) {
        return elems;
      }

      if (bulk) {
        return fn.call(elems);
      }

      return len ? fn(elems[0], key) : emptyGet;
    };
    var acceptData = function(owner) {

      return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    };




    function Data() {
      this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {

      cache: function(owner) {

        var value = owner[this.expando];

        if (!value) {
          value = {};

          if (acceptData(owner)) {

            if (owner.nodeType) {
              owner[this.expando] = value;

            } else {
              Object.defineProperty(owner, this.expando, {
                value: value,
                configurable: true
              });
            }
          }
        }

        return value;
      },
      set: function(owner, data, value) {
        var prop,
          cache = this.cache(owner);

        if (typeof data === "string") {
          cache[jQuery.camelCase(data)] = value;

        } else {

          for (prop in data) {
            cache[jQuery.camelCase(prop)] = data[prop];
          }
        }
        return cache;
      },
      get: function(owner, key) {
        return key === undefined ?
          this.cache(owner) :

          owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
      },
      access: function(owner, key, value) {

        if (key === undefined ||
          ((key && typeof key === "string") && value === undefined)) {

          return this.get(owner, key);
        }

        this.set(owner, key, value);

        return value !== undefined ? value : key;
      },
      remove: function(owner, key) {
        var i,
          cache = owner[this.expando];

        if (cache === undefined) {
          return;
        }

        if (key !== undefined) {

          if (Array.isArray(key)) {

            key = key.map(jQuery.camelCase);
          } else {
            key = jQuery.camelCase(key);

            key = key in cache ? [key] :
              (key.match(rnothtmlwhite) || []);
          }

          i = key.length;

          while (i--) {
            delete cache[key[i]];
          }
        }

        if (key === undefined || jQuery.isEmptyObject(cache)) {

          if (owner.nodeType) {
            owner[this.expando] = undefined;
          } else {
            delete owner[this.expando];
          }
        }
      },
      hasData: function(owner) {
        var cache = owner[this.expando];
        return cache !== undefined && !jQuery.isEmptyObject(cache);
      }
    };
    var dataPriv = new Data();

    var dataUser = new Data();




    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;

    function getData(data) {
      if (data === "true") {
        return true;
      }

      if (data === "false") {
        return false;
      }

      if (data === "null") {
        return null;
      }

      if (data === +data + "") {
        return +data;
      }

      if (rbrace.test(data)) {
        return JSON.parse(data);
      }

      return data;
    }

    function dataAttr(elem, key, data) {
      var name;

      if (data === undefined && elem.nodeType === 1) {
        name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
        data = elem.getAttribute(name);

        if (typeof data === "string") {
          try {
            data = getData(data);
          } catch (e) {
            salog(e);
          }

          dataUser.set(elem, key, data);
        } else {
          data = undefined;
        }
      }
      return data;
    }

    jQuery.extend({
      hasData: function(elem) {
        return dataUser.hasData(elem) || dataPriv.hasData(elem);
      },

      data: function(elem, name, data) {
        return dataUser.access(elem, name, data);
      },

      removeData: function(elem, name) {
        dataUser.remove(elem, name);
      },

      _data: function(elem, name, data) {
        return dataPriv.access(elem, name, data);
      },

      _removeData: function(elem, name) {
        dataPriv.remove(elem, name);
      }
    });

    jQuery.fn.extend({
      data: function(key, value) {
        var i, name, data,
          elem = this[0],
          attrs = elem && elem.attributes;

        if (key === undefined) {
          if (this.length) {
            data = dataUser.get(elem);

            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
              i = attrs.length;
              while (i--) {

                if (attrs[i]) {
                  name = attrs[i].name;
                  if (name.indexOf("data-") === 0) {
                    name = jQuery.camelCase(name.slice(5));
                    dataAttr(elem, name, data[name]);
                  }
                }
              }
              dataPriv.set(elem, "hasDataAttrs", true);
            }
          }

          return data;
        }

        if (typeof key === "object") {
          return this.each(function() {
            dataUser.set(this, key);
          });
        }

        return access(this, function(value) {
          var data;

          if (elem && value === undefined) {

            data = dataUser.get(elem, key);
            if (data !== undefined) {
              return data;
            }

            data = dataAttr(elem, key);
            if (data !== undefined) {
              return data;
            }

            return;
          }

          this.each(function() {

            dataUser.set(this, key, value);
          });
        }, null, value, arguments.length > 1, null, true);
      },

      removeData: function(key) {
        return this.each(function() {
          dataUser.remove(this, key);
        });
      }
    });


    jQuery.extend({
      queue: function(elem, type, data) {
        var queue;

        if (elem) {
          type = (type || "fx") + "queue";
          queue = dataPriv.get(elem, type);

          if (data) {
            if (!queue || Array.isArray(data)) {
              queue = dataPriv.access(elem, type, jQuery.makeArray(data));
            } else {
              queue.push(data);
            }
          }
          return queue || [];
        }
      },

      dequeue: function(elem, type) {
        type = type || "fx";

        var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };

        if (fn === "inprogress") {
          fn = queue.shift();
          startLength--;
        }

        if (fn) {

          if (type === "fx") {
            queue.unshift("inprogress");
          }

          delete hooks.stop;
          fn.call(elem, next, hooks);
        }

        if (!startLength && hooks) {
          hooks.empty.fire();
        }
      },

      _queueHooks: function(elem, type) {
        var key = type + "queueHooks";
        return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
          empty: jQuery.Callbacks("once memory").add(function() {
            dataPriv.remove(elem, [type + "queue", key]);
          })
        });
      }
    });

    jQuery.fn.extend({
      queue: function(type, data) {
        var setter = 2;

        if (typeof type !== "string") {
          data = type;
          type = "fx";
          setter--;
        }

        if (arguments.length < setter) {
          return jQuery.queue(this[0], type);
        }

        return data === undefined ?
          this :
          this.each(function() {
            var queue = jQuery.queue(this, type, data);

            jQuery._queueHooks(this, type);

            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
      },
      dequeue: function(type) {
        return this.each(function() {
          jQuery.dequeue(this, type);
        });
      },
      clearQueue: function(type) {
        return this.queue(type || "fx", []);
      },

      promise: function(type, obj) {
        var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };

        if (typeof type !== "string") {
          obj = type;
          type = undefined;
        }
        type = type || "fx";

        while (i--) {
          tmp = dataPriv.get(elements[i], type + "queueHooks");
          if (tmp && tmp.empty) {
            count++;
            tmp.empty.add(resolve);
          }
        }
        resolve();
        return defer.promise(obj);
      }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var isHiddenWithinTree = function(elem, el) {

      elem = el || elem;

      return elem.style.display === "none" ||
        elem.style.display === "" &&

        jQuery.contains(elem.ownerDocument, elem) &&

        jQuery.css(elem, "display") === "none";
    };

    var swap = function(elem, options, callback, args) {
      var ret, name,
        old = {};

      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }

      ret = callback.apply(elem, args || []);

      for (name in options) {
        elem.style[name] = old[name];
      }

      return ret;
    };




    function adjustCSS(elem, prop, valueParts, tween) {
      var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ?
        function() {
          return tween.cur();
        } :
        function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
        rcssNum.exec(jQuery.css(elem, prop));

      if (initialInUnit && initialInUnit[3] !== unit) {

        unit = unit || initialInUnit[3];

        valueParts = valueParts || [];

        initialInUnit = +initial || 1;

        do {

          scale = scale || ".5";

          initialInUnit = initialInUnit / scale;
          jQuery.style(elem, prop, initialInUnit + unit);

        } while (
          scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations
        );
      }

      if (valueParts) {
        initialInUnit = +initialInUnit || +initial || 0;

        adjusted = valueParts[1] ?
          initialInUnit + (valueParts[1] + 1) * valueParts[2] :
          +valueParts[2];
        if (tween) {
          tween.unit = unit;
          tween.start = initialInUnit;
          tween.end = adjusted;
        }
      }
      return adjusted;
    }


    var defaultDisplayMap = {};

    function getDefaultDisplay(elem) {
      var temp,
        doc = elem.ownerDocument,
        nodeName = elem.nodeName,
        display = defaultDisplayMap[nodeName];

      if (display) {
        return display;
      }

      temp = doc.body.appendChild(doc.createElement(nodeName));
      display = jQuery.css(temp, "display");

      temp.parentNode.removeChild(temp);

      if (display === "none") {
        display = "block";
      }
      defaultDisplayMap[nodeName] = display;

      return display;
    }

    function showHide(elements, show) {
      var display, elem,
        values = [],
        index = 0,
        length = elements.length;

      for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }

        display = elem.style.display;
        if (show) {

          if (display === "none") {
            values[index] = dataPriv.get(elem, "display") || null;
            if (!values[index]) {
              elem.style.display = "";
            }
          }
          if (elem.style.display === "" && isHiddenWithinTree(elem)) {
            values[index] = getDefaultDisplay(elem);
          }
        } else {
          if (display !== "none") {
            values[index] = "none";

            dataPriv.set(elem, "display", display);
          }
        }
      }

      for (index = 0; index < length; index++) {
        if (values[index] != null) {
          elements[index].style.display = values[index];
        }
      }

      return elements;
    }

    jQuery.fn.extend({
      show: function() {
        return showHide(this, true);
      },
      hide: function() {
        return showHide(this);
      },
      toggle: function(state) {
        if (typeof state === "boolean") {
          return state ? this.show() : this.hide();
        }

        return this.each(function() {
          if (isHiddenWithinTree(this)) {
            jQuery(this).show();
          } else {
            jQuery(this).hide();
          }
        });
      }
    });
    var rcheckableType = (/^(?:checkbox|radio)$/i);

    var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i);

    var rscriptType = (/^$|\/(?:java|ecma)script/i);



    var wrapMap = {

      option: [1, "<select multiple='multiple'>", "</select>"],

      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

      _default: [0, "", ""]
    };

    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;


    function getAll(context, tag) {

      var ret;

      if (typeof context.getElementsByTagName !== "undefined") {
        ret = context.getElementsByTagName(tag || "*");

      } else if (typeof context.querySelectorAll !== "undefined") {
        ret = context.querySelectorAll(tag || "*");

      } else {
        ret = [];
      }

      if (tag === undefined || tag && nodeName(context, tag)) {
        return jQuery.merge([context], ret);
      }

      return ret;
    }


    function setGlobalEval(elems, refElements) {
      var i = 0,
        l = elems.length;

      for (; i < l; i++) {
        dataPriv.set(
          elems[i],
          "globalEval",
          !refElements || dataPriv.get(refElements[i], "globalEval")
        );
      }
    }


    var rhtml = /<|&#?\w+;/;

    function buildFragment(elems, context, scripts, selection, ignored) {
      var elem, tmp, tag, wrap, contains, j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;

      for (; i < l; i++) {
        elem = elems[i];

        if (elem || elem === 0) {

          if (jQuery.type(elem) === "object") {

            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));

          } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));

            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }

            jQuery.merge(nodes, tmp.childNodes);

            tmp = fragment.firstChild;

            tmp.textContent = "";
          }
        }
      }

      fragment.textContent = "";

      i = 0;
      while ((elem = nodes[i++])) {

        if (selection && jQuery.inArray(elem, selection) > -1) {
          if (ignored) {
            ignored.push(elem);
          }
          continue;
        }

        contains = jQuery.contains(elem.ownerDocument, elem);

        tmp = getAll(fragment.appendChild(elem), "script");

        if (contains) {
          setGlobalEval(tmp);
        }

        if (scripts) {
          j = 0;
          while ((elem = tmp[j++])) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }

      return fragment;
    }


    (function() {
      var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");

      input.setAttribute("type", "radio");
      input.setAttribute("checked", "checked");
      input.setAttribute("name", "t");

      div.appendChild(input);

      support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

      div.innerHTML = "<textarea>x</textarea>";
      support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var documentElement = document.documentElement;



    var
      rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
      return true;
    }

    function returnFalse() {
      return false;
    }

    function safeActiveElement() {
      try {
        return document.activeElement;
      } catch (err) {
        salog(err);
      }
    }

    function on(elem, types, selector, data, fn, one) {
      var origFn, type;

      if (typeof types === "object") {

        if (typeof selector !== "string") {

          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          on(elem, type, selector, data, types[type], one);
        }
        return elem;
      }

      if (data == null && fn == null) {

        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === "string") {

          fn = data;
          data = undefined;
        } else {

          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return elem;
      }

      if (one === 1) {
        origFn = fn;
        fn = function(event) {

          jQuery().off(event);
          return origFn.apply(this, arguments);
        };

        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return elem.each(function() {
        jQuery.event.add(this, types, fn, data, selector);
      });
    }

    jQuery.event = {

      global: {},

      add: function(elem, types, handler, data, selector) {

        var handleObjIn, eventHandle, tmp,
          events, t, handleObj,
          special, handlers, type, namespaces, origType,
          elemData = dataPriv.get(elem);

        if (!elemData) {
          return;
        }

        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }

        if (selector) {
          jQuery.find.matchesSelector(documentElement, selector);
        }

        if (!handler.guid) {
          handler.guid = jQuery.guid++;
        }

        if (!(events = elemData.events)) {
          events = elemData.events = {};
        }
        if (!(eventHandle = elemData.handle)) {
          eventHandle = elemData.handle = function(e) {

            return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
              jQuery.event.dispatch.apply(elem, arguments) : undefined;
          };
        }

        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();

          if (!type) {
            continue;
          }

          special = jQuery.event.special[type] || {};

          type = (selector ? special.delegateType : special.bindType) || type;

          special = jQuery.event.special[type] || {};

          handleObj = jQuery.extend({
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join(".")
          }, handleObjIn);

          if (!(handlers = events[type])) {
            handlers = events[type] = [];
            handlers.delegateCount = 0;

            if (!special.setup ||
              special.setup.call(elem, data, namespaces, eventHandle) === false) {

              if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle);
              }
            }
          }

          if (special.add) {
            special.add.call(elem, handleObj);

            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }

          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }

          jQuery.event.global[type] = true;
        }

      },

      remove: function(elem, types, handler, selector, mappedTypes) {

        var j, origCount, tmp,
          events, t, handleObj,
          special, handlers, type, namespaces, origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

        if (!elemData || !(events = elemData.events)) {
          return;
        }

        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();

          if (!type) {
            for (type in events) {
              jQuery.event.remove(elem, type + types[t], handler, selector, true);
            }
            continue;
          }

          special = jQuery.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          handlers = events[type] || [];
          tmp = tmp[2] &&
            new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

          origCount = j = handlers.length;
          while (j--) {
            handleObj = handlers[j];

            if ((mappedTypes || origType === handleObj.origType) &&
              (!handler || handler.guid === handleObj.guid) &&
              (!tmp || tmp.test(handleObj.namespace)) &&
              (!selector || selector === handleObj.selector ||
                selector === "**" && handleObj.selector)) {
              handlers.splice(j, 1);

              if (handleObj.selector) {
                handlers.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }

          if (origCount && !handlers.length) {
            if (!special.teardown ||
              special.teardown.call(elem, namespaces, elemData.handle) === false) {

              jQuery.removeEvent(elem, type, elemData.handle);
            }

            delete events[type];
          }
        }

        if (jQuery.isEmptyObject(events)) {
          dataPriv.remove(elem, "handle events");
        }
      },

      dispatch: function(nativeEvent) {

        var event = jQuery.event.fix(nativeEvent);

        var i, j, ret, matched, handleObj, handlerQueue,
          args = new Array(arguments.length),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};

        args[0] = event;

        for (i = 1; i < arguments.length; i++) {
          args[i] = arguments[i];
        }

        event.delegateTarget = this;

        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
          return;
        }

        handlerQueue = jQuery.event.handlers.call(this, event, handlers);

        i = 0;
        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
          event.currentTarget = matched.elem;

          j = 0;
          while ((handleObj = matched.handlers[j++]) &&
            !event.isImmediatePropagationStopped()) {

            if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

              event.handleObj = handleObj;
              event.data = handleObj.data;

              ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                handleObj.handler).apply(matched.elem, args);

              if (ret !== undefined) {
                if ((event.result = ret) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }

        if (special.postDispatch) {
          special.postDispatch.call(this, event);
        }

        return event.result;
      },

      handlers: function(event, handlers) {
        var i, handleObj, sel, matchedHandlers, matchedSelectors,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;

        if (delegateCount &&

          cur.nodeType &&

          !(event.type === "click" && event.button >= 1)) {

          for (; cur !== this; cur = cur.parentNode || this) {

            if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
              matchedHandlers = [];
              matchedSelectors = {};
              for (i = 0; i < delegateCount; i++) {
                handleObj = handlers[i];

                sel = handleObj.selector + " ";

                if (matchedSelectors[sel] === undefined) {
                  matchedSelectors[sel] = handleObj.needsContext ?
                    jQuery(sel, this).index(cur) > -1 :
                    jQuery.find(sel, this, null, [cur]).length;
                }
                if (matchedSelectors[sel]) {
                  matchedHandlers.push(handleObj);
                }
              }
              if (matchedHandlers.length) {
                handlerQueue.push({
                  elem: cur,
                  handlers: matchedHandlers
                });
              }
            }
          }
        }

        cur = this;
        if (delegateCount < handlers.length) {
          handlerQueue.push({
            elem: cur,
            handlers: handlers.slice(delegateCount)
          });
        }

        return handlerQueue;
      },

      addProp: function(name, hook) {
        Object.defineProperty(jQuery.Event.prototype, name, {
          enumerable: true,
          configurable: true,

          get: jQuery.isFunction(hook) ?
            function() {
              if (this.originalEvent) {
                return hook(this.originalEvent);
              }
            } : function() {
              if (this.originalEvent) {
                return this.originalEvent[name];
              }
            },

          set: function(value) {
            Object.defineProperty(this, name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: value
            });
          }
        });
      },

      fix: function(originalEvent) {
        return originalEvent[jQuery.expando] ?
          originalEvent :
          new jQuery.Event(originalEvent);
      },

      special: {
        load: {

          noBubble: true
        },
        focus: {

          trigger: function() {
            if (this !== safeActiveElement() && this.focus) {
              this.focus();
              return false;
            }
          },
          delegateType: "focusin"
        },
        blur: {
          trigger: function() {
            if (this === safeActiveElement() && this.blur) {
              this.blur();
              return false;
            }
          },
          delegateType: "focusout"
        },
        click: {

          trigger: function() {
            if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
              this.click();
              return false;
            }
          },

          _default: function(event) {
            return nodeName(event.target, "a");
          }
        },

        beforeunload: {
          postDispatch: function(event) {

            if (event.result !== undefined && event.originalEvent) {
              event.originalEvent.returnValue = event.result;
            }
          }
        }
      }
    };

    jQuery.removeEvent = function(elem, type, handle) {

      if (elem.removeEventListener) {
        elem.removeEventListener(type, handle);
      }
    };

    jQuery.Event = function(src, props) {

      if (!(this instanceof jQuery.Event)) {
        return new jQuery.Event(src, props);
      }

      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;

        this.isDefaultPrevented = src.defaultPrevented ||
          src.defaultPrevented === undefined &&

          src.returnValue === false ?
          returnTrue :
          returnFalse;

        this.target = (src.target && src.target.nodeType === 3) ?
          src.target.parentNode :
          src.target;

        this.currentTarget = src.currentTarget;
        this.relatedTarget = src.relatedTarget;

      } else {
        this.type = src;
      }

      if (props) {
        jQuery.extend(this, props);
      }

      this.timeStamp = src && src.timeStamp || jQuery.now();

      this[jQuery.expando] = true;
    };

    jQuery.Event.prototype = {
      constructor: jQuery.Event,
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,
      isSimulated: false,

      preventDefault: function() {
        var e = this.originalEvent;

        this.isDefaultPrevented = returnTrue;

        if (e && !this.isSimulated) {
          e.preventDefault();
        }
      },
      stopPropagation: function() {
        var e = this.originalEvent;

        this.isPropagationStopped = returnTrue;

        if (e && !this.isSimulated) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;

        this.isImmediatePropagationStopped = returnTrue;

        if (e && !this.isSimulated) {
          e.stopImmediatePropagation();
        }

        this.stopPropagation();
      }
    };

    jQuery.each({
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      "char": true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,

      which: function(event) {
        var button = event.button;

        if (event.which == null && rkeyEvent.test(event.type)) {
          return event.charCode != null ? event.charCode : event.keyCode;
        }

        if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
          if (button & 1) {
            return 1;
          }

          if (button & 2) {
            return 3;
          }

          if (button & 4) {
            return 2;
          }

          return 0;
        }

        return event.which;
      }
    }, jQuery.event.addProp);

    jQuery.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,

        handle: function(event) {
          var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;

          if (!related || (related !== target && !jQuery.contains(target, related))) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    });

    jQuery.fn.extend({

      on: function(types, selector, data, fn) {
        return on(this, types, selector, data, fn);
      },
      one: function(types, selector, data, fn) {
        return on(this, types, selector, data, fn, 1);
      },
      off: function(types, selector, fn) {
        var handleObj, type;
        if (types && types.preventDefault && types.handleObj) {

          handleObj = types.handleObj;
          jQuery(types.delegateTarget).off(
            handleObj.namespace ?
            handleObj.origType + "." + handleObj.namespace :
            handleObj.origType,
            handleObj.selector,
            handleObj.handler
          );
          return this;
        }
        if (typeof types === "object") {

          for (type in types) {
            this.off(type, selector, types[type]);
          }
          return this;
        }
        if (selector === false || typeof selector === "function") {

          fn = selector;
          selector = undefined;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function() {
          jQuery.event.remove(this, types, fn, selector);
        });
      }
    });


    var


      rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


      rnoInnerhtml = /<script|<style|<link/i,

      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function manipulationTarget(elem, content) {
      if (nodeName(elem, "table") &&
        nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

        return jQuery(">tbody", elem)[0] || elem;
      }

      return elem;
    }

    function disableScript(elem) {
      elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
      return elem;
    }

    function restoreScript(elem) {
      var match = rscriptTypeMasked.exec(elem.type);

      if (match) {
        elem.type = match[1];
      } else {
        elem.removeAttribute("type");
      }

      return elem;
    }

    function cloneCopyEvent(src, dest) {
      var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

      if (dest.nodeType !== 1) {
        return;
      }

      if (dataPriv.hasData(src)) {
        pdataOld = dataPriv.access(src);
        pdataCur = dataPriv.set(dest, pdataOld);
        events = pdataOld.events;

        if (events) {
          delete pdataCur.handle;
          pdataCur.events = {};

          for (type in events) {
            for (i = 0, l = events[type].length; i < l; i++) {
              jQuery.event.add(dest, type, events[type][i]);
            }
          }
        }
      }

      if (dataUser.hasData(src)) {
        udataOld = dataUser.access(src);
        udataCur = jQuery.extend({}, udataOld);

        dataUser.set(dest, udataCur);
      }
    }

    function fixInput(src, dest) {
      var nodeName = dest.nodeName.toLowerCase();

      if (nodeName === "input" && rcheckableType.test(src.type)) {
        dest.checked = src.checked;

      } else if (nodeName === "input" || nodeName === "textarea") {
        dest.defaultValue = src.defaultValue;
      }
    }

    function domManip(collection, args, callback, ignored) {

      args = concat.apply([], args);

      var fragment, first, scripts, hasScripts, node, doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);

      if (isFunction ||
        (l > 1 && typeof value === "string" &&
          !support.checkClone && rchecked.test(value))) {
        return collection.each(function(index) {
          var self = collection.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          domManip(self, args, callback, ignored);
        });
      }

      if (l) {
        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
        first = fragment.firstChild;

        if (fragment.childNodes.length === 1) {
          fragment = first;
        }

        if (first || ignored) {
          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts.length;

          for (; i < l; i++) {
            node = fragment;

            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);

              if (hasScripts) {

                jQuery.merge(scripts, getAll(node, "script"));
              }
            }

            callback.call(collection[i], node, i);
          }

          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;

            jQuery.map(scripts, restoreScript);

            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || "") &&
                !dataPriv.access(node, "globalEval") &&
                jQuery.contains(doc, node)) {

                if (node.src) {

                  if (jQuery._evalUrl) {
                    jQuery._evalUrl(node.src);
                  }
                } else {
                  DOMEval(node.textContent.replace(rcleanScript, ""), doc);
                }
              }
            }
          }
        }
      }

      return collection;
    }

    function remove(elem, selector, keepData) {
      var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;

      for (;
        (node = nodes[i]) != null; i++) {
        if (!keepData && node.nodeType === 1) {
          jQuery.cleanData(getAll(node));
        }

        if (node.parentNode) {
          if (keepData && jQuery.contains(node.ownerDocument, node)) {
            setGlobalEval(getAll(node, "script"));
          }
          node.parentNode.removeChild(node);
        }
      }

      return elem;
    }

    jQuery.extend({
      htmlPrefilter: function(html) {
        return html.replace(rxhtmlTag, "<$1></$2>");
      },

      clone: function(elem, dataAndEvents, deepDataAndEvents) {
        var i, l, srcElements, destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);

        if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
          !jQuery.isXMLDoc(elem)) {

          destElements = getAll(clone);
          srcElements = getAll(elem);

          for (i = 0, l = srcElements.length; i < l; i++) {
            fixInput(srcElements[i], destElements[i]);
          }
        }

        if (dataAndEvents) {
          if (deepDataAndEvents) {
            srcElements = srcElements || getAll(elem);
            destElements = destElements || getAll(clone);

            for (i = 0, l = srcElements.length; i < l; i++) {
              cloneCopyEvent(srcElements[i], destElements[i]);
            }
          } else {
            cloneCopyEvent(elem, clone);
          }
        }

        destElements = getAll(clone, "script");
        if (destElements.length > 0) {
          setGlobalEval(destElements, !inPage && getAll(elem, "script"));
        }

        return clone;
      },

      cleanData: function(elems) {
        var data, elem, type,
          special = jQuery.event.special,
          i = 0;

        for (;
          (elem = elems[i]) !== undefined; i++) {
          if (acceptData(elem)) {
            if ((data = elem[dataPriv.expando])) {
              if (data.events) {
                for (type in data.events) {
                  if (special[type]) {
                    jQuery.event.remove(elem, type);

                  } else {
                    jQuery.removeEvent(elem, type, data.handle);
                  }
                }
              }

              elem[dataPriv.expando] = undefined;
            }
            if (elem[dataUser.expando]) {

              elem[dataUser.expando] = undefined;
            }
          }
        }
      }
    });

    jQuery.fn.extend({
      detach: function(selector) {
        return remove(this, selector, true);
      },

      remove: function(selector) {
        return remove(this, selector);
      },

      text: function(value) {
        return access(this, function(value) {
          return value === undefined ?
            jQuery.text(this) :
            this.empty().each(function() {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value;
              }
            });
        }, null, value, arguments.length);
      },

      append: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
          }
        });
      },

      prepend: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.insertBefore(elem, target.firstChild);
          }
        });
      },

      before: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
          }
        });
      },

      after: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          }
        });
      },

      empty: function() {
        var elem,
          i = 0;

        for (;
          (elem = this[i]) != null; i++) {
          if (elem.nodeType === 1) {

            jQuery.cleanData(getAll(elem, false));

            elem.textContent = "";
          }
        }

        return this;
      },

      clone: function(dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

        return this.map(function() {
          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },

      html: function(value) {
        return access(this, function(value) {
          var elem = this[0] || {},
            i = 0,
            l = this.length;

          if (value === undefined && elem.nodeType === 1) {
            return elem.innerHTML;
          }

          if (typeof value === "string" && !rnoInnerhtml.test(value) &&
            !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

            value = jQuery.htmlPrefilter(value);

            try {
              for (; i < l; i++) {
                elem = this[i] || {};

                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false));
                  elem.innerHTML = value;
                }
              }

              elem = 0;

            } catch (e) {
              salog(e);
            }
          }

          if (elem) {
            this.empty().append(value);
          }
        }, null, value, arguments.length);
      },

      replaceWith: function() {
        var ignored = [];

        return domManip(this, arguments, function(elem) {
          var parent = this.parentNode;

          if (jQuery.inArray(this, ignored) < 0) {
            jQuery.cleanData(getAll(this));
            if (parent) {
              parent.replaceChild(elem, this);
            }
          }

        }, ignored);
      }
    });

    jQuery.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(name, original) {
      jQuery.fn[name] = function(selector) {
        var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;

        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          jQuery(insert[i])[original](elems);

          push.apply(ret, elems.get());
        }

        return this.pushStack(ret);
      };
    });
    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

    var getStyles = function(elem) {

      var view = elem.ownerDocument.defaultView;

      if (!view || !view.opener) {
        view = window;
      }

      return view.getComputedStyle(elem);
    };



    (function() {

      function computeStyleTests() {

        if (!div) {
          return;
        }

        div.style.cssText =
          "box-sizing:border-box;" +
          "position:relative;display:block;" +
          "margin:auto;border:1px;padding:1px;" +
          "top:1%;width:50%";
        div.innerHTML = "";
        documentElement.appendChild(container);

        var divStyle = window.getComputedStyle(div);
        pixelPositionVal = divStyle.top !== "1%";

        reliableMarginLeftVal = divStyle.marginLeft === "2px";
        boxSizingReliableVal = divStyle.width === "4px";

        div.style.marginRight = "50%";
        pixelMarginRightVal = divStyle.marginRight === "4px";

        documentElement.removeChild(container);

        div = null;
      }

      var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");

      if (!div.style) {
        return;
      }

      div.style.backgroundClip = "content-box";
      div.cloneNode(true).style.backgroundClip = "";
      support.clearCloneStyle = div.style.backgroundClip === "content-box";

      container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
        "padding:0;margin-top:1px;position:absolute";
      container.appendChild(div);

      jQuery.extend(support, {
        pixelPosition: function() {
          computeStyleTests();
          return pixelPositionVal;
        },
        boxSizingReliable: function() {
          computeStyleTests();
          return boxSizingReliableVal;
        },
        pixelMarginRight: function() {
          computeStyleTests();
          return pixelMarginRightVal;
        },
        reliableMarginLeft: function() {
          computeStyleTests();
          return reliableMarginLeftVal;
        }
      });
    })();


    function curCSS(elem, name, computed) {
      var width, minWidth, maxWidth, ret,

        style = elem.style;

      computed = computed || getStyles(elem);

      if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];

        if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
          ret = jQuery.style(elem, name);
        }

        if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;

          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;

          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }

      return ret !== undefined ?

        ret + "" :
        ret;
    }


    function addGetHookIf(conditionFn, hookFn) {

      return {
        get: function() {
          if (conditionFn()) {

            delete this.get;
            return;
          }

          return (this.get = hookFn).apply(this, arguments);
        }
      };
    }


    var

      rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      rcustomProp = /^--/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },

      cssPrefixes = ["Webkit", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;

    function vendorPropName(name) {

      if (name in emptyStyle) {
        return name;
      }

      var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;

      while (i--) {
        name = cssPrefixes[i] + capName;
        if (name in emptyStyle) {
          return name;
        }
      }
    }

    function finalPropName(name) {
      var ret = jQuery.cssProps[name];
      if (!ret) {
        ret = jQuery.cssProps[name] = vendorPropName(name) || name;
      }
      return ret;
    }

    function setPositiveNumber(elem, value, subtract) {

      var matches = rcssNum.exec(value);
      return matches ?

        Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
        value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
      var i,
        val = 0;

      if (extra === (isBorderBox ? "border" : "content")) {
        i = 4;

      } else {
        i = name === "width" ? 1 : 0;
      }

      for (; i < 4; i += 2) {

        if (extra === "margin") {
          val += jQuery.css(elem, extra + cssExpand[i], true, styles);
        }

        if (isBorderBox) {

          if (extra === "content") {
            val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
          }

          if (extra !== "margin") {
            val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        } else {

          val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

          if (extra !== "padding") {
            val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        }
      }

      return val;
    }

    function getWidthOrHeight(elem, name, extra) {

      var valueIsBorderBox,
        styles = getStyles(elem),
        val = curCSS(elem, name, styles),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

      if (rnumnonpx.test(val)) {
        return val;
      }

      valueIsBorderBox = isBorderBox &&
        (support.boxSizingReliable() || val === elem.style[name]);

      if (val === "auto") {
        val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
      }

      val = parseFloat(val) || 0;

      return (val +
        augmentWidthOrHeight(
          elem,
          name,
          extra || (isBorderBox ? "border" : "content"),
          valueIsBorderBox,
          styles
        )
      ) + "px";
    }

    jQuery.extend({

      cssHooks: {
        opacity: {
          get: function(elem, computed) {
            if (computed) {

              var ret = curCSS(elem, "opacity");
              return ret === "" ? "1" : ret;
            }
          }
        }
      },

      cssNumber: {
        "animationIterationCount": true,
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
      },

      cssProps: {
        "float": "cssFloat"
      },

      style: function(elem, name, value, extra) {

        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }

        var ret, type, hooks,
          origName = jQuery.camelCase(name),
          isCustomProp = rcustomProp.test(name),
          style = elem.style;

        if (!isCustomProp) {
          name = finalPropName(origName);
        }

        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

        if (value !== undefined) {
          type = typeof value;

          if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
            value = adjustCSS(elem, name, ret);

            type = "number";
          }

          if (value == null || value !== value) {
            return;
          }

          if (type === "number") {
            value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
          }

          if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
            style[name] = "inherit";
          }

          if (!hooks || !("set" in hooks) ||
            (value = hooks.set(elem, value, extra)) !== undefined) {

            if (isCustomProp) {
              style.setProperty(name, value);
            } else {
              style[name] = value;
            }
          }

        } else {

          if (hooks && "get" in hooks &&
            (ret = hooks.get(elem, false, extra)) !== undefined) {

            return ret;
          }

          return style[name];
        }
      },

      css: function(elem, name, extra, styles) {
        var val, num, hooks,
          origName = jQuery.camelCase(name),
          isCustomProp = rcustomProp.test(name);

        if (!isCustomProp) {
          name = finalPropName(origName);
        }

        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

        if (hooks && "get" in hooks) {
          val = hooks.get(elem, true, extra);
        }

        if (val === undefined) {
          val = curCSS(elem, name, styles);
        }

        if (val === "normal" && name in cssNormalTransform) {
          val = cssNormalTransform[name];
        }

        if (extra === "" || extra) {
          num = parseFloat(val);
          return extra === true || isFinite(num) ? num || 0 : val;
        }

        return val;
      }
    });

    jQuery.each(["height", "width"], function(i, name) {
      jQuery.cssHooks[name] = {
        get: function(elem, computed, extra) {
          if (computed) {

            return rdisplayswap.test(jQuery.css(elem, "display")) &&

              (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
              swap(elem, cssShow, function() {
                return getWidthOrHeight(elem, name, extra);
              }) :
              getWidthOrHeight(elem, name, extra);
          }
        },

        set: function(elem, value, extra) {
          var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(
              elem,
              name,
              extra,
              jQuery.css(elem, "boxSizing", false, styles) === "border-box",
              styles
            );

          if (subtract && (matches = rcssNum.exec(value)) &&
            (matches[3] || "px") !== "px") {

            elem.style[name] = value;
            value = jQuery.css(elem, name);
          }

          return setPositiveNumber(elem, value, subtract);
        }
      };
    });

    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
      function(elem, computed) {
        if (computed) {
          return (parseFloat(curCSS(elem, "marginLeft")) ||
            elem.getBoundingClientRect().left -
            swap(elem, {
              marginLeft: 0
            }, function() {
              return elem.getBoundingClientRect().left;
            })
          ) + "px";
        }
      }
    );

    jQuery.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {
        expand: function(value) {
          var i = 0,
            expanded = {},

            parts = typeof value === "string" ? value.split(" ") : [value];

          for (; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] =
              parts[i] || parts[i - 2] || parts[0];
          }

          return expanded;
        }
      };

      if (!rmargin.test(prefix)) {
        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
      }
    });

    jQuery.fn.extend({
      css: function(name, value) {
        return access(this, function(elem, name, value) {
          var styles, len,
            map = {},
            i = 0;

          if (Array.isArray(name)) {
            styles = getStyles(elem);
            len = name.length;

            for (; i < len; i++) {
              map[name[i]] = jQuery.css(elem, name[i], false, styles);
            }

            return map;
          }

          return value !== undefined ?
            jQuery.style(elem, name, value) :
            jQuery.css(elem, name);
        }, name, value, arguments.length > 1);
      }
    });


    jQuery.fn.delay = function(time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || "fx";

      return this.queue(type, function(next, hooks) {
        var timeout = window.setTimeout(next, time);
        hooks.stop = function() {
          window.clearTimeout(timeout);
        };
      });
    };


    (function() {
      var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));

      input.type = "checkbox";

      support.checkOn = input.value !== "";

      support.optSelected = opt.selected;

      input = document.createElement("input");
      input.value = "t";
      input.type = "radio";
      support.radioValue = input.value === "t";
    })();


    var boolHook,
      attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend({
      attr: function(name, value) {
        return access(this, jQuery.attr, name, value, arguments.length > 1);
      },

      removeAttr: function(name) {
        return this.each(function() {
          jQuery.removeAttr(this, name);
        });
      }
    });

    jQuery.extend({
      attr: function(elem, name, value) {
        var ret, hooks,
          nType = elem.nodeType;

        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }

        if (typeof elem.getAttribute === "undefined") {
          return jQuery.prop(elem, name, value);
        }

        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          hooks = jQuery.attrHooks[name.toLowerCase()] ||
            (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
        }

        if (value !== undefined) {
          if (value === null) {
            jQuery.removeAttr(elem, name);
            return;
          }

          if (hooks && "set" in hooks &&
            (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          }

          elem.setAttribute(name, value + "");
          return value;
        }

        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }

        ret = jQuery.find.attr(elem, name);

        return ret == null ? undefined : ret;
      },

      attrHooks: {
        type: {
          set: function(elem, value) {
            if (!support.radioValue && value === "radio" &&
              nodeName(elem, "input")) {
              var val = elem.value;
              elem.setAttribute("type", value);
              if (val) {
                elem.value = val;
              }
              return value;
            }
          }
        }
      },

      removeAttr: function(elem, value) {
        var name,
          i = 0,

          attrNames = value && value.match(rnothtmlwhite);

        if (attrNames && elem.nodeType === 1) {
          while ((name = attrNames[i++])) {
            elem.removeAttribute(name);
          }
        }
      }
    });

    boolHook = {
      set: function(elem, value, name) {
        if (value === false) {

          jQuery.removeAttr(elem, name);
        } else {
          elem.setAttribute(name, name);
        }
        return name;
      }
    };

    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
      var getter = attrHandle[name] || jQuery.find.attr;

      attrHandle[name] = function(elem, name, isXML) {
        var ret, handle,
          lowercaseName = name.toLowerCase();

        if (!isXML) {

          handle = attrHandle[lowercaseName];
          attrHandle[lowercaseName] = ret;
          ret = getter(elem, name, isXML) != null ?
            lowercaseName :
            null;
          attrHandle[lowercaseName] = handle;
        }
        return ret;
      };
    });




    var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
      prop: function(name, value) {
        return access(this, jQuery.prop, name, value, arguments.length > 1);
      },

      removeProp: function(name) {
        return this.each(function() {
          delete this[jQuery.propFix[name] || name];
        });
      }
    });

    jQuery.extend({
      prop: function(elem, name, value) {
        var ret, hooks,
          nType = elem.nodeType;

        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }

        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

          name = jQuery.propFix[name] || name;
          hooks = jQuery.propHooks[name];
        }

        if (value !== undefined) {
          if (hooks && "set" in hooks &&
            (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          }

          return (elem[name] = value);
        }

        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }

        return elem[name];
      },

      propHooks: {
        tabIndex: {
          get: function(elem) {

            var tabindex = jQuery.find.attr(elem, "tabindex");

            if (tabindex) {
              return parseInt(tabindex, 10);
            }

            if (
              rfocusable.test(elem.nodeName) ||
              rclickable.test(elem.nodeName) &&
              elem.href
            ) {
              return 0;
            }

            return -1;
          }
        }
      },

      propFix: {
        "for": "htmlFor",
        "class": "className"
      }
    });

    if (!support.optSelected) {
      jQuery.propHooks.selected = {
        get: function(elem) {


          var parent = elem.parentNode;
          if (parent && parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
          return null;
        },
        set: function(elem) {


          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;

            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
        }
      };
    }

    jQuery.each([
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable"
    ], function() {
      jQuery.propFix[this.toLowerCase()] = this;
    });




    function stripAndCollapse(value) {
      var tokens = value.match(rnothtmlwhite) || [];
      return tokens.join(" ");
    }


    function getClass(elem) {
      return elem.getAttribute && elem.getAttribute("class") || "";
    }

    jQuery.fn.extend({
      addClass: function(value) {
        var classes, elem, cur, curValue, clazz, j, finalValue,
          i = 0;

        if (jQuery.isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).addClass(value.call(this, j, getClass(this)));
          });
        }

        if (typeof value === "string" && value) {
          classes = value.match(rnothtmlwhite) || [];

          while ((elem = this[i++])) {
            curValue = getClass(elem);
            cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

            if (cur) {
              j = 0;
              while ((clazz = classes[j++])) {
                if (cur.indexOf(" " + clazz + " ") < 0) {
                  cur += clazz + " ";
                }
              }

              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                elem.setAttribute("class", finalValue);
              }
            }
          }
        }

        return this;
      },

      removeClass: function(value) {
        var classes, elem, cur, curValue, clazz, j, finalValue,
          i = 0;

        if (jQuery.isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).removeClass(value.call(this, j, getClass(this)));
          });
        }

        if (!arguments.length) {
          return this.attr("class", "");
        }

        if (typeof value === "string" && value) {
          classes = value.match(rnothtmlwhite) || [];

          while ((elem = this[i++])) {
            curValue = getClass(elem);

            cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

            if (cur) {
              j = 0;
              while ((clazz = classes[j++])) {

                while (cur.indexOf(" " + clazz + " ") > -1) {
                  cur = cur.replace(" " + clazz + " ", " ");
                }
              }

              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                elem.setAttribute("class", finalValue);
              }
            }
          }
        }

        return this;
      },

      toggleClass: function(value, stateVal) {
        var type = typeof value;

        if (typeof stateVal === "boolean" && type === "string") {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }

        if (jQuery.isFunction(value)) {
          return this.each(function(i) {
            jQuery(this).toggleClass(
              value.call(this, i, getClass(this), stateVal),
              stateVal
            );
          });
        }

        return this.each(function() {
          var className, i, self, classNames;

          if (type === "string") {

            i = 0;
            self = jQuery(this);
            classNames = value.match(rnothtmlwhite) || [];

            while ((className = classNames[i++])) {

              if (self.hasClass(className)) {
                self.removeClass(className);
              } else {
                self.addClass(className);
              }
            }

          } else if (value === undefined || type === "boolean") {
            className = getClass(this);
            if (className) {

              dataPriv.set(this, "__className__", className);
            }

            if (this.setAttribute) {
              this.setAttribute("class",
                className || value === false ?
                "" :
                dataPriv.get(this, "__className__") || ""
              );
            }
          }
        });
      },

      hasClass: function(selector) {
        var className, elem,
          i = 0;

        className = " " + selector + " ";
        while ((elem = this[i++])) {
          if (elem.nodeType === 1 &&
            (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
            return true;
          }
        }

        return false;
      }
    });




    var rreturn = /\r/g;

    jQuery.fn.extend({
      val: function(value) {
        var hooks, ret, isFunction,
          elem = this[0];

        if (!arguments.length) {
          if (elem) {
            hooks = jQuery.valHooks[elem.type] ||
              jQuery.valHooks[elem.nodeName.toLowerCase()];

            if (hooks &&
              "get" in hooks &&
              (ret = hooks.get(elem, "value")) !== undefined
            ) {
              return ret;
            }

            ret = elem.value;

            if (typeof ret === "string") {
              return ret.replace(rreturn, "");
            }

            return ret == null ? "" : ret;
          }

          return;
        }

        isFunction = jQuery.isFunction(value);

        return this.each(function(i) {
          var val;

          if (this.nodeType !== 1) {
            return;
          }

          if (isFunction) {
            val = value.call(this, i, jQuery(this).val());
          } else {
            val = value;
          }

          if (val == null) {
            val = "";

          } else if (typeof val === "number") {
            val += "";

          } else if (Array.isArray(val)) {
            val = jQuery.map(val, function(value) {
              return value == null ? "" : value + "";
            });
          }

          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
            this.value = val;
          }
        });
      }
    });

    jQuery.extend({
      valHooks: {
        option: {
          get: function(elem) {

            var val = jQuery.find.attr(elem, "value");
            return val != null ?
              val :

              stripAndCollapse(jQuery.text(elem));
          }
        },
        select: {
          get: function(elem) {
            var value, option, i,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one",
              values = one ? null : [],
              max = one ? index + 1 : options.length;

            if (index < 0) {
              i = max;

            } else {
              i = one ? index : 0;
            }

            for (; i < max; i++) {
              option = options[i];

              if ((option.selected || i === index) &&

                !option.disabled &&
                (!option.parentNode.disabled ||
                  !nodeName(option.parentNode, "optgroup"))) {

                value = jQuery(option).val();

                if (one) {
                  return value;
                }

                values.push(value);
              }
            }

            return values;
          },

          set: function(elem, value) {
            var optionSet, option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;

            while (i--) {
              option = options[i];


              if (option.selected =
                jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
              ) {
                optionSet = true;
              }

            }

            if (!optionSet) {
              elem.selectedIndex = -1;
            }
            return values;
          }
        }
      }
    });

    jQuery.each(["radio", "checkbox"], function() {
      jQuery.valHooks[this] = {
        set: function(elem, value) {
          if (Array.isArray(value)) {
            return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
          }
        }
      };
      if (!support.checkOn) {
        jQuery.valHooks[this].get = function(elem) {
          return elem.getAttribute("value") === null ? "on" : elem.value;
        };
      }
    });






    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

    jQuery.extend(jQuery.event, {

      trigger: function(event, data, elem, onlyHandlers) {

        var i, cur, tmp, bubbleType, ontype, handle, special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

        cur = tmp = elem = elem || document;

        if (elem.nodeType === 3 || elem.nodeType === 8) {
          return;
        }

        if (rfocusMorph.test(type + jQuery.event.triggered)) {
          return;
        }

        if (type.indexOf(".") > -1) {

          namespaces = type.split(".");
          type = namespaces.shift();
          namespaces.sort();
        }
        ontype = type.indexOf(":") < 0 && "on" + type;

        event = event[jQuery.expando] ?
          event :
          new jQuery.Event(type, typeof event === "object" && event);

        event.isTrigger = onlyHandlers ? 2 : 3;
        event.namespace = namespaces.join(".");
        event.rnamespace = event.namespace ?
          new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
          null;

        event.result = undefined;
        if (!event.target) {
          event.target = elem;
        }

        data = data == null ? [event] :
          jQuery.makeArray(data, [event]);

        special = jQuery.event.special[type] || {};
        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
          return;
        }

        if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }

          if (tmp === (elem.ownerDocument || document)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
          }
        }

        i = 0;
        while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

          event.type = i > 1 ?
            bubbleType :
            special.bindType || type;

          handle = (dataPriv.get(cur, "events") || {})[event.type] &&
            dataPriv.get(cur, "handle");
          if (handle) {
            handle.apply(cur, data);
          }

          handle = ontype && cur[ontype];
          if (handle && handle.apply && acceptData(cur)) {
            event.result = handle.apply(cur, data);
            if (event.result === false) {
              event.preventDefault();
            }
          }
        }
        event.type = type;

        if (!onlyHandlers && !event.isDefaultPrevented()) {

          if ((!special._default ||
              special._default.apply(eventPath.pop(), data) === false) &&
            acceptData(elem)) {

            if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

              tmp = elem[ontype];

              if (tmp) {
                elem[ontype] = null;
              }

              jQuery.event.triggered = type;
              elem[type]();
              jQuery.event.triggered = undefined;

              if (tmp) {
                elem[ontype] = tmp;
              }
            }
          }
        }

        return event.result;
      },

      simulate: function(type, elem, event) {
        var e = jQuery.extend(
          new jQuery.Event(),
          event, {
            type: type,
            isSimulated: true
          }
        );

        jQuery.event.trigger(e, null, elem);
      }

    });

    jQuery.fn.extend({

      trigger: function(type, data) {
        return this.each(function() {
          jQuery.event.trigger(type, data, this);
        });
      },
      triggerHandler: function(type, data) {
        var elem = this[0];
        if (elem) {
          return jQuery.event.trigger(type, data, elem, true);
        }
      }
    });


    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu").split(" "),
      function(i, name) {

        jQuery.fn[name] = function(data, fn) {
          return arguments.length > 0 ?
            this.on(name, null, data, fn) :
            this.trigger(name);
        };
      });

    jQuery.fn.extend({
      hover: function(fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
      }
    });




    support.focusin = "onfocusin" in window;


    if (!support.focusin) {
      jQuery.each({
        focus: "focusin",
        blur: "focusout"
      }, function(orig, fix) {

        var handler = function(event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
        };

        jQuery.event.special[fix] = {
          setup: function() {
            var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);

            if (!attaches) {
              doc.addEventListener(orig, handler, true);
            }
            dataPriv.access(doc, fix, (attaches || 0) + 1);
          },
          teardown: function() {
            var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;

            if (!attaches) {
              doc.removeEventListener(orig, handler, true);
              dataPriv.remove(doc, fix);

            } else {
              dataPriv.access(doc, fix, attaches);
            }
          }
        };
      });
    }


    var
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
      var name;

      if (Array.isArray(obj)) {

        jQuery.each(obj, function(i, v) {
          if (traditional || rbracket.test(prefix)) {

            add(prefix, v);

          } else {

            buildParams(
              prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
              v,
              traditional,
              add
            );
          }
        });

      } else if (!traditional && jQuery.type(obj) === "object") {

        for (name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }

      } else {

        add(prefix, obj);
      }
    }

    jQuery.param = function(a, traditional) {
      var prefix,
        s = [],
        add = function(key, valueOrFunction) {

          var value = jQuery.isFunction(valueOrFunction) ?
            valueOrFunction() :
            valueOrFunction;

          s[s.length] = encodeURIComponent(key) + "=" +
            encodeURIComponent(value == null ? "" : value);
        };

      if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

        jQuery.each(a, function() {
          add(this.name, this.value);
        });

      } else {

        for (prefix in a) {
          buildParams(prefix, a[prefix], traditional, add);
        }
      }

      return s.join("&");
    };

    jQuery.fn.extend({
      serialize: function() {
        return jQuery.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {

            var elements = jQuery.prop(this, "elements");
            return elements ? jQuery.makeArray(elements) : this;
          })
          .filter(function() {
            var type = this.type;

            return this.name && !jQuery(this).is(":disabled") &&
              rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
              (this.checked || !rcheckableType.test(type));
          })
          .map(function(i, elem) {
            var val = jQuery(this).val();

            if (val == null) {
              return null;
            }

            if (Array.isArray(val)) {
              return jQuery.map(val, function(val) {
                return {
                  name: elem.name,
                  value: val.replace(rCRLF, "\r\n")
                };
              });
            }

            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          }).get();
      }
    });


    jQuery.fn.extend({
      wrapAll: function(html) {
        var wrap;

        if (this[0]) {
          if (jQuery.isFunction(html)) {
            html = html.call(this[0]);
          }

          wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

          if (this[0].parentNode) {
            wrap.insertBefore(this[0]);
          }

          wrap.map(function() {
            var elem = this;

            while (elem.firstElementChild) {
              elem = elem.firstElementChild;
            }

            return elem;
          }).append(this);
        }

        return this;
      },

      wrapInner: function(html) {
        if (jQuery.isFunction(html)) {
          return this.each(function(i) {
            jQuery(this).wrapInner(html.call(this, i));
          });
        }

        return this.each(function() {
          var self = jQuery(this),
            contents = self.contents();

          if (contents.length) {
            contents.wrapAll(html);

          } else {
            self.append(html);
          }
        });
      },

      wrap: function(html) {
        var isFunction = jQuery.isFunction(html);

        return this.each(function(i) {
          jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
        });
      },

      unwrap: function(selector) {
        this.parent(selector).not("body").each(function() {
          jQuery(this).replaceWith(this.childNodes);
        });
        return this;
      }
    });


    jQuery.expr.pseudos.hidden = function(elem) {
      return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function(elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };




    support.createHTMLDocument = (function() {
      var body = document.implementation.createHTMLDocument("").body;
      body.innerHTML = "<form></form><form></form>";
      return body.childNodes.length === 2;
    })();


    jQuery.parseHTML = function(data, context, keepScripts) {
      if (typeof data !== "string") {
        return [];
      }
      if (typeof context === "boolean") {
        keepScripts = context;
        context = false;
      }

      var base, parsed, scripts;

      if (!context) {

        if (support.createHTMLDocument) {
          context = document.implementation.createHTMLDocument("");

          base = context.createElement("base");
          base.href = document.location.href;
          context.head.appendChild(base);
        } else {
          context = document;
        }
      }

      parsed = rsingleTag.exec(data);
      scripts = !keepScripts && [];

      if (parsed) {
        return [context.createElement(parsed[1])];
      }

      parsed = buildFragment([data], context, scripts);

      if (scripts && scripts.length) {
        jQuery(scripts).remove();
      }

      return jQuery.merge([], parsed.childNodes);
    };


    jQuery.offset = {
      setOffset: function(elem, options, i) {
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};

        if (position === "static") {
          elem.style.position = "relative";
        }

        curOffset = curElem.offset();
        curCSSTop = jQuery.css(elem, "top");
        curCSSLeft = jQuery.css(elem, "left");
        calculatePosition = (position === "absolute" || position === "fixed") &&
          (curCSSTop + curCSSLeft).indexOf("auto") > -1;

        if (calculatePosition) {
          curPosition = curElem.position();
          curTop = curPosition.top;
          curLeft = curPosition.left;

        } else {
          curTop = parseFloat(curCSSTop) || 0;
          curLeft = parseFloat(curCSSLeft) || 0;
        }

        if (jQuery.isFunction(options)) {

          options = options.call(elem, i, jQuery.extend({}, curOffset));
        }

        if (options.top != null) {
          props.top = (options.top - curOffset.top) + curTop;
        }
        if (options.left != null) {
          props.left = (options.left - curOffset.left) + curLeft;
        }

        if ("using" in options) {
          options.using.call(elem, props);

        } else {
          curElem.css(props);
        }
      }
    };

    jQuery.fn.extend({
      offset: function(options) {

        if (arguments.length) {
          return options === undefined ?
            this :
            this.each(function(i) {
              jQuery.offset.setOffset(this, options, i);
            });
        }

        var doc, docElem, rect, win,
          elem = this[0];

        if (!elem) {
          return;
        }

        if (!elem.getClientRects().length) {
          return {
            top: 0,
            left: 0
          };
        }

        rect = elem.getBoundingClientRect();

        doc = elem.ownerDocument;
        docElem = doc.documentElement;
        win = doc.defaultView;

        return {
          top: rect.top + win.pageYOffset - docElem.clientTop,
          left: rect.left + win.pageXOffset - docElem.clientLeft
        };
      },

      position: function() {
        if (!this[0]) {
          return;
        }

        var offsetParent, offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };

        if (jQuery.css(elem, "position") === "fixed") {

          offset = elem.getBoundingClientRect();

        } else {

          offsetParent = this.offsetParent();

          offset = this.offset();
          if (!nodeName(offsetParent[0], "html")) {
            parentOffset = offsetParent.offset();
          }

          parentOffset = {
            top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
            left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
          };
        }

        return {
          top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
          left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
        };
      },

      offsetParent: function() {
        return this.map(function() {
          var offsetParent = this.offsetParent;

          while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent;
          }

          return offsetParent || documentElement;
        });
      }
    });

    jQuery.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function(method, prop) {
      var top = "pageYOffset" === prop;

      jQuery.fn[method] = function(val) {
        return access(this, function(elem, method, val) {

          var win;
          if (jQuery.isWindow(elem)) {
            win = elem;
          } else if (elem.nodeType === 9) {
            win = elem.defaultView;
          }

          if (val === undefined) {
            return win ? win[prop] : elem[method];
          }

          if (win) {
            win.scrollTo(
              !top ? val : win.pageXOffset,
              top ? val : win.pageYOffset
            );

          } else {
            elem[method] = val;
          }
        }, method, val, arguments.length);
      };
    });

    jQuery.each(["top", "left"], function(i, prop) {
      jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
        function(elem, computed) {
          if (computed) {
            computed = curCSS(elem, prop);

            return rnumnonpx.test(computed) ?
              jQuery(elem).position()[prop] + "px" :
              computed;
          }
        }
      );
    });


    jQuery.each({
      Height: "height",
      Width: "width"
    }, function(name, type) {
      jQuery.each({
          padding: "inner" + name,
          content: type,
          "": "outer" + name
        },
        function(defaultExtra, funcName) {

          jQuery.fn[funcName] = function(margin, value) {
            var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
              extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

            return access(this, function(elem, type, value) {
              var doc;

              if (jQuery.isWindow(elem)) {

                return funcName.indexOf("outer") === 0 ?
                  elem["inner" + name] :
                  elem.document.documentElement["client" + name];
              }

              if (elem.nodeType === 9) {
                doc = elem.documentElement;

                return Math.max(
                  elem.body["scroll" + name], doc["scroll" + name],
                  elem.body["offset" + name], doc["offset" + name],
                  doc["client" + name]
                );
              }

              return value === undefined ?

                jQuery.css(elem, type, extra) :

                jQuery.style(elem, type, value, extra);
            }, type, chainable ? margin : undefined, chainable);
          };
        });
    });


    jQuery.fn.extend({

      bind: function(types, data, fn) {
        return this.on(types, null, data, fn);
      },
      unbind: function(types, fn) {
        return this.off(types, null, fn);
      },

      delegate: function(selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      },
      undelegate: function(selector, types, fn) {

        return arguments.length === 1 ?
          this.off(selector, "**") :
          this.off(types, selector || "**", fn);
      }
    });

    jQuery.holdReady = function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;


    return jQuery;

  }(window);
  var QRCode;

  (function() {
    function QR8bitByte(data) {
      this.mode = QRMode.MODE_8BIT_BYTE;
      this.data = data;
      this.parsedData = [];

      for (var i = 0, l = this.data.length; i < l; i++) {
        var byteArray = [];
        var code = this.data.charCodeAt(i);

        if (code > 0x10000) {
          byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
          byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
          byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
          byteArray[3] = 0x80 | (code & 0x3F);
        } else if (code > 0x800) {
          byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
          byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
          byteArray[2] = 0x80 | (code & 0x3F);
        } else if (code > 0x80) {
          byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
          byteArray[1] = 0x80 | (code & 0x3F);
        } else {
          byteArray[0] = code;
        }

        this.parsedData.push(byteArray);
      }

      this.parsedData = Array.prototype.concat.apply([], this.parsedData);

      if (this.parsedData.length != this.data.length) {
        this.parsedData.unshift(191);
        this.parsedData.unshift(187);
        this.parsedData.unshift(239);
      }
    }

    QR8bitByte.prototype = {
      getLength: function(buffer) {
        return this.parsedData.length;
      },
      write: function(buffer) {
        for (var i = 0, l = this.parsedData.length; i < l; i++) {
          buffer.put(this.parsedData[i], 8);
        }
      }
    };

    function QRCodeModel(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = [];
    }

    QRCodeModel.prototype = {
      addData: function(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = null;
      },
      isDark: function(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
          throw new Error(row + "," + col);
        }
        return this.modules[row][col];
      },
      getModuleCount: function() {
        return this.moduleCount;
      },
      make: function() {
        this.makeImpl(false, this.getBestMaskPattern());
      },
      makeImpl: function(test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);
        for (var row = 0; row < this.moduleCount; row++) {
          this.modules[row] = new Array(this.moduleCount);
          for (var col = 0; col < this.moduleCount; col++) {
            this.modules[row][col] = null;
          }
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        if (this.typeNumber >= 7) {
          this.setupTypeNumber(test);
        }
        if (this.dataCache == null) {
          this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }
        this.mapData(this.dataCache, maskPattern);
      },
      setupPositionProbePattern: function(row, col) {
        for (var r = -1; r <= 7; r++) {
          if (row + r <= -1 || this.moduleCount <= row + r) continue;
          for (var c = -1; c <= 7; c++) {
            if (col + c <= -1 || this.moduleCount <= col + c) continue;
            if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      },
      getBestMaskPattern: function() {
        var minLostPoint = 0;
        var pattern = 0;
        for (var i = 0; i < 8; i++) {
          this.makeImpl(true, i);
          var lostPoint = QRUtil.getLostPoint(this);
          if (i == 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern = i;
          }
        }
        return pattern;
      },
      createMovieClip: function(target_mc, instance_name, depth) {
        var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
        var cs = 1;
        this.make();
        for (var row = 0; row < this.modules.length; row++) {
          var y = row * cs;
          for (var col = 0; col < this.modules[row].length; col++) {
            var x = col * cs;
            var dark = this.modules[row][col];
            if (dark) {
              qr_mc.beginFill(0, 100);
              qr_mc.moveTo(x, y);
              qr_mc.lineTo(x + cs, y);
              qr_mc.lineTo(x + cs, y + cs);
              qr_mc.lineTo(x, y + cs);
              qr_mc.endFill();
            }
          }
        }
        return qr_mc;
      },
      setupTimingPattern: function() {
        for (var r = 8; r < this.moduleCount - 8; r++) {
          if (this.modules[r][6] != null) {
            continue;
          }
          this.modules[r][6] = (r % 2 == 0);
        }
        for (var c = 8; c < this.moduleCount - 8; c++) {
          if (this.modules[6][c] != null) {
            continue;
          }
          this.modules[6][c] = (c % 2 == 0);
        }
      },
      setupPositionAdjustPattern: function() {
        var pos = QRUtil.getPatternPosition(this.typeNumber);
        for (var i = 0; i < pos.length; i++) {
          for (var j = 0; j < pos.length; j++) {
            var row = pos[i];
            var col = pos[j];
            if (this.modules[row][col] != null) {
              continue;
            }
            for (var r = -2; r <= 2; r++) {
              for (var c = -2; c <= 2; c++) {
                if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                  this.modules[row + r][col + c] = true;
                } else {
                  this.modules[row + r][col + c] = false;
                }
              }
            }
          }
        }
      },
      setupTypeNumber: function(test) {
        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        for (var i = 0; i < 18; i++) {
          var mod = (!test && ((bits >> i) & 1) == 1);
          this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        }
        for (var i = 0; i < 18; i++) {
          var mod = (!test && ((bits >> i) & 1) == 1);
          this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
      },
      setupTypeInfo: function(test, maskPattern) {
        var data = (this.errorCorrectLevel << 3) | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        for (var i = 0; i < 15; i++) {
          var mod = (!test && ((bits >> i) & 1) == 1);
          if (i < 6) {
            this.modules[i][8] = mod;
          } else if (i < 8) {
            this.modules[i + 1][8] = mod;
          } else {
            this.modules[this.moduleCount - 15 + i][8] = mod;
          }
        }
        for (var i = 0; i < 15; i++) {
          var mod = (!test && ((bits >> i) & 1) == 1);
          if (i < 8) {
            this.modules[8][this.moduleCount - i - 1] = mod;
          } else if (i < 9) {
            this.modules[8][15 - i - 1 + 1] = mod;
          } else {
            this.modules[8][15 - i - 1] = mod;
          }
        }
        this.modules[this.moduleCount - 8][8] = (!test);
      },
      mapData: function(data, maskPattern) {
        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
          if (col == 6) col--;
          while (true) {
            for (var c = 0; c < 2; c++) {
              if (this.modules[row][col - c] == null) {
                var dark = false;
                if (byteIndex < data.length) {
                  dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                }
                var mask = QRUtil.getMask(maskPattern, row, col - c);
                if (mask) {
                  dark = !dark;
                }
                this.modules[row][col - c] = dark;
                bitIndex--;
                if (bitIndex == -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || this.moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
    };
    QRCodeModel.PAD0 = 0xEC;
    QRCodeModel.PAD1 = 0x11;
    QRCodeModel.createData = function(typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
      var buffer = new QRBitBuffer();
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) {
        totalDataCount += rsBlocks[i].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" +
          buffer.getLengthInBits() +
          ">" +
          totalDataCount * 8 +
          ")");
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeModel.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeModel.PAD1, 8);
      }
      return QRCodeModel.createBytes(buffer, rsBlocks);
    };
    QRCodeModel.createBytes = function(buffer, rsBlocks) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) {
        totalCodeCount += rsBlocks[i].totalCount;
      }
      var data = new Array(totalCodeCount);
      var index = 0;
      for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < dcdata[r].length) {
            data[index++] = dcdata[r][i];
          }
        }
      }
      for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < ecdata[r].length) {
            data[index++] = ecdata[r][i];
          }
        }
      }
      return data;
    };
    var QRMode = {
      MODE_NUMBER: 1 << 0,
      MODE_ALPHA_NUM: 1 << 1,
      MODE_8BIT_BYTE: 1 << 2,
      MODE_KANJI: 1 << 3
    };
    var QRErrorCorrectLevel = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    };
    var QRMaskPattern = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var QRUtil = {
      PATTERN_POSITION_TABLE: [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ],
      G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
      G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
      G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
      getBCHTypeInfo: function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
          d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
        }
        return ((data << 10) | d) ^ QRUtil.G15_MASK;
      },
      getBCHTypeNumber: function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
          d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18)));
        }
        return (data << 12) | d;
      },
      getBCHDigit: function(data) {
        var digit = 0;
        while (data != 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      },
      getPatternPosition: function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
      },
      getMask: function(maskPattern, i, j) {
        switch (maskPattern) {
          case QRMaskPattern.PATTERN000:
            return (i + j) % 2 == 0;
          case QRMaskPattern.PATTERN001:
            return i % 2 == 0;
          case QRMaskPattern.PATTERN010:
            return j % 3 == 0;
          case QRMaskPattern.PATTERN011:
            return (i + j) % 3 == 0;
          case QRMaskPattern.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
          case QRMaskPattern.PATTERN101:
            return (i * j) % 2 + (i * j) % 3 == 0;
          case QRMaskPattern.PATTERN110:
            return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
          case QRMaskPattern.PATTERN111:
            return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      },
      getErrorCorrectPolynomial: function(errorCorrectLength) {
        var a = new QRPolynomial([1], 0);
        for (var i = 0; i < errorCorrectLength; i++) {
          a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
        }
        return a;
      },
      getLengthInBits: function(mode, type) {
        if (1 <= type && type < 10) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 10;
            case QRMode.MODE_ALPHA_NUM:
              return 9;
            case QRMode.MODE_8BIT_BYTE:
              return 8;
            case QRMode.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 27) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 12;
            case QRMode.MODE_ALPHA_NUM:
              return 11;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 41) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 14;
            case QRMode.MODE_ALPHA_NUM:
              return 13;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + mode);
          }
        } else {
          throw new Error("type:" + type);
        }
      },
      getLostPoint: function(qrCode) {
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount; col++) {
            var sameCount = 0;
            var dark = qrCode.isDark(row, col);
            for (var r = -1; r <= 1; r++) {
              if (row + r < 0 || moduleCount <= row + r) {
                continue;
              }
              for (var c = -1; c <= 1; c++) {
                if (col + c < 0 || moduleCount <= col + c) {
                  continue;
                }
                if (r == 0 && c == 0) {
                  continue;
                }
                if (dark == qrCode.isDark(row + r, col + c)) {
                  sameCount++;
                }
              }
            }
            if (sameCount > 5) {
              lostPoint += (3 + sameCount - 5);
            }
          }
        }
        for (var row = 0; row < moduleCount - 1; row++) {
          for (var col = 0; col < moduleCount - 1; col++) {
            var count = 0;
            if (qrCode.isDark(row, col)) count++;
            if (qrCode.isDark(row + 1, col)) count++;
            if (qrCode.isDark(row, col + 1)) count++;
            if (qrCode.isDark(row + 1, col + 1)) count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
        }
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount - 6; col++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
              lostPoint += 40;
            }
          }
        }
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount - 6; row++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
              lostPoint += 40;
            }
          }
        }
        var darkCount = 0;
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount; row++) {
            if (qrCode.isDark(row, col)) {
              darkCount++;
            }
          }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
      }
    };
    var QRMath = {
      glog: function(n) {
        if (n < 1) {
          throw new Error("glog(" + n + ")");
        }
        return QRMath.LOG_TABLE[n];
      },
      gexp: function(n) {
        while (n < 0) {
          n += 255;
        }
        while (n >= 256) {
          n -= 255;
        }
        return QRMath.EXP_TABLE[n];
      },
      EXP_TABLE: new Array(256),
      LOG_TABLE: new Array(256)
    };
    for (var i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    }

    function QRPolynomial(num, shift) {
      if (num.length == undefined) {
        throw new Error(num.length + "/" + shift);
      }
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset++;
      }
      this.num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i++) {
        this.num[i] = num[i + offset];
      }
    }
    QRPolynomial.prototype = {
      get: function(index) {
        return this.num[index];
      },
      getLength: function() {
        return this.num.length;
      },
      multiply: function(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i = 0; i < this.getLength(); i++) {
          for (var j = 0; j < e.getLength(); j++) {
            num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
          }
        }
        return new QRPolynomial(num, 0);
      },
      mod: function(e) {
        if (this.getLength() - e.getLength() < 0) {
          return this;
        }
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i = 0; i < this.getLength(); i++) {
          num[i] = this.get(i);
        }
        for (var i = 0; i < e.getLength(); i++) {
          num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }
        return new QRPolynomial(num, 0).mod(e);
      }
    };

    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount;
      this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];
    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
      if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var list = [];
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) {
          list.push(new QRRSBlock(totalCount, dataCount));
        }
      }
      return list;
    };
    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
      switch (errorCorrectLevel) {
        case QRErrorCorrectLevel.L:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return undefined;
      }
    };

    function QRBitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    QRBitBuffer.prototype = {
      get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
      },
      put: function(num, length) {
        for (var i = 0; i < length; i++) {
          this.putBit(((num >>> (length - i - 1)) & 1) == 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
        }
        this.length++;
      }
    };
    var QRCodeLimitLength = [
      [17, 14, 11, 7],
      [32, 26, 20, 14],
      [53, 42, 32, 24],
      [78, 62, 46, 34],
      [106, 84, 60, 44],
      [134, 106, 74, 58],
      [154, 122, 86, 64],
      [192, 152, 108, 84],
      [230, 180, 130, 98],
      [271, 213, 151, 119],
      [321, 251, 177, 137],
      [367, 287, 203, 155],
      [425, 331, 241, 177],
      [458, 362, 258, 194],
      [520, 412, 292, 220],
      [586, 450, 322, 250],
      [644, 504, 364, 280],
      [718, 560, 394, 310],
      [792, 624, 442, 338],
      [858, 666, 482, 382],
      [929, 711, 509, 403],
      [1003, 779, 565, 439],
      [1091, 857, 611, 461],
      [1171, 911, 661, 511],
      [1273, 997, 715, 535],
      [1367, 1059, 751, 593],
      [1465, 1125, 805, 625],
      [1528, 1190, 868, 658],
      [1628, 1264, 908, 698],
      [1732, 1370, 982, 742],
      [1840, 1452, 1030, 790],
      [1952, 1538, 1112, 842],
      [2068, 1628, 1168, 898],
      [2188, 1722, 1228, 958],
      [2303, 1809, 1283, 983],
      [2431, 1911, 1351, 1051],
      [2563, 1989, 1423, 1093],
      [2699, 2099, 1499, 1139],
      [2809, 2213, 1579, 1219],
      [2953, 2331, 1663, 1273]
    ];

    function _isSupportCanvas() {
      return typeof CanvasRenderingContext2D != "undefined";
    }

    function _getAndroid() {
      var android = false;
      var sAgent = navigator.userAgent;

      if (/android/i.test(sAgent)) {
        android = true;
        var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);

        if (aMat && aMat[1]) {
          android = parseFloat(aMat[1]);
        }
      }

      return android;
    }

    var svgDrawer = (function() {

      var Drawing = function(el, htOption) {
        this._el = el;
        this._htOption = htOption;
      };

      Drawing.prototype.draw = function(oQRCode) {
        var _htOption = this._htOption;
        var _el = this._el;
        var nCount = oQRCode.getModuleCount();
        var nWidth = Math.floor(_htOption.width / nCount);
        var nHeight = Math.floor(_htOption.height / nCount);

        this.clear();

        function makeSVG(tag, attrs) {
          var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
          for (var k in attrs)
            if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
          return el;
        }

        var svg = makeSVG("svg", {
          'viewBox': '0 0 ' + String(nCount) + " " + String(nCount),
          'width': '100%',
          'height': '100%',
          'fill': _htOption.colorLight
        });
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        _el.appendChild(svg);

        svg.appendChild(makeSVG("rect", {
          "fill": _htOption.colorLight,
          "width": "100%",
          "height": "100%"
        }));
        svg.appendChild(makeSVG("rect", {
          "fill": _htOption.colorDark,
          "width": "1",
          "height": "1",
          "id": "template"
        }));

        for (var row = 0; row < nCount; row++) {
          for (var col = 0; col < nCount; col++) {
            if (oQRCode.isDark(row, col)) {
              var child = makeSVG("use", {
                "x": String(col),
                "y": String(row)
              });
              child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
              svg.appendChild(child);
            }
          }
        }
      };
      Drawing.prototype.clear = function() {
        while (this._el.hasChildNodes())
          this._el.removeChild(this._el.lastChild);
      };
      return Drawing;
    })();

    var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

    var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function() {
      var Drawing = function(el, htOption) {
        this._el = el;
        this._htOption = htOption;
      };

      Drawing.prototype.draw = function(oQRCode) {
        var _htOption = this._htOption;
        var _el = this._el;
        var nCount = oQRCode.getModuleCount();
        var nWidth = Math.floor(_htOption.width / nCount);
        var nHeight = Math.floor(_htOption.height / nCount);
        var aHTML = ['<table style="border:0;border-collapse:collapse;">'];

        for (var row = 0; row < nCount; row++) {
          aHTML.push('<tr>');

          for (var col = 0; col < nCount; col++) {
            aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
          }

          aHTML.push('</tr>');
        }

        aHTML.push('</table>');
        _el.innerHTML = aHTML.join('');

        var elTable = _el.childNodes[0];
        var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
        var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;

        if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
          elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
        }
      };

      Drawing.prototype.clear = function() {
        this._el.innerHTML = '';
      };

      return Drawing;
    })() : (function() {
      function _onMakeImage() {
        this._elImage.src = this._elCanvas.toDataURL("image/png");
        this._elImage.style.display = "block";
        this._elCanvas.style.display = "none";
      }

      if (this._android && this._android <= 2.1) {
        var factor = 1 / window.devicePixelRatio;
        var drawImage = CanvasRenderingContext2D.prototype.drawImage;
        CanvasRenderingContext2D.prototype.drawImage = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
          if (("nodeName" in image) && /img/i.test(image.nodeName)) {
            for (var i = arguments.length - 1; i >= 1; i--) {
              arguments[i] = arguments[i] * factor;
            }
          } else if (typeof dw == "undefined") {
            arguments[1] *= factor;
            arguments[2] *= factor;
            arguments[3] *= factor;
            arguments[4] *= factor;
          }

          drawImage.apply(this, arguments);
        };
      }

      function _safeSetDataURI(fSuccess, fFail) {
        var self = this;
        self._fFail = fFail;
        self._fSuccess = fSuccess;

        if (self._bSupportDataURI === null) {
          var el = document.createElement("img");
          var fOnError = function() {
            self._bSupportDataURI = false;

            if (self._fFail) {
              self._fFail.call(self);
            }
          };
          var fOnSuccess = function() {
            self._bSupportDataURI = true;

            if (self._fSuccess) {
              self._fSuccess.call(self);
            }
          };

          el.onabort = fOnError;
          el.onerror = fOnError;
          el.onload = fOnSuccess;
          el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
          return;
        } else if (self._bSupportDataURI === true && self._fSuccess) {
          self._fSuccess.call(self);
        } else if (self._bSupportDataURI === false && self._fFail) {
          self._fFail.call(self);
        }
      };

      var Drawing = function(el, htOption) {
        this._bIsPainted = false;
        this._android = _getAndroid();

        this._htOption = htOption;
        this._elCanvas = document.createElement("canvas");
        this._elCanvas.width = htOption.width;
        this._elCanvas.height = htOption.height;
        el.appendChild(this._elCanvas);
        this._el = el;
        this._oContext = this._elCanvas.getContext("2d");
        this._bIsPainted = false;
        this._elImage = document.createElement("img");
        this._elImage.alt = "Scan me!";
        this._elImage.style.display = "none";
        this._el.appendChild(this._elImage);
        this._bSupportDataURI = null;
      };

      Drawing.prototype.draw = function(oQRCode) {
        var _elImage = this._elImage;
        var _oContext = this._oContext;
        var _htOption = this._htOption;

        var nCount = oQRCode.getModuleCount();
        var nWidth = _htOption.width / nCount;
        var nHeight = _htOption.height / nCount;
        var nRoundedWidth = Math.round(nWidth);
        var nRoundedHeight = Math.round(nHeight);

        _elImage.style.display = "none";
        this.clear();

        for (var row = 0; row < nCount; row++) {
          for (var col = 0; col < nCount; col++) {
            var bIsDark = oQRCode.isDark(row, col);
            var nLeft = col * nWidth;
            var nTop = row * nHeight;
            _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
            _oContext.lineWidth = 1;
            _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
            _oContext.fillRect(nLeft, nTop, nWidth, nHeight);

            _oContext.strokeRect(
              Math.floor(nLeft) + 0.5,
              Math.floor(nTop) + 0.5,
              nRoundedWidth,
              nRoundedHeight
            );

            _oContext.strokeRect(
              Math.ceil(nLeft) - 0.5,
              Math.ceil(nTop) - 0.5,
              nRoundedWidth,
              nRoundedHeight
            );
          }
        }

        this._bIsPainted = true;
      };

      Drawing.prototype.makeImage = function() {
        if (this._bIsPainted) {
          _safeSetDataURI.call(this, _onMakeImage);
        }
      };

      Drawing.prototype.isPainted = function() {
        return this._bIsPainted;
      };

      Drawing.prototype.clear = function() {
        this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
        this._bIsPainted = false;
      };

      Drawing.prototype.round = function(nNumber) {
        if (!nNumber) {
          return nNumber;
        }

        return Math.floor(nNumber * 1000) / 1000;
      };

      return Drawing;
    })();

    function _getTypeNumber(sText, nCorrectLevel) {
      var nType = 1;
      var length = _getUTF8Length(sText);

      for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
        var nLimit = 0;

        switch (nCorrectLevel) {
          case QRErrorCorrectLevel.L:
            nLimit = QRCodeLimitLength[i][0];
            break;
          case QRErrorCorrectLevel.M:
            nLimit = QRCodeLimitLength[i][1];
            break;
          case QRErrorCorrectLevel.Q:
            nLimit = QRCodeLimitLength[i][2];
            break;
          case QRErrorCorrectLevel.H:
            nLimit = QRCodeLimitLength[i][3];
            break;
        }

        if (length <= nLimit) {
          break;
        } else {
          nType++;
        }
      }

      if (nType > QRCodeLimitLength.length) {
        throw new Error("Too long data");
      }

      return nType;
    }

    function _getUTF8Length(sText) {
      var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
      return replacedText.length + (replacedText.length != sText ? 3 : 0);
    }

    QRCode = function(el, vOption) {
      this._htOption = {
        width: 256,
        height: 256,
        typeNumber: 4,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRErrorCorrectLevel.H
      };

      if (typeof vOption === 'string') {
        vOption = {
          text: vOption
        };
      }

      if (vOption) {
        for (var i in vOption) {
          this._htOption[i] = vOption[i];
        }
      }

      if (typeof el == "string") {
        el = document.getElementById(el);
      }

      if (this._htOption.useSVG) {
        Drawing = svgDrawer;
      }

      this._android = _getAndroid();
      this._el = el;
      this._oQRCode = null;
      this._oDrawing = new Drawing(this._el, this._htOption);

      if (this._htOption.text) {
        this.makeCode(this._htOption.text);
      }
    };

    QRCode.prototype.makeCode = function(sText) {
      this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
      this._oQRCode.addData(sText);
      this._oQRCode.make();
      this._el.title = sText;
      this._oDrawing.draw(this._oQRCode);
      this.makeImage();
    };

    QRCode.prototype.makeImage = function() {
      if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
        this._oDrawing.makeImage();
      }
    };

    QRCode.prototype.clear = function() {
      this._oDrawing.clear();
    };

    QRCode.CorrectLevel = QRErrorCorrectLevel;
  })();

  var sd = null;
  var _ = null;

  var heatmap_render = {
    originalHeatData: null,
    ajaxHeatData: null,
    heatDataElement: [],
    heatMapList: [],
    heatMode: 1,
    getCurrentUrl: function() {
      var href = _.urlParse(location.href);
      var obj = {};

      obj['sa-request-url'] = sessionStorage.getItem('sensors_heatmap_url');
      obj['sa-request-url'] = obj['sa-request-url'] ? encodeURIComponent(obj['sa-request-url']) : '';
      obj['sa-request-id'] = sessionStorage.getItem('sensors_heatmap_id');
      obj['sa-request-type'] = sessionStorage.getItem('sensors_heatmap_type') || '1';
      $.each(obj, function(a, b) {
        if (!b) {
          delete obj[a];
        }
      });
      href.addQueryString(obj);
      return href.getUrl();
    },
    setHeatState: function(data, type, url, isFirst) {
      if (isFirst) {
        if (type === '1') {
          this.setClickMap(data, url);
        } else if (type === '2') {
          this.setScrollMap(data, url);
        } else if (type === '3') {
          this.setNoticeMap(data, url);
        }

      } else {
        var href = _.urlParse(location.href);
        if (!data) {
          return false;
        }
        if (!type) {
          type = 1;
        }
        var obj = {
          'sa-request-id': data,
          'sa-request-type': type
        };

        href.addQueryString(obj);
        location.href = href.getUrl();

      }
    },
    setDropDown: function(request_id, type, url) {
      type = type || '1';
      var version = type === '1' ? "1" : "0";
      var relation = {
        1: '点击图',
        2: '触达率图',
        3: '注意力图'
      };
      var versionObj = {
        1: "方案一",
        2: "方案二"
      };

      var me = this;

      function v2Event() {
        var timer = null;
        var clearFlag = false;
        $(window).off('scroll.v2');
        $(window).on('scroll.v2', function() {
          if (!clearFlag) {
            $('#heatMapContainer').html('');
            clearFlag = true;
          }
          clearTimeout(timer);
          timer = setTimeout(function() {
            heatmap_render.refreshHeatData(heatmap_render.heatMode);
            clearFlag = false;
          }, sd.para.heatmap.renderRefreshTime || 1000);
        });
        $(window).off('resize.v2');
        $(window).on('resize.v2', function() {
          if (!clearFlag) {
            $('#heatMapContainer').html('');
            clearFlag = true;
          }
          clearTimeout(timer);
          timer = setTimeout(function() {
            heatmap_render.refreshHeatData(heatmap_render.heatMode);
            clearFlag = false;
          }, sd.para.heatmap.renderRefreshTime || 1000);
        });
      }


      function dropdwon(obj) {
        var state = obj.init();
        var name = obj.name;
        var out = obj.id;
        var button = $(out + '>div');
        var dropmenu = $(out + '>ul');
        var buttonContent = button.find('span:first');


        button.on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (dropmenu.is(':visible')) {
            dropmenu.hide();
          } else {

            $(".sa-sdk-heatmap-toolbar-selectmap ul").css("display", "none");
            dropmenu.css("display", "block");

            $(document).on('click.sa-jssdk-dropdown', function() {
              dropmenu.hide();
              $(document).off('click.sa-jssdk-dropdown');
            });
          }
        });

        function changeState(text, isFirst) {
          state = text;
          obj.click(text, isFirst);
          if (name == 'type') {
            buttonContent.text(relation[state]);
          } else if (name == 'version') {
            buttonContent.text(versionObj[state]);
          }
        }

        dropmenu.on('click', 'li', function(e) {
          var text = $(this).attr('data-state');
          if (state !== text) {
            changeState(text);
          }
        });
        if (obj.init) {
          changeState(state, true);
        }
        if (name === 'version') {
          $(document).on('keypress', function(event) {
            if (event.keyCode == 114) {
              heatmap_render.refreshHeatData(heatmap_render.heatMode);
            }
            if (event.keyCode == 122) {
              $('#chooseVersion').find('span:first').text("方案一");
              heatmap_render.refreshHeatData(1);
              state = '1';
            }
            if (event.keyCode == 120) {
              $("#chooseVersion").find('span:first').text("方案二");
              heatmap_render.refreshHeatData(2);
              v2Event();
              state = '2';
            }
          })
        }

      }

      dropdwon({
        init: function() {
          return type;
        },
        id: '#chooseType',
        name: "type",
        click: function(state, isFirst) {
          me.setHeatState(request_id, state, url, isFirst);
          $('#sa_sdk_heatmap_toolbar_filter').toggle(state == "1");
        }
      });

      if (type === '1') {
        dropdwon({
          init: function() {
            $("#chooseVersion").css("display", "block");
            return version;
          },
          name: "version",
          id: '#chooseVersion',
          click: function(state, isFirst) {
            if (!isFirst) {
              if (state === '1') {
                heatmap_render.refreshHeatData(1);
              } else if (state === '2') {
                heatmap_render.refreshHeatData(2);
                v2Event();
              }
            }
          }
        });
      }


    },
    setScrollMap: function(id, url) {
      var me = this;
      if (typeof id === 'string' && sd.para.web_url) {

        var urlParse = new _.urlParse(sd.para.web_url);
        urlParse._values.Path = '/api/scroll_heat_map/report/' + id;

        var urlParse2 = new _.urlParse(sd.para.web_url);
        urlParse2._values.Path = '/api/scroll_heat_map/report/' + id;
        urlParse2.addQueryString({
          pathUrl: encodeURIComponent(url)
        });
        var urlParse2Value = urlParse2.getUrl();

        _.ajax({
          url: url ? urlParse2Value : urlParse.getUrl(),
          type: 'POST',
          cors: true,
          header: {
            cors: "true"
          },
          success: function(data) {

            if (typeof data !== 'object' || !_.isArray(data.result) || data.result.length === 0) {
              me.showErrorInfo(2, {
                error: '未取到数据'
              });
              return false;
            }

            data.detail = data.result || [];
            if (data.result.length === 0) {
              return false;
            }
            if (!data.total || data.total === 0 || typeof data.total !== 'number' || data.total < 2) {
              me.showErrorInfo(2, {
                error: '有效的触发用户数少于2人'
              });
              return false;
            }
            data.origin_total = data.total;
            data.total = data.result[0];

            data.percent = {};

            var middlePercent = {
              setData: function(x, y, z) {
                x = String(x);
                var s = [];

                this.data[x] = this.data[x] || {};


                this.data[x][y] = z;


              },
              data: {},
              getData: function() {
                var x = {};
                var arr = [];
                var temp = null;
                for (var i in this.data) {
                  arr = [];
                  for (var k in this.data[i]) {
                    arr.push([k, this.data[i][k]]);
                  }
                  this.data[i] = arr;
                  temp = this.data[i].sort(function(a, b) {
                    return Math.abs(a[0] - Number(i)) - Math.abs(b[0] - Number(i));
                  })[0];
                  x[temp[0]] = temp[1];
                }
                return x;
              }
            };
            _.each(data.result, function(v, k) {
              if (v / data.total == 1) {
                data.percent['100'] = (k + 1) * 10;
              } else if (v / data.total > 0.7 && v / data.total < 0.8) {
                middlePercent.setData(75, parseInt(v / data.total * 100), (k + 1) * 10);
              } else if (v / data.total > 0.45 && v / data.total < 0.55) {
                middlePercent.setData(50, parseInt(v / data.total * 100), (k + 1) * 10);
              } else if (v / data.total > 0.2 && v / data.total < 0.3) {
                middlePercent.setData(25, parseInt(v / data.total * 100), (k + 1) * 10);
              }
            });

            _.extend(data.percent, middlePercent.getData());

            var percent_tpl = '<div style="border-bottom: 1px dashed #4C4C4D;height:1px;width:100%;position: absolute;top:{{top}}px;"><span style="font-size:12px;position:absolute;padding:0 12px;top:-24px;height:26px;line-height: 26px;left:0;background:#000;color:#eee;border-radius: 2px;">{{percent}}</span></div>';
            for (var i in data.percent) {
              $(document.body).append($(percent_tpl.replace('{{top}}', data.percent[i] - 2).replace('{{percent}}', i + '%')));
            }

            var over_tpl = '<div style="z-index:99999;border-bottom: 1px solid #272727;height:1px;width:100%;position: absolute;top:{{top}}px;text-align:center;"><span style="font-size:12px;height:26px;line-height: 26px;background:#000;color:#eee;border-radius: 2px;left:50%;margin-left:-65px;position: absolute;top:-13px;padding: 0 5px;">{{percent}}的用户浏览到这里</span></div>';
            var over_ele = null;

            function showLineDetail(e) {
              var y = parseInt((e.pageY + 15) / 10);
              var i = 0;
              if (y <= data.detail.length && data.detail[y]) {
                i = Math.floor((data.detail[y] / data.total * 100) * 100) / 100;
              } else {
                i = 0;
              }
              if (over_ele) {
                over_ele.remove();
              }
              over_ele = $(over_tpl.replace('{{top}}', e.pageY + 15).replace('{{percent}}', i + '%'));
              $(document.body).append(over_ele);
            }

            $(document).on('mousemove', _.throttle(showLineDetail, 150));


          },
          error: function(res) {
            if (_.isObject(res) && res.error) {
              me.showErrorInfo(2, {
                error: res.error
              });
            } else {
              me.showErrorInfo(2, {
                error: '服务异常'
              });
            }
            sessionStorage.removeItem('sensors_heatmap_id');
          }
        });



      } else {
        sd.log('缺少web_url');
      }

    },
    setNoticeMap: function(data, url) {

    },
    setContainer: function(el) {
      if (!el) {
        return false;
      };
      el.classList.add('saContainer');
      if (el && el.children) {
        var arr = el.children;
        for (var i = 0; i < arr.length; i++) {
          this.setContainer(arr[i]);
        }
      }
    },
    setToolbar: function(requrest_id, type, url) {

      var me = this;
      var div = document.createElement('div');
      div.setAttribute('style', 'height:50px !important;z-index:999999;background:#272727;width:100%;position:fixed;top:0;left:0; font-size:14px;color:#EFF2F7;margin:0;clear: both;');
      div.innerHTML = '<div style="height:39px;line-height:39px;padding:3px 15px 9px"><div class="sa-sdk-heatmap-toolbar-selectmap"  id="chooseType" style="position:relative;width:70px;float:left" title="选择查看类型"><div style="cursor:pointer"><span>点击图</span> <svg style="position:absolute;top:9px" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="icon" transform="translate(-199.000000, -18.000000)" fill="#99A9BF"><polygon id="Triangle-1-Copy-29" transform="translate(209.000000, 28.000000) scale(1, -1) translate(-209.000000, -28.000000) " points="209 26 213 30 205 30"></polygon></g></g></svg></div><ul style="display:none;list-style:none;margin:0;padding:0;width:100px"><li data-state="1">点击图</li><li data-state="2">触达率图</li></ul></div><div class="sa-sdk-heatmap-toolbar-selectmap" id="chooseVersion" style="display:none;position:relative;width:70px;float:left" title="切换点击图方案"><div style="cursor:pointer"><span>方案一</span> <svg style="position:absolute;top:9px" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="icon" transform="translate(-199.000000, -18.000000)" fill="#99A9BF"><polygon id="Triangle-1-Copy-29" transform="translate(209.000000, 28.000000) scale(1, -1) translate(-209.000000, -28.000000) " points="209 26 213 30 205 30"></polygon></g></g></svg></div><ul style="display:none;list-style:none;margin:0;padding:0;width:100px"><li data-state="1">方案一</li><li data-state="2">方案二</li></ul></div><div id="sa_sdk_heatmap_toolbar_close" style="float:right;position:relative;width:30px;height:100%;cursor:pointer" title="收起打开"><svg style="position:absolute;top:9px;right:0" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-129.000000, -260.000000)" fill-rule="nonzero" fill="#99A9BF"><polygon points="132.110192 274.35347 130.5 272.842901 138.860144 265 147.23 272.842902 145.619784 274.35347 138.864999 268.016603"></polygon></g></g></svg></div><div style="float:right;padding:0 10px;width:1px;color:#99A9BF">|</div><div id="sa_sdk_heatmap_toolbar_refresh" style="float:right;position:relative;cursor:pointer;width:30px;height:100%" title="刷新数据"><svg style="position:absolute;top:9px;left:5px" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><g><path d="M18.1201298,5.45190941 L15.7071603,6.65839414 C14.3331082,3.91029003 11.3336531,2.11731966 7.94879319,2.56975143 C4.59744671,3.02218321 1.91636953,5.78704405 1.54772141,9.13839053 C1.04501944,13.6627083 4.58068998,17.5 9.00446733,17.5 C12.1882465,17.5 14.8693237,15.5227056 15.9585113,12.7243313 L14.098514,12.1043322 L14.0817572,12.1043322 C13.1098668,14.433518 10.5796002,15.9416239 7.7979826,15.3551383 C5.73690451,14.9194632 4.06123127,13.24379 3.62555623,11.1659552 C2.88826001,7.61352789 5.56933719,4.48001893 9.00446733,4.48001893 C11.1660858,4.48001893 13.0093264,5.72001713 13.9141899,7.52974422 L11.4006801,8.80325589 C11.3336531,8.83676935 11.3336531,8.95406648 11.4174368,8.97082321 L16.4612132,10.6297397 C16.5114834,10.6464964 16.5617536,10.612983 16.5785104,10.5627128 L18.2374269,5.51893634 C18.2876971,5.48542287 18.2039134,5.41839594 18.1201298,5.45190941 L18.1201298,5.45190941 Z" fill="#99A9BF"></path><rect x="0" y="0" width="20" height="20"></rect></g></g></g></svg></div><div style="float:right;padding:0 10px;width:1px;color:#99A9BF">|</div><div id="sa_sdk_heatmap_toolbar_share" style="float:right;position:relative;width:30px;height:100%;cursor:pointer" title="收起打开"><svg style="position:absolute;top:11px; left: 5px;" width="14px" height="15px" viewBox="0 0 14 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-42.000000, -62.000000)"><g transform="translate(39.000000, 60.000000)"><rect x="0" y="0" width="20" height="20"></rect><path d="M12.9177778,12.725 L7.76833333,9.72777778 C7.80444444,9.56166667 7.83333333,9.39555556 7.83333333,9.22222222 C7.83333333,9.04888889 7.80444444,8.88277778 7.76833333,8.71666667 L12.86,5.74833333 C13.25,6.10944444 13.7627778,6.33333333 14.3333333,6.33333333 C15.5322222,6.33333333 16.5,5.36555556 16.5,4.16666667 C16.5,2.96777778 15.5322222,2 14.3333333,2 C13.1344444,2 12.1666667,2.96777778 12.1666667,4.16666667 C12.1666667,4.34 12.1955556,4.50611111 12.2316667,4.67222222 L7.14,7.64055556 C6.75,7.27944444 6.23722222,7.05555556 5.66666667,7.05555556 C4.46777778,7.05555556 3.5,8.02333333 3.5,9.22222222 C3.5,10.4211111 4.46777778,11.3888889 5.66666667,11.3888889 C6.23722222,11.3888889 6.75,11.165 7.14,10.8038889 L12.2822222,13.8083333 C12.2461111,13.96 12.2244444,14.1188889 12.2244444,14.2777778 C12.2244444,15.4405556 13.1705556,16.3866667 14.3333333,16.3866667 C15.4961111,16.3866667 16.4422222,15.4405556 16.4422222,14.2777778 C16.4422222,13.115 15.4961111,12.1688889 14.3333333,12.1688889 C13.7844444,12.1688889 13.2933333,12.3855556 12.9177778,12.725 Z" id="Shape" fill="#99A9BF"></path></g></g></g></svg></div><div style="float:right;padding:0 10px;width:1px;color:#99A9BF">|</div><div id="sa_sdk_heatmap_toolbar_filter" style="float:right;position:relative;cursor:pointer;width:30px;height:100%;" title="筛选"><svg style="position: absolute; top: 11px; left: 5px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="15px" viewBox="0 0 17 15" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="操作栏" transform="translate(-1068.000000, -341.000000)" fill="#99A9BF" fill-rule="nonzero"><g id="screen" transform="translate(1068.000000, 341.000000)"><polygon id="路径" points="9.13824444 13.2863778 9.13824444 6.65411111 12.5159778 2.08801111 4.52081111 2.08801111 7.8378 6.56684444 7.8378 12.6447111 6.23534444 11.8541778 6.23534444 7.20851111 0.8 0.4 16.2 0.4 10.7646556 7.2299 10.7646556 14.0888889 9.13824444 13.2863778"/></g></g></g></svg></div></div>';
      document.body.appendChild(div);
      this.setContainer(div);

      this.setDropDown(requrest_id, type, url);

      var toolbar_corner = $('<div id="sa_sdk_heatmap_toolbar_corner" style="cursor:pointer;display:none;position: fixed;z-index:999999;top:0;right:10px;padding:3px 8px 0;background:#000;"></div>')
      toolbar_corner.html('<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-360.000000, -119.000000)" fill-rule="nonzero" fill="#C0CCDA"><polygon transform="translate(370.365000, 129.117652) scale(1, -1) translate(-370.365000, -129.117652) " points="364.4177 133.235303 363 131.905316 370.360724 125 377.73 131.905317 376.312279 133.235302 370.364999 127.655981"></polygon></g></g></svg>');
      $(document.body).append(toolbar_corner);
      this.setContainer(toolbar_corner[0]);

      $(div).on('click', '#sa_sdk_heatmap_toolbar_refresh', function() {
        if (type === '1' || type === null) {
          me.refreshHeatData(heatmap_render.heatMode);
          me.showErrorInfo(5);
        } else {
          location.reload();
        }
      });

      var current_url = this.getCurrentUrl();
      var getQrHtml = function() {
        var qrHtml = $('<div style="z-index:999999;width:260px;height:260px;position:fixed;right:2px;top:55px;background:#FFF;box-shadow:0 2px 9px 3px rgba(168,173,178,.39);border-radius:3px;"><div style="height:44px;line-height:44px;border-bottom:1px solid #E9F0F7;text-align:center;color:#475669;font-size:14px;position:relative;">分享链接<span style="position:absolute;top:4px;color:#99A9BF;cursor:pointer;right:4px"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><g transform="translate(-1.000000, -1.000000)"><polygon fill="#99A9BF" transform="translate(11.106602, 11.106602) rotate(-45.000000) translate(-11.106602, -11.106602) " points="12.3566017 12.3566017 12.3566017 18.6066017 9.85660172 18.6066017 9.85660172 12.3566017 3.60660172 12.3566017 3.60660172 9.85660172 9.85660172 9.85660172 9.85660172 3.60660172 12.3566017 3.60660172 12.3566017 9.85660172 18.6066017 9.85660172 18.6066017 12.3566017"></polygon><rect x="1" y="1" width="20" height="20"></rect></g></g></g></svg></span></div><div style="width:128px;height:128px;margin-left:66px;margin-top:16px"></div><div style="margin:20px"><input style="font-size:14px;outline:none;color:#475669;width:92%;border:1px solid #D3DCE6;border-radius:3px;height:32px;line-height:32px;padding:0 10px;" type="text" value=""></div></div>');
        $(document.body).append(qrHtml);
        var qrCodeEle = qrHtml.find('div:eq(1)')[0];
        qrHtml.find('input').val(current_url);
        qrHtml.find('span').on('click', function() {
          qrHtml.css('display', 'none');
        });
        var qr = new QRCode(qrCodeEle, {
          text: current_url,
          width: 128,
          height: 128,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.L
        });

        qrHtml.css('top', $(div).height() + 1);
        getQrHtml = function() {
          return qrHtml;
        }
        return qrHtml;
      };

      $(div).on('click', '#sa_sdk_heatmap_toolbar_share', function() {
        var qrEle = getQrHtml();
        qrEle.css('display', 'block');
        me.setContainer(qrEle[0]);

        setTimeout(function() {
          qrEle.find('input').focus();
          qrEle.find('input').select();
        }, 1);


      });

      var filterFlyout = '<div id="sa_sdk_heatmap_filterFlyout" style="z-index: 999999; position: fixed; right: 2px; top: 51px; width:432.5px; height: 171px; background:rgba(255,255,255,1);box-shadow:0px 2px 9px 3px; rgba(10,10,10,0.39); border-radius:3px;"><form>';
      filterFlyout += '<div style="height: 45px; text-align: center; line-height: 45px; font-size:14px; font-family:PingFangSC-Medium,PingFang SC; font-weight:500; color:rgba(32,45,61,1); border-bottom: 1px solid #E9F0F7;">';
      filterFlyout += "筛选展示元素";
      filterFlyout += '</div>';
      filterFlyout += '<div style="height: 78px; border-bottom: 1px solid #E9F0F7;">';
      filterFlyout += '<p style="margin: 0; line-height: 78px; padding-left: 20px; font-size:14px; font-family:PingFangSC-Regular,PingFang SC; font-weight:400; color:rgba(71,86,105,1);">点击数 <select name="filter_type"><option value="gt" selected>&gt;</option><option value="lt">&lt;</option><option value="between">在区间</option></select><input type="text" name="filterValue"><span class="filter_between_span" style="display:none;"><input type="text" name="filterValueStart" style="margin-right: 5px;">至<input type="text" name="filterValueEnd" style="margin-left: 5px;"></span> 的元素</p>';
      filterFlyout += '</div>';
      filterFlyout += '<div style="height: 47px; overflow: hidden; padding: 10px 15px; box-sizing: border-box;">';
      filterFlyout += '<div class="sa-sdk-heatmap-filterflyout-submitbtn" style="display: inline-block; float: right; width:56px; height:28px; background:rgba(4,203,148,1); border-radius:3px; font-size:13px; font-family:PingFangSC-Medium,PingFang SC; font-weight:500; color:rgba(255,255,255,1); text-align: center; line-height: 28px; cursor: pointer;">确定</div><a class="sa-sdk-heatmap-filterflyout-cancelbtn" href="#" style="float: right; display: inline-block; line-height: 28px; margin-right: 6px; font-size:13px; font-family:PingFangSC-Regular,PingFang SC; font-weight:400; color:rgba(71,86,105,1); text-decoration: none;">取消</a>';
      filterFlyout += '</div>';
      filterFlyout += '</form></div>';

      $(div).on('click', '#sa_sdk_heatmap_toolbar_filter', function(e) {
        e.stopPropagation();
        if ($('#sa_sdk_heatmap_filterFlyout').length) {
          $('#sa_sdk_heatmap_filterFlyout').toggle();
        } else {
          $(document.body).append(filterFlyout);
          me.setContainer($('#sa_sdk_heatmap_filterFlyout')[0]);
        }
      });

      $(document.body).on('change', '#sa_sdk_heatmap_filterFlyout select[name="filter_type"]', function() {
        var type = $(this).val();
        var control1 = $('#sa_sdk_heatmap_filterFlyout input[name="filterValue"]');
        var control2 = $('#sa_sdk_heatmap_filterFlyout .filter_between_span');
        if (type === 'between') {
          control1.hide();
          control2.show();
        } else {
          control1.show();
          control2.hide();
        }
      });

      $(document.body).on('click', '#sa_sdk_heatmap_filterFlyout .sa-sdk-heatmap-filterflyout-cancelbtn', function(e) {
        $('#sa_sdk_heatmap_filterFlyout').hide();
        $('#sa_sdk_heatmap_filterFlyout form')[0].reset();
        var control1 = $('#sa_sdk_heatmap_filterFlyout input[name="filterValue"]');
        var control2 = $('#sa_sdk_heatmap_filterFlyout .filter_between_span');
        control1.show();
        control2.hide();
        var copyData = $.extend(true, {}, me.originalHeatData);
        me.ajaxHeatData = copyData;
        refreshClickMap();
        return false;
      });

      $(document.body).on('click', '#sa_sdk_heatmap_filterFlyout .sa-sdk-heatmap-filterflyout-submitbtn', function() {
        var type = $('#sa_sdk_heatmap_filterFlyout select[name="filter_type"]').val();
        var filterInput = $('#sa_sdk_heatmap_filterFlyout input[name="filterValue"]');
        var startInput = $('#sa_sdk_heatmap_filterFlyout input[name="filterValueStart"]');
        var endInput = $('#sa_sdk_heatmap_filterFlyout input[name="filterValueEnd"]');
        var isInRange = function(x) {
          if (!$.isNumeric(x)) return false;
          var numberX = Number(x);
          return Math.floor(numberX) === numberX && numberX >= 0;
        };
        var errMsg1 = '输入的数值不合法，请输入大于等于 0 的整数';
        var errMsg2 = '区间左侧的数字大于右侧的数字，无法筛选，请修改数值';
        if (type === 'between') {
          if (!isInRange(startInput.val())) {
            me.showErrorInfo(2, {
              error: errMsg1
            });
            return;
          }
          if (!isInRange(endInput.val())) {
            me.showErrorInfo(2, {
              error: errMsg1
            });
            return;
          }
          if (Number(startInput.val()) > Number(endInput.val())) {
            me.showErrorInfo(2, {
              error: errMsg2
            });
            return;
          }
          filterClickMap(type, startInput.val(), endInput.val());
        } else {
          if (!isInRange(filterInput.val())) {
            me.showErrorInfo(2, {
              error: errMsg1
            });
            return;
          }
          filterClickMap(type, filterInput.val())
        }
      });

      function filterClickMap(type, val1, val2) {
        var inRange = function(x) {
          var n1 = Number(val1),
            n2 = Number(val2);
          if (type === 'gt') {
            return x > n1;
          } else if (type === 'lt') {
            return x < n1;
          } else {
            return x > Math.min(n1, n2) && x < Math.max(n1, n2);
          }
        };
        var copyData = $.extend(true, {}, me.processOriginalHeatData2());
        var origArr = copyData.rows;
        var newArr = [];
        for (var i = 0, len = origArr.length; i < len; i++) {
          if (inRange(origArr[i].values[0][0])) {
            newArr.push(origArr[i]);
          }
        }
        copyData.rows = newArr;
        me.ajaxHeatData = copyData;
        refreshClickMap();
      }

      function refreshClickMap() {
        var state = '' + heatmap_render.heatMode;
        if (state === '1') {
          heatmap_render.refreshHeatData(1);
        } else if (state === '2') {
          heatmap_render.refreshHeatData(2);
        }
      }

      $('#sa_sdk_heatmap_toolbar_filter').on('mouseenter', function() {
        $('#sa_sdk_heatmap_toolbar_filter g[fill^="#"]').attr('fill', '#559FF0');
      }).on('mouseleave', function() {
        $('#sa_sdk_heatmap_toolbar_filter g[fill^="#"]').attr('fill', '#99A9BF');
      });


      $('#sa_sdk_heatmap_toolbar_share').on('mouseenter', function() {
        $('#sa_sdk_heatmap_toolbar_share path').attr('fill', '#559FF0');
      }).on('mouseleave', function() {
        $('#sa_sdk_heatmap_toolbar_share path').attr('fill', '#99A9BF');
      });

      $('#sa_sdk_heatmap_toolbar_refresh').on('mouseenter', function() {
        $('#sa_sdk_heatmap_toolbar_refresh path').attr('fill', '#559FF0');
      }).on('mouseleave', function() {
        $('#sa_sdk_heatmap_toolbar_refresh path').attr('fill', '#99A9BF');
      });

      $('#sa_sdk_heatmap_toolbar_close').on('mouseenter', function() {
        $('#sa_sdk_heatmap_toolbar_close g').eq(1).attr('fill', '#559FF0');
      }).on('mouseleave', function() {
        $('#sa_sdk_heatmap_toolbar_close g').eq(1).attr('fill', '#99A9BF');
      });

      $('#sa_sdk_heatmap_toolbar_corner').on('mouseenter', function() {
        $('#sa_sdk_heatmap_toolbar_corner g').eq(1).attr('fill', '#559FF0');
      }).on('mouseleave', function() {
        $('#sa_sdk_heatmap_toolbar_corner g').eq(1).attr('fill', '#99A9BF');
      });

      $(div).on('click', '#sa_sdk_heatmap_toolbar_close', function() {
        $(div).hide(0);
        $('#sa_sdk_heatmap_toolbar_corner').show(0);
      });

      $('#sa_sdk_heatmap_toolbar_corner').on('click', function() {
        $('#sa_sdk_heatmap_toolbar_corner').hide(0);
        $(div).show(0);
      });


    },
    showErrorInfo: function(error_type, error_msg) {
      var div = document.createElement('div');
      div.setAttribute('style', 'background:#e55b41;border:none;border-radius:4px;color:#fff;font-size:18px;left:50%;margin-left:-300px;padding:12px;position: fixed;top:60px;text-align: center;width:600px;z-index:999999;');

      if (error_type === 1) {
        div.innerHTML = '当前页面在所选时间段内暂时没有点击数据';
      } else if (error_type === 2) {
        if (error_msg.error) {
          div.innerHTML = error_msg.error;
        } else {
          div.innerHTML = '请求数据异常';

        }
      } else if (error_type === 3) {
        div.innerHTML = '当前页面在所选时间段内暂时没有点击数据';
      } else if (error_type === 4) {
        if (error_msg.error) {
          div.innerHTML = error_msg.error;
        } else {
          div.innerHTML = '请求数据异常';
        }
      } else if (error_type === 5) {
        div.style.backgroundColor = '#13CE66';
        div.innerHTML = '刷新数据成功';
      }

      document.body.appendChild(div);
      setTimeout(function() {
        document.body.removeChild(div);
      }, 5000)


    },
    requestType: 1,
    getHeatType: function() {


    },
    setClickMap: function(id, url) {

      var me = this;
      if (typeof id === 'string' && sd.para.web_url) {

        var urlParse = new _.urlParse(sd.para.web_url);
        urlParse._values.Path = '/api/heat_map/report/' + id;

        var urlParse2 = new _.urlParse(sd.para.web_url);
        urlParse2._values.Path = '/api/heat_map/report/path/' + id;
        var urlParse2Value = urlParse2.getUrl();
        if (urlParse2Value.indexOf('?') === -1) {
          urlParse2Value = urlParse2Value + '?pathUrl=' + encodeURIComponent(url);
        } else {
          urlParse2Value = urlParse2Value + '&pathUrl=' + encodeURIComponent(url);
        }

        $('body').append('<div id="heatMapContainer"></div>');
        if (url) {
          this.requestType = 3;
          _.ajax({
            url: urlParse2Value,
            type: 'POST',
            cors: true,
            header: {
              cors: "true"
            },
            success: function(data) {
              me.originalHeatData = me.processOriginalHeatData(data);
              me.bindEffect();
              me.calculateHeatData(data);
            },
            error: function(res) {
              me.showErrorInfo(2, res);
              sessionStorage.removeItem('sensors_heatmap_id');
            }
          });
        } else {
          this.requestType = 1;
          _.ajax({
            url: urlParse.getUrl(),
            type: 'POST',
            cors: true,
            header: {
              cors: "true"
            },
            success: function(data) {
              me.originalHeatData = me.processOriginalHeatData(data);
              me.bindEffect();
              me.calculateHeatData(data);
            },
            error: function(res) {
              me.showErrorInfo(4, res);
              sessionStorage.removeItem('sensors_heatmap_id');
            }
          });
        }
      } else {
        sd.log('缺少web_url');
      }
    },
    processOriginalHeatData: function(data) {
      var result = $.extend(true, {}, data);
      $.each(result.rows, function(index, value) {
        var ele = $(value.by_values[0]);
        if (ele.length) {
          value.ele = ele[0];
        }
      });
      return result;
    },
    processOriginalHeatData2: function() {
      var data = this.originalHeatData;
      var result = $.extend(true, {}, data);
      var tmp = [];
      var eletmp = [];
      var copyRows = data.rows.slice();
      $.each(copyRows, function(index, value) {
        if (!value.ele) return true;
        var idx = $.inArray(value.ele, eletmp);
        if (idx === -1) {
          eletmp.push(value.ele);
          tmp.push($.extend(true, {}, value));
        } else {
          tmp[idx].values[0][0] += value.values[0][0];
        }
      });
      result.rows = tmp;
      return result;
    },
    calculateHeatData: function(data) {
      data = $.extend(true, {}, data);
      this.ajaxHeatData = data;
      var me = this;

      if (!_.isObject(data) || !_.isArray(data.rows) || !_.isObject(data.rows[0])) {
        me.showErrorInfo(me.requestType);
        return false;
      }
      var pv = parseInt(data.page_view, 10);
      var heat_map_id = data.heat_map_id;
      data = data.rows;

      var dataPageTotal = 0;
      var templeUsableData = [];
      var usableData = [];
      var usableElem = [];
      var spliceArr = [];

      _.each(data, function(obj) {
        var elem = null;
        if (obj.by_values[0] && (elem = _.querySelectorAll(obj.by_values[0])[0])) {
          templeUsableData.push(obj);
          usableElem.push(elem);
        }
      });

      if (templeUsableData.length > 1) {
        for (var i = 0; i < usableElem.length; i++) {
          for (var j = (i + 1); j < usableElem.length; j++) {
            if (usableElem[i] === usableElem[j]) {
              templeUsableData[j].values[0][0] += templeUsableData[i].values[0][0];
              templeUsableData[i].values[0][0] = 0;
              templeUsableData[i].by_values = "";
              break;
            }
          }
        }
      }

      _.each(templeUsableData, function(obj) {
        var elem = null;
        if (obj.by_values[0] && (elem = _.querySelectorAll(obj.by_values[0])[0])) {
          usableData.push(obj);
        }
      });

      usableData = _.filter(usableData, function(a) {
        return a;
      });

      if (usableData.length === 0) {
        me.showErrorInfo(me.requestType);
      }

      data = usableData;

      _.each(data, function(obj, key) {
        obj.value_fix = obj.values[0][0];
        dataPageTotal += obj.value_fix;
      });

      me.data_render = data;

      _.each(data, function(obj, key) {
        if (obj.by_values[0]) {
          obj.data_page_percent = Number(obj.value_fix / dataPageTotal * 100).toFixed(2) + '%';

          obj.data_click_percent = Number(obj.value_fix / pv * 100).toFixed(2) + '%';

          obj.data_click = Number(obj.value_fix / pv);
          obj.data_page = Number(obj.value_fix / dataPageTotal);


          var urlParse = new _.urlParse(sd.para.web_url);
          urlParse._values.Path = '/web-click/users';
          if (me.requestType === 3) {
            obj.data_user_link = urlParse.getUrl() + '#heat_map_id=' + heat_map_id + '&detail=true&element_selector=' + encodeURIComponent(obj.by_values[0]) + '&page_url=' + encodeURIComponent(location.href);
          } else {
            obj.data_user_link = urlParse.getUrl() + '#heat_map_id=' + heat_map_id + '&detail=true&element_selector=' + encodeURIComponent(obj.by_values[0]);
          }
          if (String(obj.top_values[0]) === 'null') {
            obj.data_top_value = '没有值';
          } else {
            obj.data_top_value = String(obj.top_values[0]);
          }

          var selector = _.querySelectorAll(obj.by_values[0]);
          if (typeof selector === 'object' && selector.length > 0) {
            setTimeout(function() {
              me.renderHeatData(selector, obj, key);
            }, 100);
          }
        }
      });



    },
    heatData: function(data) {
      var heat = [0.005, 0.01, 0.025, 0.05, 0.1, 0.5];
      for (var i = 0; i < heat.length; i++) {
        if (data < heat[i]) {
          return i;
        }
      }
      return 6;
    },
    heatDataTitle: function(data) {
      return ('点击次数 ' + data.value_fix +
        '\r\n点击概率 ' + data.data_click_percent +
        '\r\n点击占比 ' + data.data_page_percent + '\r\n历史数据 ' + String(data.top_values[0]).slice(0, 30));
    },
    renderHeatData: function(selector, data, key) {
      var dom = _.ry(selector[0]);
      var wrap = null;

      var tagName = dom.ele.tagName.toLowerCase();
      if (this.heatMode == 1) {
        if (tagName === 'input' || tagName === 'textarea' || tagName === 'img') {
          dom.attr('data-heat-place', String(key));
          var width = $(selector[0]).width();
          wrap = dom.wrap('span');
          if (typeof width === 'number') {
            wrap.ele.style.width = width;
          }
          wrap.ele.style.display = 'inline-block';

        } else {
          wrap = dom;
        }
        this.heatDataElement.push(dom);
        $(wrap.ele).data('clickdata', $.extend(true, {}, data));
        wrap.attr('data-heat-place', String(key))
          .addClass('sa-click-area')
          .attr('data-click', data.data_click_percent)
          .addClass('sa-click-area' + this.heatData(data.data_click))
        if (wrap.getStyle('display') === 'inline') {
          selector[0].style.display = 'inline-block';
          $(selector[0]).addClass('sa-heatmap-inlineBlock');
        }
      } else if (this.heatMode === 2) {
        var eleWidth, eleHeight, eleLeft, eleTop;
        if ($(selector[0]).is(':visible') && String($(selector[0]).css('opacity')) !== '0') {
          if (tagName === 'a') {
            if ($(selector[0]).css('display') === 'inline') {
              if (selector[0].children[0]) {
                eleWidth = $(selector[0].children[0]).outerWidth();
                eleHeight = $(selector[0].children[0]).outerHeight();
                eleLeft = $(selector[0]).children()[0].getBoundingClientRect().left;
                eleTop = $(selector[0]).children()[0].getBoundingClientRect().top;
              } else {
                $(selector[0]).css('display', 'inline-block');
                eleWidth = $(selector[0]).outerWidth();
                eleHeight = $(selector[0]).outerHeight();
                eleLeft = $(selector[0]).offset().left - $(window).scrollLeft();
                eleTop = $(selector[0]).offset().top - $(window).scrollTop();
                $(selector[0]).css('display', 'inline');
              }
            } else {
              eleWidth = $(selector[0]).outerWidth();
              eleHeight = $(selector[0]).outerHeight();
              eleLeft = $(selector[0]).offset().left - $(window).scrollLeft();
              eleTop = $(selector[0]).offset().top - $(window).scrollTop();
            }
          } else {
            eleWidth = $(selector[0]).outerWidth();
            eleHeight = $(selector[0]).outerHeight();
            eleLeft = $(selector[0]).offset().left - $(window).scrollLeft();
            eleTop = $(selector[0]).offset().top - $(window).scrollTop();
          }

          dom.addClass("sa-click-area-v2");
          $(dom.ele).data('clickdata', $.extend(true, {}, data));
          if (eleHeight && eleWidth) {

            var mapDivObj = {
              width: eleWidth,
              height: eleHeight,
              left: eleLeft,
              top: eleTop,
              position: 'fixed',
              'z-index': 999998,
              'pointer-events': 'none'
            }

            var heatMapDiv = $('<div class="sa-click-area"></div>');
            heatMapDiv.css(mapDivObj);
            heatMapDiv.attr('data-click', data.data_click_percent);
            heatMapDiv.addClass('sa-click-area' + this.heatData(data.data_click));
            heatMapDiv.attr('selector', selector[0]);
            heatMapDiv.attr('data-heat-place', String(key));

            $('#heatMapContainer').append(heatMapDiv);
            this.setContainer($('#heatMapContainer')[0]);

          }
        }
      }


    },
    refreshHeatData: function(targetVersion) {
      if (this.heatMode == 1) {
        _.each(this.heatDataElement, function(ele) {
          var tagName = ele.ele.tagName.toLowerCase();
          if (tagName === 'input' || tagName === 'textarea' || tagName === 'img') {
            var parent = ele.parent();
            if (parent && parent.ele.tagName.toLowerCase() === 'span' && parent.ele.className.indexOf('sa-click-area') !== -1) {
              $(ele.ele).unwrap();
            }
          } else {
            ele.removeClass('sa-click-area');
          }
        });
        $(".sa-heatmap-inlineBlock").css("display", "inline");
        $(".sa-heatmap-inlineBlock").removeClass("sa-heatmap-inlineBlock");
        this.heatDataElement = [];
      }
      if (this.heatMode == 2) {

        this.heatDataElement = [];
        $(".sa-click-area-v2").removeClass("sa-click-area-v2");
        $('#heatMapContainer').html('');
      }

      this.heatMode = targetVersion;
      this.calculateHeatData(this.ajaxHeatData);

    },
    refreshScrollData: function() {

    },
    is_fix_state: null,
    showEffectBox: function(e, div, isShow) {
      if (this.is_fix_state === 'fixslidedown') {

        div.style.position = 'fixed';
        div.style.left = 'auto';
        div.style.right = 0;
        div.style.top = 0;

        if (isShow) {
          div.className = 'sa-heat-box-effect-2017314';
        }

      } else if (this.is_fix_state === 'notfix') {

        var width = heatmap.getBrowserWidth();

        var target = e.target;
        var offset = _.ry(target).offset();
        var size = _.ry(target).getSize();
        var x = offset.left + size.width + 2;
        var y = offset.top + 1;

        if (width < (x + 220)) {
          x = offset.left - 220;
          if (offset.left < 220) {
            x = e.pageX;
          }
        }


        div.style.position = 'absolute';
        div.style.left = x + 'px';
        div.style.top = y + 'px';

      }

      if (div.style.display !== 'block') {
        div.style.display = 'block';
      }

    },
    bindEffect: function() {
      var me = this;
      var mouseoverEvent = null;
      var target_is_on_float = false;

      var me = this;
      var str = '<div style="padding: 8px;"><div style="color: #CACACA">当前内容：</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data_current_content}}</div></div><div style="background: #444; height:1px;"></div><div style="padding: 8px;">' +
        '<table style="width:100%;color:#fff;font-size:13px;"><tr><td>点击次数: </td><td style="text-align:right;">{{value_fix}}次</td></tr><tr><td style="cursor:pointer;" title="点击次数/当前页面的浏览次数"><span style="float:left;">点击率</span><span style="float:left;margin-left:3px;"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1803.000000, -158.000000)" fill="#979797"><g transform="translate(1737.000000, 84.000000)"><path d="M71,74 C68.24,74 66,76.24 66,79 C66,81.76 68.24,84 71,84 C73.76,84 76,81.76 76,79 C76,76.24 73.76,74 71,74 L71,74 Z M71.5,82.5 L70.5,82.5 L70.5,81.5 L71.5,81.5 L71.5,82.5 L71.5,82.5 Z M72.535,78.625 L72.085,79.085 C71.725,79.45 71.5,79.75 71.5,80.5 L70.5,80.5 L70.5,80.25 C70.5,79.7 70.725,79.2 71.085,78.835 L71.705,78.205 C71.89,78.025 72,77.775 72,77.5 C72,76.95 71.55,76.5 71,76.5 C70.45,76.5 70,76.95 70,77.5 L69,77.5 C69,76.395 69.895,75.5 71,75.5 C72.105,75.5 73,76.395 73,77.5 C73,77.94 72.82,78.34 72.535,78.625 L72.535,78.625 Z" id="prompt"></path></g></g></g></svg></span></td><td style="text-align:right;">{{data_click_percent}}</td></tr><tr><td style="cursor:pointer;" title="点击次数/当前页面的点击总次数"><span style="float:left;">点击占比</span> <span style="float:left;margin-left:3px;"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1803.000000, -158.000000)" fill="#979797"><g transform="translate(1737.000000, 84.000000)"><path d="M71,74 C68.24,74 66,76.24 66,79 C66,81.76 68.24,84 71,84 C73.76,84 76,81.76 76,79 C76,76.24 73.76,74 71,74 L71,74 Z M71.5,82.5 L70.5,82.5 L70.5,81.5 L71.5,81.5 L71.5,82.5 L71.5,82.5 Z M72.535,78.625 L72.085,79.085 C71.725,79.45 71.5,79.75 71.5,80.5 L70.5,80.5 L70.5,80.25 C70.5,79.7 70.725,79.2 71.085,78.835 L71.705,78.205 C71.89,78.025 72,77.775 72,77.5 C72,76.95 71.55,76.5 71,76.5 C70.45,76.5 70,76.95 70,77.5 L69,77.5 C69,76.395 69.895,75.5 71,75.5 C72.105,75.5 73,76.395 73,77.5 C73,77.94 72.82,78.34 72.535,78.625 L72.535,78.625 Z" id="prompt"></path></g></g></g></svg></span></td><td style="text-align:right;">{{data_page_percent}}</td></tr></table>' +
        '</div><div style="background: #444; height:1px;"></div><div style="padding: 8px;"><div style="color: #CACACA;">历史内容：</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data_top_value}}</div></div><div style="background: #444; height:1px;"></div><div style="padding: 6px 8px;"><a style="color:#2a90e2;text-decoration: none;" href="{{data_user_link}}" target="_blank">查看用户列表</a ></div>';

      var newStr = '';
      var isShow = true;
      var div = document.createElement('div');
      document.body.appendChild(div);
      div.setAttribute('style', 'border-radius:3px;display:none;border:1px solid #000;position: fixed; right:0; top:0; background: #333;line-height:24px;font-size:13px;width:220px;color: #fff;font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;box-shadow: 0 2px 4px rgba(0,0,0,0.24);z-index:999999;');

      div.innerHTML = '<div id="sa_heat_float_right_box_content" style="clear:both;"></div>';

      var eleContent = document.getElementById('sa_heat_float_right_box_content');

      _.addEvent(div, 'mouseleave', function() {
        if (me.is_fix_state === 'notfix') {
          target_is_on_float = false;
          div.style.display = 'none';
        }
      });

      _.addEvent(div, 'mouseenter', function() {
        if (me.is_fix_state === 'notfix') {
          target_is_on_float = true;
        }
      });



      _.addEvent(div, 'animationend', function() {
        div.className = '';
      });


      this.is_fix_state = 'notfix';


      var timeEle = 600;

      function showBoxDetailContent(e) {
        var target = e.currentTarget;
        var pos = target.getAttribute('data-heat-place');
        var data = $(target).data('clickdata');
        if (!data) {
          return false;
        }

        var textContent;
        var heatmapCallback = _.isObject(sd.para.heatmap) ? sd.para.heatmap.setContent : null;
        if (heatmapCallback && typeof(heatmapCallback) === 'function') {
          textContent = heatmapCallback(target);
          if (textContent && typeof(textContent) === 'string') {
            textContent = _.trim(textContent);
          } else {
            textContent = '';
          }
        } else {
          textContent = _.trim(target.textContent);
        }

        if (textContent) {
          textContent = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
        }

        data.data_current_content = textContent || '没有值';

        newStr = str.replace(/\{\{[^\{\{]+\}\}/g, function(a) {
          a = a.slice(2, -2);
          if (typeof a === 'string' && typeof data === 'object') {
            return data[a];
          }
        });
        eleContent.innerHTML = newStr;
        me.showEffectBox(e, div, isShow);
        me.setContainer(div);
      }

      function showBoxDetail(e) {
        var target = e.target;
        setTimeout(function() {
          if (target === current_over) {
            showBoxDetailContent(e);
          }
        }, timeEle);

      }

      var current_over = null;

      if (/iPhone|Android/i.test(navigator.userAgent)) {

        $(document).on("mouseover", ".sa-click-area,.sa-click-area-v2", function(e) {
          var target = e.target;
          current_over = target;
          $(target).on("mouseleave", function() {
            if (me.is_fix_state === 'notfix') {
              setTimeout(function() {
                if (!target_is_on_float) {
                  target_is_on_float = false;
                  div.style.display = 'none';
                }
              }, timeEle);
            }
          })
          showBoxDetail(e);
        })
      } else {
        $(document).on("mouseover", ".sa-click-area,.sa-click-area-v2", function(e) {
          var target = e.target;
          current_over = target;
          showBoxDetail(e);
        })
      }

    },
    setCssStyle: function() {
      var css = '.saContainer{margin:0;padding:0;font-size:13px;}.sa-click-area video{visibility:hidden;}.sa-sdk-heatmap-toolbar-selectmap ul{position:absolute;top:40px;left:0;background:#fff;box-shadow:1px 1px 1px rgba(200,200,200,.6);border-radius:3px;}.sa-sdk-heatmap-toolbar-selectmap ul li{cursor:pointer;height:32px;color:#475669;line-height:32px;padding-left:8px}.sa-sdk-heatmap-toolbar-selectmap ul li:hover{background:#00cd90;color:#fff;}.sa-sdk-heatmap-toolbar-selectmap ul li a{text-decoration:none}.sa-heat-box-head-2017322{border-bottom:1px solid rgba(0, 0, 0, .06);cursor:move;height:30px;background:#e1e1e1;color:#999;clear:both}.sa-heat-box-effect-2017314{animation-duration:.5s;animation-fill-mode:both;animation-iteration-count:1;animation-name:sa-heat-box-effect-2017314}@keyframes "sa-heat-box-effect-2017314"{0%{opacity:.6;}to{opacity:1;}}.sa-click-area{position:relative}.sa-click-area:before{pointer-events:none;cursor:pointer;content:"";width:100%;position:absolute;left:0;top:0;bottom:0}.sa-click-area.sa-click-area0:before{background:hsla(60, 98%, 80%, .75);box-shadow:0 0 0 2px #fefe9b inset}img.sa-click-area.sa-click-area0{border:2px solid #fefe9b}.sa-click-area.sa-click-area0:hover:before,input.sa-click-area.sa-click-area0,textarea.sa-click-area.sa-click-area0{background:hsla(60, 98%, 80%, .85)}.sa-click-area.sa-click-area1:before{background:rgba(255, 236, 142, .75);box-shadow:0 0 0 2px #ffec8e inset}img.sa-click-area.sa-click-area1{border:2px solid #ffec8e}.sa-click-area.sa-click-area1:hover:before,input.sa-click-area.sa-click-area1,textarea.sa-click-area.sa-click-area1{background:rgba(255, 236, 142, .85)}.sa-click-area.sa-click-area2:before{background:rgba(255, 188, 113, .75);box-shadow:0 0 0 2px #ffbc71 inset}img.sa-click-area.sa-click-area2{border:2px solid #ffbc71}.sa-click-area.sa-click-area2:hover:before,input.sa-click-area.sa-click-area2,textarea.sa-click-area.sa-click-area2{background:rgba(255, 188, 113, .85)}.sa-click-area.sa-click-area3:before{background:rgba(255, 120, 82, .75);box-shadow:0 0 0 2px #ff7852 inset}img.sa-click-area.sa-click-area3{border:2px solid #ff7852}.sa-click-area.sa-click-area3:hover:before,input.sa-click-area.sa-click-area3,textarea.sa-click-area.sa-click-area3{background:rgba(255, 120, 82, .85)}.sa-click-area.sa-click-area4:before{background:rgba(255, 65, 90, .75);box-shadow:0 0 0 2px #ff415a inset}img.sa-click-area.sa-click-area4{border:2px solid #ff415a}.sa-click-area.sa-click-area4:hover:before,input.sa-click-area.sa-click-area4,textarea.sa-click-area.sa-click-area4{background:rgba(255, 65, 90, .85)}.sa-click-area.sa-click-area5:before{background:rgba(199, 0, 18, .75);box-shadow:0 0 0 2px #c70012 inset}img.sa-click-area.sa-click-area5{border:2px solid #c70012}.sa-click-area.sa-click-area5:hover:before,input.sa-click-area.sa-click-area5,textarea.sa-click-area.sa-click-area5{background:rgba(199, 0, 18, .85)}.sa-click-area.sa-click-area6:before{background:rgba(127, 0, 79, .75);box-shadow:0 0 0 3px #7f004f inset}img.sa-click-area.sa-click-area6{border:2px solid #7f004f}.sa-click-area.sa-click-area6:hover:before,input.sa-click-area.sa-click-area6,textarea.sa-click-area.sa-click-area6{background:rgba(127, 0, 79, .85)}.sa-click-area .sa-click-area:before{background:0 0 !important}.sa-click-area:after{pointer-events:none;height:14px;line-height:14px;margin:-7px 0 0 -28px;width:56px;color:#fff;content:attr(data-click);font-size:14px;font-weight:700;left:50%;line-height:1em;position:absolute;text-align:center;text-indent:0;text-shadow:1px 1px 2px #000;top:50%;z-index:10}';
      css += '#sa_heat_float_right_box_content table td { color: #fff !important; font-size: 13px !important;}';
      css += '#sa_sdk_heatmap_filterFlyout select {padding-left: 10px;width: 82px; height: 32px;background:rgba(255,255,255,1); border-radius:3px; border:1px solid rgba(211,220,230,1); margin-right: 10px; margin-left: 10px; outline: none;}';
      css += '#sa_sdk_heatmap_filterFlyout select:hover {border:1px solid rgba(4,203,148,1);}';
      css += '#sa_sdk_heatmap_filterFlyout select:active, #sa_sdk_heatmap_filterFlyout select:focus {border:2px solid rgba(4,203,148,0.2);}';
      css += '#sa_sdk_heatmap_filterFlyout input {outline:none;box-sizing: border-box; width:77px; height:32px; background:rgba(255,255,255,1); border-radius:3px; border:1px solid rgba(211,220,230,1); padding-left:10px; padding-right:10px;}';
      css += '#sa_sdk_heatmap_filterFlyout input:hover {border:1px solid rgba(4,203,148,1);}';
      css += '#sa_sdk_heatmap_filterFlyout input:active #sa_sdk_heatmap_filterFlyout input:focus {border:2px solid rgba(4,203,148,0.2);}';

      var style = document.createElement('style');
      style.type = 'text/css';
      try {
        style.appendChild(document.createTextNode(css))
      } catch (e) {
        style.styleSheet.cssText = css;
      }
      document.getElementsByTagName('head')[0].appendChild(style);

    }


  };


  var heatmap = {
    getScrollHeight: function() {
      var a = parseInt(document.body.scrollHeight, 10);
      return isNaN(a) ? 0 : a;
    },
    getBrowserWidth: function() {
      var a = window.innerWidth || document.body.clientWidth;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getBrowserHeight: function() {
      var a = window.innerHeight || document.body.clientHeight;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    sendIframeData: function() {
      var me = this;
      _.bindReady(
        function() {
          if (window && window.parent && window.parent.window && (window !== window.parent.window)) {
            window.parent.window.postMessage({
              method: 'setHeight',
              params: {
                height: me.getScrollHeight()
              }
            }, sd.para.web_url);
            window.parent.window.postMessage({
              method: 'setUrl',
              params: {
                request_type: sessionStorage.getItem('sensors_heatmap_type') || '1',
                url: location.href
              }
            }, sd.para.web_url);
          }
        }
      );
    },
    prepare: function(data, type, url) {
      var me = this;
      if (!document.querySelectorAll) {
        alert('请更新到最新版浏览器,建议用chrome或者firefox');
        return false;
      }

      if (sd.errorMsg) {
        heatmap_render.showErrorInfo(2, {
          error: sd.errorMsg
        });
      }

      var web_url = sd.para.web_url || null;
      if (_.sessionStorage.isSupport() && sessionStorage.getItem && sessionStorage.getItem('sensors_heatmap_url')) {
        web_url = sessionStorage.getItem('sensors_heatmap_url') || null;
      }

      function hasGetWebUrl() {
        setTimeout(function() {
          heatmap_render.setToolbar(data, type, url);
          me.sendIframeData();
        }, (_.isObject(sd.para.heatmap) && sd.para.heatmap.loadTimeout) ? sd.para.heatmap.loadTimeout : 2500);
      }

      heatmap_render.setCssStyle();


      if (web_url) {
        sd.para.web_url = web_url;
        sessionStorage.setItem('sensors_heatmap_url', web_url);
        hasGetWebUrl();
      } else {
        heatmap_render.showErrorInfo(2, {
          error: '获取web_url超时'
        });
        return false;
      }


    }
  };


  window.sa_jssdk_heatmap_render = function(se, data, type, url) {
    sd = se;
    sd.heatmap_version = '1.15.5';
    _ = sd._;

    _.bindReady = function(fn, win) {
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
            sd.log(e);
          }
          if (top) poll();
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
      }

    };

    _.querySelectorAll = function(val) {

      if (typeof val !== 'string') {
        sd.log('选择器错误', val);
        return [];
      }
      var sp = val.split(' ');
      if (sp.length === 1) {
        if (/^#\d+/.test(sp[0])) {
          val = '#' + _.strToUnicode(sp[0].slice(1));
        }
      } else {
        if (/^#\d+/.test(sp[0])) {
          sp[0] = '#' + _.strToUnicode(sp[0].slice(1));
          val = sp.join(' ');
        }
      }

      try {
        return document.querySelectorAll(val);
      } catch (e) {
        sd.log('错误', val);
        return [];
      }
    };
    heatmap.prepare(data, type, url);
  };


})();