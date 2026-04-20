const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const getHeaders = () => ({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
});

async function scrapeEliteMart(phone) {
    try {
        const jar = new CookieJar();
        const client = wrapper(axios.create({
            jar,
            withCredentials: true,
            headers: getHeaders(),
            timeout: 10000
        }));

        const initialRes = await client.get('https://elitemart.com.bd/fraud-check');
        const $initial = cheerio.load(initialRes.data);
        const csrfToken = $initial('input[name="_token"]').val();

        if (!csrfToken) throw new Error('CSRF Token not found');

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
        let total = 0, success = 0, cancel = 0;
        const seenCouriers = new Set(); // To prevent duplicates (desktop/mobile views)

        $('table tr').each((i, row) => {
            const cells = $(row).find('td');
            if (cells.length >= 4) {
                const rawName = $(cells[0]).text().trim();
                const name = rawName.toUpperCase(); // Standardize name

                if (name && name !== 'COURIER NAME' && !seenCouriers.has(name)) {
                    const cTotal = parseInt($(cells[1]).text().trim()) || 0;
                    const cSuccess = parseInt($(cells[2]).text().trim()) || 0;
                    const cCancel = parseInt($(cells[3]).text().trim()) || 0;

                    if (cTotal > 0) {
                        couriers.push({ name: rawName, total: cTotal, success: cSuccess, cancel: cCancel });
                        total += cTotal;
                        success += cSuccess;
                        cancel += cCancel;
                        seenCouriers.add(name);
                    }
                }
            }
        });

        // Fallback for totals if table parsing was incomplete or zero
        if (total === 0) {
            total = parseInt($('.text-info').first().text().match(/\d+/)?.[0]) || 0;
            success = parseInt($('.text-success').first().text().match(/\d+/)?.[0]) || 0;
            cancel = parseInt($('.text-danger').first().text().match(/\d+/)?.[0]) || 0;
        }

        return { total, success, cancel, couriers };
    } catch (error) {
        console.error('Scraping Error:', error.message);
        return null;
    }
}

app.get('/api/check/:phone', async (req, res) => {
    const { phone } = req.params;
    console.log(`Checking fraud for: ${phone}`);
    const data = await scrapeEliteMart(phone);
    if (!data) return res.status(500).json({ error: 'Failed to fetch data' });

    const rate = data.total > 0 ? Math.round((data.success / data.total) * 100) : 0;
    res.json({ ...data, trustScore: rate, checkedAt: new Date().toISOString() });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\x1b[32m✔ Fraud Scraper API is running on http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[33mKeep this terminal open to use Fraud Check in your Admin Panel.\x1b[0m`);
});
