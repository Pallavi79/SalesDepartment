const express = require('express');
const router = express.Router();
const {initialize,getAll,listTransactions,getStatistics,getBarChartData,getPieChartData,getCombinedData} = require('../../controllers/sales-controller')

router.get('/initialize',initialize);
router.get('/getall',getAll);
router.get('/transactions',listTransactions);
router.get('/statistics',getStatistics);
router.get('/barchart',getBarChartData);
router.get('/piechart',getPieChartData);
router.get('/combinedata',getCombinedData);

module.exports = router;