const uuidv3 = require('uuid/v3');

const Models = require('./models');

class Controller {
    async getIndex(req, res) {
        res.render('index', { title: 'Express' });
    }

    async getAllUrls(req, res) {
        const urls = await Models.find({})
        res.send(urls)
    }

    async addOneUrl(req, res) {
        const { url } = req.body;

        if (!url) {
            return res.setHeader(400).send()
        }

        let urlObject = await Models.findOne({ url })
        if (!urlObject) {
            urlObject = {
                url, short_url_id: uuidv3('http://example.com/hello', uuidv3.URL)
            }
            await Models.create(urlObject)
        }
        res.send(urlObject)
    }

    async redirection(req, res) {
        const { short_url_id } = req.params

        if (!short_url_id) {
            return res.setHeader(400).send()
        }

        let urlObject = await Models.findOne({ short_url_id })

        if (!urlObject) {
            return res.setHeader(400).send()
        }

        res.redirect(urlObject.url)
    }
}

module.exports = new Controller()
