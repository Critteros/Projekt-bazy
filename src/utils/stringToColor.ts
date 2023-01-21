export const stringToColor = async (inputString: string) => {
  const buffer = new TextEncoder().encode(inputString);
  const digest = await window.crypto.subtle.digest('SHA-1', buffer);
  const typedArray = new Uint8Array(digest);
  const hex = Array.from(typedArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return '#' + hex.slice(0, 6);
};
