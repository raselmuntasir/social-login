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
 * Global Scraper Logic for EliteMart
 * Aggregates delivery data from external courier networks
 */
async function scrapeEliteMart(phone) {
    try {
        const jar = new CookieJar();
        const client = wrapper(axios.create({
            jar,
            withCredentials: true,
            timeout: 15000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            }
        }));

        // 1. Get Initial Page to capture CSRF
        const initialRes = await client.get('https://elitemart.com.bd/fraud-check');
        const $initial = cheerio.load(initialRes.data);
        const csrfToken = $initial('input[name="_token"]').val();

        if (!csrfToken) throw new Error('CSRF Token not found');

        // 2. Perform Post Request with the Phone Number
        const params = new URLSearchParams();
        params.append('_token', csrfToken);
        params.append('phone', phone);

        const response = await client.post('https://elitemart.com.bd/fraud-check', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://elitemart.com.bd',
                'Referer': 'https://elitemart.com.bd/fraud-check',
            }
        });

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
        console.error(`Error for ${phone}:`, error.message);
        return null;
    }
}

// Health Check Endpoint
app.get('/', (req, res) => res.send('Fraud Check API is Active. Use /api/check/:phone'));

// Main API Endpoint
app.get('/api/check/:phone', async (req, res) => {
    const { phone } = req.params;
    console.log(`Checking history for: ${phone}`);
    
    const data = await scrapeEliteMart(phone);
    
    if (!data) {
        return res.status(500).json({ error: 'Failed to retrieve data from courier networks' });
    }

    res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('------------------------------------------------');
    console.log(`✔ FRAUD CHECK SERVER RUNNING ON PORT ${PORT}`);
    console.log(`✔ Health Check: http://localhost:${PORT}/`);
    console.log('------------------------------------------------');
});
