class OneEmployeeDTO{
    name;
    AFM;
    pricebuy;
    constructor(employee){
        this.name=employee.name;
        this.AFM= employee.AFM;
        this.pricebuy= employee.pricebuy;
    }
}
export default OneEmployeeDTO