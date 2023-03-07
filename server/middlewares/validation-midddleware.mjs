import {check,body,validationResult} from 'express-validator'
import validator from 'validator'

export const registerUserValidation=async(req,res)=>{
    check('name','To onoma tha prepei na einai me latinikous xaraktires').trim().isString().custom(value => {
        for (let ch of value) {
            if (!validator.isAlpha(ch, 'en-US') && ch != ' ') {
                return false;
            }
        }
        return true;
    }),
    check('password','Password must be within 8 and 20 characters').trim().isString().isStrongPassword().isLength({min:9,max:20}),
    chech('passwordconfirm','Both password must be same').trim().isString().custom((value,{req})=>{
        if(value!=req.body.password){
            return false;
        }
        return true;
        
    })
    chech('surname','This surname in not valid').trim().notisEmpty().isString(),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(errors.isEmpty()){
            next()
        }
        else{
            const myerror= errors.array()
            res.status(400).json({message:myerror[0].msg,success:false})
        }
    }
}

export const addConsumerValidation=[
    check('username','I eponymia tou ergazomenou prepei na einai me latinikous xaraktires').trim().isString().
    custom(value => {
        for (let ch of value) {
            if (!validator.isAlpha(ch, 'en-US') && ch != ' ') {
                return false;
            }
        }
        return true;
    }),
    check('arithmosafm','The afm number must be 9 numbers characters').trim().notEmpty().isLength({min:9,max:9}),
    check('poso','The mount of buy is not valid').trim().notEmpty().isInt().isLength({min:2,max:4}),
    (req,res,next)=>{
        const errors= validationResult(req)
        if(errors.isEmpty()){
            next()
        }
        else{
            const myerror=errors.array()
            console.log(myerror)
            res.status(400).json({message:myerror[0].msg, success:false})
        }
    }
    
]

export const addWorkHoursValidation=[
    check('workhours','The hours must be number character').trim().isNumeric().notEmpty().isLength({min:1,max:2}),
    (req,res,next)=>{
        const errors= validationResult(req)
        if(errors.isEmpty()){
            next()
        }
        else{
            errors.array()
            res.status(400).json({message:errors[0].msg,success:false})
        }
    }
]

export const addSalaryValidation=[
    check('salary','The salary must be over 600$ per month').trim().isNumeric().notEmpty().custom((value)=>{
        if(value<600){
            return false
        }    
        return true
    }),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(errors.isEmpty()){
            next()
        }
        else{
            const myerror=errors.array()
            res.status(400).json({message:myerror[0].msg,success:false})
        }
    }
]




