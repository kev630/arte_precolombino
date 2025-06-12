// backend/config/email.js
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brolymaster312@gmail.com',
    pass: 'xhvn txwd pdwz yfci'
  }
});

export const enviarCorreoConfirmacion = async (destinatario, nombre) => {
  const mailOptions = {
    from: 'brolymaster312@gmail.com',
    to: destinatario,
    subject: 'Confirmación de registro - Precolombinos',
    html: `<h3>Hola ${nombre},</h3><p>Gracias por registrarte en Precolombinos. Tu cuenta ha sido creada con éxito.</p>`
  };

  await transporter.sendMail(mailOptions);
};
export const enviarCorreoRecuperacion = async (destinatario, nombre, enlace) => {
  const mailOptions = {
    from: 'brolymaster312@gmail.com',
    to: destinatario,
    subject: 'Recuperación de contraseña - Precolombinos',
    html: `<p>Hola ${nombre},</p>
           <p>Recibimos una solicitud para restablecer tu contraseña.</p>
           <p>Puedes restablecerla haciendo clic en el siguiente enlace:</p>
           <a href="${enlace}">${enlace}</a>
           <p>Este enlace expirará en 15 minutos.</p>`
  };

  await transporter.sendMail(mailOptions);
};