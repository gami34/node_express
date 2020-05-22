var mongoose = require('mongoose')

let footerHelpSchecma = mongoose.Schema({
    url:{
        type:String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

let footerAboutSchema = mongoose.Schema({
    url:{
        type:String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

let footerMoneySchema = mongoose.Schema({
    url:{
        type:String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

let footerInternationalSchema = mongoose.Schema({
    url:{
        type:String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

let footerSocials = mongoose.Schema({
    url:{
        type:String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

let footerPaymentDelivery = mongoose.Schema({
    url:{
        type:String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

exports.HelpSchecma = mongoose.model('HelpSchecma',footerHelpSchecma);
exports.AboutSchema = mongoose.model('AboutSchema',footerAboutSchema);
exports.MoneySchema = mongoose.model('MoneySchema',footerMoneySchema);
exports.SocialsSchema = mongoose.model('SocialsSchema',footerSocials);
exports.PaymentDeliverySchema = mongoose.model('PaymentDeliverySchema',footerPaymentDelivery);
exports.InternationalSchema = mongoose.model('InternationalSchema',footerInternationalSchema);