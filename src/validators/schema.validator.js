export function schemaValidator(objectSchema, object) {
  const validation = objectSchema.validate(object, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  } else {
    return null;
  }
}
