import nodemailer from 'nodemailer'

// Simple mailer wrapper. Reads SMTP settings from environment.
// Required env vars (examples):
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  const port = SMTP_PORT ? parseInt(SMTP_PORT, 10) : undefined

  if (!SMTP_HOST || !port || !SMTP_USER || !SMTP_PASS) {
    console.warn('Mailer disabled: missing SMTP env config (SMTP_HOST/PORT/USER/PASS)')
    return null
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // common secure port
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  return transporter
}

export async function sendEmail({ to, subject, text, html }) {
  try {
    const tx = getTransporter()
    if (!tx) {
      // No-op if not configured
      return { disabled: true }
    }

    const redirectTo = process.env.MAIL_REDIRECT_TO //redirect na moj mail (demo account)
    const from = process.env.SMTP_FROM 
    await tx.sendMail({ from, to: redirectTo, subject, text, html })
    return { success: true }
  } catch (err) {
    console.error('Failed to send email:', err?.message || err)
    return { success: false, error: err?.message || String(err) }
  }
}

export function formatApptSummary({ appt, prefix }) {
  if (!appt) return `${prefix || 'Appointment'} details not available.`
  const userName = appt?.userData?.name || 'Patient'
  const doctorName = appt?.docData?.name || 'Doctor'
  const date = appt?.slotDate
  const time = appt?.slotTime
  return `${prefix || 'Appointment'}\nDoctor: ${doctorName}\nPatient: ${userName}\nDate: ${date}\nTime: ${time}`
}
