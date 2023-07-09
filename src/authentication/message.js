function successful() {
    let message={status:200,text:"OK"};
    return message;
}

function sheetConnected(info) {
    let message={status:400,info:info};
    return message;
}

function successfulLoginCandidate(info) {
    let message={status:200,info:info};
    return message;
}

function successfulLoginEmployer(info) {
    let message={status:200,info:info};
    return message;
}

function errorAddCandidate() {
    let message={status:401,text:"User name is not valid"};
    return message;
}

function errorLoginCandidate() {
    let message={status:401,text:"User name or password is not correct"};
    return message;
}

function errorAddEmployer() {
    let message={status:401,text:"User name is not valid"};
    return message;
}

function errorLoginEmployer() {
    let message={status:401,text:"User name or password is not correct"};
    return message;
}

function errorNumberRange() {
    let message={status:401,text:"Data entry is not correct ,check hilight cell"};
    return message;
}



function errorController(error) {
    let message={status:514,text:error};
    return message;
}

function errorToken() {
    let message={auth:false,status:113,text:"Authentication is not successful"};
    return message;
}



export {
    successful,
    successfulLoginCandidate,
    successfulLoginEmployer,
    errorLoginCandidate,
    errorAddCandidate,
    errorAddEmployer,
    errorLoginEmployer,
    errorController,
    errorToken,
    sheetConnected,
    errorNumberRange,
}
