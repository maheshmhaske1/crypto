const axios = require("axios");


exports.getCryptoNews = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-update-live.p.rapidapi.com/news',
        headers: {
            'X-RapidAPI-Key': 'b08b72cf5fmsh871c509eb005ce9p1cdf62jsn1947299d891b',
            'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return res.json({
            status: true,
            data: response.data
        })
    }).catch(function (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'something went wrong'
        })
    });
}

exports.getCryptoDetails = async (req, res) => {
    const { currency_name } = req.params

    const options = {
        method: 'GET',
        url: `https://crypto-update-live.p.rapidapi.com/currency/${currency_name}`,
        headers: {
            'X-RapidAPI-Key': 'b08b72cf5fmsh871c509eb005ce9p1cdf62jsn1947299d891b',
            'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return res.json({
            status: true,
            data: response.data
        })
    }).catch(function (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'something went wrong'
        })
    });

}

exports.getTopGainerAndLoser = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-update-live.p.rapidapi.com/top-gainers-losers',
        headers: {
            'X-RapidAPI-Key': 'b08b72cf5fmsh871c509eb005ce9p1cdf62jsn1947299d891b',
            'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return res.json({
            status: true,
            data: response.data
        })
    }).catch(function (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'something went wrong'
        })
    });
}

exports.getTop50 = async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://crypto-update-live.p.rapidapi.com/top-currency/top_50_details',
        headers: {
            'X-RapidAPI-Key': 'b08b72cf5fmsh871c509eb005ce9p1cdf62jsn1947299d891b',
            'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
        }
    };


    axios.request(options).then(function (response) {
        console.log(response.data);
        return res.json({
            status: true,
            data: response.data
        })
    }).catch(function (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'something went wrong', error
        })
    });
}