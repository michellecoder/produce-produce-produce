const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
    try {
        const tags = await Tag.findAll({ include: [{ model: Product }] });
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const tag = await Tag.findByPK(req.params.id, { include: [{ model: Product }] });

        if (!tag) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const tag = await Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const tag = await Tag.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;