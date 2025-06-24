
import { Body, Controller, HttpCode, Patch } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from "zod";
import { UpdateAvailableProductService } from "../update-available-product.service";

const updateAvailableProductBodySchema = z.object({
  ids: z.array(z.string()).min(1, "At least one ID must be provided"),
  isAvailable: z.boolean(),
});

const bodyValidationPipe = new ZodValidationPipe(
  updateAvailableProductBodySchema
);

type UpdateAvailableProductBodySchema = z.infer<
  typeof updateAvailableProductBodySchema
>;

@Controller("/products/available")
export class UpdateAvailableProductController {
  constructor(private updateAvailableProduct: UpdateAvailableProductService) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateAvailableProductBodySchema
  ) {
    const { ids, isAvailable } = body;

    const updatePromises = ids.map((id) => {
      return this.updateAvailableProduct.execute({
        id,
        isAvailable,
      });
    });

    await Promise.all(updatePromises);
  }
}
