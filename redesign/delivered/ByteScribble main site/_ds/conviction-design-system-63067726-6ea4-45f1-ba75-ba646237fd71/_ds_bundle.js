/* @ds-bundle: {"format":3,"namespace":"ConvictionDesignSystem_630677","components":[{"name":"Button","sourcePath":"components/controls/Button.jsx"},{"name":"SearchInput","sourcePath":"components/controls/SearchInput.jsx"},{"name":"SegmentedControl","sourcePath":"components/controls/SegmentedControl.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"MetricCard","sourcePath":"components/data/MetricCard.jsx"},{"name":"Sparkline","sourcePath":"components/data/Sparkline.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"ConvictionScore","sourcePath":"components/signals/ConvictionScore.jsx"},{"name":"SentimentPill","sourcePath":"components/signals/SentimentPill.jsx"},{"name":"TierBadge","sourcePath":"components/signals/TierBadge.jsx"}],"sourceHashes":{"components/controls/Button.jsx":"7fb73714dc2e","components/controls/SearchInput.jsx":"7279edfe1467","components/controls/SegmentedControl.jsx":"4813ffd0df74","components/data/DataTable.jsx":"599319fe24ab","components/data/MetricCard.jsx":"ae1dc508e0f8","components/data/Sparkline.jsx":"01b09a2e6378","components/feedback/Callout.jsx":"2719d244ab21","components/signals/ConvictionScore.jsx":"ec422e788ab8","components/signals/SentimentPill.jsx":"906b4da5662a","components/signals/TierBadge.jsx":"04a8ae9f8259","ui_kits/terminal/AnalysisScreen.jsx":"fc9e6e87733e","ui_kits/terminal/DashboardScreen.jsx":"0f59225e7351","ui_kits/terminal/Icons.jsx":"04cf0c8129c4","ui_kits/terminal/ScreenerScreen.jsx":"26093bf2dc2c","ui_kits/terminal/Sidebar.jsx":"5862772d684f","ui_kits/terminal/Topbar.jsx":"e9698a560756","ui_kits/terminal/data.js":"ea8da6a17cd3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ConvictionDesignSystem_630677 = window.ConvictionDesignSystem_630677 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/controls/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Conviction primary action button. Variants map to the terminal's
 * accent-filled, outline and ghost styles; sizes match the dense UI.
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '7px 13px',
      fontSize: 13,
      radius: 'var(--radius-md)',
      gap: 7
    },
    md: {
      padding: '10px 16px',
      fontSize: 13.5,
      radius: 'var(--radius-lg)',
      gap: 8
    },
    lg: {
      padding: '12px 20px',
      fontSize: 14.5,
      radius: 'var(--radius-lg)',
      gap: 9
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      border: '1px solid var(--accent)'
    },
    secondary: {
      background: 'var(--surface-inset)',
      color: 'var(--text-body)',
      border: '1px solid var(--border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid transparent'
    },
    danger: {
      background: 'var(--neg)',
      color: '#fff',
      border: '1px solid var(--neg)'
    },
    positive: {
      background: 'var(--pos)',
      color: '#06210F',
      border: '1px solid var(--pos)'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: s.fontSize,
      lineHeight: 1,
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'filter var(--dur-base) var(--ease), background var(--dur-base) var(--ease)',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(1.12)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = 'none';
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.18em'
    }
  }, icon) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.18em'
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Button.jsx", error: String((e && e.message) || e) }); }

// components/controls/SearchInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Search / text input matching the terminal topbar field — inset
 * background, hairline border, optional leading icon, focus ring.
 */
function SearchInput({
  value,
  onChange = () => {},
  placeholder = 'Search…',
  icon = null,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 34 : 38;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 13,
      display: 'inline-flex',
      fontSize: 16,
      color: 'var(--text-faint)',
      pointerEvents: 'none'
    }
  }, icon) : null, /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      height: h,
      background: 'var(--surface-inset)',
      border: '1px solid ' + (focus ? 'var(--accent)' : 'var(--border)'),
      boxShadow: focus ? 'var(--ring)' : 'none',
      borderRadius: 'var(--radius-md)',
      padding: icon ? '0 14px 0 38px' : '0 14px',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease)'
    }
  }, rest)));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/controls/SegmentedControl.jsx
try { (() => {
/**
 * Segmented control — the inset pill row used for market toggles
 * (All / IN / US), period selectors (1D…ALL) and sub-tab switches.
 */
function SegmentedControl({
  options = [],
  value,
  onChange = () => {},
  size = 'md',
  style = {}
}) {
  const sizes = {
    sm: {
      padding: '5px 12px',
      fontSize: 12
    },
    md: {
      padding: '6px 13px',
      fontSize: 12.5
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 2,
      background: 'var(--surface-inset)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: 3,
      ...style
    }
  }, options.map(opt => {
    const o = typeof opt === 'string' ? {
      label: opt,
      value: opt
    } : opt;
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => onChange(o.value),
      style: {
        fontFamily: o.mono ? 'var(--font-mono)' : 'var(--font-sans)',
        fontSize: s.fontSize,
        fontWeight: 'var(--fw-semibold)',
        padding: s.padding,
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--panel-3)' : 'transparent',
        color: active ? 'var(--text-body)' : 'var(--text-muted)',
        transition: 'background var(--dur-base) var(--ease), color var(--dur-base) var(--ease)',
        whiteSpace: 'nowrap'
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
/**
 * Screener / holdings table. Columns describe alignment, an optional
 * mono numeric treatment, and a custom cell renderer. Rows are
 * hover-highlighted and clickable.
 */
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  rowKey = (r, i) => i,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-inset)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      fontSize: 10.5,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--text-faint)',
      fontWeight: 'var(--fw-semibold)',
      padding: '9px 14px',
      whiteSpace: 'nowrap'
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: rowKey(row, i),
    onClick: onRowClick ? () => onRowClick(row, i) : undefined,
    style: {
      borderTop: '1px solid var(--border)',
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'background var(--dur-base) var(--ease)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--surface-hover)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '12px 14px',
      fontSize: 13,
      fontFamily: c.mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontVariantNumeric: c.mono ? 'tabular-nums' : 'normal',
      color: c.muted ? 'var(--text-muted)' : 'var(--text-body)',
      whiteSpace: 'nowrap'
    }
  }, c.render ? c.render(row[c.key], row) : row[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricCard.jsx
try { (() => {
/**
 * Summary metric card — the dashboard's KPI tiles. Uppercase label,
 * big mono value, and a coloured sub-line with an optional ▲/▼ icon.
 */
function MetricCard({
  label,
  value,
  sub,
  subColor = 'var(--text-muted)',
  direction,
  style = {}
}) {
  const dirIcon = direction === 'up' ? '▲' : direction === 'down' ? '▼' : '';
  const dirColor = direction === 'up' ? 'var(--pos)' : direction === 'down' ? 'var(--neg)' : subColor;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: '17px 18px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 'var(--fw-semibold)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--num-lg)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '-0.02em',
      marginTop: 10,
      whiteSpace: 'nowrap'
    }
  }, value), sub != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      fontWeight: 'var(--fw-medium)',
      marginTop: 6,
      color: direction ? dirColor : subColor,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, dirIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11
    }
  }, dirIcon) : null, sub) : null);
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/data/Sparkline.jsx
try { (() => {
/**
 * Inline SVG sparkline — the tiny trend line in movers, growth metrics
 * and rows. Auto-colours by direction unless `color` is given.
 */
function Sparkline({
  data = [],
  color,
  width = 100,
  height = 26,
  strokeWidth = 1.6,
  fill = false,
  style = {}
}) {
  if (!data.length) return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    style: style
  });
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stroke = color || (data[data.length - 1] >= data[0] ? 'var(--pos)' : 'var(--neg)');
  const x = i => i / (data.length - 1) * width;
  const y = v => height - (v - min) / range * (height - 3) - 1.5;
  const pts = data.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');
  const areaId = 'spk' + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "none",
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    }
  }, fill ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: areaId,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: stroke,
    stopOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: stroke,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: `M0,${height} L${pts.split(' ').join(' L')} L${width},${height} Z`,
    fill: `url(#${areaId})`
  })) : null, /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeLinejoin: "round"
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
const KINDS = {
  success: {
    color: 'var(--pos)',
    bg: 'var(--pos-soft)',
    label: 'Success'
  },
  info: {
    color: 'var(--accent)',
    bg: 'var(--accent-soft)',
    label: 'Info'
  },
  caution: {
    color: 'var(--warn)',
    bg: 'var(--warn-soft)',
    label: 'Caution'
  },
  danger: {
    color: 'var(--neg)',
    bg: 'var(--neg-soft)',
    label: 'Alert'
  }
};

/**
 * Inline callout / alert strip — left accent rule, tinted ground,
 * bold lead-in. Used for refresh confirmations, RSI warnings, etc.
 */
function Callout({
  kind = 'info',
  title,
  children,
  icon = null,
  style = {}
}) {
  const k = KINDS[kind] || KINDS.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 11,
      alignItems: 'flex-start',
      background: k.bg,
      borderLeft: '3px solid ' + k.color,
      borderRadius: 'var(--radius-md)',
      padding: '13px 16px',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: k.color,
      fontSize: 16,
      display: 'inline-flex',
      marginTop: 1
    }
  }, icon) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 'var(--lh-normal)'
    }
  }, title ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      color: k.color
    }
  }, title, " ") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/signals/ConvictionScore.jsx
try { (() => {
/**
 * Conviction score readout — the big 0–100 number with its tier chip
 * and optional review delta. `layout="stat"` for the boxed header
 * version; `layout="big"` for the standalone sub-score display.
 */
function ConvictionScore({
  score = 0,
  tier,
  delta,
  label = 'Conviction',
  outOf = 100,
  layout = 'stat',
  style = {}
}) {
  const tierColors = {
    A: ['var(--tier-a)', 'var(--tier-a-soft)'],
    B: ['var(--tier-b)', 'var(--tier-b-soft)'],
    C: ['var(--tier-c)', 'var(--tier-c-soft)'],
    Ignore: ['var(--tier-x)', 'var(--tier-x-soft)']
  };
  const [tc, tbg] = tierColors[tier] || tierColors.A;
  const deltaNum = typeof delta === 'number' ? delta : null;
  const deltaColor = deltaNum >= 0 ? 'var(--pos)' : 'var(--neg)';
  const deltaStr = deltaNum != null ? (deltaNum >= 0 ? '▲ +' : '▼ ') + Math.abs(deltaNum) : null;
  if (layout === 'big') {
    return /*#__PURE__*/React.createElement("div", {
      style: style
    }, /*#__PURE__*/React.createElement("div", {
      className: "cv-label"
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 6,
        margin: '8px 0 0'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--num-xl)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-body)'
      }
    }, score), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)',
        fontSize: 15
      }
    }, "/", outOf)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      background: 'var(--surface-inset)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: '7px 13px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: 'var(--text-faint)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--num-lg)',
      fontWeight: 'var(--fw-bold)',
      lineHeight: 1
    }
  }, score)), tier ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 13,
      padding: '3px 9px',
      borderRadius: 'var(--radius-sm)',
      background: tbg,
      color: tc
    }
  }, tier) : null, deltaStr != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 'var(--fw-semibold)',
      color: deltaColor
    }
  }, deltaStr) : null);
}
Object.assign(__ds_scope, { ConvictionScore });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signals/ConvictionScore.jsx", error: String((e && e.message) || e) }); }

// components/signals/SentimentPill.jsx
try { (() => {
const SENT = {
  Bullish: {
    color: 'var(--pos)',
    bg: 'var(--pos-soft)'
  },
  Neutral: {
    color: 'var(--neu)',
    bg: 'var(--neu-soft)'
  },
  Bearish: {
    color: 'var(--neg)',
    bg: 'var(--neg-soft)'
  }
};

/**
 * Sentiment pill — rounded chip summarising news/analyst tone.
 * Set `dot` for the legend-style dot + label variant.
 */
function SentimentPill({
  sentiment = 'Neutral',
  dot = false,
  style = {}
}) {
  const s = SENT[sentiment] || SENT.Neutral;
  if (dot) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        fontSize: 13,
        color: 'var(--text-body)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: s.color
      }
    }), sentiment);
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: 11.5,
      fontWeight: 'var(--fw-semibold)',
      padding: '3px 11px',
      borderRadius: 'var(--radius-pill)',
      background: s.bg,
      color: s.color,
      ...style
    }
  }, sentiment);
}
Object.assign(__ds_scope, { SentimentPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signals/SentimentPill.jsx", error: String((e && e.message) || e) }); }

// components/signals/TierBadge.jsx
try { (() => {
const TIERS = {
  A: {
    color: 'var(--tier-a)',
    bg: 'var(--tier-a-soft)'
  },
  B: {
    color: 'var(--tier-b)',
    bg: 'var(--tier-b-soft)'
  },
  C: {
    color: 'var(--tier-c)',
    bg: 'var(--tier-c-soft)'
  },
  Ignore: {
    color: 'var(--tier-x)',
    bg: 'var(--tier-x-soft)'
  }
};

/**
 * Conviction tier chip — the A/B/C/Ignore grade applied to every
 * covered stock. Monospace, square-ish, tinted by tier.
 */
function TierBadge({
  tier = 'A',
  size = 'md',
  style = {}
}) {
  const t = TIERS[tier] || TIERS.A;
  const sizes = {
    sm: {
      fontSize: 11,
      padding: '2px 7px'
    },
    md: {
      fontSize: 12,
      padding: '3px 9px'
    },
    lg: {
      fontSize: 13,
      padding: '4px 10px'
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--fw-bold)',
      fontSize: s.fontSize,
      padding: s.padding,
      borderRadius: 'var(--radius-xs)',
      background: t.bg,
      color: t.color,
      letterSpacing: '0.01em',
      ...style
    }
  }, tier);
}
Object.assign(__ds_scope, { TierBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signals/TierBadge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/AnalysisScreen.jsx
try { (() => {
/* Conviction stock analysis — Technical / Fundamental / Combined / AI tabs. window.AnalysisScreen */
(function () {
  const DS = window.ConvictionDesignSystem_630677;
  const {
    SegmentedControl,
    ConvictionScore,
    TierBadge,
    SentimentPill,
    Callout,
    Sparkline
  } = DS;
  const R = React.createElement;
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
    return h;
  }
  const ema = (a, p) => {
    const k = 2 / (p + 1);
    let e = a[0];
    return a.map(x => e = x * k + e * (1 - k));
  };
  function Candle({
    sym
  }) {
    const CV = window.CV;
    const s = CV.map[sym];
    const c = CV.series(sym, 64);
    const rnd = rng(hash(sym) || 7);
    const cs = c.map((cl, i) => {
      const o = i ? c[i - 1] : cl * (1 - 0.004);
      const h = Math.max(o, cl) * (1 + rnd() * 0.013);
      const l = Math.min(o, cl) * (1 - rnd() * 0.013);
      return {
        o,
        h,
        l,
        c: cl,
        v: 0.45 + rnd()
      };
    });
    const e20 = ema(c, 20),
      e50 = ema(c, 50),
      e200 = ema(c, 200);
    const W = 760,
      H = 300,
      top = 10,
      ph = 200,
      vtop = 246,
      vh = 54;
    const hi = Math.max(...cs.map(d => d.h)),
      lo = Math.min(...cs.map(d => d.l));
    const cw = (W - 12) / cs.length,
      X = i => 6 + i * cw + cw / 2,
      Y = v => top + (hi - v) / (hi - lo) * ph;
    const vmax = Math.max(...cs.map(d => d.v)),
      VY = v => vtop + vh - v / vmax * vh;
    const els = [];
    [0.25, 0.5, 0.75].forEach((g, i) => els.push(R('line', {
      key: 'g' + i,
      x1: 0,
      x2: W,
      y1: top + ph * g,
      y2: top + ph * g,
      stroke: '#161D2A',
      strokeWidth: 1
    })));
    cs.forEach((d, i) => {
      const up = d.c >= d.o,
        col = up ? '#10B981' : '#EF4444',
        x = X(i),
        bw = Math.max(1.4, cw * 0.62);
      els.push(R('line', {
        key: 'w' + i,
        x1: x,
        x2: x,
        y1: Y(d.h),
        y2: Y(d.l),
        stroke: col,
        strokeWidth: 1
      }));
      const yo = Y(d.o),
        yc = Y(d.c);
      els.push(R('rect', {
        key: 'b' + i,
        x: x - bw / 2,
        y: Math.min(yo, yc),
        width: bw,
        height: Math.max(1, Math.abs(yc - yo)),
        fill: col
      }));
      els.push(R('rect', {
        key: 'v' + i,
        x: x - bw / 2,
        y: VY(d.v),
        width: bw,
        height: vtop + vh - VY(d.v),
        fill: col,
        opacity: .32
      }));
    });
    const line = (arr, col) => R('polyline', {
      key: col,
      points: arr.map((v, i) => `${X(i)},${Y(v)}`).join(' '),
      fill: 'none',
      stroke: col,
      strokeWidth: 1.5,
      opacity: .9
    });
    els.push(line(e20, '#60A5FA'));
    els.push(line(e50, '#A78BFA'));
    els.push(line(e200, '#F59E0B'));
    return R('svg', {
      width: '100%',
      viewBox: `0 0 ${W} ${H}`,
      style: {
        display: 'block'
      }
    }, els);
  }
  function Card({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--panel)',
        border: '1px solid var(--line)',
        borderRadius: 13,
        padding: '16px 18px',
        ...style
      }
    }, children);
  }
  const SubScore = ({
    label,
    score,
    read
  }) => /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(ConvictionScore, {
    score: score,
    layout: "big",
    label: label
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      lineHeight: 1.55,
      marginTop: 12
    }
  }, read));
  function AnalysisScreen({
    sym,
    tab,
    onTab,
    stars,
    onStar
  }) {
    const CV = window.CV;
    const s = CV.map[sym];
    const c = CV.series(sym, 64);
    const last = c.length - 1;
    const e200 = ema(c, 200);
    const above200 = s.price > e200[last];
    const rsiNow = 40 + (s.tech - 50) * 0.6;
    const r3 = (s.price / c[Math.max(0, last - 42)] - 1) * 100;
    const tabs = [{
      label: 'Technical',
      value: 'technical'
    }, {
      label: 'Fundamental',
      value: 'fundamental'
    }, {
      label: 'Combined',
      value: 'combined'
    }, {
      label: 'AI Insights',
      value: 'ai'
    }];

    // fundamentals (illustrative)
    const fh = hash(sym);
    const roe = 14 + fh % 22,
      de = fh % 14 / 10,
      pe = 18 + fh % 30,
      opm = 14 + fh % 24;
    const structure = [{
      l: 'Trend vs 200-DMA',
      v: above200 ? 'Above 200-DMA' : 'Below 200-DMA',
      c: above200 ? 'var(--pos)' : 'var(--neg)'
    }, {
      l: 'EMA stack',
      v: s.tech >= 75 ? 'Bullish · 20 ▸ 50 ▸ 200' : 'Mixed · transitioning',
      c: s.tech >= 75 ? 'var(--pos)' : 'var(--warn)'
    }, {
      l: 'RSI (14)',
      v: rsiNow.toFixed(0) + (rsiNow > 70 ? ' · Overbought' : rsiNow < 30 ? ' · Oversold' : ' · Neutral'),
      c: rsiNow > 70 || rsiNow < 30 ? 'var(--warn)' : 'var(--pos)'
    }, {
      l: 'MACD',
      v: s.tech >= 70 ? 'Bullish cross' : 'Bearish cross',
      c: s.tech >= 70 ? 'var(--pos)' : 'var(--neg)'
    }, {
      l: 'Returns 3M',
      v: CV.sign(r3) + '%',
      c: r3 >= 0 ? 'var(--pos)' : 'var(--neg)'
    }, {
      l: 'Rel. strength',
      v: CV.sign((s.tech - 72) / 2.1) + '%',
      c: s.tech >= 72 ? 'var(--pos)' : 'var(--neg)'
    }];
    const snap = [{
      l: 'ROE',
      v: roe + '%',
      dot: roe >= 18 ? 'var(--pos)' : 'var(--warn)'
    }, {
      l: 'D/E',
      v: de.toFixed(2),
      dot: de <= 0.5 ? 'var(--pos)' : de <= 1 ? 'var(--warn)' : 'var(--neg)'
    }, {
      l: 'P/E',
      v: pe.toFixed(1) + '×',
      dot: pe <= 25 ? 'var(--pos)' : pe <= 45 ? 'var(--warn)' : 'var(--neg)'
    }, {
      l: 'Op. margin',
      v: opm + '%',
      dot: opm >= 20 ? 'var(--pos)' : 'var(--warn)'
    }];
    const fpos = ['ROE ' + roe + '% — strong return on equity', 'Operating margin ' + opm + '% — healthy economics', above200 ? 'Above 200-DMA, EMA stack aligned up' : 'Improving relative strength'];
    const fneg = [{
      t: 'P/E ' + pe.toFixed(0) + ' — limited margin of safety',
      hard: false
    }, {
      t: de > 1 ? 'D/E ' + de.toFixed(2) + ' — elevated leverage' : 'Performance crowded into a few quarters',
      hard: de > 1
    }];
    const base = Math.round(0.5 * s.fund + 0.5 * s.tech);
    const sentScore = {
      Bullish: 78,
      Neutral: 55,
      Bearish: 34
    }[s.sentiment];
    const bars = [{
      l: 'Fundamental',
      v: s.fund,
      c: '#3B82F6'
    }, {
      l: 'Technical',
      v: s.tech,
      c: '#10B981'
    }, {
      l: 'Sentiment',
      v: sentScore,
      c: '#A78BFA'
    }, {
      l: 'Sector',
      v: 60 + hash(s.sector) % 26,
      c: '#F59E0B'
    }];
    const ai = {
      bull: ['Conviction ' + s.score + '/100 (Tier ' + s.tier + ') — fundamental ' + s.fund + ' + technical ' + s.tech + ' both above average.', ...fpos.slice(0, 2)],
      bear: [...fneg.map(f => (f.hard ? '🛑 ' : '⚠ ') + f.t), 'Valuation: ' + pe.toFixed(0) + '× P/E — sensitive to any growth slip.'],
      stance: (s.score >= 82 ? 'High-conviction long candidate' : s.score >= 72 ? 'Constructive — accumulate on dips' : 'Watchlist — needs a catalyst') + '. Size per risk rules.'
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        borderBottom: '1px solid var(--line)',
        background: 'var(--panel)',
        padding: '18px 30px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        maxWidth: 1280
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onStar(sym),
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: 'var(--panel-2)',
        border: '1px solid var(--line)',
        color: stars[sym] ? 'var(--warn)' : '#475061',
        fontSize: 19,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, stars[sym] ? window.Icon.starF : window.Icon.starO), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '-.01em'
      }
    }, s.symbol), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--muted)'
      }
    }, s.name, " \xB7 ", s.exch)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 8,
        marginLeft: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 20,
        fontWeight: 600
      }
    }, CV.price(s)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        fontWeight: 600,
        color: s.day >= 0 ? 'var(--pos)' : 'var(--neg)'
      }
    }, CV.sign(s.day), "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(SentimentPill, {
      sentiment: s.sentiment
    }), /*#__PURE__*/React.createElement(ConvictionScore, {
      score: s.score,
      tier: s.tier
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        paddingBottom: 14
      }
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      value: tab,
      onChange: onTab,
      options: tabs
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '24px 30px 60px',
        maxWidth: 1280
      }
    }, tab === 'technical' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, "Price action"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 11,
        fontFamily: 'var(--font-mono)',
        fontSize: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#60A5FA'
      }
    }, "\u2014 EMA20"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#A78BFA'
      }
    }, "\u2014 EMA50"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#F59E0B'
      }
    }, "\u2014 EMA200"))), /*#__PURE__*/React.createElement(Candle, {
      sym: sym
    })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 12
      }
    }, "Structure readout"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px 22px'
      }
    }, structure.map(r => /*#__PURE__*/React.createElement("div", {
      key: r.l,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '7px 0',
        borderBottom: '1px solid var(--line)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: r.c,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'var(--muted)',
        flex: 1
      }
    }, r.l), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: 'var(--font-mono)'
      }
    }, r.v)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(SubScore, {
      label: "Technical sub-score",
      score: s.tech,
      read: `${s.symbol} is trading ${above200 ? 'above' : 'below'} its 200-DMA. RSI ${rsiNow.toFixed(0)} — ${s.tech >= 80 ? 'momentum leader' : s.tech >= 70 ? 'healthy uptrend' : 'range-bound'}.`
    }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Callout, {
      kind: rsiNow > 70 ? 'caution' : 'info',
      title: rsiNow > 70 ? 'Caution.' : 'Info.',
      style: {
        margin: -16,
        borderRadius: 13
      }
    }, rsiNow > 70 ? 'RSI above 70 — momentum may be overextended.' : 'Indicators within normal range.')))) : null, tab === 'fundamental' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 16,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '18px 20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 14
      }
    }, "Snapshot"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14
      }
    }, snap.map(m => /*#__PURE__*/React.createElement("div", {
      key: m.l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: m.dot
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: 'var(--muted)'
      }
    }, m.l)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 19,
        fontWeight: 600,
        marginTop: 5
      }
    }, m.v)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
        marginTop: 18,
        borderTop: '1px solid var(--line)',
        paddingTop: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--muted)'
      }
    }, "Revenue growth"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--pos)'
      }
    }, "+", 12 + fh % 20, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(Sparkline, {
      data: [3, 4, 5, 6.5, 8],
      color: "var(--series-1)",
      fill: true
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--muted)'
      }
    }, "EPS growth"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--pos)'
      }
    }, "+", 10 + fh % 24, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(Sparkline, {
      data: [2, 3, 4.5, 6, 9],
      color: "var(--series-2)",
      fill: true
    }))))), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '18px 20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 10
      }
    }, "Company research"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--muted)',
        lineHeight: 1.6
      }
    }, s.name, " operates in ", s.sector, " with a ", s.fund >= 80 ? 'high-quality, durable' : 'developing', " franchise. Moat and capital allocation underpin the ", s.fund >= 80 ? 'premium' : 'evolving', " quality score."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(SubScore, {
      label: "Fundamental sub-score",
      score: s.fund,
      read: `Quality scores ${s.fund}/100. ${roe >= 18 ? 'High returns on equity' : 'Moderate returns'} against a ${pe <= 25 ? 'reasonable' : 'demanding'} ${pe.toFixed(0)}× multiple.`
    }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--pos)',
        fontSize: 15,
        display: 'inline-flex'
      }
    }, window.Icon.check), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 13.5
      }
    }, "Positive flags")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 9
      }
    }, fpos.map((f, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 9,
        fontSize: 12.5,
        lineHeight: 1.4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--pos)'
      }
    }, "\u2713"), /*#__PURE__*/React.createElement("span", null, f))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--neg)',
        fontSize: 14
      }
    }, "\uD83D\uDEA9"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 13.5
      }
    }, "Negative flags")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 9
      }
    }, fneg.map((f, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 9,
        fontSize: 12.5,
        lineHeight: 1.4,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: f.hard ? 'var(--neg)' : 'var(--warn)'
      }
    }, f.hard ? '■' : '▲'), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, f.t), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9.5,
        fontWeight: 700,
        color: f.hard ? 'var(--neg)' : 'var(--warn)',
        border: '1px solid ' + (f.hard ? 'var(--neg)' : 'var(--warn)'),
        borderRadius: 5,
        padding: '1px 5px',
        textTransform: 'uppercase'
      }
    }, f.hard ? 'Hard' : 'Soft'))))))) : null, tab === 'combined' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '22px 24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 15
      }
    }, "Conviction breakdown"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--muted)',
        marginTop: 3
      }
    }, "50% Fundamental \xB7 50% Technical \u2014 sentiment & sector as \xB1 overlays")), /*#__PURE__*/React.createElement(ConvictionScore, {
      score: s.score,
      tier: s.tier
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 3,
        height: 54,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '50%',
        background: 'rgba(59,130,246,.12)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: s.fund + '%',
        maxWidth: '100%',
        background: 'rgba(59,130,246,.32)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: '#60A5FA',
        fontWeight: 600
      }
    }, "FUNDAMENTAL \xB7 50%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 18,
        fontWeight: 700
      }
    }, s.fund, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--faint)'
      }
    }, "/100")))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '50%',
        background: 'rgba(16,185,129,.12)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: s.tech + '%',
        maxWidth: '100%',
        background: 'rgba(16,185,129,.30)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: '#10B981',
        fontWeight: 600
      }
    }, "TECHNICAL \xB7 50%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 18,
        fontWeight: 700
      }
    }, s.tech, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--faint)'
      }
    }, "/100"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14,
        borderTop: '1px solid var(--line)',
        paddingTop: 16
      }
    }, bars.map(b => /*#__PURE__*/React.createElement("div", {
      key: b.l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 11.5,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--muted)'
      }
    }, b.l), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600
      }
    }, b.v)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: 'var(--panel-2)',
        borderRadius: 4,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        width: b.v + '%',
        background: b.c,
        borderRadius: 4
      }
    }))))))) : null, tab === 'ai' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--panel)',
        border: '1px solid rgba(16,185,129,.28)',
        borderRadius: 13,
        padding: '20px 22px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--pos)',
        fontSize: 16,
        display: 'inline-flex'
      }
    }, window.Icon.up), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: 'var(--pos)'
      }
    }, "Why pick this")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 11
      }
    }, ai.bull.map((b, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10,
        fontSize: 13,
        lineHeight: 1.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--pos)',
        marginTop: 1
      }
    }, "\u2713"), /*#__PURE__*/React.createElement("span", null, b))))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--panel)',
        border: '1px solid rgba(239,68,68,.28)',
        borderRadius: 13,
        padding: '20px 22px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--neg)',
        fontSize: 16,
        display: 'inline-flex'
      }
    }, window.Icon.down), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: 'var(--neg)'
      }
    }, "Why NOT pick this")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 11
      }
    }, ai.bear.map((b, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10,
        fontSize: 13,
        lineHeight: 1.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        marginTop: 1
      }
    }, "\xB7"), /*#__PURE__*/React.createElement("span", null, b)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'linear-gradient(180deg,rgba(59,130,246,.08),transparent)',
        border: '1px solid var(--line-2)',
        borderRadius: 13,
        padding: '20px 22px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#60A5FA',
        fontSize: 16,
        display: 'inline-flex'
      }
    }, window.Icon.ai), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14
      }
    }, "Stance")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: 'var(--ink)',
        lineHeight: 1.6
      }
    }, ai.stance))) : null));
  }
  window.AnalysisScreen = AnalysisScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/AnalysisScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/DashboardScreen.jsx
try { (() => {
/* Conviction dashboard — portfolio summary, charts, holdings, movers. window.DashboardScreen */
(function () {
  const DS = window.ConvictionDesignSystem_630677;
  const {
    MetricCard,
    DataTable,
    Sparkline,
    TierBadge
  } = DS;
  const R = React.createElement;
  function EquityCurve() {
    const w = 560,
      h = 150,
      n = 90;
    let v = [100];
    let a = 99;
    const rnd = () => {
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    for (let i = 1; i < n; i++) v.push(v[i - 1] * (1 + (rnd() - 0.45) * 0.014));
    const mn = Math.min(...v),
      mx = Math.max(...v),
      rg = mx - mn || 1;
    const X = i => i / (n - 1) * w,
      Y = val => h - 8 - (val - mn) / rg * (h - 22);
    const line = v.map((val, i) => `${X(i).toFixed(1)},${Y(val).toFixed(1)}`).join(' ');
    const area = `M0,${h} L` + line + ` L${w},${h} Z`;
    return R('svg', {
      width: '100%',
      height: h,
      viewBox: `0 0 ${w} ${h}`,
      preserveAspectRatio: 'none'
    }, [R('defs', {
      key: 'd'
    }, R('linearGradient', {
      id: 'eq',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1
    }, [R('stop', {
      offset: '0%',
      stopColor: '#10B981',
      stopOpacity: .28,
      key: 1
    }), R('stop', {
      offset: '100%',
      stopColor: '#10B981',
      stopOpacity: 0,
      key: 2
    })])), R('path', {
      d: area,
      fill: 'url(#eq)',
      key: 'a'
    }), R('polyline', {
      points: line,
      fill: 'none',
      stroke: '#10B981',
      strokeWidth: 2,
      key: 'l'
    })]);
  }
  function Donut({
    segs
  }) {
    const r = 52,
      cx = 64,
      cy = 64,
      C = 2 * Math.PI * r;
    let off = 0;
    const total = segs.reduce((a, b) => a + b.value, 0);
    const circles = segs.map((s, i) => {
      const len = s.value / total * C;
      const el = R('circle', {
        key: i,
        cx,
        cy,
        r,
        fill: 'none',
        stroke: s.color,
        strokeWidth: 16,
        strokeDasharray: `${len} ${C - len}`,
        strokeDashoffset: -off,
        transform: `rotate(-90 ${cx} ${cy})`
      });
      off += len;
      return el;
    });
    return R('svg', {
      width: 128,
      height: 128,
      viewBox: '0 0 128 128'
    }, [...circles, R('text', {
      key: 't',
      x: cx,
      y: cy - 2,
      textAnchor: 'middle',
      fill: '#E7EAF0',
      fontSize: 18,
      fontWeight: 700,
      fontFamily: 'JetBrains Mono'
    }, segs.length), R('text', {
      key: 's',
      x: cx,
      y: cy + 14,
      textAnchor: 'middle',
      fill: '#8B94A4',
      fontSize: 9,
      fontFamily: 'Inter'
    }, 'sectors')]);
  }
  function Card({
    title,
    meta,
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--panel)',
        border: '1px solid var(--line)',
        borderRadius: 13,
        padding: '18px 20px',
        ...style
      }
    }, title ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, title), meta ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--faint)'
      }
    }, meta) : null) : null, children);
  }
  function DashboardScreen({
    onOpen
  }) {
    const CV = window.CV;
    const held = CV.stocks.filter(s => s.qty > 0);
    const fx = s => s.market === 'US' ? CV.FX : 1;
    let invested = 0,
      current = 0,
      today = 0;
    held.forEach(s => {
      invested += s.avg * s.qty * fx(s);
      current += s.price * s.qty * fx(s);
      today += s.price * s.qty * fx(s) * (s.day / 100);
    });
    const pnl = current - invested,
      pnlPct = pnl / invested * 100,
      todayPct = today / (current - today) * 100;
    const palette = ['#3B82F6', '#10B981', '#F59E0B', '#A78BFA', '#EF4444', '#22D3EE'];
    const secMap = {};
    held.forEach(s => {
      secMap[s.sector] = (secMap[s.sector] || 0) + s.price * s.qty * fx(s);
    });
    const secArr = Object.entries(secMap).sort((a, b) => b[1] - a[1]);
    const secTot = secArr.reduce((a, b) => a + b[1], 0);
    const segs = secArr.map(([k, v], i) => ({
      label: k,
      value: v,
      color: palette[i % palette.length]
    }));
    const sorted = [...CV.stocks].sort((a, b) => b.day - a.day);
    const movers = [...sorted.slice(0, 3), ...sorted.slice(-3)];
    const feed = [{
      symbol: 'HDFCBANK',
      text: 'upgraded B→A — EPS beat +6%, reclaimed 200-DMA',
      time: '09:42 IST',
      color: 'var(--pos)'
    }, {
      symbol: 'NVDA',
      text: 'RSI 72 — momentum strong but overbought; trim alert',
      time: '19:05 IST',
      color: 'var(--warn)'
    }, {
      symbol: 'TATAMOTORS',
      text: 'broke above ₹980 resistance on 1.8× volume',
      time: '11:20 IST',
      color: 'var(--accent)'
    }, {
      symbol: 'TCS',
      text: 'downgraded to Neutral — guidance cut, soft Q1',
      time: '08:30 IST',
      color: 'var(--neg)'
    }];
    const holdingRows = held.map(s => {
      const val = s.price * s.qty,
        pl = (s.price - s.avg) * s.qty,
        plp = (s.price / s.avg - 1) * 100;
      return {
        s,
        symbol: s.symbol,
        name: s.name,
        qty: s.qty,
        avg: CV.priceAt(s, s.avg),
        ltp: CV.price(s),
        value: CV.money(s, val),
        pnl: (pl >= 0 ? '+' : '') + CV.money(s, Math.abs(pl)),
        pnlPct: CV.sign(plp) + '%',
        pl,
        sector: s.sector,
        tier: s.tier
      };
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '26px 30px 60px',
        maxWidth: 1280
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '-.02em'
      }
    }, "Portfolio"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--muted)',
        fontSize: 13,
        marginTop: 3
      }
    }, "Consolidated view \xB7 \u20B9 base currency \xB7 US holdings converted at \u20B983.3/$")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(MetricCard, {
      label: "Invested",
      value: CV.cr(invested),
      sub: held.length + ' holdings · 2 markets'
    }), /*#__PURE__*/React.createElement(MetricCard, {
      label: "Current value",
      value: CV.cr(current),
      sub: "Mark-to-market"
    }), /*#__PURE__*/React.createElement(MetricCard, {
      label: "Unrealized P&L",
      value: CV.cr(pnl),
      sub: CV.sign(pnlPct) + '%',
      direction: pnl >= 0 ? 'up' : 'down'
    }), /*#__PURE__*/React.createElement(MetricCard, {
      label: "Today's P&L",
      value: (today >= 0 ? '+' : '−') + CV.cr(Math.abs(today)).replace('₹', '₹'),
      sub: CV.sign(todayPct) + '%',
      direction: today >= 0 ? 'up' : 'down'
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: 14,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Equity curve",
      meta: "90D \xB7 indexed"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(EquityCurve, null))), /*#__PURE__*/React.createElement(Card, {
      title: "Allocation by sector"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Donut, {
      segs: segs
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 7
      }
    }, segs.map(d => /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 3,
        background: d.color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        color: 'var(--muted)'
      }
    }, d.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 500
      }
    }, (d.value / secTot * 100).toFixed(0), "%"))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(DataTable, {
      onRowClick: r => onOpen(r.symbol),
      rowKey: r => r.symbol,
      columns: [{
        key: 'symbol',
        header: 'Symbol',
        render: (v, r) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontWeight: 600,
            fontFamily: 'var(--font-mono)'
          }
        }, v), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11.5,
            color: 'var(--muted)'
          }
        }, r.name))
      }, {
        key: 'qty',
        header: 'Qty',
        align: 'right',
        mono: true
      }, {
        key: 'avg',
        header: 'Avg cost',
        align: 'right',
        mono: true,
        muted: true
      }, {
        key: 'ltp',
        header: 'LTP',
        align: 'right',
        mono: true
      }, {
        key: 'value',
        header: 'Value',
        align: 'right',
        mono: true
      }, {
        key: 'pnl',
        header: 'P&L',
        align: 'right',
        mono: true,
        render: (v, r) => /*#__PURE__*/React.createElement("div", {
          style: {
            color: r.pl >= 0 ? 'var(--pos)' : 'var(--neg)'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontWeight: 600
          }
        }, v), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11
          }
        }, r.pnlPct))
      }, {
        key: 'sector',
        header: 'Sector',
        muted: true
      }, {
        key: 'tier',
        header: 'Tier',
        align: 'center',
        render: v => /*#__PURE__*/React.createElement(TierBadge, {
          tier: v
        })
      }],
      rows: holdingRows
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Top movers"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 11
      }
    }, movers.map(s => /*#__PURE__*/React.createElement("div", {
      key: s.symbol,
      onClick: () => onOpen(s.symbol),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        padding: 4,
        borderRadius: 7
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-hover)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 58
      }
    }, /*#__PURE__*/React.createElement(Sparkline, {
      data: CV.series(s.symbol).slice(-24),
      color: s.day >= 0 ? 'var(--pos)' : 'var(--neg)',
      width: 58
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        fontSize: 13
      }
    }, s.symbol), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: 'var(--faint)'
      }
    }, s.exch)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13
      }
    }, CV.price(s)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        fontWeight: 600,
        width: 64,
        textAlign: 'right',
        color: s.day >= 0 ? 'var(--pos)' : 'var(--neg)'
      }
    }, CV.sign(s.day), "%"))))), /*#__PURE__*/React.createElement(Card, {
      title: "What changed today"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 13
      }
    }, feed.map((f, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => onOpen(f.symbol),
      style: {
        display: 'flex',
        gap: 11,
        cursor: 'pointer',
        padding: 4,
        borderRadius: 7
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-hover)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: f.color,
        marginTop: 5,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        lineHeight: 1.45
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontFamily: 'var(--font-mono)'
      }
    }, f.symbol), " ", f.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--faint)',
        marginTop: 2,
        fontFamily: 'var(--font-mono)'
      }
    }, f.time))))))));
  }
  window.DashboardScreen = DashboardScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/Icons.jsx
try { (() => {
/* Conviction icon set — Lucide-style 1.9px stroke line icons.
   Exposes window.Icon: a map of name -> React element factory.
   The terminal uses inline stroked SVGs throughout (no icon font). */
(function () {
  const R = React.createElement;
  const svg = (children, opts) => R('svg', Object.assign({
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, opts || {}), children);
  const p = (d, k) => R('path', {
    d,
    key: k || d.slice(0, 6)
  });
  const defs = {
    dashboard: () => svg([p('M3 3h7v8H3z'), p('M14 3h7v5h-7z'), p('M14 12h7v9h-7z'), p('M3 15h7v6H3z')]),
    stocks: () => svg([p('M4 7h16'), p('M4 12h16'), p('M4 17h10')]),
    technical: () => svg([p('M3 13l4 0 3 6 4-14 3 8 4 0')]),
    fundamental: () => svg([p('M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'), p('M14 3v6h6'), p('M9 14h6'), p('M9 17h4')]),
    combined: () => svg([p('M12 3 3 8l9 5 9-5z'), p('M3 13l9 5 9-5'), p('M3 18l9 5 9-5')]),
    ai: () => svg([p('M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4z'), p('M19 14l.7 2L22 17l-2.3.8L19 20l-.7-2.2L16 17l2.3-1z')]),
    picks: () => svg([p('M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z')]),
    starF: () => svg([p('M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z')], {
      fill: 'currentColor',
      stroke: 'none'
    }),
    starO: () => svg([p('M12 4.2l2.3 5 5.4.5-4.1 3.6 1.2 5.3L12 21l-4.8 2.6 1.2-5.3-4.1-3.6 5.4-.5z')]),
    search: () => svg([R('circle', {
      cx: 11,
      cy: 11,
      r: 7,
      key: 'c'
    }), p('M21 21l-4.3-4.3', 'l')]),
    bell: () => svg([p('M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9'), p('M13.7 21a2 2 0 0 1-3.4 0')]),
    user: () => svg([p('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'), R('circle', {
      cx: 12,
      cy: 7,
      r: 4,
      key: 'u'
    })]),
    upload: () => svg([p('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'), p('M17 8l-5-5-5 5'), p('M12 3v12')]),
    check: () => svg([p('M20 6 9 17l-5-5')]),
    up: () => svg([p('M12 19V5'), p('M5 12l7-7 7 7')]),
    down: () => svg([p('M12 5v14'), p('M19 12l-7 7-7-7')]),
    back: () => svg([p('M19 12H5'), p('M12 19l-7-7 7-7')])
  };
  const Icon = {};
  Object.keys(defs).forEach(k => {
    Icon[k] = defs[k]();
  });
  Icon.make = (k, opts) => {
    const base = defs[k] ? defs[k]() : null;
    return base;
  };
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/ScreenerScreen.jsx
try { (() => {
/* Conviction stocks screener — filters + grouped coverage tables. window.ScreenerScreen */
(function () {
  const DS = window.ConvictionDesignSystem_630677;
  const {
    Button,
    SegmentedControl,
    DataTable,
    TierBadge,
    SentimentPill
  } = DS;
  function Select({
    value,
    onChange,
    options
  }) {
    return /*#__PURE__*/React.createElement("select", {
      value: value,
      onChange: e => onChange(e.target.value),
      style: {
        background: 'var(--panel-2)',
        border: '1px solid var(--line)',
        borderRadius: 8,
        color: 'var(--ink)',
        fontFamily: 'inherit',
        fontSize: 12.5,
        padding: '7px 11px',
        outline: 'none',
        cursor: 'pointer'
      }
    }, options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
      key: o,
      value: o,
      style: {
        background: '#0E1320'
      }
    }, o) : /*#__PURE__*/React.createElement("option", {
      key: o.v,
      value: o.v,
      style: {
        background: '#0E1320'
      }
    }, o.l)));
  }
  function ScreenerScreen({
    q,
    mkt,
    onMkt,
    stars,
    onStar,
    onOpen
  }) {
    const CV = window.CV;
    const [sector, setSector] = React.useState('All');
    const [tier, setTier] = React.useState('All');
    const [sent, setSent] = React.useState('All');
    const [sort, setSort] = React.useState('score');
    const qq = (q || '').trim().toUpperCase();
    let univ = CV.stocks.filter(s => (mkt === 'All' || s.market === mkt) && (sector === 'All' || s.sector === sector) && (tier === 'All' || s.tier === tier) && (sent === 'All' || s.sentiment === sent) && (!qq || s.symbol.includes(qq) || s.name.toUpperCase().includes(qq)));
    const sortFn = {
      score: (a, b) => b.score - a.score,
      day: (a, b) => b.day - a.day,
      az: (a, b) => a.symbol < b.symbol ? -1 : 1
    }[sort];
    univ = [...univ].sort(sortFn);
    const columns = [{
      key: 'star',
      header: '',
      align: 'center',
      render: (_, s) => /*#__PURE__*/React.createElement("span", {
        onClick: e => {
          e.stopPropagation();
          onStar(s.symbol);
        },
        style: {
          cursor: 'pointer',
          fontSize: 17,
          color: stars[s.symbol] ? 'var(--warn)' : '#475061',
          display: 'inline-flex'
        }
      }, stars[s.symbol] ? window.Icon.starF : window.Icon.starO)
    }, {
      key: 'symbol',
      header: 'Symbol',
      render: (v, s) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          fontSize: 13
        }
      }, v), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: 'var(--muted)'
        }
      }, s.name))
    }, {
      key: 'exch',
      header: 'Exch',
      muted: true,
      mono: true,
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11.5
        }
      }, v)
    }, {
      key: 'price',
      header: 'Price',
      align: 'right',
      mono: true,
      render: (_, s) => CV.price(s)
    }, {
      key: 'day',
      header: 'Day',
      align: 'right',
      mono: true,
      render: (_, s) => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600,
          color: s.day >= 0 ? 'var(--pos)' : 'var(--neg)'
        }
      }, CV.sign(s.day), "%")
    }, {
      key: 'score',
      header: 'Conviction',
      align: 'center',
      render: (_, s) => /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 13
        }
      }, s.score), /*#__PURE__*/React.createElement(TierBadge, {
        tier: s.tier,
        size: "sm"
      }))
    }, {
      key: 'sentiment',
      header: 'Sentiment',
      align: 'center',
      render: v => /*#__PURE__*/React.createElement(SentimentPill, {
        sentiment: v
      })
    }, {
      key: 'sector',
      header: 'Sector',
      muted: true
    }];
    let groups;
    if (mkt === 'All') {
      const inR = univ.filter(s => s.market === 'IN'),
        usR = univ.filter(s => s.market === 'US');
      groups = [{
        title: 'India',
        flag: '🇮🇳',
        rows: inR
      }, {
        title: 'United States',
        flag: '🇺🇸',
        rows: usR
      }].filter(g => g.rows.length);
    } else {
      groups = [{
        title: mkt === 'IN' ? 'India' : 'United States',
        flag: mkt === 'IN' ? '🇮🇳' : '🇺🇸',
        rows: univ
      }];
    }
    const sectorOpts = ['All', ...Array.from(new Set(CV.stocks.map(s => s.sector)))];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '26px 30px 60px',
        maxWidth: 1280
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '-.02em'
      }
    }, "Stocks"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--muted)',
        fontSize: 13,
        marginTop: 3
      }
    }, "Watchlist & coverage universe")), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: window.Icon.upload
    }, "Import stocks")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 9,
        alignItems: 'center',
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      value: mkt,
      onChange: onMkt,
      options: [{
        label: '🇮🇳 India',
        value: 'IN'
      }, {
        label: '🇺🇸 US',
        value: 'US'
      }, {
        label: 'All',
        value: 'All'
      }]
    }), /*#__PURE__*/React.createElement(Select, {
      value: sector,
      onChange: setSector,
      options: sectorOpts
    }), /*#__PURE__*/React.createElement(Select, {
      value: tier,
      onChange: setTier,
      options: ['All', 'A', 'B', 'C']
    }), /*#__PURE__*/React.createElement(Select, {
      value: sent,
      onChange: setSent,
      options: ['All', 'Bullish', 'Neutral', 'Bearish']
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Select, {
      value: sort,
      onChange: setSort,
      options: [{
        v: 'score',
        l: 'Sort: Conviction'
      }, {
        v: 'day',
        l: 'Sort: Day %'
      }, {
        v: 'az',
        l: 'Sort: A–Z'
      }]
    })), groups.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.title,
      style: {
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15
      }
    }, g.flag), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, g.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--faint)',
        background: 'var(--panel-2)',
        padding: '2px 8px',
        borderRadius: 6
      }
    }, g.rows.length)), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns,
      rows: g.rows,
      rowKey: s => s.symbol,
      onRowClick: s => onOpen(s.symbol)
    }))), groups.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--faint)',
        fontSize: 13,
        padding: 40,
        textAlign: 'center'
      }
    }, "No stocks match these filters.") : null);
  }
  window.ScreenerScreen = ScreenerScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/ScreenerScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/Sidebar.jsx
try { (() => {
/* Conviction sidebar — brand lockup, nav, user footer. window.Sidebar */
(function () {
  const NAV = [['dashboard', 'Dashboard', 'dashboard'], ['stocks', 'Stocks', 'stocks'], ['technical', 'Technical', 'technical'], ['fundamental', 'Fundamental', 'fundamental'], ['combined', 'Combined', 'combined'], ['ai', 'AI Insights', 'ai'], ['picks', 'Best Picks', 'picks']];
  function Sidebar({
    nav,
    onNav
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: 228,
        flexShrink: 0,
        background: 'var(--panel)',
        borderRight: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '20px 20px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        borderBottom: '1px solid var(--line)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        background: 'linear-gradient(135deg,var(--logo-from),var(--logo-to))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: '#06121C',
        fontSize: 16,
        fontFamily: 'var(--font-mono)'
      }
    }, "C"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        letterSpacing: '-.01em',
        fontSize: 15
      }
    }, "Conviction"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--faint)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '.04em'
      }
    }, "RESEARCH TERMINAL"))), /*#__PURE__*/React.createElement("nav", {
      className: "cv-scroll",
      style: {
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flex: 1,
        overflowY: 'auto'
      }
    }, NAV.map(([key, label, icn]) => {
      const active = nav === key;
      return /*#__PURE__*/React.createElement("button", {
        key: key,
        onClick: () => onNav(key),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '9px 12px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 9,
          background: active ? '#15203356' : 'transparent',
          color: active ? 'var(--ink)' : 'var(--muted)',
          fontFamily: 'inherit',
          fontSize: 13.5,
          fontWeight: active ? 600 : 500,
          textAlign: 'left',
          width: '100%',
          position: 'relative'
        },
        onMouseEnter: e => {
          if (!active) e.currentTarget.style.background = '#141A26';
        },
        onMouseLeave: e => {
          if (!active) e.currentTarget.style.background = 'transparent';
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 3,
          height: 18,
          borderRadius: 3,
          background: active ? 'var(--accent)' : 'transparent'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 18,
          display: 'inline-flex',
          color: active ? 'var(--accent-bright)' : '#6B7280'
        }
      }, window.Icon[icn]), /*#__PURE__*/React.createElement("span", null, label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 16px',
        borderTop: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#1E2A3C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: 13,
        color: '#8FB4E8'
      }
    }, "AK"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, "Arjun Kapoor"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--faint)'
      }
    }, "Private investor")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        color: 'var(--faint)'
      }
    }, window.Icon.user)));
  }
  window.Sidebar = Sidebar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/Topbar.jsx
try { (() => {
/* Conviction topbar — search, market toggle, date, alerts. window.Topbar */
(function () {
  const DS = window.ConvictionDesignSystem_630677;
  const {
    SearchInput,
    SegmentedControl
  } = DS;
  function Topbar({
    q,
    onQ,
    mkt,
    onMkt
  }) {
    const today = new Date(2026, 5, 28).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    return /*#__PURE__*/React.createElement("header", {
      style: {
        height: 58,
        flexShrink: 0,
        borderBottom: '1px solid var(--line)',
        background: 'var(--panel)',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '0 22px'
      }
    }, /*#__PURE__*/React.createElement(SearchInput, {
      value: q,
      onChange: onQ,
      icon: window.Icon.search,
      placeholder: "Search stocks, e.g. HDFCBANK, NVDA\u2026",
      style: {
        flex: 1,
        maxWidth: 440
      }
    }), /*#__PURE__*/React.createElement(SegmentedControl, {
      value: mkt,
      onChange: onMkt,
      options: [{
        label: 'All',
        value: 'All'
      }, {
        label: '₹ IN',
        value: 'IN',
        mono: true
      }, {
        label: '$ US',
        value: 'US',
        mono: true
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--muted)',
        whiteSpace: 'nowrap'
      }
    }, today), /*#__PURE__*/React.createElement("button", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 9,
        background: 'var(--panel-2)',
        border: '1px solid var(--line)',
        color: 'var(--muted)',
        fontSize: 17,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }
    }, window.Icon.bell, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 8,
        right: 9,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--warn)'
      }
    })));
  }
  window.Topbar = Topbar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/data.js
try { (() => {
/* Conviction sample dataset + formatting helpers. window.CV */
(function () {
  // [symbol, name, market, exch, sector, price, day%, score, tier, fund, tech, sentiment, starred, qty, avgCost]
  const raw = [['RELIANCE', 'Reliance Industries', 'IN', 'NSE', 'Energy', 2945.60, 1.2, 82, 'A', 84, 80, 'Bullish', 1, 40, 2610], ['HDFCBANK', 'HDFC Bank', 'IN', 'NSE', 'Financials', 1698.30, 0.8, 86, 'A', 88, 83, 'Bullish', 1, 120, 1520], ['TCS', 'Tata Consultancy Svcs', 'IN', 'NSE', 'IT', 3890.10, -0.4, 79, 'B', 85, 72, 'Neutral', 1, 25, 3550], ['INFY', 'Infosys', 'IN', 'NSE', 'IT', 1632.45, -0.9, 74, 'B', 80, 68, 'Neutral', 0, 0, 0], ['TATAMOTORS', 'Tata Motors', 'IN', 'NSE', 'Auto', 985.20, 2.6, 71, 'B', 70, 76, 'Bullish', 1, 200, 720], ['ICICIBANK', 'ICICI Bank', 'IN', 'NSE', 'Financials', 1182.70, 0.5, 83, 'A', 85, 80, 'Bullish', 0, 0, 0], ['AAPL', 'Apple Inc', 'US', 'NASDAQ', 'Technology', 214.05, 0.6, 81, 'A', 83, 78, 'Bullish', 1, 60, 178], ['MSFT', 'Microsoft', 'US', 'NASDAQ', 'Technology', 448.90, 1.1, 88, 'A', 90, 85, 'Bullish', 1, 30, 360], ['NVDA', 'NVIDIA', 'US', 'NASDAQ', 'Semiconductors', 124.30, 4.8, 84, 'A', 78, 90, 'Bullish', 1, 100, 88], ['AMD', 'Adv Micro Devices', 'US', 'NASDAQ', 'Semiconductors', 168.55, 3.0, 67, 'C', 64, 74, 'Bullish', 0, 0, 0], ['INTC', 'Intel Corp', 'US', 'NASDAQ', 'Semiconductors', 31.18, -3.6, 52, 'C', 55, 44, 'Bearish', 0, 0, 0], ['AMZN', 'Amazon', 'US', 'NASDAQ', 'Consumer', 198.20, -1.2, 77, 'B', 79, 72, 'Neutral', 0, 0, 0]];
  const FX = 83.3;
  const stocks = raw.map(r => {
    const [symbol, name, market, exch, sector, price, day, score, tier, fund, tech, sentiment, starred, qty, avg] = r;
    return {
      symbol,
      name,
      market,
      exch,
      sector,
      price,
      day,
      score,
      tier,
      fund,
      tech,
      sentiment,
      starred: !!starred,
      qty,
      avg
    };
  });
  const map = {};
  stocks.forEach(s => map[s.symbol] = s);

  // deterministic pseudo-random series for sparklines & charts
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
    return h;
  }
  const cache = {};
  function series(sym, n) {
    n = n || 48;
    const key = sym + ':' + n;
    if (cache[key]) return cache[key];
    const s = map[sym];
    const rnd = rng(hash(sym) || 7);
    let c = [s.price * 0.8];
    for (let i = 1; i < n; i++) c.push(Math.max(1, c[i - 1] * (1 + (rnd() - 0.5) * 0.04 + (s.tech - 65) / 65 * 0.0016)));
    const scale = s.price / c[n - 1];
    c = c.map(x => x * scale);
    cache[key] = c;
    return c;
  }
  function inr(x) {
    const n = x < 0 ? '-' : '';
    x = Math.abs(Math.round(x));
    let str = String(x);
    const l3 = str.slice(-3);
    let r = str.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return n + (r ? r + ',' : '') + l3;
  }
  const price = s => s.market === 'IN' ? '₹' + s.price.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : '$' + s.price.toFixed(2);
  const priceAt = (s, v) => s.market === 'IN' ? '₹' + v.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : '$' + v.toFixed(2);
  const money = (s, v) => s.market === 'IN' ? '₹' + inr(v) : '$' + Math.round(v).toLocaleString('en-US');
  const cr = v => v >= 1e7 ? '₹' + (v / 1e7).toFixed(2) + ' Cr' : v >= 1e5 ? '₹' + (v / 1e5).toFixed(2) + ' L' : '₹' + inr(v);
  const sign = x => (x >= 0 ? '+' : '') + x.toFixed(2);
  window.CV = {
    stocks,
    map,
    FX,
    series,
    price,
    priceAt,
    money,
    cr,
    sign,
    inr
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.ConvictionScore = __ds_scope.ConvictionScore;

__ds_ns.SentimentPill = __ds_scope.SentimentPill;

__ds_ns.TierBadge = __ds_scope.TierBadge;

})();
