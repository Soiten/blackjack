function loadSpritesheet({ img, w, h, x = 0, y = 0 }) {
  const frames = [];

  for (let vert = x; vert < img.height; vert += h) {
    for (let horiz = x; horiz < img.width; horiz += w) {
      frames.push(img.get(horiz, vert, w, h));
    }
  }

  return frames;
}
