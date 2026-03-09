import { createRequire } from "node:module";
import { EventEmitter } from "events";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

//#region rolldown:runtime
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nodeGypBuild = __require("node-gyp-build");
var native_loader_default = nodeGypBuild(join(__dirname, ".."));

//#endregion
//#region js/index.ts
var LiquidGlass = class extends EventEmitter {
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
		const supported = this.isMacOS() && Number(execSync("sw_vers -productVersion").toString().trim().split(".")[0]) >= 26;
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
export { js_default as default };