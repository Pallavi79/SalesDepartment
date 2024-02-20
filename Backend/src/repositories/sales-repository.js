const Sales = require('../models/sales')
class SalesRepository{

    constructor(){
        this.monthMap = {
            'january': 1,
            'february': 2,
            'march': 3,
            'april': 4,
            'may': 5,
            'june': 6,
            'july': 7,
            'august': 8,
            'september': 9,
            'october': 10,
            'november': 11,
            'december': 12
        };
    }
    async insertData(data){
        // console.log('inside sales repo')
        try {
            const sales = await Sales.insertMany(data);
            return sales;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async getAll(){
        console.log('inside getAll')
        try {
            const data = await Sales.find();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async transactions(searchText, page, perPage){
        try {
            let query = {};
            if (searchText) {
                const regex = new RegExp(searchText, 'i');
                query.$or = [
                    { category: regex },
                    { description: regex },
                    
                ];
            }
            if (!isNaN(parseFloat(searchText))) {
                query.$or.push({ price: parseFloat(searchText) });
            }
            // console.log(query);
            return await Sales.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async statistics(month){
        try {
            const monthNumber = this.monthMap[month.toLowerCase()];
    
            if (!monthNumber) {
                throw new Error('Invalid month name. Please provide a valid month name.');
            }
    
            const response = await Sales.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, monthNumber]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: "$price" },
                        totalSoldItems: { $sum: { $cond: { if: "$sold", then: 1, else: 0 } } },
                        totalNotSoldItems: { $sum: { $cond: { if: "$sold", then: 0, else: 1 } } }
                    }
                }
            ]);
            return response[0];
       } catch (error) {
            throw error;
       }
    }
    async barChartData(month){
        try {
            
            const monthNumber = this.monthMap[month.toLowerCase()];
    
            if (!monthNumber) {
                throw new Error('Invalid month name. Please provide a valid month name.');
            }
            const response = await Sales.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, monthNumber]
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                          $switch: {
                            branches: [
                              { case: { $lte: ["$price", 100] }, then: "0-100" },
                              { case: { $lte: ["$price", 200] }, then: "101-200" },
                              { case: { $lte: ["$price", 300] }, then: "201-300" },
                              { case: { $lte: ["$price", 400] }, then: "301-400" },
                              { case: { $lte: ["$price", 500] }, then: "401-500" },
                              { case: { $lte: ["$price", 600] }, then: "501-600" },
                              { case: { $lte: ["$price", 700] }, then: "601-700" },
                              { case: { $lte: ["$price", 800] }, then: "701-800" },
                              { case: { $lte: ["$price", 900] }, then: "801-900" },
                              { case: { $gte: ["$price", 901] }, then: "901-above" }
                            ],
                            default: "Unknown"
                          }
                        },
                        count: { $sum: 1 }
                      }
                }
            ]);
            return response;
        } catch (error) {
            throw error;
        }
        
    }

    async pieChartData(month){
        try {
            const monthNumber = this.monthMap[month.toLowerCase()];
        
            if (!monthNumber) {
                throw new Error('Invalid month name. Please provide a valid month name.');
            }
            const response = await Sales.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, monthNumber]
                        }
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 }
                    }
                }
            ]);
            return response;
            
        } catch (error) {
            throw error;
        }
        
    }

    
}


module.exports= SalesRepository;



