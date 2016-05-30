import childProcess from 'child-process-promise';
import loader from 'loading-cli';
const exec = childProcess.exec;
const config = require('../lambda.json');
const conflictPredicate = /ResourceConflictException/;

const load = loader('Deploying code to Lambda').start();
exec('aws lambda create-function ' +
     `--cli-input-json '${JSON.stringify(config)}' --zip-file fileb://dist.zip`)
    .then(() => {
        load.text = `Sucsefully deployed function ${config.FunctionName} to Lambda`;
    })
    .catch(err => {
        if (conflictPredicate.test(err.stderr)) {
            load.text = `Updating existing Lambda function code: ${(config.FunctionName)}`;
            let cmd = `aws lambda update-function-code --function-name "${(config.FunctionName)}"`;
            cmd += ' --zip-file fileb://dist.zip';
            if (config.Publish) cmd += ' --publish';
            else cmd += ' --no-publish';
            return exec(cmd);
        }
        return err;
    })
    .then(() => {
        load.text = `Updating existing Lambda function configuration: ${(config.FunctionName)}`;
        let cmd =
        `aws lambda update-function-configuration --function-name "${config.FunctionName}"`;
        if (config.Role) cmd += ` --role "${config.Role}"`;
        // if (config.Runtime) cmd += ` --runtime "${config.Runtime}"`; field not working awscli
        if (config.Handler) cmd += ` --handler "${config.Handler}"`;
        if (config.Description) cmd += ` --description "${config.Description}"`;
        if (config.Timeout) cmd += ` --timeout ${config.Timeout}`;
        if (config.MemorySize) cmd += ` --memory-size ${config.MemorySize}`;
        return exec(cmd);
    })
    .then(() => {
        load.text = 'Done!';
        setTimeout(() => load.stop(), 1500);
    })
    .catch(err => {
        load.stop();
        console.error(err); // eslint-disable-line
    });
