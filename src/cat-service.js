export class CatService {
  static async getCatPicture() {
    try {
      const response = await fetch(`https://thatcopy.pw/catapi/rest/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    } catch(error) {
      return error.message;
    }
  }

  static async getCatFact() {
    try {
      const response = await fetch(`https://catfact.ninja/fact?max_length=140`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
  static async getCatName() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1500`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }

  static async getCatStats() {
    const max = 750;
    const seed = Math.floor(Math.random() * max);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${seed}/`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}