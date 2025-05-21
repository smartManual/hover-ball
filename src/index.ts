import './index.less'
import './font/iconfont.css'
import interact from 'interactjs'
import { Options } from './interface'


class HoverBall {
  private container: Element | null = null
  private circle: HTMLDivElement | null = null
  private iframeContainer: HTMLDivElement | null = null
  private isDragging = false

  private position = { x: 0, y: 0 }
  private options: Options = {
    circle: {
      draggable: false,
      position: 'fixed',
      width: '40px',
      height: '40px',
      bottom: '10px',
      right: '10px',
    },
    iframe: {
      width: '360px',
      height: '640px',
      bottom: '10px',
      right: '10px',
    }
  }
  private initCircleDragFlag = false

  constructor(selector: string | Element | null, config: Options = {circle: {}, iframe: {}}) {
    if (!selector) {
      console.error('selector不能为空！')
      return
    }

    const container = this.getContainer(selector)
    if (!container) {
      console.error('selector对应的dom不存在或对应的dom未加载完, 请检查！')
    }

    this.container = container

    this.options = {
      circle: this.mergeOptions(this.options.circle, config.circle || {}),
      iframe: this.mergeOptions(this.options.iframe, config.iframe || {})
    }

    const circle = this.createCircleDom()
    this.circle = circle
    
    this.initCircle()
  }

  private mergeOptions(options: any, config: any) {
    const newOptions: any = { ...options }
    for (const key in config) {
      if (!['top', 'right', 'bottom', 'left'].includes(key)) {
        newOptions[key] = config[key]
      }
    }
    if (config.top !== undefined) {
      newOptions.top = config.top
      delete newOptions.bottom
    }

    if (config.right !== undefined) {
      newOptions.right = config.right
      delete newOptions.left
    }

    if (config.bottom !== undefined) {
      newOptions.bottom = config.bottom
      delete newOptions.top
    }

    if (config.left !== undefined) {
      newOptions.left = config.left
      delete newOptions.right
    }

    return newOptions
  }

  private setStyle(circle: HTMLDivElement, attribute: any, value: string | number | undefined) {
    if (value === undefined) return

    if (typeof value === 'string') {
      circle.style[attribute] = value
    } else if (typeof value === 'number') {
      circle.style[attribute] = value + 'px'
    }
  }

  private initCircle() {
    const circleConfig = this.options.circle
    if (this.circle && circleConfig) {
      this.setStyle(this.circle, 'width', circleConfig.width)
      this.setStyle(this.circle, 'height', circleConfig.height)
      this.setStyle(this.circle, 'position', circleConfig.position)

      this.setStyle(this.circle, 'bottom', circleConfig.bottom)
      this.setStyle(this.circle, 'right', circleConfig.right)
      this.setStyle(this.circle, 'top', circleConfig.top)
      this.setStyle(this.circle, 'left', circleConfig.left)

      this.container!.appendChild(this.circle)

      if (circleConfig.draggable) {
        this.initCircleDrag(this.circle)
      }

      this.initCircleEvent(this.circle)
    }
  }

  private getContainer(selector: string | Element) {
    if (typeof selector === 'string') {
      return document.querySelector(selector)
    } else if (selector instanceof HTMLElement) {
      return selector
    } else {
      return null
    }
  }

  private createCircleDom() {
    const circle = document.createElement('div')
    circle.classList.add('figure-circle-container')
    const circleConfig = this.options.circle
    if (circleConfig && circleConfig.imgUrl) {
      const img = document.createElement('img')
      img.src = circleConfig.imgUrl
      circle.appendChild(img)
    }
    return circle
  }

  private createIframeContainer() {
    const circleConfig = this.options.circle
    const iframeConfig = this.options.iframe

    const iframeContainer = document.createElement('div')
    iframeContainer.classList.add('figure-iframe-container')

    const iframe = document.createElement('iframe')
    iframe.classList.add('figure-iframe')
    iframe.src = iframeConfig.url || ''
    iframe.allow="microphone; camera"

    const title = document.createElement('div')
    title.classList.add('figure-iframe-title')

    const closeIcon = document.createElement('span')
    closeIcon.classList.add('figure-iframe-close', 'iconfont', 'icon-guanbi')
    title.appendChild(closeIcon)
    closeIcon.addEventListener('click', this.hideIframe.bind(this))

    iframeContainer.appendChild(title)
    iframeContainer.appendChild(iframe)
    
    this.setStyle(iframeContainer, 'position', circleConfig!.position)
    this.setStyle(iframeContainer, 'width', iframeConfig?.width)
    this.setStyle(iframeContainer, 'height', iframeConfig?.height)
    this.setStyle(iframeContainer, 'bottom', iframeConfig?.bottom)
    this.setStyle(iframeContainer, 'right', iframeConfig?.right)

    return iframeContainer
  }

  private initCircleDrag(circle: HTMLDivElement) {
    this.initCircleDragFlag = true
  
    const _this = this
    interact(circle).draggable({
      listeners: {
        start(event: any) {
          _this.isDragging = true
          const iframs = document.querySelectorAll('iframe')
          iframs.forEach(iframe => {
            iframe.style.pointerEvents = 'none'
          })
        },
        move(event: any) {
          _this.position.x += event.dx
          _this.position.y += event.dy

          event.target.style.transform = `translate(${_this.position.x}px, ${_this.position.y}px)`
        },
        end() {
          // 解决拖拽与click冲突的问题
          setTimeout(() => {
            _this.isDragging = false
          }, 200)

          const iframs = document.querySelectorAll('iframe')
          iframs.forEach(iframe => {
            iframe.style.pointerEvents = 'auto'
          })
        }
      }
    })
  }

  private initCircleEvent(circle: HTMLDivElement) {
    circle.addEventListener('click', (e: Event) => {
      if (!this.isDragging) {
        this.showIframe()
      }
    })
  }

  private showIframe() {
    if (this.iframeContainer) {
      this.iframeContainer.style.display = 'flex'
    } else {
      const iframeContainer =this.createIframeContainer()
      this.iframeContainer = iframeContainer
      this.container!.appendChild(this.iframeContainer)
    }

    this.hideCircle()
  }

  private hideIframe() {
    if (this.iframeContainer) {
      this.iframeContainer.style.display = 'none'
    }
    this.showCircle()
  }

  private showCircle() {
    if (this.circle) {
      this.circle.style.display = 'block'
      // 重新设置位置
      this.position = { x: 0, y: 0 }
      this.circle.style.transform = 'translate(0, 0)'
    }
  }

  private hideCircle() {
    if (this.circle) {
      this.circle.style.display = 'none'
    }
  }

  public draggable(draggable = true) {
    if (this.circle) {
      if (this.initCircleDragFlag) {
        interact(this.circle).draggable(draggable)
      } else {
        draggable && this.initCircleDrag(this.circle)
      }
    }
  }
}

export default HoverBall