

class SpotController {

    constructor(request, response) {
        this.request = request;
        this.response = response;

    }

    async getSpots() {
        try {
            // :type can be one of ["all", "requested_by_me", "worked_by_me"]
            // TODO
        } catch (e) {
            console.log(e);
            this.response.status(500).json({ result: "something goes wrong, sorry!" });
        }
    }

    async createSpot() {
        try {
            // TODO
        } catch (e) {
            console.log(e);
            this.response.status(500).json({ result: "something goes wrong, sorry!" });
        }
    }

    async completeSpot() {
        try {
            // TODO
        } catch (e) {
            console.log(e);
            this.response.status(500).json({ result: "something goes wrong, sorry!" });
        }
    }

    async helpSpot() {
        try {
            // TODO
        } catch (e) {
            console.log(e);
            this.response.status(500).json({ result: "something goes wrong, sorry!" });
        }
    }

}

exports.controller = SpotController;