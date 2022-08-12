export function getFileSize(bytes: number): string {
  const unitList = ["bytes", "kB", "MB"];
  let fileSize = bytes;
  let unitIndex = 0;

  while (fileSize > 1024) {
    fileSize = fileSize / 1024;
    unitIndex += 1;
  }

  const fractionDigitCount = fileSize < 10 ? 2 : fileSize < 100 ? 1 : 0;

  return [fileSize.toFixed(fractionDigitCount), unitList[unitIndex]].join(" ");
}
