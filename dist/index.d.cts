import { EventEmitter } from "events";

//#region js/variants.d.ts
type GlassMaterialVariant = number;
declare const GlassMaterialVariant: {
  readonly regular: 0;
  readonly clear: 1;
  readonly dock: 2;
  readonly appIcons: 3;
  readonly widgets: 4;
  readonly text: 5;
  readonly avplayer: 6;
  readonly facetime: 7;
  readonly controlCenter: 8;
  readonly notificationCenter: 9;
  readonly monogram: 10;
  readonly bubbles: 11;
  readonly identity: 12;
  readonly focusBorder: 13;
  readonly focusPlatter: 14;
  readonly keyboard: 15;
  readonly sidebar: 16;
  readonly abuttedSidebar: 17;
  readonly inspector: 18;
  readonly control: 19;
  readonly loupe: 20;
  readonly slider: 21;
  readonly camera: 22;
  readonly cartouchePopover: 23;
};
//#endregion
//#region js/index.d.ts
interface GlassOptions {
  cornerRadius?: number;
  tintColor?: string;
  opaque?: boolean;
}
interface LiquidGlassNative {
  addView(handle: Buffer, options: GlassOptions): number;
  setVariant(id: number, variant: GlassMaterialVariant): void;
  setScrimState(id: number, scrim: number): void;
  setSubduedState(id: number, subdued: number): void;
}
declare class LiquidGlass extends EventEmitter {
  private _addon?;
  private _isGlassSupported;
  readonly GlassMaterialVariant: typeof GlassMaterialVariant;
  constructor();
  private isMacOS;
  /**
  * Check if liquid glass is supported on the current platform
  * @returns true if liquid glass is supported on the current platform
  */
  isGlassSupported(): boolean;
  /**
  * Wrap the Electron window with a glass / vibrancy view.
  *
  * ⚠️ Will gracefully fall back to legacy macOS blur if liquid glass is not supported.
  * @param handle BrowserWindow.getNativeWindowHandle()
  * @param options Glass effect options
  * @returns id – can be used for future API (remove/update), -1 if not supported
  */
  addView(handle: Buffer, options?: GlassOptions): number;
  private setVariant;
  unstable_setVariant(id: number, variant: GlassMaterialVariant): void;
  unstable_setScrim(id: number, scrim: number): void;
  unstable_setSubdued(id: number, subdued: number): void;
}
declare const liquidGlass: LiquidGlass;
//#endregion
export { GlassOptions, LiquidGlassNative, liquidGlass as default };