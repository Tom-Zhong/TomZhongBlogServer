import pug from 'pug';

// 使用pug作为渲染引擎
export default (source, options) => {
  return pug.render(source, options);
}