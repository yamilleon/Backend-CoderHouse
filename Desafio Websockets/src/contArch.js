const fs = require('fs')
class contAiner {
    constructor(ruta) {
        this.ruta = ruta
    }

    verify(obj) {
        return Object.entries(obj).length !== 0;
    }

    async save(element) {
        this.array = await this.retrive()
        if (this.verify(element)) {
            this.array.push(element)
            const content = JSON.stringify(this.array, null, 4)
            await fs.promises.writeFile(this.ruta, content)
        }
    }
    async retrive() {
        try {
            const content = await fs.promises.readFile(this.ruta, 'utf-8')
            this.array = JSON.parse(content)
            return this.array
        } catch {
            return []
        }
    }
}

module.exports = contAiner