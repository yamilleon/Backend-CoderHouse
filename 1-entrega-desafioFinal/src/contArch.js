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

            if(this.array.length !=0){
                let arrayId = this.array.map(item => item.id);
                let highId = Math.max(...arrayId);
                element.id = highId + 1;
            } else element.id = 0;


            this.array.push(element)
            const content = JSON.stringify(this.array, null, 4)
            await fs.promises.writeFile(this.ruta, content)
        }
        return element
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
    async retriveId(id){
        try{
            const content = await fs.promises.readFile(this.ruta, 'utf-8')
            this.array = JSON.parse(content)
            const objId = this.array.find(item => item.id == id)
            return(objId ? objId :{error: "product not found"})
        }catch {
            return {}
        }
    }
    async update(obj,id) {
        obj.id = id;
        this.array = await this.retrive()
        if (this.verify(obj)) {
            const auxArray = this.array.map(item => item.id == id ? obj : item);
            this.array.splice(0);
            this.array.push(...auxArray);
            const content = JSON.stringify(this.array, null, 4)
            await fs.promises.writeFile(this.ruta, content)
            return (obj);
        }
    }
    async delete(id) {
        this.array = await this.retrive()
        let auxArray = this.array.filter(item => item.id != id);
        this.array.splice(0);
        this.array.push(...auxArray);
        const content = JSON.stringify(this.array, null, 4)
        await fs.promises.writeFile(this.ruta, content)
        return (this.array);
    }
}

module.exports = contAiner