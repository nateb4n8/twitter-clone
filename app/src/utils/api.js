export async function fetchJoin(newUserDetails) {
  const res = await fetch('http://localhost:3001/auth/signup', {
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
  const res = await fetch('http://localhost:3001/auth/signin', {
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

export function main() {
  return null;
}
