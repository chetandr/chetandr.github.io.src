export const layerScaleX = window.innerWidth / 980;
export const layerScaleY = window.innerHeight / 580;
export const rearX = (window.innerWidth * 0.08) / layerScaleX;
export const rearY = (window.innerHeight * 0.22) / layerScaleY;
export const rearSideTextX = rearX - 50;
export const rearSideTextY = rearY + 190;
export const frontX = (window.innerWidth * 0.35) / layerScaleX;
export const frontY = (window.innerHeight * 0.33) / layerScaleY;
export const frontSideTextX = frontX - 150;
export const frontSideTextY = frontY + 126;
export const passengerSideX = (window.innerWidth * 0.6) / layerScaleX;
export const passengerSideY = (window.innerHeight * 0.3) / layerScaleY;
export const passengerSideTextX = passengerSideX - 150;
export const passengerSideTextY = passengerSideY + 30;
export const driverSideX = (window.innerWidth * 0.6) / layerScaleX;
export const driverSideY = (window.innerHeight * 0.6) / layerScaleY;
export const driverSideTextX = driverSideX - 150;
export const driverSideTextY = driverSideY + 10;
export const interiorX = window.innerWidth / 980 + 100;
export const interiorY = window.innerHeight / 580 + 200;
export const interiorPassengerTextX = interiorX;
export const interiorPassengerTextY = interiorY - 90;
export const interiorDriverTextX = interiorX;
export const interiorDriverTextY = interiorY + 140;
export const interiorPassengerDoorX = interiorX + 500;
export const interiorPassengerDoorY = interiorY - 20;
export const interiorPassengerDoorTextX = interiorPassengerDoorX - 150;
export const interiorPassengerDoorTextY = interiorPassengerDoorY + 30;
export const interiorDriverDoorX = interiorX + 500;
export const interiorDriverDoorY = interiorY + 170;
export const interiorDriverDoorTextX = interiorDriverDoorX - 150;
export const interiorDriverDoorTextY = interiorDriverDoorY - 20;
export const scale = 0.5;
export const scaleRatio = 0.5 / scale;
export const carParts = {
  exterior: [
    { type: "FRONT_BONNET", img: "bonnet.png", x: frontX, y: frontY + 88 },
    { type: "FRONT_TOP", img: "top.png", x: rearX, y: rearY }, // start Rear side
    { type: "REAR_BOOT", img: "Boot.png", x: rearX - 10, y: rearY + 170 },
    {
      type: "REAR_DRIVER_SIDE_TAIL_LIGHT",
      img: "left_taillight.png",
      x: rearX - 65,
      y: rearY + 210,
    },
    {
      type: "REAR_PASSENGER_SIDE_TAIL_LIGHT",
      img: "right_taillight.png",
      x: rearX + 135,
      y: rearY + 210,
    },
    {
      type: "REAR_PASSENGER_SIDE_BUMPER",
      img: "rear_passenger_side_bumper.png",
      x: rearX - 35,
      y: rearY + 250,
    },
    {
      type: "REAR_DRIVER_SIDE_BUMPER",
      img: "rear_driver_side_bumper.png",
      x: rearX + 51,
      y: rearY + 250,
    },
    { type: "FRONT_WIND_SCREEN", img: "windshield.png", x: frontX, y: frontY }, // start front side
    {
      type: "FRONT_DRIVER_SIDE_HEAD_LIGHT",
      img: "left_headlight.png",
      x: frontX - 20,
      y: frontY + 133,
    },
    {
      type: "FRONT_PASSENGER_SIDE_HEAD_LIGHT",
      img: "right_headlight.png",
      x: frontX + 130,
      y: frontY + 133,
    },
    {
      type: "DRIVER_SIDE_BUMPER",
      img: "left_bumper.png",
      x: frontX - 10,
      y: frontY + 173,
    },
    {
      type: "PASSENGER_SIDE_BUMPER",
      img: "right_bumper.png",
      x: frontX + 70,
      y: frontY + 173,
    },
    {
      type: "PASSENGER_SIDE_FENDER",
      img: "passenger_side_fender.png",
      x: passengerSideX,
      y: passengerSideY,
    },
    {
      type: "PASSENGER_SIDE_FRONT_DOOR",
      img: "passenger_side_front_door.png",
      x: passengerSideX + 85,
      y: passengerSideY - 42,
    },
    {
      type: "PASSENGER_SIDE_REAR_DOOR",
      img: "passenger_side_rear_door.png",
      x: passengerSideX + 185,
      y: passengerSideY - 42,
    },
    {
      type: "PASSENGER_SIDE_QUATER",
      img: "passenger_side_quarter.png",
      x: passengerSideX + 245,
      y: passengerSideY - 42,
    },
    {
      type: "PASSENGER_SIDE_FRONT_RIM",
      img: "passenger_side_front_rim.png",
      x: passengerSideX - 40,
      y: passengerSideY + 50,
    },
    {
      type: "PASSENGER_SIDE_FRONT_WHEEL",
      img: "passenger_side_front_tyre.png",
      x: passengerSideX + 5,
      y: passengerSideY + 43,
    },
    {
      type: "PASSENGER_SIDE_ROCKER_PANEL",
      img: "passenger_side_rocker_panel.png",
      x: passengerSideX + 95,
      y: passengerSideY + 83,
    },
    {
      type: "PASSENGER_SIDE_REAR_WHEEL",
      img: "passenger_side_rear_tyre.png",
      x: passengerSideX + 270,
      y: passengerSideY + 48,
    },
    {
      type: "PASSENGER_SIDE_REAR_RIM",
      img: "passenger_side_rear_rim.png",
      x: passengerSideX + 335,
      y: passengerSideY + 55,
    },
    {
      type: "DRIVER_SIDE_QUATER",
      img: "driver_side_quarter.png",
      x: driverSideX,
      y: driverSideY,
    },
    {
      type: "DRIVER_SIDE_REAR_DOOR",
      img: "driver_side_rear_door.png",
      x: driverSideX + 50,
      y: driverSideY,
    },
    {
      type: "DRIVER_SIDE_FRONT_DOOR",
      img: "driver_side_front_door.png",
      x: driverSideX + 140,
      y: driverSideY,
    },
    {
      type: "DRIVER_SIDE_FENDER",
      img: "driver_side_fender.png",
      x: driverSideX + 240,
      y: driverSideY + 42,
    },
    {
      type: "DRIVER_SIDE_REAR_RIM",
      img: "driver_side_rear_rim.png",
      x: driverSideX - 40,
      y: driverSideY + 100,
    },
    {
      type: "DRIVER_SIDE_REAR_WHEEL",
      img: "driver_side_rear_tyre.png",
      x: driverSideX + 2,
      y: driverSideY + 100,
    },
    {
      type: "DRIVER_SIDE_ROCKER_PANEL",
      img: "driver_side_rocker_panel.png",
      x: driverSideX + 95,
      y: driverSideY + 125,
    },
    {
      type: "DRIVER_SIDE_FRONT_WHEEL",
      img: "driver_side_front_tyre.png",
      x: driverSideX + 260,
      y: driverSideY + 90,
    },
    {
      type: "DRIVER_SIDE_FRONT_RIM",
      img: "driver_side_front_rim.png",
      x: driverSideX + 330,
      y: driverSideY + 95,
    },
  ],
  interior: [
    { type: "INTERIOR_REAR_SEAT", img: "rear_seat.png", x: interiorX, y: interiorY }, // start interior side
    {
      type: "INTERIOR_PASSENGER_SIDE_FRONT_SEAT",
      img: "passenger_seat.png",
      x: interiorX + 180,
      y: interiorY,
    },
    {
      type: "INTERIOR_GEAR_AREA",
      img: "gear_box.png",
      x: interiorX + 180,
      y: interiorY + 110,
    },
    {
      type: "INTERIOR_DRIVER_SIDE_FRONT_SEAT",
      img: "driver_seat.png",
      x: interiorX + 180,
      y: interiorY + 150,
    },
    {
      type: "INTERIOR_DASHBOARD",
      img: "dashboard.png",
      x: interiorX + 330,
      y: interiorY + 16,
    },
    {
      type: "INTERIOR_DASHBOARD_2",
      img: "dashboard_2.png",
      x: interiorX + 420,
      y: interiorY + 16,
    },
    {
      type: "INTERIOR_PASSENGER_SIDE_REAR_DOOR",
      img: "passenger_side_rear_door.png",
      x: interiorPassengerDoorX,
      y: interiorPassengerDoorY + 5,
    },
    {
      type: "INTERIOR_PASSENGER_SIDE_FRONT_DOOR",
      img: "passenger_side_front_door.png",
      x: interiorPassengerDoorX + 170,
      y: interiorPassengerDoorY,
    },
    {
      type: "INTERIOR_DRIVER_SIDE_REAR_DOOR",
      img: "driver_side_rear_door.png",
      x: interiorDriverDoorX,
      y: interiorDriverDoorY,
    },
    {
      type: "INTERIOR_DRIVER_SIDE_FRONT_DOOR",
      img: "driver_side_front_door.png",
      x: interiorDriverDoorX + 170,
      y: interiorDriverDoorY,
    },
  ],
};

export const exteriorClaimsCaptureSequence = [
  "FRONT_BONNET",
  "FRONT_PASSENGER_SIDE_HEAD_LIGHT",
  "FRONT_PASSENGER_SIDE_BUMPER",
  "FRONT_DRIVER_SIDE_HEAD_LIGHT",
  "FRONT_DRIVER_SIDE_BUMPER",
  "FRONT_PASSENGER_SIDE_RIM",
  "FRONT_PASSENGER_SIDE_WHEEL",
  "PASSENGER_SIDE_FENDER",
  "PASSENGER_SIDE_FRONT_DOOR",
  "PASSENGER_SIDE_REAR_DOOR",
  "PASSENGER_SIDE_ROCKER_PANEL",
  "PASSENGER_SIDE_QUATER",
  "PASSENGER_SIDE_REAR_WHEEL",
  "PASSENGER_SIDE_REAR_RIM",
  "DRIVER_SIDE_REAR_RIM",
  "DRIVER_SIDE_REAR_WHEEL",
  "DRIVER_SIDE_QUATER",
  "DRIVER_SIDE_REAR_DOOR",
  "DRIVER_SIDE_FRONT_DOOR",
  "DRIVER_SIDE_ROCKER_PANEL",
  "DRIVER_SIDE_FENDER",
  "DRIVER_SIDE_FRONT_WHEEL",
  "DRIVER_SIDE_FRONT_RIM",
  "FRONT_WIND_SCREEN",
  "FRONT_TOP",
  "REAR_DRIVER_SIDE_TAIL_LIGHT",
  "REAR_DRIVER_SIDE_BUMPER",
  "REAR_PASSENGER_SIDE_TAIL_LIGHT",
  "REAR_PASSENGER_SIDE_BUMPER",
  "REAR_BOOT",
  "REAR_WIND_SCREEN",
];
