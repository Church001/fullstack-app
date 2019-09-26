const express = require('express');

router = express.Router() //creating an instance of Router

// @Router  GET /api/profile/test
// @Desc    Tests profile route
// @Access  Public route
router.get('/test', 
    (req, res) => res.json({
        msg:"Profile Works"
    })
)

module.exports = router;