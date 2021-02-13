import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { check } from "express-validator";
import { CustomValidators } from "../util/customValidators";
import { verify } from 'jsonwebtoken';

export class UserRoutes { 
    
    public userController: UserController = new UserController() 
    public customValidators: CustomValidators = new CustomValidators();
    
    public routes(app): void {

        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'API Working Correctly now'
            })
        });
        
        app.route('/createUser').post([
            check('name').isLength({ min: 1, max : 20 }).withMessage('Name field is not correct'),
            check('birthDate').isLength({ min: 1 }).custom(this.customValidators.isValidDate).withMessage('BirthDate field is not correct'),
            check('email').isLength({ min: 1 }).isEmail().withMessage('Email field is not correct'),
            check('address').exists().withMessage('Address field is not correct')
        ], this.userController.register);

        app.route('/getusers').get(this.userController.getusers);
        app.route('/getusersById/:userId').get(this.userController.getuserbyid);
        app.route('/updateUsersById/:userId').put([
            check('name').isLength({ min: 1, max : 20 }).withMessage('Name field is not correct'),
            check('birthDate').isLength({ min: 1 }).custom(this.customValidators.isValidDate).withMessage('BirthDate field is not correct'),
            check('email').isLength({ min: 1 }).isEmail().withMessage('Email field is not correct'),
            check('address').exists().withMessage('Address field is not correct')
        ],this.userController.updateUsersById);
        app.route('/deleteUsersById/:userId').delete(this.userController.deleteUsersById);
    }
}