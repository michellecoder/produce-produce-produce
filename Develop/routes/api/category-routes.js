const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    try {
        // find all categories, include related products
        const categories = await Category.findAll({ include: [{ model: Product }] });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/:id', (req, res) => {
    try {
        // find one category by its `id` value, include related products
        const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

        if (!category) {
            res.status(404).json({ message: 'No category found with this id!' });
            return;
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});
// ADD NEW CATEGORY
router.post('/', (req, res) => {
    try {
        // create a new category
        const category = await Category.create(req.body);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', (req, res) => {
    try {
        // update a category by its `id` value
        const category = await Category.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});
// DELETE
router.delete('/:id', (req, res) => {
    try {
        // delete a category by its `id` value
        const category = await Category.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;