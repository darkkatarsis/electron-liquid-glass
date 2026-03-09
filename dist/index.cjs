//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let events = require("events");
events = __toESM(events);
let child_process = require("child_process");
child_process = __toESM(child_process);
let url = require("url");
url = __toESM(url);
let path = require("path");
path = __toESM(path);

//#region js/variants.ts
const GlassMaterialVariant = {
	regular: 0,
	clear: 1,
	dock: 2,
	appIcons: 3,
	widgets: 4,
	text: 5,
	avplayer: 6,
	facetime: 7,
	controlCenter: 8,
	notificationCenter: 9,
	monogram: 10,
	bubbles: 11,
	identity: 12,
	focusBorder: 13,
	focusPlatter: 14,
	keyboard: 15,
	sidebar: 16,
	abuttedSidebar: 17,
	inspector: 18,
	control: 19,
	loupe: 20,
	slider: 21,
	camera: 22,
	cartouchePopover: 23
};

//#endregion
//#region js/native-loader.ts
const __filename$1 = (0, url.fileURLToPath)(require("url").pathToFileURL(__filename).href);
const __dirname$1 = (0, path.dirname)(__filename$1);
const nodeGypBuild = require("node-gyp-build");
var native_loader_default = nodeGypBuild((0, path.join)(__dirname$1, ".."));

//#endregion
//#region js/index.ts
var LiquidGlass = class extends events.EventEmitter {
	_addon;
	_isGlassSupported;
	GlassMaterialVariant = GlassMaterialVariant;
	constructor() {
		super();
		try {
			if (!this.isMacOS()) return;
			this._addon = new native_loader_default.LiquidGlassNative();
		} catch (err) {
			console.error("electron-liquid-glass failed to load its native addon – liquid glass functionality will be disabled.", err);
		}
	}
	isMacOS() {
		return process.platform === "darwin";
	}
	/**
	* Check if liquid glass is supported on the current platform
	* @returns true if liquid glass is supported on the current platform
	*/
	isGlassSupported() {
		if (this._isGlassSupported !== void 0) return this._isGlassSupported;
		const supported = this.isMacOS() && Number((0, child_process.execSync)("sw_vers -productVersion").toString().trim().split(".")[0]) >= 26;
		this._isGlassSupported = supported;
		return supported;
	}
	/**
	* Wrap the Electron window with a glass / vibrancy view.
	*
	* ⚠️ Will gracefully fall back to legacy macOS blur if liquid glass is not supported.
	* @param handle BrowserWindow.getNativeWindowHandle()
	* @param options Glass effect options
	* @returns id – can be used for future API (remove/update), -1 if not supported
	*/
	addView(handle, options = {}) {
		if (!Buffer.isBuffer(handle)) throw new Error("[liquidGlass.addView] handle must be a Buffer");
		if (!this._addon) return -1;
		return this._addon.addView(handle, options);
	}
	setVariant(id, variant) {
		if (!this._addon || typeof this._addon.setVariant !== "function") return;
		this._addon.setVariant(id, variant);
	}
	unstable_setVariant(id, variant) {
		this.setVariant(id, variant);
	}
	unstable_setScrim(id, scrim) {
		if (!this._addon || typeof this._addon.setScrimState !== "function") return;
		this._addon.setScrimState(id, scrim);
	}
	unstable_setSubdued(id, subdued) {
		if (!this._addon || typeof this._addon.setSubduedState !== "function") return;
		this._addon.setSubduedState(id, subdued);
	}
};
const liquidGlass = new LiquidGlass();
var js_default = liquidGlass;

//#endregion
module.exports = js_default;