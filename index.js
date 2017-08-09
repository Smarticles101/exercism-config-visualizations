let aToCSV = require('array-to-csv'),
    os = require('os'),
    program = require('commander'),
    pkg = require('./package.json'),
    table = require('cli-table2'),
    uniconfigDefault = require('./data/uniconfig.json');

// im not sure commander can do what I want here
// ideally the uniconfig arg is handled once then the subcommands just get it
// sofar the only way I see to do that is have a generic subcommand handler
// would rather use .command
program
  .version(pkg.version)
  .option('-t, --tabular', 'try to display output in a table, default output is CSV')
  .option('-u, --uniconfig <path>', 'set configuration file input. defaults to ./data/uniconfig.json')
  .arguments('<report> [targets...]', 'See README for reports and target information')
  .action((report, targets, options) => {

    // this action is responsible for:
    // - getting the uniconfig file
    // - passing it and the targets option to the called report
    // - outputting return report data

    let uniconfig = (options.uniconfig ? require(options.uniconfig) : uniconfigDefault),
        data = require(`./reports/${report}.js`)(uniconfig, targets),
        output = data; // track output as what we will end up printing

    // a few things may happen based on output format
    // - if falsey assume the report handled it and don't do anything
    // - if it is an array (of arrays), use the tabular argument to decide to output as table or CSV (dafault)
    // - or else output it as whatever it returned as
    if(!data) return;

    if(Array.isArray(data)){

      if(options.tabular){
        let t = new table({
          head: data.shift()
        });
        for(let r of data){
          t.push(r);
        }
        output = t.toString() + os.EOL; // table looks better with a line break at end

      }else{ // output as CSV by default
        output = aToCSV(data);
      }

    }

    return process.stdout.write(output);
  })
  .parse(process.argv);
