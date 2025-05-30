export const safeParseJson = (value) => {
  try {
    return JSON.parse(value)
  } catch (e) {
  }
};

export const formatInputDate = (date) => (date && (new Date(date)).toLocaleDateString('en-CA'));

export const formatInputYear = (year) => (year && (new Date(year)).getFullYear());

export const formatInputDatetime = (datetime) => (datetime?.replace(/\..+/, ''));

export const convertHexToRGBA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 0.01 && opacity <= 1) {
    opacity = opacity * 255;
  }

  return [r, g , b, opacity];
};
