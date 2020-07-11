/* eslint-disable max-len */
import program from 'commander';
import {version} from '../../package.json';
import render from '../render/render';
import parseTemplateParameters from './parser';
import write from './writer';
import install from './installer';

/**
 * Entry point of the CLI
 */
export const startApp = () => {
  program
      .name('easyd')
      .usage('[options] -- <path> [args...]')
      .version(version)
      .option('-g, --global-agent',
          'daemonize as a Global Agent (default: User Agent)')
      .option('-d, --global-daemon',
          'daemonize as a Global Daemon (root)')
      .option(
          '-e, --env <NAME=VALUE>',
          'add an environment variable\n' +
          'you can specify multiple ones by using multiple -e\n' +
          'eg: -e PATH=$PATH -e FLAG=true',
          (env, envs) => {
            envs.push(env);
            return envs;
          },
          [],
      )
      .option('-P, --exclude-path',
          'exclude PATH (added by default) from environment variables')
      .option('-K, --dont-keep-alive',
          'set KeepAlive to false (true by default)')
      .option('-R, --dont-run-at-load',
          'set RunAtLoad to false (true by default)')
      .option('-t, --throttle-interval <time>',
          'set ThrottleInterval in seconds (default : 1)')
      .option('-l, --label <label>',
          'set label (default: local.easyd.$name_of_binary')
      .option('-y, --yes', 'Yes to all prompts')
      .option('-w, --working-directory <path>',
          'set working directory (default: cwd)');

  program.parse(process.argv);
  const templateParameters = parseTemplateParameters(program);
  const result = render(templateParameters);
  console.log('summary:');
  console.log(templateParameters);
  const output = write(result, templateParameters['label']);
  install(output);
};
