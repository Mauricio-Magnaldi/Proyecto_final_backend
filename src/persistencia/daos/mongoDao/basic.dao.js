export default class BasicManager {

    constructor(model, populateOption) {
        this.model = model;
        this.populateOption = populateOption;
    }

    async findAll(){
        return this.model.find().populate(this.populateOption).lean();
    }

    async findByFilter(filter) {
        return this.model.getByFilter(filter);
    }
    
    async findById(id){
        return this.model.findById(id).populate(this.populateOption);
    }

    async createOne(object) {
        return this.model.create(object);
    }
    
    async updateOne(id, object) {
        return this.model.findByIdAndUpdate({_id: id}, object, {new: true});
    }

    async deleteOne(id) {
        return this.model.findByIdAndDelete({_id:id});
    }

}
