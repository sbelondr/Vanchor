// const createError = require('http-errors');
// const Note = require('../Models/Note.model');
// const { noteSchema } = require('../Models/Joi/Note.joi');

// module.exports = {
//     get_note: async(req, res, next) => {
//         try {
//             const { id } = req.params;
//             if (!id) {
//                 throw createError.BadRequest();
//             }
//             console.log('je suis la');
//             const result = await Note.find({idUser: id});
//             res.send(result);
//         } catch (error) {
//             if (error.isJoi == true) error.status = 422;
//             next(error);
//         }
//     },
//     post_note: async(req, res, next) => {
//         try {
//             const result = await noteSchema.validateAsync(req.body);
//             const newNote = new Note(result);
//             const savedNote = await newNote.save();

//             res.send({id: savedNote._id});
//         } catch (error) {
//             if (error.isJoi == true) error.status = 422;
//             next(error);
//         }
//     },
//     update_note: async(req, res, next) => {
//         try {
//             const { id, title, content } = req.body;
//             const result = await Note.updateOne({ _id: id }, {
//                 title: title,
//                 content: content
//             });
//             res.send({ result: result.nModified });
//         } catch (err) {
//             if (err) next(err)
//         }
//     },
//     delete_note: async(req, res, next) => {
//         try {
//             const { id } = req.params;
//             if (!id) {
//                 throw createError.BadRequest();
//             }

//             Note.deleteOne({ _id: id }, (err) => {
//                 if (err) next(err);
//             });
//             res.send({result: 1});
//         } catch (error) {
//             next(error);
//         }
//     }
// }
