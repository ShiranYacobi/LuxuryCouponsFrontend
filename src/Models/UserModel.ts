import { ClientType } from './ClientTypeModel';

class UserModel {
    public email: string;
    public clientType: ClientType;
    public token: string;
    public isLogged: boolean= false;
}

export default UserModel;
