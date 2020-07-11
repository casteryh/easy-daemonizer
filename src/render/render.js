import loadTemplate from './template_loader';

const render = (templateParameters) => {
  const renderer = loadTemplate();
  return renderer.render('template.plist.njk', templateParameters);
};

export default render;
