# Easy Daemonizer

A CLI front-end to create and install a daemon service with launchctl for OS X.

Daemonize whatever you want with launchctl, now easier.
I write the plist file for you, so you don't have to.

## Install

    git clone https://github.com/casteryh/easy-daemonizer.git
    cd easy-daemonizer
    yarn install
    yarn link

## Usage

    Usage: easyd [options] -- <path> [args...]

    Options:
    -V, --version                   output the version number
    -g, --global-agent              daemonize as a Global Agent (default: User Agent)
    -d, --global-daemon             daemonize as a Global Daemon (root)
    -e, --env <NAME=VALUE>          add an environment variable
                                    you can specify multiple ones by using multiple -e
                                    eg: -e PATH=$PATH -e FLAG=true (default: [])
    -P, --exclude-path              exclude PATH (added by default) from environment variables
    -K, --dont-keep-alive           set KeepAlive to false (true by default)
    -R, --dont-run-at-load          set RunAtLoad to false (true by default)
    -t, --throttle-interval <time>  set ThrottleInterval in seconds (default : 1)
    -l, --label <label>             set label (default: local.easyd.$name_of_binary)
    -y, --yes                       Yes to all prompts
    -w, --working-directory <path>  set working directory (default: cwd)
    -h, --help                      display help for command
