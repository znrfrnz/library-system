const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';

export async function sendEmail(to: string, subject: string, html: string) {
	if (!RESEND_API_KEY) {
		console.log('[Email] Skipped (no RESEND_API_KEY):', { to, subject });
		return { success: false, reason: 'no_api_key' };
	}

	try {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'SPCBA Library <library@spcba.edu.ph>',
				to,
				subject,
				html
			})
		});
		return { success: res.ok };
	} catch {
		return { success: false, reason: 'send_failed' };
	}
}
