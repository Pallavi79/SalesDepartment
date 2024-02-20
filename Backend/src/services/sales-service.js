require('dotenv').config();
const SalesRepository = require('../repositories/sales-repository');


class SalesService{
    constructor(){
        this.salesRepository=new SalesRepository();
    }

    async initializeDatabase(){
        // console.log('inside salesService');
        const response = await fetch(process.env.API_URL);
        const data = await response.json();
        console.log(data);
        const insertedData = await this.salesRepository.insertData(data);
        return insertedData;
    }

    async getAll(){
        const response = await this.salesRepository.getAll();
        return response;
    }

    async listTransactions(searchText, page, perPage){  
        const response = await this.salesRepository.transactions(searchText, page, perPage);
        return response;
    }
    async getStatistics(month){
        const response = await this.salesRepository.statistics(month);
        return response;
    }
    async getBarChartData(month){
        const response = await this.salesRepository.barChartData(month);
        return response;
    };

    async getPieChartData(month){
        const response = await this.salesRepository.pieChartData(month);
        return response;
    };

    async getCombinedData (month){
        const transactions = await this.listTransactions('', 1, 10);
        const statistics = await this.getStatistics(month);
        const barChartData = await this.getBarChartData(month);
        const pieChartData = await this.getPieChartData(month);
    
        return {
            transactions,
            statistics,
            barChartData,
            pieChartData
        };
    };
    
}

module.exports = SalesService;