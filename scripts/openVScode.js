## Hexo添加文章时自动打开编辑器

var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "E:\VS Code\Code.exe" ' + data.path);
});
