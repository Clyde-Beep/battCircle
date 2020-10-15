const wig = new ListWidget();
const canvas = new DrawContext();
const canvSize = 200;
const canvTextSize = 24;

const canvFillColor = 'EDEDED'; //Battery remaining color
const canvStrokeColor = '121212'; //Battery depleted color
const canvBackColor = '242424'; //Widget background color
const canvTextColor = 'FFFFFF'; //Widget text color (use same color as above to hide text)

const canvWidth = 22; //Battery circle width
const canvRadius = 80; //Battery circle radius

canvas.size = new Size(canvSize, canvSize);
canvas.respectScreenScale = true;
const batteryLevel = Device.batteryLevel();

function sinDeg(deg) {
  return Math.sin((deg * Math.PI) / 180);
}

function cosDeg(deg) {
  return Math.cos((deg * Math.PI) / 180);
}

function drawArc(ctr, rad, w, deg) {
  bgx = ctr.x - rad;
  bgy = ctr.y - rad;
  bgd = 2 * rad;
  bgr = new Rect(bgx, bgy, bgd, bgd);

  bgc = new Rect(0, 0, canvSize, canvSize);
  canvas.setFillColor(new Color(canvBackColor));
  canvas.fill(bgc);

  canvas.setFillColor(new Color(canvFillColor));
  canvas.setStrokeColor(new Color(canvStrokeColor));
  canvas.setLineWidth(w);
  canvas.strokeEllipse(bgr);

  for (t = 0; t < deg; t++) {
    rect_x = ctr.x + rad * sinDeg(t) - w / 2;
    rect_y = ctr.y - rad * cosDeg(t) - w / 2;
    rect_r = new Rect(rect_x, rect_y, w, w);
    canvas.fillEllipse(rect_r);
  }
}

drawArc(
  new Point(canvSize / 2, canvSize / 2),
  canvRadius,
  canvWidth,
  batteryLevel * 100 * 3.6
);

const canvTextRect = new Rect(
  0,
  100 - canvTextSize / 2,
  canvSize,
  canvTextSize
);
canvas.setTextAlignedCenter();
canvas.setTextColor(new Color(canvTextColor));
canvas.setFont(Font.boldSystemFont(canvTextSize));
canvas.drawTextInRect(`${Math.floor(batteryLevel * 100)}`, canvTextRect);

const canvImage = canvas.getImage();
wig.backgroundImage = canvImage;
Script.setWidget(wig);
Script.complete();
