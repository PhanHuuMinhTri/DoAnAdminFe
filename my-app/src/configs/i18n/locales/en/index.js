import * as publicLocale from "./public";
import * as privateLocale from "./private";

import global from "./global.json";

const en = { ...publicLocale, ...privateLocale, ...global };
console.log("en", en);
export { en };
