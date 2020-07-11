import fs from 'fs';

const write = (resultString, label) => {
  fs.writeFileSync(label + '.plist', resultString);
  return label + '.plist';
};

export default write;
