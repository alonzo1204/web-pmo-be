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

const requestAccess = async (code, pmocode, pmoname, pmolastname) => {
    try {
        await transporter.sendMail({
            from: `"Soporte Acceso" <${mail.user}>`, // sender address
            to: `${pmocode}@upc.edu.pe`, // Correo del PMO
            subject: "Solicitud de Acceso", // Subject line
            html: `
        <b>Estimado(a) ${pmolastname}, ${pmoname}, el alumno con el siguiente codigo ha solictado acceso al aplicativo: </b>
        <a>${code}</a>
        `, // html body
        }).then(() => { return true });
    }
    catch (err) {
        return err
    }
}


module.exports = {
    sendMail,
    requestAccess
}
