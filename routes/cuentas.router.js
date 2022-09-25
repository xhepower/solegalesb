const express = require('express');

const CuentaService = require('./../services/cuenta.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCuentaSchema,
  updateCuentaSchema,
  getCuentaSchema,
} = require('./../schemas/cuenta.schema');

const router = express.Router();
const service = new CuentaService();

router.get('/', async (req, res, next) => {
  try {
    const cuentas = await service.find();
    res.json(cuentas);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCuentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cuenta = await service.findOne(id);
      res.json(cuenta);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCuentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCuenta = await service.create(body);
      res.status(201).json(newCuenta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCuentaSchema, 'params'),
  validatorHandler(updateCuentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const cuenta = await service.update(id, body);
      res.json(cuenta);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCuentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
