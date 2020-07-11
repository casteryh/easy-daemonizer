import {basename} from 'path';
import program from 'commander';

const parseTemplateParameters = () => {
  const templateParameters = {};
  templateParameters['label'] =
      program.label ?
        program.label : 'local.easyd.' + basename(program.args[0]);

  templateParameters['programArguments'] = program.args;

  templateParameters['keepAlive'] = !program.dontKeepAlive;

  templateParameters['runAtLoad'] = !program.dontRunAtLoad;

  templateParameters['throttleInterval'] =
      program.throttleInterval ? program.throttleInterval : 1;

  templateParameters['workingDirectory'] =
      program.workingDirectory ? program.workingDirectory : process.cwd();

  templateParameters['environmentVariables'] = program.env.map((term) => {
    return [term.split('=')[0], term.split('=')[1]];
  });

  if (!program.excludePath) {
    templateParameters['environmentVariables'].push(['PATH', process.env.PATH]);
  }

  return templateParameters;
};

export default parseTemplateParameters;
