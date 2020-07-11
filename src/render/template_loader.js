import nunjucks from 'nunjucks';
import {resolve} from 'path';

const loadTemplate = () => {
  return nunjucks.configure(resolve(__dirname, '../assets/'));
};

export default loadTemplate;
