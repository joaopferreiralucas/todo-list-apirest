import validator from 'validator';
import bcrypt from 'bcryptjs';

export default class UserValidator {
  async validAll(data:any) {
    if (data.name.length < 3 || data.name.length > 60) {
      return { error: 'Nome precisa ter entre 3 e 60 caracteres' };
    }

    if (data.lastName.length < 3 || data.lastName.length > 60) {
      return { error: 'Sobrenome precisa ter entre 3 e 60 caracteres' };
    }

    if (!validator.isEmail(data.email)) {
      return { error: 'email invalido' };
    }

    if (data.password.length < 3 || data.password.length > 64) {
      return { error: 'senha precisa ter entre 3 e 60 caracteres' };
    }

    const newPassword = await bcrypt.hash(data.password, 8);

    return {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: newPassword,
    };
  }

  comparePass(password:string, password_hash:string) {
    const compare = bcrypt.compare(password, password_hash);
    return compare;
  }
}
