const express = require('express');

router = express.Router()

// @Router  GET /api/users/test
// @Desc    Tests users route
// @Access  Public route
router.get('/test', 
    (req, res) => res.json({msg:"User Works"})
)

module.exports = router;