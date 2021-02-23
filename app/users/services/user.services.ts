import { CRUD } from '../../common/interfaces/crud.interfaces';
import { GenericInMemoryDao } from "../../daos/in.memory.dao";

export class UsersService implements CRUD {

  private static instance: UsersService;
  dao: GenericInMemoryDao;

  constructor() {
    this.dao = GenericInMemoryDao.getInstance();
  }

  static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }

  create(resource: any) {
    return this.dao.addUser(resource);
  }

  deleteById(resourceId: any) {
    return this.dao.removeUserById(resourceId);
  }

  list(limit: number, page: number) {
    return this.dao.getUsers();
  }

  patchById(resource: any) {
    return this.dao.patchUserById(resource);
  }

  readById(resourceId: any) {
    return this.dao.getUserById(resourceId);
  }

  updateById(resource: any) {
    console.log('put resource: ', JSON.stringify(resource))
    return this.dao.putUserById(resource);
  }

  getByEmail(email: string) {
      return this.dao.getUserByEmail(email);
  }
}
