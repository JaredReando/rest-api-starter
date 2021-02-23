import {Application} from 'express';
import {CommonRoutesConfig, configureRoutes} from '../common/common.routes.config';
import {UsersController} from './controllers/users.controller';
import { UsersMiddleware } from './middleware/users.middleware';

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes{
    constructor(app: Application) {
        super(app, 'UsersRoute');
        this.configureRoutes();
    }

configureRoutes() {
        const userController = new UsersController();
        const usersMiddleware = UsersMiddleware.getInstance()

        //GET -- retrieve a resource or list of resources
        this.app.get(`/users`, [userController.listUsers]);
        
        //POST -- create a new resource
        this.app.post(`/users`, [
            usersMiddleware.validateRequiredCreateUserBodyFields,
            usersMiddleware.validateSameEmailDoesntExist,
            userController.createUser
        ]);
        
        //PUT -- update an entire resource
        this.app.put(`/users/:userId`, [
            usersMiddleware.validateUserExists,
            usersMiddleware.extractUserId,
            userController.patchUser
        ]);

        //PATCH -- update a specific part of a resource
        this.app.patch(`/users/:userId`, [
            usersMiddleware.validateUserExists,
            usersMiddleware.extractUserId,
            userController.patchUser
        ]);

        //DELETE -- remove a specific resource
        this.app.delete(`/users/:userId`, [
            usersMiddleware.validateUserExists,
            usersMiddleware.extractUserId,
            userController.deleteUser
        ]);

        this.app.get(`/users/:userId`, [
            usersMiddleware.validateUserExists,
            usersMiddleware.extractUserId,
            userController.getUserById
        ]);
    }
}