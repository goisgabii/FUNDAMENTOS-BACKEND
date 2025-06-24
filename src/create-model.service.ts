
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelsRepository } from "./models.repository";

interface CreateModelServiceRequest {
  name: string;
}

@Injectable()
export class CreateModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ name }: CreateModelServiceRequest): Promise<void> {
    const modelWithSameName = await this.modelsRepository.findById(name);

    if (modelWithSameName) {
      throw new HttpException(
        "Model with same name already exists.",
        HttpStatus.BAD_REQUEST
      );
    }

    const model = {
      name,
    };

    await this.modelsRepository.create(model);
  }
}
