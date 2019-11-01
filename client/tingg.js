!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.Tingg = t())
    : (e.Tingg = t());
})(window, function() {
  return (function(e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function(t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 1))
    );
  })([
    function(e) {
      e.exports = {
        ORIGIN_URL: 'https://mula.africa',
        MODAL_CHECKOUT_URL: 'https://mula.africa/v2/modal/',
        EXPRESS_CHECKOUT_URL: 'https://mula.africa/v2/express/',
        POWERED_BY_IMAGE:
          'https://beep2.cellulant.com:9212/checkout/v2/web-assets/images/powered-by-tingg.svg',
      };
    },
    function(e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, 'NO_OPTIONS_ERROR', function() {
          return a;
        }),
        n.d(t, 'NO_CLASS_NAME_ERROR', function() {
          return f;
        }),
        n.d(t, 'NO_CHECKOUT_TYPE', function() {
          return s;
        }),
        n.d(t, 'INVALID_CHECKOUT_TYPE', function() {
          return u;
        }),
        n.d(t, 'NON_EXISTENT_ELEMENT', function() {
          return i;
        }),
        n.d(t, 'NO_PAYLOAD', function() {
          return o;
        }),
        n.d(t, 'CHECKOUT_TYPE_ERROR', function() {
          return c;
        }),
        n.d(t, 'CHECKOUT_URL_QUERY_PARAMS', function() {
          return p;
        }),
        n.d(t, 'checkIfElementToAppendButtonToExists', function() {
          return h;
        }),
        n.d(t, 'checkoutRequestTypeCheck', function() {
          return d;
        }),
        n.d(t, 'handleMerchantRequest', function() {
          return v;
        }),
        n.d(t, 'createCheckoutButton', function() {
          return m;
        }),
        n.d(t, 'redirectToExpress', function() {
          return E;
        }),
        n.d(t, 'checkoutRouter', function() {
          return y;
        }),
        n.d(t, 'modalListener', function() {
          return b;
        }),
        n.d(t, 'renderModal', function() {
          return g;
        }),
        n.d(t, 'configs', function() {
          return r;
        });
      n(2);
      var r,
        o = 'merchantProperties not provided',
        c = 'checkoutType not provided',
        i = 'does not exist in your DOM tree',
        a =
          "No options provided, refer to documentation and pass what's required",
        s =
          "Please provide the checkout request type i.e either 'modal' or 'redirect'",
        u =
          "is not a valid checkoutType. It should be either 'modal' or 'redirect'",
        f =
          "Please provide the class name of the element you'd like to append the 'pay with tingg' button to",
        l = ['modal', 'redirect'],
        p = ['params', 'accessKey', 'countryCode'];
      r = n(8);
      var d = function(e) {
          var t = !1;
          return l.indexOf(e) > -1 && (t = !0), t;
        },
        h = function(e) {
          return !!document.querySelector('.'.concat(e));
        },
        m = function(e) {
          var t = document.querySelector('.'.concat(e.className));
          t.classList.add(
            ''.concat('tingg'.toLocaleLowerCase(), '-express-checkout-button')
          );
          var n = document.createElement('span');
          (n.className = ''.concat(
            'tingg'.toLocaleLowerCase(),
            '-express-checkout-button-text'
          )),
            (n.textContent = e.text ? e.text : 'Proceed to Payment');
          var o = document.createElement('img');
          if (
            ((o.src = r.POWERED_BY_IMAGE),
            (o.className = ''.concat(
              'tingg'.toLocaleLowerCase(),
              '-express-checkout-button-brand'
            )),
            (o.alt = 'Powered by '.concat(
              'tingg'.charAt(0).toUpperCase() +
                'tingg'.slice(1).toLocaleLowerCase()
            )),
            t.appendChild(n),
            t.appendChild(o),
            'modal' === e.checkoutType)
          ) {
            var c = document.createElement('iframe');
            (c.id = ''.concat(
              'tingg'.toLocaleLowerCase(),
              '-express-checkout-iframe'
            )),
              c.setAttribute('scroll', 'no'),
              c.setAttribute(
                'style',
                'position: fixed; top: 0; left: 0; display:none; height: 100%; width: 100%; background-color: rgba(0,0,0,0.5); z-index: 10;'
              ),
              document.body.appendChild(c),
              b(window, 'message', function(e) {
                e.origin === r.ORIGIN_URL &&
                  'closeModal' === e.data &&
                  (c.setAttribute('src', ''), (c.style.display = 'none'));
              });
          }
        },
        b = function(e, t, n) {
          e.addEventListener
            ? e.addEventListener(t, n, !1)
            : e.attachEvent && e.attachEvent('on'.concat(t), n);
        },
        v = function(e) {
          var t = [];
          Object.keys(e.merchantProperties).map(function(e) {
            t.push(e);
          });
          var n = '';
          if (
            (p.filter(function(e) {
              -1 === t.indexOf(e) && (n += ''.concat(e, ', '));
            }),
            n)
          )
            throw new Error(
              'Missing required param(s) '.concat(n.slice(0, -2))
            );
          y(e);
        },
        y = function(e) {
          switch (e.checkoutType) {
            case 'modal':
              g(e);
              break;
            default:
              E(e);
          }
        },
        g = function(e) {
          var t = document.querySelector('#tingg-express-checkout-iframe');
          (t.style.display = 'block'),
            (t.src = ''
              .concat(r.MODAL_CHECKOUT_URL, '?params=')
              .concat(e.merchantProperties.params, '&accessKey=')
              .concat(e.merchantProperties.accessKey, '&countryCode=')
              .concat(e.merchantProperties.countryCode));
        },
        E = function(e) {
          var t = document.createElement('form');
          t.setAttribute('method', 'GET'),
            t.setAttribute('action', r.EXPRESS_CHECKOUT_URL),
            t.setAttribute('target', '_parent'),
            Object.keys(e.merchantProperties).map(function(n) {
              var r = document.createElement('input');
              r.setAttribute('type', 'hidden'),
                r.setAttribute('name', n),
                r.setAttribute('value', e.merchantProperties[n]),
                t.appendChild(r);
            }),
            document.body.appendChild(t),
            t.submit();
        };
      t.default = {
        renderPayButton: function(e) {
          if (!e) throw new Error(a);
          if (!e.className) throw new Error(f);
          if (!e.checkoutType) throw new Error(s);
          if (!d(e.checkoutType))
            throw new Error(''.concat(e.checkoutType, ' ').concat(u));
          if (!h(e.className))
            throw new Error(''.concat(e.className, ' ').concat(i));
          m(e);
        },
        renderCheckout: function(e) {
          if (!e.merchantProperties) throw new Error(o);
          if (!e.checkoutType) throw new Error(c);
          if (!d(e.checkoutType))
            throw new Error(''.concat(e.checkoutType, ' ').concat(u));
          v(e);
        },
      };
    },
    function(e, t, n) {
      var r = n(3);
      'string' == typeof r && (r = [[e.i, r, '']]);
      var o = { hmr: !0, transform: void 0, insertInto: void 0 };
      n(5)(r, o);
      r.locals && (e.exports = r.locals);
    },
    function(e, t, n) {
      (e.exports = n(4)(!1)).push([
        e.i,
        '* {\n    box-sizing: border-box;\n}\n\n.tingg-express-checkout-button {\n    outline: none;\n    min-width: 132px;\n    border-color: transparent;\n    background-color: transparent;\n}\n\n.tingg-express-checkout-button-text {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    width: 100%;\n    height: 56px;\n    outline: none;\n    border-radius: 4px;\n    margin-bottom: 10px;\n    padding: 0.375rem 0.75rem;\n    text-transform: capitalize;\n    border: 1px solid rgba(59, 210, 61, 1);\n\n    background: rgba(59, 210, 61, 1);\n    color: #fff !important;\n\n    font-weight:600;\n    font-size: 16px;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    text-align: center;\n    white-space: nowrap;\n\n    background-position: center;\n    transition: background 0.8s;\n}\n\n.tingg-express-checkout-button-brand {\n    height: 36px;\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n}',
        '',
      ]);
    },
    function(e, t) {
      e.exports = function(e) {
        var t = [];
        return (
          (t.toString = function() {
            return this.map(function(t) {
              var n = (function(e, t) {
                var n = e[1] || '',
                  r = e[3];
                if (!r) return n;
                if (t && 'function' == typeof btoa) {
                  var o = (function(e) {
                      return (
                        '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(e)))) +
                        ' */'
                      );
                    })(r),
                    c = r.sources.map(function(e) {
                      return '/*# sourceURL=' + r.sourceRoot + e + ' */';
                    });
                  return [n]
                    .concat(c)
                    .concat([o])
                    .join('\n');
                }
                return [n].join('\n');
              })(t, e);
              return t[2] ? '@media ' + t[2] + '{' + n + '}' : n;
            }).join('');
          }),
          (t.i = function(e, n) {
            'string' == typeof e && (e = [[null, e, '']]);
            for (var r = {}, o = 0; o < this.length; o++) {
              var c = this[o][0];
              'number' == typeof c && (r[c] = !0);
            }
            for (o = 0; o < e.length; o++) {
              var i = e[o];
              ('number' == typeof i[0] && r[i[0]]) ||
                (n && !i[2]
                  ? (i[2] = n)
                  : n && (i[2] = '(' + i[2] + ') and (' + n + ')'),
                t.push(i));
            }
          }),
          t
        );
      };
    },
    function(e, t, n) {
      var r = {},
        o = (function(e) {
          var t;
          return function() {
            return void 0 === t && (t = e.apply(this, arguments)), t;
          };
        })(function() {
          return window && document && document.all && !window.atob;
        }),
        c = (function(e) {
          var t = {};
          return function(e, n) {
            if ('function' == typeof e) return e();
            if (void 0 === t[e]) {
              var r = function(e, t) {
                return t ? t.querySelector(e) : document.querySelector(e);
              }.call(this, e, n);
              if (
                window.HTMLIFrameElement &&
                r instanceof window.HTMLIFrameElement
              )
                try {
                  r = r.contentDocument.head;
                } catch (e) {
                  r = null;
                }
              t[e] = r;
            }
            return t[e];
          };
        })(),
        i = null,
        a = 0,
        s = [],
        u = n(6);
      function f(e, t) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n],
            c = r[o.id];
          if (c) {
            c.refs++;
            for (var i = 0; i < c.parts.length; i++) c.parts[i](o.parts[i]);
            for (; i < o.parts.length; i++) c.parts.push(b(o.parts[i], t));
          } else {
            var a = [];
            for (i = 0; i < o.parts.length; i++) a.push(b(o.parts[i], t));
            r[o.id] = { id: o.id, refs: 1, parts: a };
          }
        }
      }
      function l(e, t) {
        for (var n = [], r = {}, o = 0; o < e.length; o++) {
          var c = e[o],
            i = t.base ? c[0] + t.base : c[0],
            a = { css: c[1], media: c[2], sourceMap: c[3] };
          r[i] ? r[i].parts.push(a) : n.push((r[i] = { id: i, parts: [a] }));
        }
        return n;
      }
      function p(e, t) {
        var n = c(e.insertInto);
        if (!n)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
          );
        var r = s[s.length - 1];
        if ('top' === e.insertAt)
          r
            ? r.nextSibling
              ? n.insertBefore(t, r.nextSibling)
              : n.appendChild(t)
            : n.insertBefore(t, n.firstChild),
            s.push(t);
        else if ('bottom' === e.insertAt) n.appendChild(t);
        else {
          if ('object' != typeof e.insertAt || !e.insertAt.before)
            throw new Error(
              "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
            );
          var o = c(e.insertAt.before, n);
          n.insertBefore(t, o);
        }
      }
      function d(e) {
        if (null === e.parentNode) return !1;
        e.parentNode.removeChild(e);
        var t = s.indexOf(e);
        t >= 0 && s.splice(t, 1);
      }
      function h(e) {
        var t = document.createElement('style');
        if (
          (void 0 === e.attrs.type && (e.attrs.type = 'text/css'),
          void 0 === e.attrs.nonce)
        ) {
          var r = (function() {
            0;
            return n.nc;
          })();
          r && (e.attrs.nonce = r);
        }
        return m(t, e.attrs), p(e, t), t;
      }
      function m(e, t) {
        Object.keys(t).forEach(function(n) {
          e.setAttribute(n, t[n]);
        });
      }
      function b(e, t) {
        var n, r, o, c;
        if (t.transform && e.css) {
          if (
            !(c =
              'function' == typeof t.transform
                ? t.transform(e.css)
                : t.transform.default(e.css))
          )
            return function() {};
          e.css = c;
        }
        if (t.singleton) {
          var s = a++;
          (n = i || (i = h(t))),
            (r = y.bind(null, n, s, !1)),
            (o = y.bind(null, n, s, !0));
        } else
          e.sourceMap &&
          'function' == typeof URL &&
          'function' == typeof URL.createObjectURL &&
          'function' == typeof URL.revokeObjectURL &&
          'function' == typeof Blob &&
          'function' == typeof btoa
            ? ((n = (function(e) {
                var t = document.createElement('link');
                return (
                  void 0 === e.attrs.type && (e.attrs.type = 'text/css'),
                  (e.attrs.rel = 'stylesheet'),
                  m(t, e.attrs),
                  p(e, t),
                  t
                );
              })(t)),
              (r = function(e, t, n) {
                var r = n.css,
                  o = n.sourceMap,
                  c = void 0 === t.convertToAbsoluteUrls && o;
                (t.convertToAbsoluteUrls || c) && (r = u(r));
                o &&
                  (r +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(o)))) +
                    ' */');
                var i = new Blob([r], { type: 'text/css' }),
                  a = e.href;
                (e.href = URL.createObjectURL(i)), a && URL.revokeObjectURL(a);
              }.bind(null, n, t)),
              (o = function() {
                d(n), n.href && URL.revokeObjectURL(n.href);
              }))
            : ((n = h(t)),
              (r = function(e, t) {
                var n = t.css,
                  r = t.media;
                r && e.setAttribute('media', r);
                if (e.styleSheet) e.styleSheet.cssText = n;
                else {
                  for (; e.firstChild; ) e.removeChild(e.firstChild);
                  e.appendChild(document.createTextNode(n));
                }
              }.bind(null, n)),
              (o = function() {
                d(n);
              }));
        return (
          r(e),
          function(t) {
            if (t) {
              if (
                t.css === e.css &&
                t.media === e.media &&
                t.sourceMap === e.sourceMap
              )
                return;
              r((e = t));
            } else o();
          }
        );
      }
      e.exports = function(e, t) {
        if ('undefined' != typeof DEBUG && DEBUG && 'object' != typeof document)
          throw new Error(
            'The style-loader cannot be used in a non-browser environment'
          );
        ((t = t || {}).attrs = 'object' == typeof t.attrs ? t.attrs : {}),
          t.singleton || 'boolean' == typeof t.singleton || (t.singleton = o()),
          t.insertInto || (t.insertInto = 'head'),
          t.insertAt || (t.insertAt = 'bottom');
        var n = l(e, t);
        return (
          f(n, t),
          function(e) {
            for (var o = [], c = 0; c < n.length; c++) {
              var i = n[c];
              (a = r[i.id]).refs--, o.push(a);
            }
            e && f(l(e, t), t);
            for (c = 0; c < o.length; c++) {
              var a;
              if (0 === (a = o[c]).refs) {
                for (var s = 0; s < a.parts.length; s++) a.parts[s]();
                delete r[a.id];
              }
            }
          }
        );
      };
      var v = (function() {
        var e = [];
        return function(t, n) {
          return (e[t] = n), e.filter(Boolean).join('\n');
        };
      })();
      function y(e, t, n, r) {
        var o = n ? '' : r.css;
        if (e.styleSheet) e.styleSheet.cssText = v(t, o);
        else {
          var c = document.createTextNode(o),
            i = e.childNodes;
          i[t] && e.removeChild(i[t]),
            i.length ? e.insertBefore(c, i[t]) : e.appendChild(c);
        }
      }
    },
    function(e, t) {
      e.exports = function(e) {
        var t = 'undefined' != typeof window && window.location;
        if (!t) throw new Error('fixUrls requires window.location');
        if (!e || 'string' != typeof e) return e;
        var n = t.protocol + '//' + t.host,
          r = n + t.pathname.replace(/\/[^\/]*$/, '/');
        return e.replace(
          /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
          function(e, t) {
            var o,
              c = t
                .trim()
                .replace(/^"(.*)"$/, function(e, t) {
                  return t;
                })
                .replace(/^'(.*)'$/, function(e, t) {
                  return t;
                });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(c)
              ? e
              : ((o =
                  0 === c.indexOf('//')
                    ? c
                    : 0 === c.indexOf('/')
                    ? n + c
                    : r + c.replace(/^\.\//, '')),
                'url(' + JSON.stringify(o) + ')');
          }
        );
      };
    },
    function(e) {
      e.exports = {
        ORIGIN_URL: 'https://beep2.cellulant.com:9001',
        MODAL_CHECKOUT_URL:
          'https://beep2.cellulant.com:9001/checkout/v2/modal/',
        EXPRESS_CHECKOUT_URL:
          'https://beep2.cellulant.com:9001/checkout/v2/express/',
        POWERED_BY_IMAGE:
          'https://beep2.cellulant.com:9212/checkout/v2/web-assets/images/powered-by-tingg.svg',
      };
    },
    function(e) {
      e.exports = {
        ORIGIN_URL: 'https://beep2.cellulant.com:9212',
        MODAL_CHECKOUT_URL:
          'https://beep2.cellulant.com:9212/checkout/v2/modal/',
        EXPRESS_CHECKOUT_URL:
          'https://beep2.cellulant.com:9212/checkout/v2/express/',
        POWERED_BY_IMAGE:
          'https://beep2.cellulant.com:9212/checkout/v2/web-assets/images/powered-by-tingg.svg',
      };
    },
  ]).default;
});
