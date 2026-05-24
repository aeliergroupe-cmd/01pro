'use server';

import type { BookingRequest } from '@/types/content';

export async function bookAppointment(data: BookingRequest) {
  // In production: send to CRM / booking system / email notification
  // For now: validate and return success
  if (!data.firstName || !data.lastName || !data.email || !data.appointmentTypeId || !data.atelierId) {
    return { success: false, error: 'Missing required fields' };
  }

  // TODO: integrate with booking API / Vendure custom entity / email service
  console.info('New appointment booking:', data);

  return {
    success: true,
    confirmationId: `APT-${Date.now().toString(36).toUpperCase()}`,
  };
}
