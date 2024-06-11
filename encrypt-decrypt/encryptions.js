const { Transform } = require("node:stream");
const fs = require("node:fs/promises");
const { write } = require("node:fs");

class Encrypt extends Transform {
    _transform(chunk, encoding, callback) {
        console.log(chunk.toString("utf-8"));
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 255) {
                chunk[i] = chunk[i] + 1;
            }
        }
        this.push(chunk)
        // callback(null, chunk);  choose either one method
    }
}

(async () => {
    const readFileHandle = await fs.open("text.txt", "r");
    const writeFilehandle = await fs.open("write.txt", "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFilehandle.createWriteStream();
    const encrypt = new Encrypt();

    readStream.pipe(encrypt).pipe(writeStream);

})();
