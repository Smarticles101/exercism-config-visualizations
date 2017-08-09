let program = require('commander'),
    pkg = require('./package.json'),
    uniconfigDefault = require('./data/uniconfig.json');


// im not sure commander can do what I want here
// ideally the uniconfig arg is handled once then the subcommands just get it
// sofar the only way I see to do that is have a generic subcommand handler
// would rather use .command
program
  .version(pkg.version)
  .option('-U, --uniconfig <path>', 'set configuration file input. defaults to ./data/uniconfig.json')
  .arguments('<report> [targets...]', 'See README for reports and target information')
  .action((report, targets, options) => {
    let uniconfig = (options.uniconfig ? require(options.uniconfig) : uniconfigDefault);
    require(`./reports/${report}.js`)(uniconfig, targets);
  })
  .parse(process.argv);
