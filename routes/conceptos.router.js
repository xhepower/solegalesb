const express = require('express');

const ConceptoService = require('./../services/concepto.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createConceptoSchema,
  updateConceptoSchema,
  getConceptoSchema,
} = require('./../schemas/concepto.schema');

const router = express.Router();
const service = new ConceptoService();

router.get('/', async (req, res, next) => {
  try {
    const conceptos = await service.find();
    res.json(conceptos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getConceptoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const concepto = await service.findOne(id);
      res.json(concepto);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createConceptoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newConcepto = await service.create(body);
      res.status(201).json(newConcepto);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getConceptoSchema, 'params'),
  validatorHandler(updateConceptoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const concepto = await service.update(id, body);
      res.json(concepto);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getConceptoSchema, 'params'),
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
