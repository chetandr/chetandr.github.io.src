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
    { type: "Top", img: "top.png", x: rearX, y: rearY }, // start Rear side
    { type: "Boot", img: "Boot.png", x: rearX - 10, y: rearY + 170 },
    {
      type: "Left Taillight",
      img: "left_taillight.png",
      x: rearX - 65,
      y: rearY + 210,
    },
    {
      type: "Right Taillight",
      img: "right_taillight.png",
      x: rearX + 135,
      y: rearY + 210,
    },
    {
      type: "Rear Passenger Side Bumper",
      img: "rear_passenger_side_bumper.png",
      x: rearX - 35,
      y: rearY + 250,
    },
    {
      type: "Rear Driver Side Bumper",
      img: "rear_driver_side_bumper.png",
      x: rearX + 51,
      y: rearY + 250,
    },
    { type: "Windshield", img: "windshield.png", x: frontX, y: frontY }, // start front side
    { type: "Bonnet", img: "bonnet.png", x: frontX, y: frontY + 88 },
    {
      type: "Left Headlight",
      img: "left_headlight.png",
      x: frontX - 20,
      y: frontY + 133,
    },
    {
      type: "Right Headlight",
      img: "right_headlight.png",
      x: frontX + 130,
      y: frontY + 133,
    },
    {
      type: "Left Bumper",
      img: "left_bumper.png",
      x: frontX - 10,
      y: frontY + 173,
    },
    {
      type: "Right Bumper",
      img: "right_bumper.png",
      x: frontX + 70,
      y: frontY + 173,
    },
    {
      type: "Passenger Side fender",
      img: "passenger_side_fender.png",
      x: passengerSideX,
      y: passengerSideY,
    },
    {
      type: "Passenger Side Front Door",
      img: "passenger_side_front_door.png",
      x: passengerSideX + 85,
      y: passengerSideY - 42,
    },
    {
      type: "Passenger Side Rear Door",
      img: "passenger_side_rear_door.png",
      x: passengerSideX + 185,
      y: passengerSideY - 42,
    },
    {
      type: "Passenger Side Quarter",
      img: "passenger_side_quarter.png",
      x: passengerSideX + 245,
      y: passengerSideY - 42,
    },
    {
      type: "Passenger Side Front Rim",
      img: "passenger_side_front_rim.png",
      x: passengerSideX - 40,
      y: passengerSideY + 50,
    },
    {
      type: "Passenger Side Front Tyre",
      img: "passenger_side_front_tyre.png",
      x: passengerSideX + 5,
      y: passengerSideY + 43,
    },
    {
      type: "Passenger Side Rocker Panel",
      img: "passenger_side_rocker_panel.png",
      x: passengerSideX + 95,
      y: passengerSideY + 83,
    },
    {
      type: "Passenger Side Rear Tyre",
      img: "passenger_side_rear_tyre.png",
      x: passengerSideX + 270,
      y: passengerSideY + 48,
    },
    {
      type: "Passenger Side Rear Rim",
      img: "passenger_side_rear_rim.png",
      x: passengerSideX + 335,
      y: passengerSideY + 55,
    },
    {
      type: "Driver Side Quarter",
      img: "driver_side_quarter.png",
      x: driverSideX,
      y: driverSideY,
    },
    {
      type: "Driver Side Rear Door",
      img: "driver_side_rear_door.png",
      x: driverSideX + 50,
      y: driverSideY,
    },
    {
      type: "Driver Side Front Door",
      img: "driver_side_front_door.png",
      x: driverSideX + 140,
      y: driverSideY,
    },
    {
      type: "Driver Side Fender",
      img: "driver_side_fender.png",
      x: driverSideX + 240,
      y: driverSideY + 42,
    },
    {
      type: "Driver Side Rear Rim",
      img: "driver_side_rear_rim.png",
      x: driverSideX - 40,
      y: driverSideY + 100,
    },
    {
      type: "Driver Side Rear Tyre",
      img: "driver_side_rear_tyre.png",
      x: driverSideX + 2,
      y: driverSideY + 100,
    },
    {
      type: "Driver Side Rocker Panel",
      img: "driver_side_rocker_panel.png",
      x: driverSideX + 95,
      y: driverSideY + 125,
    },
    {
      type: "Driver Side Front Tyre",
      img: "driver_side_front_tyre.png",
      x: driverSideX + 260,
      y: driverSideY + 90,
    },
    {
      type: "Driver Side Front Rim",
      img: "driver_side_front_rim.png",
      x: driverSideX + 330,
      y: driverSideY + 95,
    },
  ],
  interior: [
    { type: "Rear Seat", img: "rear_seat.png", x: interiorX, y: interiorY }, // start interior side
    {
      type: "Passenger Seat",
      img: "passenger_seat.png",
      x: interiorX + 180,
      y: interiorY,
    },
    {
      type: "Gear Box",
      img: "gear_box.png",
      x: interiorX + 180,
      y: interiorY + 110,
    },
    {
      type: "Driver Seat",
      img: "driver_seat.png",
      x: interiorX + 180,
      y: interiorY + 150,
    },
    {
      type: "Dashboard",
      img: "dashboard.png",
      x: interiorX + 330,
      y: interiorY + 16,
    },
    {
      type: "Dashboard 2",
      img: "dashboard_2.png",
      x: interiorX + 420,
      y: interiorY + 16,
    },
    {
      type: "Passenger Side Rear Door",
      img: "passenger_side_rear_door.png",
      x: interiorPassengerDoorX,
      y: interiorPassengerDoorY + 5,
    },
    {
      type: "Passenger Side Front Door",
      img: "passenger_side_front_door.png",
      x: interiorPassengerDoorX + 170,
      y: interiorPassengerDoorY,
    },
    {
      type: "Driver Side Rear Door",
      img: "driver_side_rear_door.png",
      x: interiorDriverDoorX,
      y: interiorDriverDoorY,
    },
    {
      type: "Driver Side Front Door",
      img: "driver_side_front_door.png",
      x: interiorDriverDoorX + 170,
      y: interiorDriverDoorY,
    },
  ],
};

export const exteriorClaimsCaptureSequence = [
  "Bonnet",
  "Front Right Headlight",
  "Front Right Bumper",
  "Front Left Headlight",
  "Front Left Bumper",
  "Passenger Side Front Rim",
  "Passenger Side Front Tyre",
  "Passenger Side fender",
  "Passenger Side Front Door",
  "Passenger Side Rear Door",
  "Passenger Side Rocker Panel",
  "Passenger Side Quarter",
  "Passenger Side Rear Tyre",
  "Passenger Side Rear Rim",
  "Driver Side Rear Rim",
  "Driver Side Rear Tyre",
  "Driver Side Quarter",
  "Driver Side Rear Door",
  "Driver Side Front Door",
  "Driver Side Rocker Panel",
  "Driver Side Fender",
  "Driver Side Front Tyre",
  "Driver Side Front Rim",
  "Windshield",
  "Top",
  "Right Taillight",
  "Rear Passenger Side Bumper",
  "Left Taillight",
  "Rear Driver Side Bumper",
  "Boot",
  "Rear screen ",
];
