可拖拽的悬浮球，通过点击它展示iframe内容

CDN

```javascript
<script src="./lib/hoverball.min.js"></script>
<link rel="stylesheet" href="./lib/css/index.css">
```

ES6：

```bash
npm install --save @zero-org/hover-ball
```

```javascript
import HoverBall from '@zero-org/hover-ball'
import '@zero-org/hover-ball/dist/css/index.css'
```

使用说明：

```javascript
const hoverBall = new HoverBall('body', {
    circle: {
      draggable: true,
      imgUrl: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0',
      position: 'fixed',
      width: 200,
      height: 200,
      bottom: 20,
      right: 20,
    },
    iframe: {
      url: 'https://www.baidu.com',
      width: 400,
      height: 400,
      bottom: 40,
      right: 40,
    }
  })

// 关闭悬浮球拖拽功能
hoverBall.draggable(false)
hoverBall.draggable(true)

```



circle配置项说明：

| 属性      | 属性说明                         | 属性类型             | 默认值  |
| --------- | -------------------------------- | -------------------- | ------- |
| draggable | 是否可拖拽                       | boolean              | false   |
| position  | 悬浮球定位方式                   | 'fixed' \|'absolute' | 'fixed' |
| imgUrl    | 悬浮球图片地址                   | string               | 无      |
| width     | 悬浮球宽度                       | string \|number      | '40px'  |
| height    | 悬浮球高度                       | string \|number      | '40px'  |
| bottom    | 悬浮球相对于定位元素的下边距距离 | string \|number      | '10px'  |
| right     | 悬浮球相对于定位元素的右边距距离 | string \|number      | '10px'  |
| top       | 悬浮球相对于定位元素的上边距距离 | string \|number      | 无      |
| left      | 悬浮球相对于定位元素的左边距距离 | string \|number      | 无      |



iframe配置项说明：

| 属性   | 属性说明                         | 属性类型       | 默认值  |
| ------ | -------------------------------- | -------------- | ------- |
| url    | iframe加载地址                   | string         | 无      |
| width  | iframe宽度                       | string\|number | '360px' |
| height | iframe高度                       | string\|number | '640px' |
| bottom | iframe相对于定位元素的下边距距离 | string\|number | '10px'  |
| right  | iframe相对于定位元素的右边距距离 | string\|number | '10px'  |

