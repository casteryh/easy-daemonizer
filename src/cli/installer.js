import inquirer from 'inquirer';
import program from 'commander';
import shell from 'shelljs';

const install = (plistFile) => {
  inquirer
      .prompt([
        {
          name: 'install',
          message: 'Do you want to install and load it now? (y/n)',
          default: 'y',
        },
      ])
      .then((answers) => {
        if (answers.install == 'y' || program.yes) {
          const output = moveToDest(plistFile);
          launchctlLoad(output);
        }
      });
};

const priviledge = () => {
  return program.globalDaemon || program.globalAgent;
};

const sudoPrefix = () => {
  return priviledge() ? 'sudo ': '';
};
const moveToDest = (plistFile) => {
  let output = '';
  let prefix = process.env.HOME + '/Library/LaunchAgents/';
  console.log(prefix);
  if (program.globalDaemon) {
    prefix = '/Library/LaunchDaemons/';
  } else if (program.globalAgent) {
    prefix = '/Library/LaunchAgents/';
  }
  if (priviledge()) {
    shell.exec('sudo chown root:wheel ' + plistFile);
  }
  output = prefix + plistFile;
  shell.exec(
      sudoPrefix() + 'mv' + ' ' + plistFile + ' ' + prefix,
  );
  return output;
};

const launchctlLoad = (plistFile) => {
  shell.exec(sudoPrefix() + 'launchctl load -w ' + plistFile);
};
export default install;
