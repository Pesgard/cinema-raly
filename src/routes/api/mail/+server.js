import transporter from "$lib/emailSetup.server.js";

export async function POST(requestEvent) {
    const { request } = requestEvent;
    const { user, pelicula, dia, hora, asientos, total } = await request.json();
    // mostrar en consola el contenido del texto
    console.log(user, pelicula, dia, hora, asientos, total);

    let body = `Compra de Boletos\n\nUsuario: ${user}\nPelicula: ${pelicula}\nDia: ${dia}\nHora: ${hora}\nAsientos: ${asientos}\nTotal: ${total}`;

    let html = `<h2>Compra de Boletos</h2><pre>${body}</pre>`;

    const message = {
        from: "testcarritoalan@gmail.com",
        to: user,
        bcc: "gerardoarturogmz@gmail.com",
        subject: "Compra de Boletos",
        text: body,
        html: html,
    };

    const sendEmail = async (message) => {
        await new Promise((resolve, reject) => {
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    };

    await sendEmail(message);
}