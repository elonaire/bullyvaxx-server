import { Sequelize } from 'sequelize-typescript';
import { Content } from 'src/content/content.entity';
import { File } from 'src/file-upload/file.entity';
import { SEQUELIZE } from '../constants';
import { Role, School, Sponsor, Sponsorship, Student, User, UserRole } from '../users/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (): Promise<Sequelize> => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PWD,
        database: process.env.DATABASE,
      });
      sequelize.addModels([User, Role, UserRole, Content, File, School, Sponsorship, Student, Sponsor]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
