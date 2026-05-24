'use server';

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Invalid email address' };
  }

  // TODO: integrate with email marketing platform (Klaviyo, Mailchimp, etc.)
  console.info('Newsletter subscription:', email);

  return { success: true };
}
