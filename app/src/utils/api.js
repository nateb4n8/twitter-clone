export function fetchJoin(newUserDetails) {
  return fetch('http://localhost:3001/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserDetails),
  })
    .then(res => res.text());
}
