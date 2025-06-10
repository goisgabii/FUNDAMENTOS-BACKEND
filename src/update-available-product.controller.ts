import { Body, Controller, HttpCode, Patch } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "./pipes/zod-validation-pipe";
import { UpdateAvailableProductService } from "./update-available-product.service";

const updateAvailableProductBodySchema = z.object({
  ids: z.array(z.string()).min(1, "At least one ID must be provided"),
  isAvailable: z.boolean(),
});

const bodyValidationPipe = new ZodValidationPipe(updateAvailableProductBodySchema);

type UpdateAvailableProductBodySchema = z.infer<typeof updateAvailableProductBodySchema>;

@Controller('/products/available')
export class UpdateAvailableProductController {
  constructor(private updateAvailableProduct: UpdateAvailableProductService) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateAvailableProductBodySchema,
  ) {
    const {
      ids,
      isAvailable,
    } = body;

    ids.map(async (id) => {
      await this.updateAvailableProduct.execute({
        id,
        isAvailable,
      });
    });
  }
}