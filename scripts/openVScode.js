var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "E:\Typora\Typora.exe" ' + data.path);
});
/* Hexo添加文章时自动打开编辑器 */
