

const UserRepository = require('../repository/UserRepository.js').repo;

class UserController {

    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    validate(email, password) {
        const errors = [];

        if (email === undefined || !email.includes("@")) {
            errors.push("email must contain @");
        }

        if (password === undefined || !password.length > 6) {
            errors.push("password length must be at least 6");
        }

        return errors;
    }

    hashPassword(password) {
        return password;
    }

    async login() {
        try {
            if (this.request.session !== undefined && this.request.session.userId !== undefined) {
                this.response.status(200).json({ result: "user has logged in already !" })
            } else {
                const email = this.request.body.email;
                const password = this.request.body.password;

                const errors = this.validate(email, password);

                if (errors.length !== 0) {
                    this.response.status(400).json({ result: errors.join(",") })
                } else {
                    const hashedPass = this.hashPassword(password);

                    const user = await UserRepository.getUser(email);
                    if (user === undefined || user.password !== hashedPass) {
                        this.response.status(403).json({ result: "wrong email or password" });
                    } else {
                        this.request.session.userId = email;
                        this.response.status(200).json({ result: "success" });
                    }
                }
            }
        } catch (e) {
            console.log(e);
            this.response.status(500).json({ result: "something goes wrong, sorry!" });
        }
    }

    async register() {
        try {
            const email = this.request.body.email;
            const password = this.request.body.password;

            const errors = this.validate(email, password);

            if (errors.length !== 0) {
                this.response.status(400).json({ result: errors.join(",") })
            } else {
                const hashedPass = this.hashPassword(password);

                const result = await UserRepository.addUser(email, hashedPass);
                if (result) {
                    this.response.status(200).json({ result: "register successfully" });
                } else {
                    this.response.status(400).json({ result: "email has been registered before" });
                }
            }
        } catch (e) {
            console.log(e);
            this.response.status(500).json({ result: "something goes wrong, sorry!" });
        }
    }

    async logout() {
        if (this.request.session !== undefined) {
            this.request.session.destroy();
        }

        this.response.status(200);
    }
}

exports.controller = UserController;