import { TestPhoto, TestPhotoInterface } from "../models/testPhoto";
import { Attributes } from "sequelize/types";
import { QueryError } from "../../../../errors/QueryError";

class TestPhotoServiceClass {
    async create(body: Attributes<TestPhotoInterface>) {
        const newTestPhoto = {
        photo: body.photo,
        awsKey: body.awsKey,
        };
    
        await TestPhoto.create(newTestPhoto);
    }
    
    async getAll() {
        const testPhotos = await TestPhoto.findAll({
        attributes: ["idTestPhoto", "photo", "awsKey"],
        });
    
        if (!testPhotos) {
        throw new QueryError("Não há nenhuma foto cadastrada");
        }
    
        return testPhotos;
    }
    
    async getById(id: string) {
        const testPhoto = await TestPhoto.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
        });
    
        if (!testPhoto) {
        throw new QueryError("Foto não encontrada");
        }
    
        return testPhoto;
    }
    
    async delete(id: string) {
        const testPhoto = await TestPhoto.findByPk(id);
    
        if (!testPhoto) {
        throw new QueryError("Foto não encontrada");
        }
    
        await TestPhoto.destroy({ where: { idTestPhoto: id } });
    }
}

export const TestPhotoService = new TestPhotoServiceClass();