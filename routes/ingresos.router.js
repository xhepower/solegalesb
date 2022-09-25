const express = require('express');

const IngresosService = require('./../services/ingreso.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createIngresoSchema,
  updateIngresoSchema,
  getIngresoSchema,
  queryIngresoSchema,
} = require('./../schemas/ingreso.schema');

const router = express.Router();
const service = new IngresosService();

router.get(
  '/',
  validatorHandler(queryIngresoSchema, 'query'),
  async (req, res, next) => {
    try {
      const ingresos = await service.find(req.query);
      res.json(ingresos);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getIngresoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ingreso = await service.findOne(id);
      res.json(ingreso);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createIngresoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newIngreso = await service.create(body);
      res.status(201).json(newIngreso);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getIngresoSchema, 'params'),
  validatorHandler(updateIngresoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const ingreso = await service.update(id, body);
      res.json(ingreso);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getIngresoSchema, 'params'),
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
