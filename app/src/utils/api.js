const apiHost = 'http://localhost:3001';

export async function fetchJoin(newUserDetails) {
  const res = await fetch(`${apiHost}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserDetails),
    credentials: 'include',
  });

  const msg = await res.text();
  if (res.status === 201) return msg;

  throw new Error(msg);
}

export async function fetchLogin({ email, password }) {
  const res = await fetch(`${apiHost}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const msg = await res.text();
  if (res.status === 200) return msg;

  throw new Error(msg);
}

export async function fetchAuthN() {
  const res = await fetch(`${apiHost}/auth/signin`, {
    method: 'GET',
    credentials: 'include',
  });

  const msg = await res.text();
  if (res.status === 200) return msg;

  throw new Error(msg);
}

export async function fetchProfile() {
  const res = await fetch(`${apiHost}/profile/`, { credentials: 'include' });

  const profile = await res.json();
  if (res.status === 200) return profile;

  return {};
}

export async function fetchUpdateProfile(profile) {
  const formData = new FormData();
  Object.entries(profile).forEach(([name, value]) => {
    if (value) formData.append(name, value);
  });

  const res = await fetch(`${apiHost}/profile/`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (res.status !== 200) {
    throw new Error('Unable to update profile image');
  }

  const data = await res.json();
  return data;
}

export function main() {
  return null;
}
