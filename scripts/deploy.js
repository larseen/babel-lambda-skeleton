import childProcess from 'child-process-promise';
import loader from 'loading-cli';
const exec = childProcess.exec;
const config = require('../lambda.json');
const conflictPredicate = /ResourceConflictException/;

function createFunction() {
    let cmd = 'aws lambda create-function';
    cmd += ` --cli-input-json '${JSON.stringify(config)}'`;
    cmd += ' --zip-file fileb://dist.zip';
    return exec(cmd);
}

function updateCode() {
    let cmd = 'aws lambda update-function-code';
    cmd += ` --function-name "${(config.FunctionName)}"`;
    cmd += ' --zip-file fileb://dist.zip';
    if (config.Publish) cmd += ' --publish';
    else cmd += ' --no-publish';
    return exec(cmd);
}

function updateConfiguration() {
    let cmd = 'aws lambda update-function-configuration';
    cmd += ` --function-name "${config.FunctionName}"`;
    if (config.Role) cmd += ` --role "${config.Role}"`;
    // if (config.Runtime) cmd += ` --runtime "${config.Runtime}"`; field not working awscli
    if (config.Handler) cmd += ` --handler "${config.Handler}"`;
    if (config.Description) cmd += ` --description "${config.Description}"`;
    if (config.Timeout) cmd += ` --timeout ${config.Timeout}`;
    if (config.MemorySize) cmd += ` --memory-size ${config.MemorySize}`;
    return exec(cmd);
}

const load = loader('Deploying code to Lambda').start();
createFunction()
    .then(() => {
        load.text = `Sucsefully deployed function ${config.FunctionName} to Lambda`;
    })
    .catch(err => {
        if (conflictPredicate.test(err.stderr)) {
            load.text = `Updating existing Lambda function code: ${(config.FunctionName)}`;
            return updateCode();
        }
        return err;
    })
    .then(() => {
        load.text = `Updating existing Lambda function configuration: ${(config.FunctionName)}`;
        return updateConfiguration();
    })
    .then(() => {
        load.text = 'Done!';
        setTimeout(() => load.stop(), 1500);
    })
    .catch(err => {
        load.stop();
        console.error(err); // eslint-disable-line
    });
