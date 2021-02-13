import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';

import {Path, Accept, GET} from 'typescript-rest';
import {Tags} from 'typescript-rest-swagger';

const User = mongoose.model('User', UserSchema);

export class UserController{

    /**
     * This description will be used to describe the get operation of path '/mypath' on the generated swagger
     * @param test And this will describe the parameter test of this same operation
     */
    /*@GET
    @Tags('UserRouter')
    @Accept('text/html1')*/

    public register(req: Request, res: Response){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(405).json({ errors: errors.array() })
        }

        req.body.createdAt = new Date();
        var newUser = User(req.body);

        newUser.save(function(err) {
            if (err){
                res.status(500).send();
                return;
            }

            res.status(201).send(newUser);
            return;
        });
    }

    public getusers(req: Request, res: Response){
        User.find({}, function(err, users) {
            if (err){
                res.status(500).send();
                return;
            }

            res.status(201).send(users);
            return;
        });
    }

    public getuserbyid(req: Request, res: Response){
        if(!req.params.userId){
            res.status(400).send();
            return;
        }
        User.findOne({ _id : req.params.userId}, {}, function(err, user) {
            if(err){
                res.status(500).send();
                return;
            }

            if(!user){
                res.status(404).send();
                return;
            }
            res.status(200).send(user);
            return;
        });
    }

    public updateUsersById(req: Request, res: Response){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(405).json({ errors: errors.array() })
        }

        if(!req.params.userId){
            res.status(400).send();
            return;
        }
        User.updateOne({ _id : req.params.userId }, req.body, function(err, result) {
            if(err){
                res.status(500).send();
                return;
            }
            if(result.ok == 0){
                res.status(404).send();
                return;
            }

            req.body._id = req.params.userId;
            res.status(200).send(req.body);
            return;
        });
    }

    public deleteUsersById(req: Request, res: Response){
        if(!req.params.userId){
            res.status(400).send();
            return;
        }

        User.findByIdAndRemove(req.params.userId, function(err, result) {
            if(err){
                res.status(500).send();
                return;
            }

            if(!result){
                res.status(404).send();
                return;
            }

            res.status(200).send();
            return;
        })
    }

    
    /**
     * This method is to get the sum between 2 numbers
     * 
     * @param a  This first param is for 'a' letter.
     * @typeparam a  Comment for type `Number`.
     * @param b  This second param is for 'b' letter.
     * @return   This method return the sum bewteen 'a' and 'b'
     */

    public suma(a : number , b : number){
        return a + b;
    }

}