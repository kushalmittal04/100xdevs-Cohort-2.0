function getLength (str) {
    return str.length;
  }
  
  try {
    // const ans = getLength('Kushal Mittal');
    const ans = getLength();
    console.log(ans);
  } catch (err) {
    // throw new Error('Please pass a string');
    console.error("Error occurs");
  }
  
  console.log("Hi there")