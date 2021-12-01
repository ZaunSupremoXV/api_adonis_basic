"use strict"

const UserModel = use("App/Models/User")
const { validate } = use("Validator");

class UserController {
    //INICIO DO CREATE
    async create({ auth, request, response }) {

        const rules = {
            username: 'required',
            email: 'required|email|unique:users,email',
            password: 'required'
        }


        const data = request.only([
            "username",
            "email",
            "password"
        ]);

        const user = {
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password')
        }

        const validation = await validate(data, rules);
        if (validation.fails()) {
            return response.unauthorized(validation.messages());
        } else {

            response.implicitEnd = false;

            return await UserModel.create(user).then(async(data) => {
                await UserModel.findBy('id', data.id).then((data) => {
                    return response.send(data.toJSON());
                });
            });
        }
    };
    // FIM DO CREATE

    // INICIO UPDATE
    async update({ auth, request, response }) {
        const rules = {
            id: "required",
            username: "required",
            // type: 'required'
        };
        const data = request.only([
            "id",
            "username",
            // "type"
        ]);
        const validation = await validate(data, rules);
        if (validation.fails()) {
            return response.unauthorized(validation.messages());
        } else {
            await UserModel.query().where("id", data.id)
                .update({ username: data.username /*, type: data.type */ });
            //return moment.format('YYYY-MM-DD HH:mm:ss');

        }
    };
    // FIM DO UPDATE

    // INICIO DO FINDONE
    async findOne({ auth, request, response }) {
        try {
            if (request.input("id") == null) {
                throw new Error("ID não pode ser nulo");
            }

            return await UserModel.find(request.input("id"))
                .then((data) => {
                    return data;
                });
        } catch (error) {
            return await response.status(403).send(error.toString());
        }

    };
    // FIM DO FINDONE

    // INICIO DO FINDALL
    // async findAll({ auth, request, response }) {
    //     try {
    //         const where = {
    //             empresa_id: request.input("empresa_id", null),
    //         };

    //         const paginate = {
    //             limit: request.input("limit", 10),
    //             page: request.input("page", 1),
    //         };

    //         return await UserModel.query()
    //             .where(where)
    //             //.groupBy("usuario_id").fetch()
    //             .paginate(paginate)
    //             //.fetch()
    //             .then((data) => {
    //                 return data;
    //             });
    //     } catch (error) {
    //         return await response.status(403).send(error.toString());
    //     }
    // };
    // FIM DO FINDALL

    // INICIO DO DELETE
    async delete({ auth, request, response }) {
        const rules = {
            id: "required",
        };
        const data = request.only([
            "id",
        ]);
        const validation = await validate(data, rules);
        if (validation.fails()) {
            return response.unauthorized(validation.messages());
        } else {
            await UserModel.query().where("id", data.id)
                .delete();
            //return moment.format('YYYY-MM-DD HH:mm:ss');
        }
    };
    // FIM DO DELETE
}

module.exports = UserController