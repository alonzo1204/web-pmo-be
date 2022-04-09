const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "juegaconshiroykuro@gmail.com", //usuario
        pass: "fvovlshlfgahvcge", // contraseña
    },
    tls: {
        rejectUnauthorized: false
    }
});



const sendMail = async (password, code) => {
    try {
        await transporter.sendMail({
            from: '"Provisional Password" <foo@example.com>', // sender address
            to: `vitaljorge2a@gmail.com`, // list of receivers
            subject: "New Password", // Subject line
            html: `
        <b>Su nueva contraseña es: </b>
        <a>${password}</a>
        `, // html body
        }).then(() => { return true });
    }
    catch (err) {
        return err
    }
}


module.exports = {
    sendMail
}
