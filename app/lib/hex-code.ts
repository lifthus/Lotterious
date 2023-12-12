export function generateHexCode(length: number) {
  let hexCode = "";
  for (let i = 0; i < 16; i++) {
    const randomHex = Math.floor(Math.random() * length);
    hexCode += randomHex.toString(16);
  }
  return hexCode;
}

export function generateHexCode16() {
  return generateHexCode(16);
}
