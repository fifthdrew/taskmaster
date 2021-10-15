class BaseModel {
    constructor(context) {
        this.ctx = context; 
        this.db = context.db;
    }
}

module.exports = BaseModel;
