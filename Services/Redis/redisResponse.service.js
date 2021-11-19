function setResponse(username, repos){
    return `<h1>${username} has ${repos} on Github repos.</h1>`
}

module.exports = {setResponse};