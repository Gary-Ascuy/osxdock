
# osxdock
osxdock is a javascript library to have MocOS dock menu in the browser 

### Live Demo
http://osxdock.meteor.com/

### Usage

```html
<head></head>
<body>
  {{> mainMenu}}
</body>
<template name="mainMenu">
  <div id="message">
    <div class="title"></div>
    <div class="content"></div>
  </div>
</template>
```

```javascript
action = function() {
  console.log('action');
}

Template.mainMenu.onCreated(function() {
  OSX.add('E-Mail Account', 'Send and receive all emails.', '/images/icons/email.png', action);
  OSX.add('Computer' , 'Show all folder of your computer.', '/images/icons/computer.png', action);
  ....
});

Template.mainMenu.onRendered(function() {
  OSX.start('#message');
});
```

```css
#message {
  width: 300px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 0px 35px 0px rgba(0,0,0,0.85);
  bottom: 150px;
}
#message .title {
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
}
#message .content {
  text-align: center;
  height: 3.2em;
}
```

### Preview
![Preview](https://raw.githubusercontent.com/Gary-Ascuy/osxdock/master/preview/1.png)

### You can find my first publication in the following link
http://sourceforge.net/projects/jsdock/
