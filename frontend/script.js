// alert(`hello coders!!!`)
// const name = prompt(`Dame tu nombre: `)
// alert(`Bienvenido ${name}`)
//
const getElementById = (id) => {
  return document.getElementById(id);
};

const rickUrl = 'https://rickandmortyapi.com/api/character';

async function login(email, password) {
  if (!email || !password) {
    alert("Fill all fields");
    return null;
  }

  const coderUrl =
    `http://localhost:3000/coders?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  const response = await fetch(coderUrl);
  const data = await response.json();

  console.log("API response:", data);

  if (data.length === 1) {
    const user = data[0];
    alert(`Login Successful! Welcome ${user.name}`);
    return user;
  } else {
    alert("Error: Incorrect email or password");
    return null;
  }
}


async function getData(url) {
  const response = await fetch(url);
  const { results } = await response.json();

  console.log({ results });

  const ulCharacters = getElementById("characters");

  console.log({ ulCharacters });
  ulCharacters.innerHTML = `<li> abc</li>`;
  results.forEach((character) => {
    console.log(character.name);
    ulCharacters.innerHTML += `<li><img src="${character.image}"/></li>`;
  });
}

getData(rickUrl);
login(prompt('User: '), prompt('Password: '))