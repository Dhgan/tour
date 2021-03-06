var mongoose = require('mongoose');

var eCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        required: true,
        maxlength: 30
    },
    eType: {
        type: String,
        enum: ['100', '200', '300']
    },
    eCode: String,
    expires: Date
});

var ECode = mongoose.model('ECode', eCodeSchema);
module.exports = ECode;