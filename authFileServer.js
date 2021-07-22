const uuid = require('uuid')
const path = require('path')

class AuthFileServer {
    async saveFile(file) {
        try {
            const fileName = uuid.v4() + '.png';
            const filePath = path.resolve('static', fileName);
            file.mv(filePath);

            return fileName;

        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new AuthFileServer();