const express = require('express');

router = express.Router()

// @Router  GET /api/posts/test
// @Desc    Tests posts route
// @Access  Public route
router.get('/test', 
    (req, res) => res.json({msg:"Posts Works"})
)

module.exports = router;