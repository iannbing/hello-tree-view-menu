const memory = {};

const cache = {
  get: key => memory[key],
  set: (key, value) => {
    memory[key] = value;
  }
};

export default cache;
