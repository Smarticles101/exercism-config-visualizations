let aToCSV = require('array-to-csv'),
    os = require('os'),
    program = require('commander'),
    pkg = require('./package.json'),
    table = require('cli-table2'),
    uniconfigDefault = require('./data/uniconfig.json');


// try to get the uniconfig file from a few sources
// - see if user specified a file
// - see if it was piped in via stdin
// - use the default file supplied with this program

// return a Promise since we have to do async for stdin reads
function getUniconfig(filename=''){
  return new Promise((resolve, reject) => {

    if(filename) return resolve(require(filename));


    if(!process.stdin.isTTY){
      let input = '';
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => input += chunk);
      process.stdin.on('end', () => {
        try{
          let returner = JSON.parse(input);
          return resolve(returner);
        } catch (e) {
          return reject(e);
        }
      });
    }else{
      console.error('Using the default uniconfiguration file. It may be out of date:', uniconfigDefault.generated);
      return resolve(uniconfigDefault);
    }
  });
}
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

    getUniconfig(options.uniconfig)
      .then((uniconfig) => {
        let data = require(`./reports/${report}.js`)(uniconfig, targets),
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
        }else{
            // xx - what if not string?
            output += os.EOL // regular strings also look better with a linebreak
        }

        return process.stdout.write(output);
      }).catch(console.error);


  })
  .parse(process.argv);
