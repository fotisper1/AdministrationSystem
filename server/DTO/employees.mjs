class EmployeesDTO{
    _id;
    name;
    surname;
    countercons;
    sumprofit;
    salary;
    Hours;
    days;
    constructor(data){
        this._id=data._id
        this.name= data.name
        this.surname=data.surname
        this.countercons=data.countercons
        this.sumprofit=data.sumprofit
        this.salary=data.salary
        this.Hours=data.Hours
        this.days=data.days
    }
}
export default EmployeesDTO