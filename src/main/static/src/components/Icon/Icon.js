import { jsx as _jsx } from "react/jsx-runtime";
import './styles.css';
/**
 * icomoon.ttf acts as source which one can edit and convert to .woff. The .woff should be base64 encoded and added to
 * copy pasted to styles.css since build process messes the charset.
 */
var Icon = function (_a) {
    var name = _a.name;
    return _jsx("span", { className: "raami-icon-" + name, style: { verticalAlign: "baseline" } });
};
export default Icon;
//# sourceMappingURL=Icon.js.map