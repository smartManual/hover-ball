/**
 * 悬浮球配置
 */
export interface CircleConfig {
  /**
   * 是否可拖拽
   */
  draggable?: boolean,
  /**
   * 悬浮球定位方式
   */
  position?: 'fixed' | 'absolute',
  /**
   * 悬浮球图片地址
   */
  imgUrl?: string,
  /**
   * 悬浮球宽度
   */
  width?: string | number,
  /**
   * 悬浮球高度
   */
  height?: string | number,
  /**
   * 悬浮球相对于定位元素的下边距距离
   */
  bottom?: string | number,
  /**
   * 悬浮球相对于定位元素的右边距距离
   */
  right?: string | number,
  /**
   * 悬浮球相对于定位元素的上边距距离
   */
  top?: string | number,
  /**
   * 悬浮球相对于定位元素的左边距距离
   */
  left?: string | number,
}

export interface IframeConfig {
  /**
   * iframe加载地址
   */
  url?: string,
  /**
   * iframe宽度
   */
  width?: string | number,
  /**
   * iframe高度
   */
  height?: string | number,
  /**
   * iframe相对于定位元素的下边距距离
   */
  bottom?: string | number,
  /**
   * iframe相对于定位元素的右边距距离
   */
  right?: string | number,
}

export interface Options {
  /**
   * 悬浮球配置
   */
  circle?: CircleConfig
  /**
   * iframe配置
   */
  iframe: IframeConfig
}

declare class HoverBall {
  constructor(selector: string | Element | null, config?: Options);
  draggable(draggable?: boolean): void;
}

export default HoverBall;