const nodemailer = require("nodemailer");

const mail = {
    user: "emgore.1410@gmail.com",
    pass: "krewwlalbmixaost"

}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: mail.user, //usuario
        pass: mail.pass, // contraseña
    },
    tls: {
        rejectUnauthorized: false
    }
});



const sendMail = async (password, code) => {
    try {
        await transporter.sendMail({
            from: `"Provisional Password" <${mail.user}>`, // sender address
            to: `${code}@upc.edu.pe`, // list of receivers
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
