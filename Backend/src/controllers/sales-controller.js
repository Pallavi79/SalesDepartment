const SalesService = require('../services/sales-service');
const salesService = new SalesService();
const initialize = async(req,res)=>{
    try {
        const data = await salesService.initializeDatabase();
        return res.status(201).json({
            success: true,
            message: 'Successfully created database',
            data: data,
            err: {}
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}

const getAll = async(req,res)=>{
    try {
        const data = await salesService.getAll();
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched data from database',
            data: data,
            err: {}
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}

const listTransactions = async(req,res)=>{
    try {
        const searchText = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const transactions = await salesService.listTransactions(searchText, page, perPage);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched data from database',
            data: transactions,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}
const getStatistics = async(req,res)=>{
    try {
        const month = req.query.month;
        const statistics = await salesService.getStatistics(month);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched data from database',
            data: statistics,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}
const getBarChartData= async(req,res)=>{
    try {
        const month = req.query.month;
        const barChartData = await salesService.getBarChartData(month);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched data from database',
            data: barChartData,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
}

const getPieChartData = async (req, res) => {
    try {
        const month = req.query.month;
        const pieChartData = await salesService.getPieChartData(month);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched data from database',
            data: pieChartData,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
};

const getCombinedData = async (req, res) => {
    try {
        const month = req.query.month;
        const combinedData = await salesService.getCombinedData(month);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched data from database',
            data: combinedData,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        });
    }
};
module.exports = {
    initialize,
    getAll,
    listTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
}