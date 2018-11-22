const memoryStatus = {
  isInitializing: true
};

const status = {
  get: key => memoryStatus[key],
  set: (key, value) => {
    memoryStatus[key] = value;
  }
};

export default status;
