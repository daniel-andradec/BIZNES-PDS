import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';

export interface TestPhotoInterface extends Model<InferAttributes<TestPhotoInterface>, InferCreationAttributes<TestPhotoInterface>> {
    idTestPhoto: CreationOptional<number>;
    photo: string;
    awsKey: string;
}

export const TestPhoto = sequelize.define<TestPhotoInterface>('TestPhotos', {
    idTestPhoto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    awsKey: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

TestPhoto.sync({ alter: false, force: false })

    .then(() => {
        console.log('TestPhoto table was (re)created');
    }
    )
    .catch((err) => console.log(err));