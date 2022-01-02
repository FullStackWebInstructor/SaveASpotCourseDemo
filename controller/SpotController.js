

class SpotController {

    constructor(request, response) {
        this.request = request;
        this.response = response;

    }

    async getSpots() {
        try {
            // :type can be one of ["all", "requested_by_me", "worked_by_me"]
            this.response.status(200).json({
                spots: [
                    {
                        id: 1,
                        requester: "abc@saveaspot.com",
                        time: "2021-10-01 9:00",
                        location: "UBC IKB 2nd floor east side, any seat",
                        award: "$20",
                        helper: undefined,
                        complete: false
                    },
                    {
                        id: 2,
                        requester: "abc@saveaspot.com",
                        time: "2021-09-01 17:00",
                        location: "UBC Math 101 any seat",
                        award: "$5",
                        helper: "def@saveaspot.com",
                        complete: true
                    },
                    {
                        id: 3,
                        requester: "abc@saveaspot.com",
                        time: "2021-07-01 14:00",
                        location: "UBC DMP 100 1st row any seat",
                        award: "$100",
                        helper: undefined,
                        complete: false
                    }
                ],
                user: this.request.session.userId
            })
        } catch (e) {
            console.log(e);
            this.response.status(500).json({ result: "something goes wrong, sorry!" });
        }
    }

    async createSpot() {

    }

    async completeSpot() {
        this.response.status(200).json({ message: "complete spot successfully! " });
    }

    async helpSpot() {
        this.response.status(200).json({ message: "help spot successfully! " });
    }

}

exports.controller = SpotController;