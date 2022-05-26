const { body } = require("express-validator");

const categoryCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome da categoria é obrigatório.")
      .isLength({ min: 4 })
      .withMessage("O nome deve conter ao menos 4 caracteres"),
    body("description")
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 5 })
      .withMessage("A descrição deve conter ao menos 5 caracteres"),
  ];
};

const categoryEditValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("O nome da categoria é obrigatório.")
      .isLength({ min: 4 })
      .withMessage("O nome deve conter ao menos 4 caracteres"),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 5 })
      .withMessage("A descrição deve conter ao menos 5 caracteres"),
  ];
};

module.exports = {
  categoryCreateValidation,
  categoryEditValidation,
};
