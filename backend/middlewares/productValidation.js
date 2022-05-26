const { body } = require("express-validator");

const productCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome do produto é obrigatório.")
      .isLength({ min: 4 })
      .withMessage("O nome deve conter ao menos 4 caracteres"),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 5 })
      .withMessage("A descrição deve conter ao menos 5 caracteres"),
    body("categoryId")
      .optional()
      .isMongoId()
      .withMessage("O id da categoria é obrigatório"),
    body("qtyStock")
      .optional()
      .isDecimal()
      .withMessage("Digite uma quantidade válida em KG"),
    body("price").isDecimal().withMessage("Digite um valor válido"),
  ];
};

const productEditValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("O nome do produto é obrigatório.")
      .isLength({ min: 4 })
      .withMessage("O nome deve conter ao menos 4 caracteres"),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 5 })
      .withMessage("A descrição deve conter ao menos 5 caracteres"),
    body("categoryId")
      .optional()
      .isMongoId()
      .withMessage("O id da categoria é obrigatório"),
    body("qtyStock")
      .optional()
      .isDecimal()
      .withMessage("Digite uma quantidade válida em KG"),
    body("price").optional().isDecimal().withMessage("Digite um valor válido"),
  ];
};

const saleValidation = () => {
  return [
    body("productId").isMongoId().withMessage("Produto inválido"),
    body("qty").isDecimal().withMessage("Quantidade inválida"),
  ];
};

module.exports = {
  productCreateValidation,
  productEditValidation,
  saleValidation,
};
