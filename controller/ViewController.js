

class ViewController {

    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    loginPage() {
        if (this.request.session.userId === undefined) {
            this.response.sendFile("login.html", {
                root: "./view"
            });
        } else {
            this.response.redirect("/spots");
        }
    }

    registerPage() {
        this.response.sendFile("register.html", {
            root: "./view"
        });
    }

    spotsPage() {
        if (this.request.session.userId === undefined) {
            this.response.redirect("/");
        } else {
            this.response.sendFile("spots.html", {
                root: "./view"
            });
        }
    }
}

exports.controller = ViewController;