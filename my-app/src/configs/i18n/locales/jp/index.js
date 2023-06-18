import * as publicLocale from "./public";
import * as privateLocale from "./private";

import global from "./global.json";

const jp = { ...publicLocale, ...privateLocale, ...global };

console.log("jp", jp);

export { jp };
