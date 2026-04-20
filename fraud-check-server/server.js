const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const cors = require('cors');

const app = express();

// Configure CORS to allow your domain
app.use(cors());
app.use(express.json());

/**
 * Global Scraper Logic via Google Apps Script Proxy
 * Bypasses IP blocks by routing through Google's trusted network
 */
async function scrapeEliteMart(phone) {
    try {
        const GOOGLE_PROXY_URL = 'https://script.google.com/macros/s/AKfycbzAu65FSq1VlCQBBxGIWk_cxpjD7q9Xsk4ynoySjR-D-Co_ctO8WnYzMoljzm5OYdIHvQ/exec';
        
        console.log(`Routing through Google Proxy for: ${phone}`);
        
        // Fetch HTML via Google Proxy
        const response = await axios.get(`${GOOGLE_PROXY_URL}?phone=${phone}`, {
            timeout: 30000 // Google Script might take a few seconds
        });

        if (response.data.startsWith('Error:')) {
            throw new Error(response.data);
        }

        const $ = cheerio.load(response.data);
        const couriers = [];
        const seen = new Set();
        let total = 0, success = 0, cancel = 0;

        // Parse Table Data
        $('table tr').each((i, row) => {
            const cells = $(row).find('td');
            if (cells.length >= 4) {
                const rawName = $(cells[0]).text().trim();
                const nameKey = rawName.toUpperCase();

                if (nameKey && nameKey !== 'COURIER NAME' && !seen.has(nameKey)) {
                    const cTotal = parseInt($(cells[1]).text().trim()) || 0;
                    const cSuccess = parseInt($(cells[2]).text().trim()) || 0;
                    const cCancel = parseInt($(cells[3]).text().trim()) || 0;

                    if (cTotal > 0) {
                        couriers.push({
                            name: rawName,
                            total: cTotal,
                            success: cSuccess,
                            cancel: cCancel
                        });
                        total += cTotal;
                        success += cSuccess;
                        cancel += cCancel;
                        seen.add(nameKey);
                    }
                }
            }
        });

        // Fallback for totals if table parsing was incomplete
        if (total === 0) {
            total = parseInt($('.text-info').first().text().match(/\d+/)?.[0]) || 0;
            success = parseInt($('.text-success').first().text().match(/\d+/)?.[0]) || 0;
            cancel = parseInt($('.text-danger').first().text().match(/\d+/)?.[0]) || 0;
        }

        return { total, success, cancel, couriers, timestamp: new Date().toISOString() };
    } catch (error) {
        console.error(`Proxy Error for ${phone}:`, error.message);
        throw new Error(`Proxy Scraping failed: ${error.message}`);
    }
}

// Health Check Endpoint
app.get('/', (req, res) => res.send('Fraud Check API is Active. Use /api/check/:phone'));

// Main API Endpoint
app.get('/api/check/:phone', async (req, res) => {
    const { phone } = req.params;
    console.log(`Checking history for: ${phone}`);
    
    try {
        const data = await scrapeEliteMart(phone);
        if (!data) {
            return res.status(500).json({ 
                error: 'Failed to retrieve data from courier networks',
                tip: 'EliteMart might be blocking the request or the service is temporarily down.'
            });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ 
            error: 'Server Error', 
            message: err.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('------------------------------------------------');
    console.log(`✔ FRAUD CHECK SERVER RUNNING ON PORT ${PORT}`);
    console.log(`✔ Health Check: http://localhost:${PORT}/`);
    console.log('------------------------------------------------');
});
