export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Please enter your email address'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
  return null
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Please enter your phone number'
  const stripped = phone.replace(/[\s\-().]/g, '')
  // UK: 07xxxxxxxxx (11 digits) or +447xxxxxxxxx
  if (/^07\d{9}$/.test(stripped)) return null
  if (/^\+447\d{9}$/.test(stripped)) return null
  if (/^447\d{9}$/.test(stripped)) return null
  return 'Please enter a valid UK number (e.g. 07700 900000 or +44 7700 900000)'
}

export function validatePostcode(postcode: string): string | null {
  if (!postcode.trim()) return 'Please enter the postcode'
  const cleaned = postcode.replace(/\s/g, '').toUpperCase()
  if (cleaned.length < 3) return 'Please enter a valid UK postcode'
  if (!/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(cleaned)) {
    return 'Please enter a valid UK postcode (e.g. SW1A 1AA)'
  }
  return null
}

export function validateRequired(value: string, label: string): string | null {
  if (!value.trim()) return `Please enter your ${label}`
  return null
}
