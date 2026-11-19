import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().trim().min(1, "نام ملک الزامی است"),
  rate: z.number(),
  price: z.number(),
  tags: z.array(z.string()),
  last_updated: z.string().datetime(),
  capacity: z.number(),
  location: z
    .object({ lat: z.number(), lng: z.number() })
    .refine((l) => l.lat !== 0 || l.lng !== 0, {
      message: "locationRequired",
    }),

  address: z.string().trim().min(1, "addressRequired"),
  categories: z.record(z.string(), z.string()),
  bathrooms: z.number(),
  parking: z.number(),
  rooms: z.number(),
  yard_type: z.string(),
  num_comments: z.number(),
  transaction_type: z.enum([
    "rental",
    "mortgage",
    "reservation",
    "direct_purchase",
  ]),
  sellerId: z.number(),
  sellerName: z.string(),
  caption: z.string().nullable(),
});

export type IAddProperty = z.input<typeof propertySchema>;


export const propertyImagesSchema = z
  .array(z.custom<File>((v) => typeof File !== "undefined" && v instanceof File))
  .min(1, "imagesRequired")
  .max(4, "tooManyImages");

export const addPropertyFormSchema = propertySchema.extend({
  images: propertyImagesSchema,
});

export type IProperty = z.input<typeof addPropertyFormSchema>;
export type IPropertyOutput = z.output<typeof addPropertyFormSchema>;